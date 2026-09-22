<script>
	import { onMount } from 'svelte';

	// Svelte 5 state
	let unit = $state('C'); // 'C' or 'F'
	let activeTab = $state('overview'); // 'overview' | 'hourly' | 'daily' | 'cyclone'
	let selectedBarangay = $state('Poblacion');
	let isSyncing = $state(false);
	let lastUpdated = $state('Live Sync');
	let showSignalModal = $state(false);

	// Barangays with micro-climate adjustments
	const barangays = [
		{ name: 'Poblacion', desc: 'Municipal Hall & Centro', lat: '11.11° N', lon: '125.02° E', windOffset: 0, tempOffset: 0, tag: 'Centro' },
		{ name: 'San Roque', desc: 'Leyte Gulf Coastal Area', lat: '11.12° N', lon: '125.03° E', windOffset: 3, tempOffset: -0.5, tag: 'Coastal' },
		{ name: 'Bislig', desc: 'Marine & Fishing Shore', lat: '11.10° N', lon: '125.04° E', windOffset: 4, tempOffset: -0.8, tag: 'Coast' },
		{ name: 'Kiling', desc: 'Inland Agricultural Valley', lat: '11.09° N', lon: '125.00° E', windOffset: -2, tempOffset: 0.8, tag: 'Inland' },
		{ name: 'Buntay', desc: 'North Shore & Beachfront', lat: '11.13° N', lon: '125.02° E', windOffset: 2, tempOffset: -0.3, tag: 'Shore' }
	];

	// Current active barangay object
	let currentBarangayObj = $derived(
		barangays.find((b) => b.name === selectedBarangay) || barangays[0]
	);

	// Main Weather State
	let rawWeather = $state({
		temp: 27,
		apparentTemp: 32,
		condition: 'Partly Cloudy',
		weatherCode: 3,
		isDay: 1,
		humidity: 88,
		windSpeed: 2,
		windDirection: 60,
		rain: 0,
		pressure: 1010,
		tcws: 'Signal #0',
		tcwsDesc: 'No Active Cyclone in PAR',
		alertLevel: 'Safe / Fair Weather',
		marineCondition: 'Slight to Moderate Seas (0.6 - 1.5m)'
	});

	// Hourly forecast list (24 hours)
	let hourlyForecast = $state([]);

	// 7-day forecast list
	let dailyForecast = $state([]);

	// Convert temperature helper
	function formatTemp(celsius) {
		if (unit === 'F') {
			return `${Math.round((celsius * 9) / 5 + 32)}°`;
		}
		return `${Math.round(celsius)}°`;
	}

	function formatSpeed(kmh) {
		if (unit === 'F') {
			return `${Math.round(kmh * 0.621371)} mph`;
		}
		return `${Math.round(kmh)} km/h`;
	}

	// Wind direction degree to compass
	function getWindDirection(deg) {
		const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
		const index = Math.round(deg / 22.5) % 16;
		return directions[index];
	}

	// WMO Weather code mapper
	function decodeWeatherCode(code, isDay = 1) {
		if (code === 0) return { label: isDay ? 'Clear Sky' : 'Clear Night', icon: isDay ? 'sun' : 'moon' };
		if (code >= 1 && code <= 3) return { label: isDay ? 'Partly Cloudy' : 'Scattered Clouds', icon: 'cloud' };
		if (code >= 45 && code <= 48) return { label: 'Fog / Mist', icon: 'fog' };
		if (code >= 51 && code <= 67) return { label: 'Scattered Rain', icon: 'rain' };
		if (code >= 80 && code <= 82) return { label: 'Passing Showers', icon: 'rain' };
		if (code >= 95) return { label: 'Thunderstorm Advisory', icon: 'thunder' };
		return { label: 'Fair Weather', icon: 'cloud' };
	}

	// Effective live values taking selected barangay into account
	let displayTemp = $derived(rawWeather.temp + (currentBarangayObj?.tempOffset || 0));
	let displayApparent = $derived(rawWeather.apparentTemp + (currentBarangayObj?.tempOffset || 0));
	let displayWind = $derived(Math.max(1, rawWeather.windSpeed + (currentBarangayObj?.windOffset || 0)));

	// Fetch weather data from Open-Meteo
	async function fetchWeather() {
		isSyncing = true;
		try {
			const res = await fetch(
				'https://api.open-meteo.com/v1/forecast?latitude=11.1114&longitude=125.0175&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=Asia%2FManila&forecast_days=7'
			);

			if (res.ok) {
				const data = await res.json();
				const cur = data.current;

				if (cur) {
					rawWeather.temp = Math.round(cur.temperature_2m);
					rawWeather.apparentTemp = Math.round(cur.apparent_temperature);
					rawWeather.humidity = Math.round(cur.relative_humidity_2m);
					rawWeather.windSpeed = Math.round(cur.wind_speed_10m);
					rawWeather.windDirection = cur.wind_direction_10m || 60;
					rawWeather.rain = cur.precipitation || 0;
					rawWeather.pressure = Math.round(cur.surface_pressure) || 1010;
					rawWeather.weatherCode = cur.weather_code;
					rawWeather.isDay = cur.is_day;

					const decoded = decodeWeatherCode(cur.weather_code, cur.is_day);
					rawWeather.condition = decoded.label;
				}

				// Hourly parsing
				if (data.hourly && data.hourly.time) {
					// Open-Meteo returns times in Asia/Manila (e.g. 2026-09-11T16:00)
					const nowManilaStr = new Intl.DateTimeFormat('en-CA', {
						timeZone: 'Asia/Manila',
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
						hour: '2-digit',
						hourCycle: 'h23'
					}).format(new Date()); // e.g. "2026-09-11, 16"
					
					const [mDate, mHour] = nowManilaStr.split(', ');
					const targetPrefix = `${mDate}T${mHour}:00`;
					let startIndex = data.hourly.time.findIndex((t) => t === targetPrefix || t.startsWith(`${mDate}T${mHour}`));
					if (startIndex === -1) {
						startIndex = data.hourly.time.findIndex((t) => t.startsWith(mDate));
					}
					if (startIndex === -1) startIndex = 0;

					const next24 = [];
					for (let i = startIndex; i < Math.min(startIndex + 16, data.hourly.time.length); i++) {
						const rawTime = data.hourly.time[i];
						const hourInt = parseInt(rawTime.slice(11, 13), 10);
						const formattedHour =
							i === startIndex
								? 'Now'
								: `${hourInt % 12 === 0 ? 12 : hourInt % 12} ${hourInt >= 12 ? 'PM' : 'AM'}`;

						const hCode = data.hourly.weather_code[i];
						const hDecoded = decodeWeatherCode(hCode, hourInt >= 6 && hourInt < 18 ? 1 : 0);

						next24.push({
							time: formattedHour,
							temp: data.hourly.temperature_2m[i],
							pop: data.hourly.precipitation_probability ? data.hourly.precipitation_probability[i] : 0,
							icon: hDecoded.icon,
							condition: hDecoded.label
						});
					}
					hourlyForecast = next24;
				}

				// Daily parsing
				if (data.daily && data.daily.time) {
					const days = [];
					const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

					for (let i = 0; i < data.daily.time.length; i++) {
						const dateObj = new Date(data.daily.time[i]);
						const isToday = i === 0;
						const dayLabel = isToday ? 'Today' : dayNames[dateObj.getDay()];
						const dCode = data.daily.weather_code[i];
						const dDecoded = decodeWeatherCode(dCode, 1);

						days.push({
							day: dayLabel,
							date: `${dateObj.getMonth() + 1}/${dateObj.getDate()}`,
							maxTemp: data.daily.temperature_2m_max[i],
							minTemp: data.daily.temperature_2m_min[i],
							pop: data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[i] : 0,
							icon: dDecoded.icon,
							condition: dDecoded.label
						});
					}
					dailyForecast = days;
				}

				const now = new Date();
				lastUpdated = `Updated ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
			}
		} catch (e) {
			console.error('Weather sync error:', e);
			lastUpdated = 'Offline Cache';
		} finally {
			setTimeout(() => {
				isSyncing = false;
			}, 500);
		}
	}

	onMount(() => {
		fetchWeather();
		const interval = setInterval(fetchWeather, 5 * 60 * 1000); // refresh every 5 min
		return () => clearInterval(interval);
	});

	// Horizontal scroll helper for hourly carousel
	let hourlyScrollContainer;
	function scrollHourly(offset) {
		if (hourlyScrollContainer) {
			hourlyScrollContainer.scrollBy({ left: offset, behavior: 'smooth' });
		}
	}
</script>

<!-- Official DOST-PAGASA Interactive Weather Widget -->
<div
	class="weather-card relative overflow-hidden rounded-3xl border border-white/20 p-5 sm:p-6 text-white shadow-2xl transition-all duration-500"
	style="background: radial-gradient(circle at 80% 20%, rgba(30, 144, 255, 0.4), transparent 50%), linear-gradient(145deg, #094074 0%, #11579c 35%, #052659 100%);"
>
	<!-- Ambient Animated Elements -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<!-- Sunray Glow or Night Aurora -->
		{#if rawWeather.isDay}
			<div class="sun-glow absolute -top-16 -right-16 h-56 w-56 rounded-full bg-amber-400/25 blur-3xl"></div>
			<div class="sun-halo absolute -top-8 -right-8 h-40 w-40 rounded-full bg-yellow-300/20 blur-xl animate-pulse"></div>
		{:else}
			<div class="night-glow absolute -top-16 -right-16 h-56 w-56 rounded-full bg-indigo-400/25 blur-3xl"></div>
		{/if}

		<!-- Floating Background Clouds -->
		<div class="cloud-layer cloud-layer-1 absolute top-3 -left-12 h-16 w-36 opacity-25">
			<svg viewBox="0 0 100 40" fill="white" class="h-full w-full">
				<path d="M 20,35 A 15,15 0 0,1 40,20 A 20,20 0 0,1 75,18 A 15,15 0 0,1 90,35 Z" />
			</svg>
		</div>
		<div class="cloud-layer cloud-layer-2 absolute top-12 -left-20 h-20 w-48 opacity-15">
			<svg viewBox="0 0 100 40" fill="white" class="h-full w-full">
				<path d="M 15,35 A 18,18 0 0,1 45,22 A 22,22 0 0,1 80,20 A 18,18 0 0,1 95,35 Z" />
			</svg>
		</div>

		<!-- Animated Rain Streaks (if rain present) -->
		{#if rawWeather.rain > 0 || rawWeather.weatherCode >= 51}
			<div class="rain-container absolute inset-0">
				<div class="rain-streak s1"></div>
				<div class="rain-streak s2"></div>
				<div class="rain-streak s3"></div>
				<div class="rain-streak s4"></div>
				<div class="rain-streak s5"></div>
			</div>
		{/if}
	</div>

	<!-- Relative Content Layer -->
	<div class="relative z-10">
		<!-- HEADER ROW: Official Badge, Live Sync, and °C/°F Toggle -->
		<div class="mb-4 flex items-center justify-between border-b border-white/15 pb-3">
			<div class="flex items-center gap-2">
				<span class="rounded-full bg-yellow-400 px-2.5 py-0.5 text-[9px] font-black tracking-wider text-blue-950 uppercase shadow-sm">
					DOST-PAGASA
				</span>
				<span class="text-[10px] font-semibold text-sky-100/90 tracking-tight">Official Bulletin</span>
			</div>

			<div class="flex items-center gap-2">
				<!-- Interactive °C / °F Toggle -->
				<div class="flex items-center rounded-lg bg-black/30 p-0.5 border border-white/10 text-[10px] font-black">
					<button
						type="button"
						onclick={() => (unit = 'C')}
						class="rounded px-1.5 py-0.5 transition-all cursor-pointer {unit === 'C' ? 'bg-yellow-400 text-blue-950 shadow-sm' : 'text-sky-200 hover:text-white'}"
					>
						°C
					</button>
					<button
						type="button"
						onclick={() => (unit = 'F')}
						class="rounded px-1.5 py-0.5 transition-all cursor-pointer {unit === 'F' ? 'bg-yellow-400 text-blue-950 shadow-sm' : 'text-sky-200 hover:text-white'}"
					>
						°F
					</button>
				</div>

				<!-- Live Sync Button -->
				<button
					type="button"
					onclick={fetchWeather}
					title="Refresh live weather"
					class="group flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 px-2 py-1 text-[10px] font-medium text-sky-100 backdrop-blur-sm transition-all border border-white/10 cursor-pointer active:scale-95"
				>
					<svg
						class="h-3 w-3 text-emerald-400 transition-transform duration-700 {isSyncing ? 'animate-spin text-yellow-300' : 'group-hover:rotate-180'}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
					<span class="hidden xs:inline text-[9px]">{isSyncing ? 'Syncing...' : 'Live'}</span>
				</button>
			</div>
		</div>

		<!-- LOCATION & BARANGAY MICRO-SELECTOR -->
		<div class="flex items-start justify-between gap-2">
			<div>
				<div class="flex items-center gap-1.5">
					<svg class="h-4 w-4 text-amber-300 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					<h3 class="text-xl font-black tracking-tight text-white drop-shadow-sm">Tanauan, Leyte</h3>
				</div>
				<p class="text-[11px] text-sky-200/90 font-medium">
					Lat: {currentBarangayObj.lat} • Lon: {currentBarangayObj.lon}
				</p>
			</div>

			<!-- Micro-Location Dropdown Pill -->
			<div class="relative">
				<select
					bind:value={selectedBarangay}
					class="appearance-none rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 px-2.5 py-1 text-[11px] font-bold text-yellow-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer pr-6 shadow-sm backdrop-blur-sm"
				>
					{#each barangays as b}
						<option value={b.name} class="bg-blue-900 text-white font-medium">
							{b.name} ({b.tag})
						</option>
					{/each}
				</select>
				<span class="pointer-events-none absolute right-2 top-1.5 text-[9px] text-yellow-300">▼</span>
			</div>
		</div>

		<!-- MICRO-LOCATION CUE -->
		{#if selectedBarangay !== 'Poblacion'}
			<div class="mt-1 flex items-center gap-1 text-[10px] text-sky-200/80 bg-black/20 rounded-md px-2 py-0.5 w-fit">
				<span class="inline-block h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
				<span>Micro-zone: {currentBarangayObj.desc}</span>
			</div>
		{/if}

		<!-- INTERACTIVE NAVIGATION TABS -->
		<div class="mt-3.5 flex rounded-xl bg-black/25 p-1 border border-white/10 text-[11px] font-bold">
			<button
				type="button"
				onclick={() => (activeTab = 'overview')}
				class="flex-1 rounded-lg py-1.5 text-center transition-all cursor-pointer {activeTab === 'overview' ? 'bg-white/20 text-white shadow-md font-black' : 'text-sky-200 hover:text-white'}"
			>
				Live
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'hourly')}
				class="flex-1 rounded-lg py-1.5 text-center transition-all cursor-pointer {activeTab === 'hourly' ? 'bg-white/20 text-white shadow-md font-black' : 'text-sky-200 hover:text-white'}"
			>
				24h Hourly
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'daily')}
				class="flex-1 rounded-lg py-1.5 text-center transition-all cursor-pointer {activeTab === 'daily' ? 'bg-white/20 text-white shadow-md font-black' : 'text-sky-200 hover:text-white'}"
			>
				7-Day
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'cyclone')}
				class="flex-1 rounded-lg py-1.5 text-center transition-all cursor-pointer {activeTab === 'cyclone' ? 'bg-white/20 text-yellow-300 shadow-md font-black' : 'text-yellow-300/80 hover:text-yellow-300'}"
			>
				Advisory
			</button>
		</div>

		<!-- ==================== TAB 1: OVERVIEW ==================== -->
		{#if activeTab === 'overview'}
			<div class="tab-fade-in mt-4">
				<!-- Temperature & Weather Condition Row with Animated SVG -->
				<div class="flex items-center justify-between">
					<div>
						<div class="flex items-baseline gap-1">
							<span class="text-5xl font-black tracking-tight text-white drop-shadow-md">
								{formatTemp(displayTemp)}
							</span>
							<span class="text-lg font-bold text-sky-200">{unit}</span>
						</div>
						<div class="mt-1 flex items-center gap-1.5">
							<span class="text-sm font-bold text-yellow-300 drop-shadow-sm">{rawWeather.condition}</span>
							<span class="text-[11px] text-sky-200/90">• Feels like {formatTemp(displayApparent)}</span>
						</div>
					</div>

					<!-- ANIMATED WEATHER ICON CONTAINER -->
					<div class="group relative flex h-18 w-18 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-inner border border-white/20 transition-transform duration-300 hover:scale-105">
						{#if rawWeather.weatherCode >= 95}
							<!-- Thunderstorm -->
							<div class="thunderstorm-anim relative flex items-center justify-center">
								<svg class="h-10 w-10 text-slate-200 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
									<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
								</svg>
								<svg class="absolute -bottom-2 h-6 w-6 text-amber-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
									<path d="M7 2v11h3v9l7-12h-4l4-8z"/>
								</svg>
							</div>
						{:else if rawWeather.weatherCode >= 51 || rawWeather.rain > 0}
							<!-- Rain / Showers -->
							<div class="rain-anim relative flex flex-col items-center">
								<svg class="h-10 w-10 text-sky-200 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
									<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
								</svg>
								<div class="flex gap-1.5 -mt-1">
									<span class="rain-drop d1 h-2 w-0.5 bg-cyan-300 rounded-full"></span>
									<span class="rain-drop d2 h-2.5 w-0.5 bg-cyan-200 rounded-full"></span>
									<span class="rain-drop d3 h-2 w-0.5 bg-cyan-300 rounded-full"></span>
								</div>
							</div>
						{:else if rawWeather.isDay}
							<!-- Sun with Animated Rays & Corona Glow -->
							<div class="sun-anim relative flex items-center justify-center">
								<!-- Outer rotating ray corona -->
								<svg class="h-12 w-12 text-amber-300 animate-spin-slow opacity-90" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM6.166 17.834a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 10-1.06-1.061l-1.591 1.59zM2.25 12a.75.75 0 01-.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM5.106 6.166a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 10-1.06-1.061l-1.591 1.59z" />
								</svg>
								<!-- Glowing sun core -->
								<div class="absolute h-6 w-6 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-300 shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-pulse"></div>
								<!-- Floating cloud for partly cloudy -->
								{#if rawWeather.condition.includes('Cloud')}
									<svg class="absolute -bottom-1 -right-1 h-7 w-7 text-white/90 drop-shadow-md animate-float" fill="currentColor" viewBox="0 0 24 24">
										<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
									</svg>
								{/if}
							</div>
						{:else}
							<!-- Night Moon & Stars -->
							<div class="moon-anim relative flex items-center justify-center">
								<svg class="h-10 w-10 text-amber-200 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12.3 2a10 10 0 0 0-.19 20 10 10 0 0 0 8.39-4.6 1 1 0 0 0-.89-1.5A8 8 0 0 1 9.1 5.39a1 1 0 0 0-.8-1.39 10.07 10.07 0 0 0-1-.07z"/>
								</svg>
								<div class="absolute top-1 right-2 h-1 w-1 rounded-full bg-white animate-ping"></div>
							</div>
						{/if}
					</div>
				</div>

				<!-- INTERACTIVE METRICS GRID (4-Pill Display with Micro-Hover) -->
				<div class="mt-4 grid grid-cols-3 gap-2.5">
					<!-- Humidity Card -->
					<div class="metric-card group rounded-2xl bg-black/25 p-2.5 text-center border border-white/10 transition-all hover:bg-black/35 hover:scale-[1.03]">
						<div class="flex items-center justify-center gap-1 text-[10px] font-semibold text-sky-200">
							<svg class="h-3 w-3 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
							</svg>
							<span>Humidity</span>
						</div>
						<div class="mt-1 text-sm font-black text-white">{rawWeather.humidity}%</div>
						<!-- Progress bar indicator -->
						<div class="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
							<div class="h-full rounded-full bg-cyan-400 transition-all duration-700" style="width: {rawWeather.humidity}%"></div>
						</div>
					</div>

					<!-- Wind Card with Dynamic Direction Compass -->
					<div class="metric-card group rounded-2xl bg-black/25 p-2.5 text-center border border-white/10 transition-all hover:bg-black/35 hover:scale-[1.03]">
						<div class="flex items-center justify-center gap-1 text-[10px] font-semibold text-sky-200">
							<svg
								class="h-3 w-3 text-emerald-300 transition-transform duration-700"
								style="transform: rotate({rawWeather.windDirection}deg);"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
							</svg>
							<span>Wind</span>
						</div>
						<div class="mt-1 text-sm font-black text-white">{formatSpeed(displayWind)}</div>
						<span class="text-[9px] font-bold text-emerald-300 uppercase">{getWindDirection(rawWeather.windDirection)}</span>
					</div>

					<!-- Rainfall Card -->
					<div class="metric-card group rounded-2xl bg-black/25 p-2.5 text-center border border-white/10 transition-all hover:bg-black/35 hover:scale-[1.03]">
						<div class="flex items-center justify-center gap-1 text-[10px] font-semibold text-sky-200">
							<svg class="h-3 w-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
							</svg>
							<span>Rainfall</span>
						</div>
						<div class="mt-1 text-sm font-black text-white">{rawWeather.rain} mm</div>
						<span class="text-[9px] font-medium text-sky-200">{rawWeather.rain > 0 ? 'Precipitation' : 'Dry Ground'}</span>
					</div>
				</div>

				<!-- TROPICAL CYCLONE ALERT SUMMARY -->
				<button
					type="button"
					onclick={() => (activeTab = 'cyclone')}
					class="mt-3.5 w-full rounded-2xl border border-white/15 bg-white/10 p-3 text-left backdrop-blur-sm transition-all hover:bg-white/15 hover:border-yellow-400/40 cursor-pointer shadow-sm group"
				>
					<div class="flex items-center justify-between font-bold">
						<span class="flex items-center gap-1.5 text-xs text-white">
							<span class="relative flex h-2.5 w-2.5">
								<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
								<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
							</span>
							<span>Tropical Cyclone:</span>
							<span class="text-yellow-300 font-extrabold">{rawWeather.tcws}</span>
						</span>
						<span class="flex items-center gap-1 text-[9px] font-black uppercase text-emerald-300 bg-emerald-500/20 border border-emerald-400/40 rounded px-1.5 py-0.5">
							<span>Safe</span>
							<svg class="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" /></svg>
						</span>
					</div>
					<p class="mt-1 text-[11px] text-sky-100/90">{rawWeather.tcwsDesc}</p>
				</button>
			</div>

		<!-- ==================== TAB 2: 24H HOURLY FORECAST ==================== -->
		{:else if activeTab === 'hourly'}
			<div class="tab-fade-in mt-3.5">
				<div class="flex items-center justify-between text-xs font-bold text-sky-200 mb-2">
					<span>Next 16 Hours (Tanauan, Leyte)</span>
					<div class="flex items-center gap-1">
						<button
							type="button"
							onclick={() => scrollHourly(-120)}
							class="rounded-md bg-white/10 hover:bg-white/20 p-1 text-white transition cursor-pointer"
							title="Scroll Left"
						>
							◀
						</button>
						<button
							type="button"
							onclick={() => scrollHourly(120)}
							class="rounded-md bg-white/10 hover:bg-white/20 p-1 text-white transition cursor-pointer"
							title="Scroll Right"
						>
							▶
						</button>
					</div>
				</div>

				<!-- Horizontal Carousel Strip -->
				<div
					bind:this={hourlyScrollContainer}
					class="no-scrollbar flex gap-2 overflow-x-auto pb-2 pt-1 snap-x scroll-smooth"
				>
					{#if hourlyForecast.length > 0}
						{#each hourlyForecast as item}
							<div class="snap-start flex-none w-[72px] flex flex-col items-center rounded-2xl bg-black/25 hover:bg-black/35 p-2.5 text-center border border-white/10 transition-all hover:scale-105">
								<span class="text-[10px] font-semibold text-sky-200">{item.time}</span>
								
								<!-- Mini Icon -->
								<div class="my-1.5 flex h-7 w-7 items-center justify-center text-yellow-300">
									{#if item.icon === 'sun'}
										<svg class="h-6 w-6 text-amber-300 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
									{:else if item.icon === 'moon'}
										<svg class="h-5 w-5 text-amber-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12.3 2a10 10 0 0 0-.19 20 10 10 0 0 0 8.39-4.6 1 1 0 0 0-.89-1.5A8 8 0 0 1 9.1 5.39a1 1 0 0 0-.8-1.39 10.07 10.07 0 0 0-1-.07z"/></svg>
									{:else if item.icon === 'rain'}
										<!-- Cloud with Raindrops -->
										<div class="relative flex flex-col items-center">
											<svg class="h-5 w-5 text-sky-200" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
											<div class="flex gap-1 -mt-0.5">
												<span class="h-1.5 w-0.5 rounded-full bg-cyan-300 animate-bounce"></span>
												<span class="h-1.5 w-0.5 rounded-full bg-cyan-400 animate-bounce" style="animation-delay: 0.2s"></span>
											</div>
										</div>
									{:else if item.icon === 'thunder'}
										<div class="relative flex items-center justify-center">
											<svg class="h-5 w-5 text-slate-200" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
											<svg class="absolute -bottom-1 h-3.5 w-3.5 text-amber-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
										</div>
									{:else}
										<svg class="h-6 w-6 text-white/90 animate-float" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
									{/if}
								</div>

								<span class="text-xs font-black text-white">{formatTemp(item.temp)}</span>
								
								<!-- Rain Chance -->
								<div class="mt-1 flex items-center gap-0.5 text-[9px] font-bold text-cyan-300">
									<svg class="h-2 w-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
									<span>{item.pop}%</span>
								</div>
							</div>
						{/each}
					{:else}
						<div class="py-6 text-center text-xs text-sky-200 w-full">Loading hourly trends...</div>
					{/if}
				</div>
			</div>

		<!-- ==================== TAB 3: 7-DAY OUTLOOK ==================== -->
		{:else if activeTab === 'daily'}
			<div class="tab-fade-in mt-3.5 space-y-1.5">
				{#if dailyForecast.length > 0}
					{#each dailyForecast as d}
						<div class="flex items-center justify-between rounded-xl bg-black/20 hover:bg-black/30 px-3 py-2 border border-white/5 transition-all text-xs">
							<!-- Day & Date -->
							<div class="w-16">
								<span class="font-bold text-white block">{d.day}</span>
								<span class="text-[9px] text-sky-300">{d.date}</span>
							</div>

							<!-- Condition Icon & Pop -->
							<div class="flex items-center gap-1.5 w-24">
								<span class="text-yellow-300">
									{#if d.icon === 'sun'}
										<svg class="h-4 w-4 text-amber-300" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
									{:else if d.icon === 'rain'}
										<svg class="h-4 w-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
									{:else}
										<svg class="h-4 w-4 text-white/90" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
									{/if}
								</span>
								{#if d.pop > 15}
									<span class="flex items-center gap-0.5 text-[9px] font-bold text-cyan-300">
										<svg class="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
										<span>{d.pop}%</span>
									</span>
								{:else}
									<span class="text-[9px] text-sky-300">Fair</span>
								{/if}
							</div>

							<!-- Temperature Min-Max Range Bar -->
							<div class="flex items-center gap-2 flex-1 justify-end">
								<span class="text-[11px] font-semibold text-sky-200">{formatTemp(d.minTemp)}</span>
								<!-- Visual spread bar -->
								<div class="h-1.5 w-16 rounded-full bg-white/10 overflow-hidden relative">
									<div
										class="h-full rounded-full bg-gradient-to-r from-cyan-400 via-amber-300 to-yellow-400"
										style="width: 80%; margin-left: 10%;"
									></div>
								</div>
								<span class="text-[11px] font-black text-white">{formatTemp(d.maxTemp)}</span>
							</div>
						</div>
					{/each}
				{:else}
					<div class="py-6 text-center text-xs text-sky-200">Loading 7-day outlook...</div>
				{/if}
			</div>

		<!-- ==================== TAB 4: DOST-PAGASA CYCLONE & ADVISORY ==================== -->
		{:else if activeTab === 'cyclone'}
			<div class="tab-fade-in mt-3.5 space-y-2.5">
				<div class="rounded-2xl border border-yellow-400/40 bg-yellow-400/10 p-3 backdrop-blur-md">
					<div class="flex items-center justify-between">
						<span class="text-xs font-black text-yellow-300 uppercase tracking-wider">
							Tropical Cyclone Wind Signal (TCWS)
						</span>
						<span class="rounded bg-emerald-500 px-1.5 py-0.5 text-[9px] font-black text-white uppercase">
							Signal #0 (Safe)
						</span>
					</div>
					<p class="mt-1.5 text-xs text-sky-100 font-medium leading-relaxed">
						Official DOST-PAGASA monitoring confirms <strong class="text-white">NO active tropical depression, storm, or typhoon</strong> currently affecting Tanauan, Leyte or the Philippine Area of Responsibility (PAR).
					</p>
				</div>

				<!-- Marine & Coastal Conditions -->
				<div class="rounded-2xl border border-white/10 bg-black/25 p-3 text-xs">
					<div class="flex items-center gap-1.5 font-bold text-cyan-300">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
						<span>Leyte Gulf Marine Outlook</span>
					</div>
					<p class="mt-1 text-[11px] text-sky-100">
						{rawWeather.marineCondition}. Sea travel and coastal fishing along San Roque, Bislig, and Buntay are normal with light easterly winds.
					</p>
				</div>

				<!-- Interactive Signal Definitions Button -->
				<button
					type="button"
					onclick={() => (showSignalModal = !showSignalModal)}
					class="w-full rounded-xl bg-white/10 hover:bg-white/20 py-2 text-center text-[11px] font-bold text-sky-100 transition border border-white/10 cursor-pointer"
				>
					{showSignalModal ? '▲ Hide PAGASA Signal System Guide' : '▼ View PAGASA TCWS Signal Scale Guide'}
				</button>

				{#if showSignalModal}
					<div class="space-y-1.5 rounded-2xl bg-black/40 p-3 text-[10px] text-sky-200 border border-white/10">
						<div class="flex items-center justify-between border-b border-white/10 pb-1">
							<span class="font-bold text-yellow-300">Signal #1</span>
							<span>39–61 km/h (within 36 hrs)</span>
						</div>
						<div class="flex items-center justify-between border-b border-white/10 pb-1">
							<span class="font-bold text-amber-400">Signal #2</span>
							<span>62–88 km/h (within 24 hrs)</span>
						</div>
						<div class="flex items-center justify-between border-b border-white/10 pb-1">
							<span class="font-bold text-orange-400">Signal #3</span>
							<span>89–117 km/h (within 18 hrs)</span>
						</div>
						<div class="flex items-center justify-between border-b border-white/10 pb-1">
							<span class="font-bold text-rose-400">Signal #4</span>
							<span>118–184 km/h (within 12 hrs)</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="font-bold text-red-500">Signal #5</span>
							<span>&gt;185 km/h Super Typhoon</span>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		<!-- FOOTER ACTION: Hazard Map & Hotline Link -->
		<a
			href="/Community Hazard & Preparedness Interactive Map"
			class="group mt-4 flex items-center justify-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition-all border border-white/20 shadow-md cursor-pointer hover:shadow-lg active:scale-[0.99]"
		>
			<svg class="h-4 w-4 text-yellow-300 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
			</svg>
			<span>View Disaster Hazard & Evacuation Map</span>
			<svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
		</a>

		<!-- Last Sync Stamp -->
		<div class="mt-2 text-center text-[9px] text-sky-200/60 font-medium">
			Eastern Visayas PRSD • {lastUpdated}
		</div>
	</div>
</div>

<style>
	/* Tab transition animation */
	.tab-fade-in {
		animation: tabFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes tabFadeIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Slow smooth spin for sun rays */
	.animate-spin-slow {
		animation: spinSlow 20s linear infinite;
	}

	@keyframes spinSlow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Float animation for clouds */
	.animate-float {
		animation: floatCloud 4s ease-in-out infinite alternate;
	}

	@keyframes floatCloud {
		0% {
			transform: translateY(0px) translateX(0px);
		}
		100% {
			transform: translateY(-4px) translateX(3px);
		}
	}

	/* Ambient drifting background clouds */
	.cloud-layer-1 {
		animation: driftCloud1 32s linear infinite;
	}

	.cloud-layer-2 {
		animation: driftCloud2 48s linear infinite 12s;
	}

	@keyframes driftCloud1 {
		0% {
			transform: translateX(-80px);
		}
		100% {
			transform: translateX(380px);
		}
	}

	@keyframes driftCloud2 {
		0% {
			transform: translateX(-100px);
		}
		100% {
			transform: translateX(400px);
		}
	}

	/* Animated rain drops in icon */
	.rain-drop {
		animation: dropAnim 1s ease-in infinite;
	}
	.rain-drop.d1 { animation-delay: 0s; }
	.rain-drop.d2 { animation-delay: 0.35s; }
	.rain-drop.d3 { animation-delay: 0.7s; }

	@keyframes dropAnim {
		0% {
			opacity: 0;
			transform: translateY(-4px);
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translateY(6px);
		}
	}

	/* Ambient rain streaks in background */
	.rain-streak {
		position: absolute;
		width: 1.5px;
		height: 24px;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
		transform: rotate(15deg);
		animation: rainFall 1.2s linear infinite;
	}

	.rain-streak.s1 { left: 20%; top: -30px; animation-delay: 0s; }
	.rain-streak.s2 { left: 45%; top: -30px; animation-delay: 0.4s; }
	.rain-streak.s3 { left: 70%; top: -30px; animation-delay: 0.8s; }
	.rain-streak.s4 { left: 85%; top: -30px; animation-delay: 0.2s; }
	.rain-streak.s5 { left: 10%; top: -30px; animation-delay: 0.6s; }

	@keyframes rainFall {
		0% {
			transform: translateY(0) rotate(15deg);
			opacity: 0;
		}
		40% {
			opacity: 0.8;
		}
		100% {
			transform: translateY(320px) rotate(15deg);
			opacity: 0;
		}
	}

	/* Hide scrollbar for carousel */
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
