<script>
	let { activeModalSection = null, onSelectSection = null } = $props();

	// Section Modal Data
	const divisionDetails = {
		nursing: {
			title: 'Nursing and Midwifery Services',
			tag: 'Section 02 // Primary Care & Catchment Coverage',
			badge: 'RHU Catchment Operations',
			description:
				'Administers maternal care, immunizations, outpatient triage, and village health station supervision across 54 barangays.',
			groups: [
				{
					groupName: 'Nursing Roster',
					staff: [
						{ name: 'Tita C. Margallo', role: 'Nurse II', status: 'Public Health Nurse' },
						{ name: 'Mary Jay E. Coronado', role: 'Nurse II', status: 'Public Health Nurse' },
						{
							name: 'Reinah Mary Feb S. Cabrera',
							role: 'Nurse',
							status: 'Health Education and Promotion Officer'
						}
					]
				},
				{
					groupName: 'Midwife per Catchment Area',
					staff: [
						{
							name: 'Lany O. Gomez',
							role: 'Catchment Midwife',
							status: 'Main Health Center (MHC)'
						},
						{
							name: 'Elvira J. Lamata',
							role: 'Catchment Midwife',
							status: 'Cabuynan Catchment'
						},
						{
							name: 'Fatima C. Esquivel',
							role: 'Catchment Midwife',
							status: 'Solano Catchment'
						},
						{
							name: 'Bernadette M. Redoña',
							role: 'Catchment Midwife',
							status: 'Malaguicay Catchment'
						},
						{
							name: 'Lupicina C. Paujana',
							role: 'Catchment Midwife',
							status: 'Salvador Catchment'
						},
						{
							name: 'Golda May B. Igrobay',
							role: 'Catchment Midwife',
							status: 'Calsadahay Catchment'
						}
					]
				}
			]
		},
		pharmacy: {
			title: 'Diagnostics & Pharmacy Services',
			tag: 'Section 03 // Ancillary & Diagnostic Services',
			badge: 'Laboratory, Pharmacy & Oral Care',
			description:
				'Handles diagnostic clinical testing, government medicine storage & dispensing, and comprehensive oral healthcare.',
			groups: [
				{
					groupName: 'Pharmacy Unit',
					staff: [
						{
							name: 'Dyna Marie S. Corilla',
							role: 'Pharmacist',
							status: 'Registered Pharmacist / In-Charge'
						},
						{ name: 'Liza Mendiola', role: 'Assistant', status: 'Pharmacy Support' }
					]
				},
				{
					groupName: 'Diagnostic Laboratory',
					staff: [
						{
							name: 'Andrew Nathaniel F. Mercado',
							role: 'Medical Technologist',
							status: 'Registered MedTech / Lab Lead'
						},
						{
							name: 'Jessa Mae Severino',
							role: 'Laboratory Aide',
							status: 'Specimen & Lab Support'
						}
					]
				},
				{
					groupName: 'Dental Health Clinic',
					staff: [
						{
							name: 'Dr. Karen Mae C. Leones',
							role: 'Dentist II',
							status: 'Public Health Dentist'
						},
						{ name: 'Katherine C. Odtuhan', role: 'Dental Assistant', status: 'Clinical Assistant' }
					]
				}
			]
		},
		sanitation: {
			title: 'Sanitation Services & EMR',
			tag: 'Section 04 // Public Health & Records',
			badge: 'Sanitary Inspection & Health Records',
			description:
				'Enforces sanitation and hygiene standards, water quality surveillance, and manages digital patient health registries.',
			groups: [
				{
					groupName: 'Environmental Sanitation Unit',
					staff: [
						{
							name: 'Jennifer Artogue',
							role: 'Sanitation Inspector II',
							status: 'Senior Regulatory Officer'
						},
						{
							name: 'Victorino A. Salubon',
							role: 'Sanitation Inspector I',
							status: 'Field Inspection & Permitting'
						},
						{
							name: 'Elmer U. Ripalda',
							role: 'Sanitation Inspector I',
							status: 'Field Inspection & Water Safety'
						}
					]
				},
				{
					groupName: 'Electronic Medical Records & PhilHealth',
					staff: [
						{
							name: 'Zaira B. Angelio',
							role: 'DCW II / Medical Records Encoder',
							status: 'EMR & Encoding Lead'
						},
						{
							name: 'Rodel A. Buendia',
							role: 'PhilHealth Coordinator',
							status: 'Konsulta Program Coordination'
						},
						{
							name: 'Sherlyn Almaden',
							role: 'PhilHealth Staff',
							status: 'Member Verification & Claims'
						},
						{
							name: 'Irene Redoña',
							role: 'PhilHealth Staff',
							status: 'Records & Enrollment Support'
						},
						{ name: 'Joy Balmes', role: 'PhilHealth Staff', status: 'Frontline Patient Support' }
					]
				}
			]
		}
	};

	let selectedModalKey = $state(null);

	// Sync with parent prop if provided
	$effect(() => {
		if (activeModalSection) {
			selectedModalKey = activeModalSection;
		}
	});

	function openModal(key) {
		selectedModalKey = key;
		if (onSelectSection) onSelectSection(key);
	}

	function closeModal() {
		selectedModalKey = null;
		if (onSelectSection) onSelectSection(null);
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeModal()} />

<div class="w-full overflow-x-auto py-4">
	<div class="mx-auto flex max-w-6xl min-w-[960px] flex-col items-center">
		<!-- Executive Header / Seal Banner -->
		<div class="mb-8 w-full max-w-3xl border-b-2 border-amber-300 pb-4 text-center">
			<div class="mb-2 flex items-center justify-center gap-4">
				<img
					src="/tanauan logo.svg"
					alt="Official Seal of Tanauan"
					class="h-14 w-14 object-contain drop-shadow-sm"
				/>
				<div class="text-center">
					<div class="text-xs font-bold tracking-widest text-slate-500 uppercase">
						Republic of the Philippines • Province of Leyte
					</div>
					<div class="text-sm font-extrabold text-blue-950 uppercase">Municipality of Tanauan</div>
					<div class="text-base font-black tracking-wider text-amber-700 uppercase">
						MUNICIPAL HEALTH OFFICE
					</div>
				</div>
				<img
					src="/tanauan logo.svg"
					alt="Official Seal of Tanauan"
					class="hidden h-14 w-14 object-contain opacity-0 drop-shadow-sm sm:block"
				/>
			</div>
			<div class="mt-2 text-xl font-black tracking-wide text-rose-700 uppercase sm:text-2xl">
				ORGANIZATIONAL STRUCTURE
			</div>
			<div class="mt-1 flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
				<span class="h-2 w-2 animate-pulse rounded-full bg-amber-500"></span>
				<span>Interactive Hierarchy — Click marked divisions to inspect full personnel roster</span>
			</div>
		</div>

		<!-- TIER 1: MAYOR -->
		<div class="relative flex flex-col items-center">
			<div
				class="w-72 rounded-xl border-2 border-amber-500 bg-white p-3.5 text-center shadow-md transition-shadow hover:shadow-lg sm:w-80"
			>
				<div class="text-base font-black tracking-wide text-blue-950 uppercase">
					MA. GINA E. MERILO
				</div>
				<div class="mt-0.5 text-xs font-bold tracking-wider text-amber-700 uppercase">
					Municipal Mayor
				</div>
			</div>

			<!-- Vertical Stem 1 -->
			<div class="h-6 w-0.5 bg-amber-400"></div>

			<!-- TIER 2: ADMINISTRATOR -->
			<div
				class="w-72 rounded-xl border-2 border-amber-500 bg-white p-3.5 text-center shadow-md transition-shadow hover:shadow-lg sm:w-80"
			>
				<div class="text-base font-black tracking-wide text-blue-950 uppercase">
					RET. JUDGE EPHRAIM ABANDO
				</div>
				<div class="mt-0.5 text-xs font-bold tracking-wider text-amber-700 uppercase">
					Municipal Administrator
				</div>
			</div>

			<!-- Vertical Stem 2 -->
			<div class="h-6 w-0.5 bg-amber-400"></div>

			<!-- TIER 3: MHO HEAD -->
			<div
				class="w-80 rounded-xl border-2 border-amber-600 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 p-4 text-center text-blue-950 shadow-lg transition-shadow hover:shadow-xl sm:w-96"
			>
				<div class="text-lg font-black tracking-wide uppercase">DR. ARLENE V. SANTO</div>
				<div class="mt-0.5 text-xs font-black tracking-wider text-blue-950/85 uppercase">
					Municipal Health Officer
				</div>
			</div>
		</div>

		<!-- Main Trunk Stem downwards from MHO Head -->
		<div class="h-8 w-1 bg-amber-400"></div>

		<!-- Horizontal Branch Bar for 7 Top Operational Divisions -->
		<div class="relative flex w-[96%] max-w-6xl items-stretch justify-between pt-6">
			<!-- Horizontal Connecting Line -->
			<div class="absolute top-0 right-[6%] left-[6%] h-1 bg-amber-400"></div>

			<!-- TOP DIVISION 1: Nursing and Midwifery Services (CLICKABLE) -->
			<div class="relative flex w-[17%] flex-col items-center">
				<div class="absolute -top-6 h-6 w-0.5 bg-amber-400"></div>
				<button
					type="button"
					onclick={() => openModal('nursing')}
					class="group flex h-full w-full cursor-pointer flex-col justify-between rounded-xl border-2 border-amber-400 bg-white p-3 text-left shadow-sm ring-offset-2 transition-all hover:border-blue-900 hover:shadow-md hover:ring-2 hover:ring-amber-400"
					title="Click to view all Nursing & Midwifery personnel"
				>
					<div>
						<div class="mb-2 flex items-center justify-between border-b border-rose-100 pb-1.5">
							<span class="text-xs leading-tight font-black text-rose-700 uppercase"
								>Nursing & Midwifery</span
							>
							<span
								class="text-[10px] font-bold text-amber-600 transition-transform group-hover:translate-x-0.5"
								>↗</span
							>
						</div>
						<ul class="space-y-1 text-[11px] text-slate-700">
							<li class="flex items-start gap-1">
								<span class="font-bold text-amber-600">•</span>
								<span><strong>Tita C. Margallo</strong> - Nurse II</span>
							</li>
							<li class="flex items-start gap-1">
								<span class="font-bold text-amber-600">•</span>
								<span><strong>Mary Jay E. Coronado</strong> - Nurse II</span>
							</li>
							<li class="flex items-start gap-1">
								<span class="font-bold text-amber-600">•</span>
								<span><strong>Reinah Mary Feb S. Cabrera</strong> - Nurse</span>
							</li>
						</ul>
					</div>

					<div class="mt-3 border-t border-slate-100 pt-2">
						<div
							class="mb-1 flex items-center justify-between text-[10px] font-bold text-rose-700 uppercase"
						>
							<span>Midwife Catchment</span>
							<span class="font-mono text-[9px] text-blue-900">6 AREAS</span>
						</div>
						<div class="text-[10px] font-medium text-slate-600">
							Click to see full midwife roster & catchment barangays →
						</div>
					</div>
				</button>
			</div>

			<!-- TOP DIVISION 2: Dental Health (CLICKABLE -> Pharmacy/Diagnostics) -->
			<div class="relative flex w-[12%] flex-col items-center">
				<div class="absolute -top-6 h-6 w-0.5 bg-amber-400"></div>
				<button
					type="button"
					onclick={() => openModal('pharmacy')}
					class="group flex h-full w-full cursor-pointer flex-col rounded-xl border-2 border-amber-400 bg-white p-3 text-left shadow-sm ring-offset-2 transition-all hover:border-blue-900 hover:shadow-md hover:ring-2 hover:ring-amber-400"
					title="Click to view Diagnostic, Pharmacy & Dental personnel"
				>
					<div class="mb-2 flex items-center justify-between border-b border-rose-100 pb-1.5">
						<span class="text-xs font-black text-rose-700 uppercase">Dental Health</span>
						<span
							class="text-[10px] font-bold text-amber-600 transition-transform group-hover:translate-x-0.5"
							>↗</span
						>
					</div>
					<ul class="space-y-1 text-[11px] text-slate-700">
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Karen Mae C. Leones</strong> – Dentist II</span>
						</li>
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Katherine C. Odtuhan</strong> – Assistant</span>
						</li>
					</ul>
				</button>
			</div>

			<!-- TOP DIVISION 3: Pharmacy (CLICKABLE) -->
			<div class="relative flex w-[12%] flex-col items-center">
				<div class="absolute -top-6 h-6 w-0.5 bg-amber-400"></div>
				<button
					type="button"
					onclick={() => openModal('pharmacy')}
					class="group flex h-full w-full cursor-pointer flex-col rounded-xl border-2 border-amber-400 bg-white p-3 text-left shadow-sm ring-offset-2 transition-all hover:border-blue-900 hover:shadow-md hover:ring-2 hover:ring-amber-400"
					title="Click to view Pharmacy & Diagnostics personnel"
				>
					<div class="mb-2 flex items-center justify-between border-b border-rose-100 pb-1.5">
						<span class="text-xs font-black text-rose-700 uppercase">Pharmacy</span>
						<span
							class="text-[10px] font-bold text-amber-600 transition-transform group-hover:translate-x-0.5"
							>↗</span
						>
					</div>
					<ul class="space-y-1 text-[11px] text-slate-700">
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Dyna Marie S. Corilla</strong> – Pharmacist</span>
						</li>
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Liza Mendiola</strong> – Assistant</span>
						</li>
					</ul>
				</button>
			</div>

			<!-- TOP DIVISION 4: Triage -->
			<div class="relative flex w-[13%] flex-col items-center">
				<div class="absolute -top-6 h-6 w-0.5 bg-amber-400"></div>
				<div
					class="flex h-full w-full flex-col rounded-xl border-2 border-amber-400 bg-white p-3 shadow-sm transition-all hover:border-blue-900"
				>
					<div
						class="mb-2 border-b border-rose-100 pb-1.5 text-center text-xs font-black text-rose-700 uppercase"
					>
						Triage
					</div>
					<ul class="space-y-1 text-[11px] text-slate-700">
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Ma. Lourdes D. Salvacion</strong> – Nurse</span>
						</li>
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Darlene O. Pardales</strong> – Midwife</span>
						</li>
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Mariel Ruth Dalo</strong> – Midwife</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- TOP DIVISION 5: Laboratory (CLICKABLE -> Pharmacy/Diagnostics) -->
			<div class="relative flex w-[14%] flex-col items-center">
				<div class="absolute -top-6 h-6 w-0.5 bg-amber-400"></div>
				<button
					type="button"
					onclick={() => openModal('pharmacy')}
					class="group flex h-full w-full cursor-pointer flex-col rounded-xl border-2 border-amber-400 bg-white p-3 text-left shadow-sm ring-offset-2 transition-all hover:border-blue-900 hover:shadow-md hover:ring-2 hover:ring-amber-400"
					title="Click to view Diagnostic Laboratory & Pharmacy personnel"
				>
					<div class="mb-2 flex items-center justify-between border-b border-rose-100 pb-1.5">
						<span class="text-xs font-black text-rose-700 uppercase">Laboratory</span>
						<span
							class="text-[10px] font-bold text-amber-600 transition-transform group-hover:translate-x-0.5"
							>↗</span
						>
					</div>
					<ul class="space-y-1 text-[11px] text-slate-700">
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Andrew Nathaniel F. Mercado</strong> – Medical Tech</span>
						</li>
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Jessa Mae Severino</strong> – Lab. Aid</span>
						</li>
					</ul>
				</button>
			</div>

			<!-- TOP DIVISION 6: Electronic Medical Record / Encoder (CLICKABLE) -->
			<div class="relative flex w-[13%] flex-col items-center">
				<div class="absolute -top-6 h-6 w-0.5 bg-amber-400"></div>
				<button
					type="button"
					onclick={() => openModal('sanitation')}
					class="group flex h-full w-full cursor-pointer flex-col rounded-xl border-2 border-amber-400 bg-white p-3 text-left shadow-sm ring-offset-2 transition-all hover:border-blue-900 hover:shadow-md hover:ring-2 hover:ring-amber-400"
					title="Click to view EMR & Sanitation personnel"
				>
					<div class="mb-2 flex items-center justify-between border-b border-rose-100 pb-1.5">
						<span class="text-[11px] leading-tight font-black text-rose-700 uppercase"
							>EMR / Encoder</span
						>
						<span
							class="text-[10px] font-bold text-amber-600 transition-transform group-hover:translate-x-0.5"
							>↗</span
						>
					</div>
					<ul class="space-y-1 text-[11px] text-slate-700">
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Zaira B. Angelio</strong> – DCW II</span>
						</li>
					</ul>
				</button>
			</div>

			<!-- TOP DIVISION 7: Sanitation Services (CLICKABLE) -->
			<div class="relative flex w-[15%] flex-col items-center">
				<div class="absolute -top-6 h-6 w-0.5 bg-amber-400"></div>
				<button
					type="button"
					onclick={() => openModal('sanitation')}
					class="group flex h-full w-full cursor-pointer flex-col rounded-xl border-2 border-amber-400 bg-white p-3 text-left shadow-sm ring-offset-2 transition-all hover:border-blue-900 hover:shadow-md hover:ring-2 hover:ring-amber-400"
					title="Click to view Sanitation & EMR personnel"
				>
					<div class="mb-2 flex items-center justify-between border-b border-rose-100 pb-1.5">
						<span class="text-xs font-black text-rose-700 uppercase">Sanitation Services</span>
						<span
							class="text-[10px] font-bold text-amber-600 transition-transform group-hover:translate-x-0.5"
							>↗</span
						>
					</div>
					<ul class="space-y-1 text-[11px] text-slate-700">
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Jennifer Artogue</strong> – Insp. II</span>
						</li>
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Victorino A. Salubon</strong> – Insp. I</span>
						</li>
						<li class="flex items-start gap-1">
							<span class="font-bold text-amber-600">•</span>
							<span><strong>Elmer U. Ripalda</strong> – Insp. I</span>
						</li>
					</ul>
				</button>
			</div>
		</div>

		<!-- LOWER STEM from the central bar connecting support & administrative teams -->
		<div class="my-0 h-10 w-1 bg-amber-400"></div>

		<!-- LOWER SUPPORT & AUXILIARY SERVICES GRID (2 Columns with Central Trunk) -->
		<div class="relative w-full max-w-4xl">
			<!-- Central Vertical Trunk for lower branch -->
			<div class="absolute top-0 bottom-6 left-1/2 w-1 -translate-x-1/2 bg-amber-400"></div>

			<!-- ROW 1: Admin Staff (Left) & Support Staff/Utility (Right) -->
			<div class="relative mb-8 grid grid-cols-2 items-center gap-12">
				<!-- Horizontal branch connector Left -->
				<div class="absolute top-1/2 right-1/2 left-[38%] h-0.5 bg-amber-400"></div>
				<!-- Horizontal branch connector Right -->
				<div class="absolute top-1/2 right-[38%] left-1/2 h-0.5 bg-amber-400"></div>

				<!-- Admin Staff / Clerical Aide -->
				<div class="z-10 flex justify-end pr-4">
					<div
						class="w-72 rounded-xl border-2 border-amber-400 bg-white p-3.5 shadow-sm transition-all hover:border-blue-900 sm:w-80"
					>
						<div
							class="mb-1 border-b border-rose-100 pb-1 text-center text-xs font-black tracking-wide text-rose-700 uppercase"
						>
							Admin Staff / Clerical Aide
						</div>
						<ul class="text-xs text-slate-700">
							<li class="flex items-center gap-1.5">
								<span class="font-bold text-amber-600">•</span>
								<span><strong>Ivanajean P. Golar</strong></span>
							</li>
						</ul>
					</div>
				</div>

				<!-- Support Staff / Utility Worker -->
				<div class="z-10 flex justify-start pl-4">
					<div
						class="w-72 rounded-xl border-2 border-amber-400 bg-white p-3.5 shadow-sm transition-all hover:border-blue-900 sm:w-80"
					>
						<div
							class="mb-1 border-b border-rose-100 pb-1 text-center text-xs font-black tracking-wide text-rose-700 uppercase"
						>
							Support Staff / Utility Worker
						</div>
						<ul class="space-y-0.5 text-xs text-slate-700">
							<li>• <strong>Lea Parone</strong></li>
							<li>• <strong>Lorenzo Arandia</strong></li>
							<li>• <strong>Mariel Tiolo</strong> – Utility Worker</li>
							<li>• <strong>John Ray Arcena</strong> – Utility Worker</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- ROW 2: Ambulance Driver (Left) & PhilHealth (Right) -->
			<div class="relative grid grid-cols-2 items-center gap-12">
				<!-- Horizontal branch connector Left -->
				<div class="absolute top-1/2 right-1/2 left-[38%] h-0.5 bg-amber-400"></div>
				<!-- Horizontal branch connector Right -->
				<div class="absolute top-1/2 right-[38%] left-1/2 h-0.5 bg-amber-400"></div>

				<!-- Ambulance Driver -->
				<div class="z-10 flex justify-end pr-4">
					<div
						class="w-72 rounded-xl border-2 border-amber-400 bg-white p-3.5 shadow-sm transition-all hover:border-blue-900 sm:w-80"
					>
						<div
							class="mb-1 border-b border-rose-100 pb-1 text-center text-xs font-black tracking-wide text-rose-700 uppercase"
						>
							Ambulance Driver
						</div>
						<ul class="space-y-1 text-xs text-slate-700">
							<li class="flex items-center gap-1.5">
								<span class="font-bold text-amber-600">•</span>
								<span><strong>Antonio B. Modesto Jr.</strong> – Driver</span>
							</li>
							<li class="flex items-center gap-1.5">
								<span class="font-bold text-amber-600">•</span>
								<span><strong>Jhon Davis V. Cuayzon</strong> – Driver</span>
							</li>
						</ul>
					</div>
				</div>

				<!-- PhilHealth (CLICKABLE -> EMR/PhilHealth) -->
				<div class="z-10 flex justify-start pl-4">
					<button
						type="button"
						onclick={() => openModal('sanitation')}
						class="group w-72 cursor-pointer rounded-xl border-2 border-amber-400 bg-white p-3.5 text-left shadow-sm ring-offset-2 transition-all hover:border-blue-900 hover:shadow-md hover:ring-2 hover:ring-amber-400 sm:w-80"
						title="Click to view PhilHealth and EMR records team"
					>
						<div
							class="mb-1 flex items-center justify-between border-b border-rose-100 pb-1 text-xs font-black tracking-wide text-rose-700 uppercase"
						>
							<span>PhilHealth</span>
							<span
								class="text-[10px] font-bold text-amber-600 transition-transform group-hover:translate-x-0.5"
								>↗</span
							>
						</div>
						<ul class="space-y-0.5 text-xs text-slate-700">
							<li>• <strong>Rodel A. Buendia</strong> – Coordinator</li>
							<li>• <strong>Sherlyn Almaden</strong> – Staff</li>
							<li>• <strong>Irene Redoña</strong> – Staff</li>
							<li>• <strong>Joy Balmes</strong> – Staff</li>
						</ul>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- DETAILED PERSONNEL ROSTER POPUP / MODAL -->
{#if selectedModalKey && divisionDetails[selectedModalKey]}
	{@const details = divisionDetails[selectedModalKey]}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/80 p-4 backdrop-blur-sm transition-all duration-300 sm:p-6"
		onclick={closeModal}
		role="dialog"
		aria-modal="true"
	>
		<div
			class="animate-in fade-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border-4 border-amber-400 bg-white shadow-2xl duration-200"
			onclick={(e) => e.stopPropagation()}
			role="document"
		>
			<!-- Modal Header -->
			<div
				class="flex items-center justify-between border-b-2 border-amber-400 bg-gradient-to-r from-blue-950 to-slate-900 px-6 py-5 text-white"
			>
				<div>
					<div class="mb-1 text-[11px] font-black tracking-widest text-amber-400 uppercase">
						{details.tag}
					</div>
					<h3 class="text-xl leading-tight font-black text-white sm:text-2xl">
						{details.title}
					</h3>
				</div>
				<button
					type="button"
					onclick={closeModal}
					class="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-900/80 font-bold text-white shadow-sm transition-colors hover:bg-rose-600"
					aria-label="Close dialog"
				>
					✕
				</button>
			</div>

			<!-- Modal Body -->
			<div class="space-y-6 overflow-y-auto p-6 sm:p-8">
				<!-- Directive / Description Box -->
				<div class="flex items-start gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
					<span class="mt-1 h-3 w-3 shrink-0 rounded-full bg-amber-500"></span>
					<div>
						<div class="mb-0.5 text-xs font-black tracking-wider text-amber-900 uppercase">
							{details.badge}
						</div>
						<p class="text-xs leading-relaxed font-medium text-slate-700 sm:text-sm">
							{details.description}
						</p>
					</div>
				</div>

				<!-- Personnel Groups -->
				<div class="space-y-6">
					{#each details.groups as group}
						<div>
							<div class="mb-3 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
								<span class="h-2 w-2 rounded-full bg-blue-900"></span>
								<h4 class="text-sm font-black tracking-wider text-blue-950 uppercase">
									{group.groupName}
								</h4>
								<span
									class="ml-auto rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600"
								>
									{group.staff.length} Personnel
								</span>
							</div>

							<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
								{#each group.staff as member}
									<div
										class="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5 shadow-xs transition-all hover:border-amber-400 hover:bg-white"
									>
										<div class="mb-0.5 text-sm font-black text-blue-950">
											{member.name}
										</div>
										<div class="text-xs font-bold text-amber-700">
											{member.role}
										</div>
										<div class="mt-1 text-[11px] font-medium text-slate-500">
											{member.status}
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Modal Footer -->
			<div
				class="flex items-center justify-between border-t border-slate-200 bg-slate-100 px-6 py-4 text-xs font-medium text-slate-600"
			>
				<span>Municipal Health Office • Official CSC Roster</span>
				<button
					type="button"
					onclick={closeModal}
					class="rounded-xl bg-blue-950 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-blue-900"
				>
					Close Window
				</button>
			</div>
		</div>
	</div>
{/if}
