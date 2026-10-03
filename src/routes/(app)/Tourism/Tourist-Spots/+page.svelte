<script>
	import { onMount } from 'svelte';
	import {
		Compass,
		Waves,
		Church,
		Landmark,
		Building2,
		Trees,
		MapPin,
		Clock,
		Sparkles,
		Camera,
		Maximize2,
		X,
		ChevronLeft,
		ChevronRight,
		ArrowRight,
		Search,
		ShieldCheck,
		ExternalLink,
		SlidersHorizontal,
		PartyPopper
	} from 'lucide-svelte';

	// ── Curated Tourist Destinations Data ─────────────────────────────────
	const spots = [
		{
			id: 'tanauan-shoreline',
			number: '01',
			name: 'Tanauan Shoreline & Beaches',
			vibeBadge: 'Must-Visit Seaside Escape',
			tagline: 'Sun-drenched Pacific shores, gentle surf, and Eastern Visayas’ famed skimboarding haven',
			category: 'coastal',
			categoryLabel: 'Coastal & Nature',
			specificLocation: 'Coastal Boulevard, Barangays Bislig, San Roque & Sta. Cruz, Tanauan, Leyte 6501',
			locationDetails: 'Stretching along the historic Leyte Gulf, accessible via Bislig Beach Road and Calogcog Coastal Embankment. Home to welcoming beachfront cottage retreats including Hidden Beach Resort and Shaira’s Beach Resort.',
			mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tanauan+Beach+Bislig+Tanauan+Leyte',
			experience: 'Beach Recreation, Skimboarding & Sunset Dining',
			bestTime: 'Sunrise (5:30 AM – 7:00 AM) & Golden Hour (4:30 PM – 6:00 PM)',
			admission: 'Public Shoreline: Free · Private Resort Cottages Available',
			insiderTip: 'Arrive at sunrise in Barangay Bislig to catch local skimboard enthusiasts riding the shoreline waves against the golden dawn over Leyte Gulf.',
			description:
				'Where the calm waters of the Leyte Gulf meet powdery golden sands and rustling coconut palms. Tanauan’s coastal stretch is celebrated throughout Eastern Visayas as a cradle of skimboarding culture, family weekend cottage retreats, and tranquil seaside strolls. Whether you are swimming in gentle morning tides, sharing grilled seafood under native nipa huts, or photographing dramatic coastal twilights, Tanauan’s beaches embody the soothing magic of tropical island life.',
			highlights: [
				'Eastern Visayas birthplace and championship venue for coastal skimboarding culture',
				'Dotted with welcoming family-operated beach resorts including Hidden Beach Resort & Shaira’s Beach Resort',
				'Expansive open-air nipa cottages, seaside picnic pavilions, and fresh seafood grills',
				'Wide coastal promenade perfect for sunrise jogs, seaside cycling, and evening strolls'
			],
			primaryImage: '/tourist-spots-web/tanauan-shoreline/Tanauan_Leyte_Beach_4.webp',
			gallery: [
				{ src: '/tourist-spots-web/tanauan-shoreline/Tanauan_Leyte_Beach_4.webp', title: 'Golden Shoreline', caption: 'Gentle waves rolling onto the Tanauan coast during radiant morning light' },
				{ src: '/tourist-spots-web/tanauan-shoreline/Hidden_Beach_Resort.webp', title: 'Hidden Beach Resort', caption: 'Welcoming beachfront recreation area and cottage facilities in Bislig' },
				{ src: '/tourist-spots-web/tanauan-shoreline/Hidden_Beach_Resort_2.webp', title: 'Seaside Cottages', caption: 'Traditional open-air beach cottages shaded by native palms' },
				{ src: '/tourist-spots-web/tanauan-shoreline/Hidden_Beach_Resort_3.webp', title: 'Resort Pavilion', caption: 'Community event and seaside dining pavilions along the shore' },
				{ src: '/tourist-spots-web/tanauan-shoreline/Shaira_s_Beach_Resort.webp', title: "Shaira's Beach Resort", caption: 'Relaxing coastal accommodations along Tanauan shoreline' },
				{ src: '/tourist-spots-web/tanauan-shoreline/Tanauan_Leyte_Beach_Sta__Cruz.webp', title: 'Sta. Cruz Beachfront', caption: 'Serene natural coastline in Barangay Sta. Cruz' },
				{ src: '/tourist-spots-web/tanauan-shoreline/Tanauan_Leyte_Beach_Sta__Cruz_2.webp', title: 'Coastal Vista', caption: 'Pristine shoreline views stretching towards the Pacific horizon' }
			],
			accent: '#0d9488'
		},
		{
			id: 'parish-church',
			number: '02',
			name: 'Our Lady of the Assumption Parish Church',
			vibeBadge: 'Spiritual & Heritage Jewel',
			tagline: 'Four centuries of steadfast Catholic devotion, historic masonry, and Waray resilience',
			category: 'heritage',
			categoryLabel: 'Faith & Heritage',
			specificLocation: '4278+5XH, Asuncion, Tanauan, 6502 Leyte',
			locationDetails: 'Positioned right along Real Street in Barangay Asuncion, directly across from the Tanauan Public Plaza Promenade and 150m south of the Municipal Hall.',
			mapsUrl: 'https://www.google.com/maps/search/?api=1&query=4278%2B5XH%2C+Asuncion%2C+Tanauan%2C+6502+Leyte',
			experience: 'Cultural Pilgrimage, Spanish-Era Architecture & Prayer',
			bestTime: 'Daily Morning Services & Annual August 14–15 Patronal Feast',
			admission: 'Free & Open to All Devotees and Respectful Visitors',
			insiderTip: 'Step inside the church courtyard in the late afternoon to admire the intricate masonry work on the facade, then cross the street for sunset refreshments at the town plaza.',
			description:
				'Standing as the spiritual sanctuary and architectural crown of Tanauan, Our Lady of the Assumption Parish Church has anchored community faith for over 400 years. Originally founded during the Spanish colonial era, this majestic stone sanctuary has withstood typhoons, seismic tremors, and the tests of wartime history. With its dignified facade, soaring belfry, and tranquil landscaped courtyard, it serves as the sacred heart of the annual Pasaka Festival feast day.',
			highlights: [
				'Historic Spanish-colonial stone belfry and architectural sanctuary commanding the Poblacion skyline',
				'Sacred spiritual center of Tanauan’s patronal feast and grand Pasaka Festival each August',
				'Peaceful walled courtyard and prayer garden surrounded by mature heritage trees',
				'Must-visit pilgrimage landmark featured in Eastern Visayas faith-tourism itineraries'
			],
			primaryImage: '/tourist-spots-web/our-lady-of-the-assumption-parish-church/_MG_1665_JPG.webp',
			gallery: [
				{ src: '/tourist-spots-web/our-lady-of-the-assumption-parish-church/_MG_1665_JPG.webp', title: 'Church Facade & Belfry', caption: 'The distinguished stone and masonry exterior of the parish church' },
				{ src: '/tourist-spots-web/our-lady-of-the-assumption-parish-church/_MG_1668_JPG.webp', title: 'Historic Belfry Tower', caption: 'The bell tower rising gracefully above the Poblacion skyline' },
				{ src: '/tourist-spots-web/our-lady-of-the-assumption-parish-church/_MG_1672_JPG.webp', title: 'Parish Courtyard', caption: 'Serene plaza and open grounds fronting the church complex' }
			],
			accent: '#4f46e5'
		},
		{
			id: 'jaime-de-veyra-marker',
			number: '03',
			name: 'Jaime C. de Veyra Historical Marker',
			vibeBadge: 'National Historical Landmark',
			tagline: 'Honoring Tanauan’s native son, first Filipino Governor of Leyte, and father of the National Language',
			category: 'historical',
			categoryLabel: 'Historical Landmark',
			specificLocation: 'Tanauan Public Plaza Promenade (along Real Street), Barangay Poblacion, Tanauan, Leyte 6501',
			locationDetails: 'Situated within the manicured northern garden promenade of Tanauan Public Plaza, directly facing the town square behind the historic Presidencia / Municipal Hall.',
			mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tanauan+Public+Plaza+Promenade+along+Real+Street+Barangay+Poblacion+Tanauan+Leyte+6501',
			experience: 'Historical Discovery, Educational Tourism & Civic Tribute',
			bestTime: 'Daytime Visits (7:00 AM – 5:30 PM) for Guided Historical Walks',
			admission: 'Free Public Access (Located in Public Plaza Grounds)',
			insiderTip: 'Read the official bilingual NHCP marker bronze plaque mounted on the monument base to discover how this Tanauan native shaped the modern Filipino national language.',
			description:
				'Tanauan is the proud cradle of Don Jaime Carlos de Veyra (1873–1963)—one of the most eminent patriots, scholars, and public servants in Philippine history. This official Level II National Historical Commission of the Philippines (NHCP) marker and sculpted bronze bust commemorate de Veyra’s extraordinary contributions: serving as the first Filipino Governor of Leyte (1906), Philippine Resident Commissioner to the United States Congress (1917–1923), and the founding Director of the Institute of National Language (Surian ng Wikang Pambansa).',
			highlights: [
				'Official NHCP historical marker and distinguished bronze bust portrait unveiled to honor de Veyra’s legacy',
				'Celebrates his monumental role in institutionalizing Tagalog as the foundation of the Filipino national language',
				'Nestled among landscaped garden beds and shaded walkways in the Tanauan Public Plaza',
				'An essential stop for cultural heritage scholars, students, and history enthusiasts touring Leyte'
			],
			primaryImage: '/tourist-spots-web/jaime-c-de-veyra-historical-marker/photo_2026-09-15_10-53-04.webp',
			gallery: [
				{ src: '/tourist-spots-web/jaime-c-de-veyra-historical-marker/photo_2026-09-15_10-53-04.webp', title: 'Official NHCP Marker Plaque', caption: 'Official historical narrative plaque honoring Don Jaime C. de Veyra' },
				{ src: '/tourist-spots-web/jaime-c-de-veyra-historical-marker/photo_2026-09-15_10-53-00.webp', title: 'Commemorative Monument', caption: 'Full view of the monument within the public plaza landscaped setting' },
				{ src: '/tourist-spots-web/jaime-c-de-veyra-historical-marker/photo_2026-09-15_10-53-02.webp', title: 'Sculpted Bronze Bust', caption: 'Sculpted likeness of the revered statesman, linguist, and historian' },
				{ src: '/tourist-spots-web/jaime-c-de-veyra-historical-marker/photo_2026-09-15_10-53-05.webp', title: 'Garden Plaza Setting', caption: 'Manicured civic surroundings reflecting historical reverence' },
				{ src: '/tourist-spots-web/jaime-c-de-veyra-historical-marker/photo_2026-09-15_10-53-06.webp', title: 'Monument Pedestal Detail', caption: 'Close-up perspective of the granite memorial pedestal' }
			],
			accent: '#b45309'
		},
		{
			id: 'surge-of-hope',
			number: '04',
			name: 'Surge of Hope Monument',
			vibeBadge: 'Poignant Coastal Memorial',
			tagline: 'A breathtaking coastal sculpture celebrating unyielding resilience, global solidarity, and rebirth',
			category: 'historical',
			categoryLabel: 'Memorial & Monument',
			specificLocation: 'Coastal Embankment Promenade, Barangay Calogcog / Bislig, Tanauan, Leyte 6501',
			locationDetails: 'Perched prominently along the newly developed coastal protection boulevard and seawall promenade in Barangay Calogcog, overlooking the expansive waters of Leyte Gulf.',
			mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Surge+of+Hope+Monument+Tanauan+Leyte',
			experience: 'Memorial Reflection, Panoramic Ocean Views & Sunset Photography',
			bestTime: 'Late Afternoon (4:45 PM – 6:15 PM) for Sunset Reflections',
			admission: 'Free Public Access · Open 24/7',
			insiderTip: 'Visit around 5:15 PM when the sun dips behind the mountains, casting brilliant amber and violet light through the soaring curves of the wave sculpture.',
			description:
				'Rising boldly against the horizon of the Leyte Gulf, the Surge of Hope monument is Tanauan’s most stirring civic memorial. Built in sacred remembrance of the lives lost during Super Typhoon Yolanda (Haiyan) and in gratitude for the global outpouring of compassion, its soaring sculptural wave captures the journey from profound heartbreak to triumphant resurrection. It stands as an eternal tribute to the courage, solidarity, and indomitable spirit of the Waray people.',
			highlights: [
				'Iconic wave-like architectural sculpture symbolizing courage rising above the storm surge',
				'Panoramic oceanfront promenade with unobstructed vantage points across the historic Leyte Gulf',
				'Sacred gathering site for the solemn annual November 8 candlelight remembrance ceremony',
				'Inspiring testament to international recovery partnerships and Tanauan’s remarkable revival'
			],
			primaryImage: '/tourist-spots-web/surge-of-hope/_MG_1716_JPG.webp',
			gallery: [
				{ src: '/tourist-spots-web/surge-of-hope/_MG_1716_JPG.webp', title: 'Surge of Hope Against Sea & Sky', caption: 'Monumental wave sculpture looking out towards the waters of the Leyte Gulf' },
				{ src: '/tourist-spots-web/surge-of-hope/_MG_1706_JPG.webp', title: 'Sculptural Wave Base', caption: 'Artistic wave contours reflecting the surge and the rising spirit' },
				{ src: '/tourist-spots-web/surge-of-hope/_MG_1707_JPG.webp', title: 'Memorial Plaza Overlook', caption: 'Wide perspective of the seaside memorial and public viewing terrace' },
				{ src: '/tourist-spots-web/surge-of-hope/_MG_1717_JPG.webp', title: 'Horizon Perspective', caption: 'Dramatic framing of the Leyte Gulf through the memorial structure' },
				{ src: '/tourist-spots-web/surge-of-hope/_MG_1719_JPG.webp', title: 'Monument Architecture', caption: 'Clean structural lines crafted to withstand coastal elements' },
				{ src: '/tourist-spots-web/surge-of-hope/_MG_1724_JPG.webp', title: 'Coastal Walkway', caption: 'Paved shoreline promenade popular with visitors and evening strollers' },
				{ src: '/tourist-spots-web/surge-of-hope/_MG_1726_JPG.webp', title: 'Sunset Glow', caption: 'Warm golden light bathing the monument during twilight' }
			],
			accent: '#0284c7'
		},
		{
			id: 'haiyan-hotel-and-resort',
			number: '05',
			name: 'Haiyan Hotel and Resort',
			vibeBadge: 'Premier Leisure & Staycation',
			tagline: 'Modern comforts, refreshing swimming pools, and signature Leyteño hospitality',
			category: 'hospitality',
			categoryLabel: 'Hospitality & Leisure',
			specificLocation: 'Maharlika Highway (Pan-Philippine Hwy), Barangay Bislig, Tanauan, Leyte 6501',
			locationDetails: 'Situated directly along the main national transit corridor connecting Tacloban City (18 km north) and Dulag, just 3 minutes from the Tanauan town center and Poblacion.',
			mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Haiyan+Hotel+and+Resort+Tanauan+Leyte',
			experience: 'Hotel Accommodations, Poolside Relaxation, Dining & Events',
			bestTime: 'Year-Round Stays, Weekend Family Gateways & Private Functions',
			admission: 'Room Bookings & Pool Day Pass Rates Available at Front Desk',
			insiderTip: 'An ideal base camp for travelers exploring Leyte—spend your afternoon touring Poblacion heritage sites and cool off in Haiyan Hotel’s pool by evening.',
			description:
				'Experience premier comfort and welcoming Leyte hospitality at Haiyan Hotel and Resort. Designed for vacationing families, business delegates, and celebratory gatherings, this full-service property features well-appointed guestrooms, an inviting tropical outdoor swimming pool, and banquet convention halls. Combining peaceful suburban ambiance with immediate access to Tanauan’s key tourist attractions, it is the municipal anchor of local tourism hospitality.',
			highlights: [
				'Contemporary air-conditioned rooms and suites with private balconies and modern amenities',
				'Sparkling outdoor swimming pool bordered by sun loungers and tropical landscape gardens',
				'Spacious multi-purpose banquet hall hosting conferences, weddings, and municipal gatherings',
				'Prime location along Maharlika Highway with generous secured parking and 24/7 guest service'
			],
			primaryImage: '/tourist-spots-web/haiyan-hotel-and-resort/_MG_3033_JPG.webp',
			gallery: [
				{ src: '/tourist-spots-web/haiyan-hotel-and-resort/_MG_3033_JPG.webp', title: 'Resort Facade & Entrance', caption: 'Welcoming front entrance and porte-cochere of Haiyan Hotel and Resort' },
				{ src: '/tourist-spots-web/haiyan-hotel-and-resort/_MG_3034_JPG.webp', title: 'Hotel Grounds & Driveway', caption: 'Spacious landscaped arrival driveway and guest parking area' },
				{ src: '/tourist-spots-web/haiyan-hotel-and-resort/_MG_3035_JPG.webp', title: 'Accommodation Wing', caption: 'Multi-level accommodation wings featuring modern balcony architecture' },
				{ src: '/tourist-spots-web/haiyan-hotel-and-resort/_MG_3037_JPG.webp', title: 'Tropical Landscaping', caption: 'Lush greenery and ornamental palms bordering the hotel grounds' },
				{ src: '/tourist-spots-web/haiyan-hotel-and-resort/_MG_3038_JPG.webp', title: 'Courtyard & Leisure Area', caption: 'Open-air courtyard ideal for morning coffee and evening gatherings' },
				{ src: '/tourist-spots-web/haiyan-hotel-and-resort/_MG_3039_JPG.webp', title: 'Architectural View', caption: 'Clean structural aesthetics reflecting modern hospitality standards' }
			],
			accent: '#059669'
		},
		{
			id: 'tanauan-public-plaza',
			number: '06',
			name: 'Tanauan Public Plaza & Freedom Park',
			vibeBadge: 'Heartbeat of Community Life',
			tagline: 'Ancient shade canopies, the iconic central pavilion, and lively evening gatherings',
			category: 'civic',
			categoryLabel: 'Civic & Parks',
			specificLocation: 'Tanauan Public Plaza Promenade (along Real Street), Barangay Poblacion, Tanauan, Leyte 6501',
			locationDetails: 'Tanauan’s central civic town square promenade along Real Street, bordered by the Municipal Hall / Presidencia to the north and the parish grounds.',
			mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tanauan+Public+Plaza+Promenade+along+Real+Street+Barangay+Poblacion+Tanauan+Leyte+6501',
			experience: 'Leisure Strolls, Street Snacks, Community Concerts & People-Watching',
			bestTime: 'Late Afternoon into Evening (4:00 PM – 9:00 PM) for Community Buzz',
			admission: 'Free Public Park · Open Daily 24/7',
			insiderTip: 'Visit between 5:00 PM and 7:00 PM when the plaza fills with local families and food carts—enjoy warm Waray street food under illuminated heritage trees.',
			description:
				'Feel the vibrant heartbeat of Tanauan at the historic Public Plaza and Freedom Park. Shaded by ancient canopy trees and crisscrossed with paved promenades, this beloved civic green is where generations of Tanauanons connect. Featuring an iconic central bandstand pavilion, landscaped floral gardens, and peaceful seating areas, the plaza comes alive each day with student groups, morning joggers, festive bazaars, and musical assemblies.',
			highlights: [
				'Iconic covered bandstand pavilion hosting live musical performances, civic assemblies, and fiesta dances',
				'Wide pedestrian walkways shaded by mature acacia and mahogany trees with ambient night lights',
				'Directly integrates the Jaime C. de Veyra Historical Marker and the “I Love Tanauan” sign',
				'Vibrant epicenter for Christmas light festivals, fiesta food fairs, and Pasaka street-dancing rehearsals'
			],
			primaryImage: '/tourist-spots-web/tanauan-leyte-public-plaza-freedom-park/_MG_1657_JPG.webp',
			gallery: [
				{ src: '/tourist-spots-web/tanauan-leyte-public-plaza-freedom-park/_MG_1657_JPG.webp', title: 'Freedom Park Greenery', caption: 'Vibrant green lawns, pedestrian paths, and canopy trees in the town plaza' },
				{ src: '/tourist-spots-web/tanauan-leyte-public-plaza-freedom-park/_MG_1660_JPG.webp', title: 'Plaza Pavilion & Promenade', caption: 'Covered central gathering space and civic assembly grounds' },
				{ src: '/tourist-spots-web/tanauan-leyte-public-plaza-freedom-park/_MG_1661_JPG.webp', title: 'Heritage Trees & Pathways', caption: 'Mature shade trees providing a cool, welcoming retreat in the center of town' }
			],
			accent: '#15803d'
		},
		{
			id: 'i-love-tanauan-marker',
			number: '07',
			name: 'I Love Tanauan Landmark',
			vibeBadge: 'Top Souvenir Photo Destination',
			tagline: 'Vibrant typography, tourism color tiles, and the premier must-visit travel snapshot spot',
			category: 'civic',
			categoryLabel: 'Landmark & Photo Spot',
			specificLocation: 'Tanauan Public Plaza Promenade (along Real Street), Barangay Poblacion, Tanauan, Leyte 6501',
			locationDetails: 'Positioned on the front landscaped garden lawn of the Tanauan Public Plaza Promenade facing Real Street, right at the main pedestrian entrance of the town square.',
			mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tanauan+Public+Plaza+Promenade+along+Real+Street+Barangay+Poblacion+Tanauan+Leyte+6501',
			experience: 'Souvenir Photography, Civic Pride & Social Media Check-Ins',
			bestTime: 'Daylight for Vibrant Colors (9:00 AM – 4:00 PM) or Illuminated at Night',
			admission: 'Free Public Access · Open 24/7',
			insiderTip: 'Take a medium-wide photo from the paved plaza pathway to capture the colorful patterned letters, the heart emblem, and the surrounding green foliage in a single frame.',
			description:
				'No journey to Tanauan is complete without capturing your keepsake photograph at the colorful “I Love Tanauan” landmark. Generously donated by Mayor Gina Merilo and her family as an expression of enduring civic affection, this bold three-dimensional typographical installation features bright tourism color mosaic patterns, a sculptural heart, and the embossed Municipal Seal of Tanauan. It is the town’s undisputed #1 photo destination for tourists and proud residents alike.',
			highlights: [
				'Bold three-dimensional typographic sculpture adorned with Philippine tourism color patterns',
				'Embossed with the official Municipal Seal of Tanauan, Leyte',
				'Tanauan’s most photographed, shared, and geo-tagged travel milestone on social media',
				'Situated on manicured floral lawns with bright evening illumination for night photos'
			],
			primaryImage: '/tourist-spots-web/i-love-tanauan-marker/_MG_1758_JPG.webp',
			gallery: [
				{ src: '/tourist-spots-web/i-love-tanauan-marker/_MG_1758_JPG.webp', title: 'I Love Tanauan Monument', caption: 'Full front perspective of the vibrant civic letters and heart sculpture' },
				{ src: '/tourist-spots-web/i-love-tanauan-marker/_MG_1759_JPG.webp', title: 'Plaza Landmark Setting', caption: 'The letters positioned proudly against the open plaza backdrop' },
				{ src: '/tourist-spots-web/i-love-tanauan-marker/_MG_1762_JPG.webp', title: 'Golden Afternoon View', caption: 'Sunlight highlighting the colorful pattern-filled letter design' },
				{ src: '/tourist-spots-web/i-love-tanauan-marker/_MG_1765_JPG.webp', title: 'Plaza Gardens Frame', caption: 'Landscaped floral beds framing the popular civic photo destination' },
				{ src: '/tourist-spots-web/i-love-tanauan-marker/_MG_1769_JPG.webp', title: 'Angle Perspective', caption: 'Dynamic view showcasing the depth and craftsmanship of the installation' }
			],
			accent: '#e11d48'
		},
		{
			id: 'tanauan-municipal-hall',
			number: '08',
			name: 'Tanauan Municipal Hall & Historic Presidencia',
			vibeBadge: 'Neoclassical Civic Landmark',
			tagline: 'The stately seat of municipal governance, heritage columns, and civic pride',
			category: 'civic',
			categoryLabel: 'Civic Architecture',
			specificLocation: 'Real Street, Barangay Poblacion, Tanauan, Leyte 6501',
			locationDetails: 'Located immediately adjacent to the northern border of Tanauan Public Plaza, opposite the Tanauan Police Station and a short 1-minute walk from Our Lady of the Assumption Parish Church.',
			mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tanauan+Municipal+Hall+Tanauan+Leyte',
			experience: 'Heritage Architecture Appreciation & Municipal Tourism Assistance',
			bestTime: 'Regular Office Hours (Mon–Fri, 8:00 AM – 5:00 PM) for Tourism Inquiries',
			admission: 'Free Public Access (Government Grounds)',
			insiderTip: 'Drop by the Municipal Tourism Office located on the ground floor to pick up official town maps and get personalized guidance on local attractions.',
			description:
				'A stately testament to public leadership and civic heritage, the Tanauan Municipal Hall complex is anchored by the historic Presidencia building. Featuring dignified classical columns, a balanced pediment portico, and restored neoclassical detailing, this civic beacon houses the executive offices, council chambers, and public service centers of the municipality. The open ceremonial courtyard hosts weekly flag raisings, holiday commemorations, and civic celebrations.',
			highlights: [
				'Restored neoclassical Presidencia facade reflecting early-20th-century Philippine civic architecture',
				'Central headquarters of the Municipal Tourism Office, ready to welcome visitors and researchers',
				'Expansive paved ceremonial courtyard fronting the town’s primary administrative offices',
				'Centrally positioned within the walkable Poblacion heritage and civic district'
			],
			primaryImage: '/tourist-spots-web/tanauan-municipal-hall/Tanauan_Presidencia.webp',
			gallery: [
				{ src: '/tourist-spots-web/tanauan-municipal-hall/Tanauan_Presidencia.webp', title: 'Historic Presidencia Facade', caption: 'The iconic Presidencia building with classical pediment and portico' },
				{ src: '/tourist-spots-web/tanauan-municipal-hall/Front_of_Tanauan_Municipal_Hall.webp', title: 'Municipal Hall Complex', caption: 'Main civic administrative building fronting the municipal grounds' },
				{ src: '/tourist-spots-web/tanauan-municipal-hall/Tanauan_Presidencia_.webp', title: 'Architectural Details', caption: 'Fine architectural craftsmanship on the restored Presidencia structure' }
			],
			accent: '#1e40af'
		},
		{
			id: 'heart-handshape-marker',
			number: '09',
			name: 'Heart Handshape Marker',
			vibeBadge: 'Enchanting Coastal Icon',
			tagline: 'Two sculpted hands framing the Pacific horizon in an unforgettable celebration of love',
			category: 'civic',
			categoryLabel: 'Landmark & Photo Spot',
			specificLocation: 'Tanauan Public Plaza Promenade (along Real Street), Barangay Poblacion, Tanauan, Leyte 6501',
			locationDetails: 'Installed along the Tanauan Public Plaza Promenade on Real Street, framing the open sky and lush civic gardens in a touching symbol of love for the community.',
			mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tanauan+Public+Plaza+Promenade+along+Real+Street+Barangay+Poblacion+Tanauan+Leyte+6501',
			experience: 'Creative Photography, Sunrise Viewing & Coastal Romance',
			bestTime: 'Golden Sunrise (5:30 AM – 6:45 AM) & Late Afternoon Twilight',
			admission: 'Free Public Access · Open 24/7',
			insiderTip: 'Stand slightly back and align your camera so that the morning sunrise or the ocean horizon is centered precisely inside the open heart formed by the sculpted hands.',
			description:
				'Framing the boundless blue horizon of the Leyte Gulf, the Heart Handshape Marker is one of Tanauan’s most charming and romantic coastal landmarks. Crafted in the likeness of two white hands joining together to shape an open heart window over the sea, this touching sculpture bears the Waray inscription: “Simbolo han GUGMA han pamilya Merilo, donasyon ni Mayor Gina E. Merilo.” It has become an instant sensation for couples, families, and solo travelers wanting to frame the sea in love.',
			highlights: [
				'Interactive sculptural hands creating an open heart window overlooking the Leyte Gulf',
				'Exceptional photo composition framing either the morning sunrise or distant ocean waves',
				'Located along the refreshing, paved seawall promenade with continuous ocean breezes',
				'Heartwarming symbol of municipal dedication, unity, and genuine Waray affection'
			],
			primaryImage: '/tourist-spots-web/heart-handshape-marker/_MG_1777_JPG.webp',
			gallery: [
				{ src: '/tourist-spots-web/heart-handshape-marker/_MG_1777_JPG.webp', title: 'Heart Handshape by the Sea', caption: 'The white sculptural hands forming a heart against the Leyte Gulf sky' },
				{ src: '/tourist-spots-web/heart-handshape-marker/_MG_1778_JPG.webp', title: 'Ocean Framed in Love', caption: 'Viewing the blue horizon and coastal waters through the heart opening' },
				{ src: '/tourist-spots-web/heart-handshape-marker/_MG_1779_JPG.webp', title: 'Seaside Embankment Setting', caption: 'The monument situated directly along the protective sea wall promenade' },
				{ src: '/tourist-spots-web/heart-handshape-marker/_MG_1780_JPG.webp', title: 'Coastal Perspective', caption: 'Sweeping coastal coastline visible behind the artistic sculpture' },
				{ src: '/tourist-spots-web/heart-handshape-marker/_MG_1782_JPG.webp', title: 'Promenade Pathway', caption: 'Paved seaside walkway welcoming evening visitors and romantic strolls' },
				{ src: '/tourist-spots-web/heart-handshape-marker/_MG_1784_JPG.webp', title: 'Sunset Silhouette', caption: 'The sculpture silhouetted against the radiant afternoon sun' },
				{ src: '/tourist-spots-web/heart-handshape-marker/_MG_1787_JPG.webp', title: 'Photo-Op Perspective', caption: 'Frontal composition perfect for keepsake visitor travel photos' }
			],
			accent: '#be185d'
		},
		{
			id: 'pasaka-festival',
			number: '10',
			name: 'Pasaka Festival',
			vibeBadge: 'Crown Jewel Cultural Festival',
			tagline: 'Leyte’s grandest August spectacle—an explosion of vibrant street dance, thundering drums, and thanksgiving',
			category: 'heritage',
			categoryLabel: 'Cultural Festival',
			specificLocation: 'Tanauan Civic Center, Public Plaza & Major Poblacion Streets, Tanauan, Leyte 6501',
			locationDetails: 'Grand street dancing parade winds through Real Street (National Highway) and Poblacion avenues, culminating in the magnificent Grand Ritual Showdown at the Tanauan Civic Center and Freedom Park.',
			mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tanauan+Civic+Center+Tanauan+Leyte',
			experience: 'Live Street Dancing, Fluvial Processions, Drumlines & Town Fiesta Feasting',
			bestTime: 'Annual Celebration Every August 14 (Feast Day of Our Lady of the Assumption)',
			admission: 'Free Public Spectacle across the Municipality',
			insiderTip: 'Book your accommodations weeks in advance for August 13–15; secure a grandstand seat at the Tanauan Civic Center by 1:00 PM on August 14 for the main competition showdown.',
			description:
				'Every August 14, Tanauan bursts into radiant color, thundering percussion, and contagious joy during the Pasaka Festival—the municipality’s grandest annual socio-cultural and religious celebration. Derived from the Waray word meaning “to invite health, fortune, and progress into one’s home,” Pasaka is a vibrant thanksgiving to patroness Nuestra Señora de la Asunción. Featuring hundreds of costumed street dancers, dynamic brass bands, and deep Waray hospitality, it is an essential cultural immersion for every traveler in the Philippines.',
			highlights: [
				'Spectacular street dance parade and grand ritual showdown featuring passionate barangay contingents',
				'Intricate hand-crafted costumes and choreography honoring agriculture, coastal fishing, and Waray folklore',
				'Solemn pontifical mass and grand Marian procession uniting thousands of devotees across the province',
				'Municipality-wide fiesta feasting with open-door Waray hospitality, native lechon, and musical festivities'
			],
			primaryImage: null,
			gallery: [],
			accent: '#d97706',
			hasLink: true,
			linkHref: '/Tourism/Pasaka Festival'
		}
	];

	// Hero featured spots for the showcase slider
	const heroSpots = [
		{
			id: 'surge-of-hope',
			img: '/tourist-spots-web/surge-of-hope/_MG_1716_JPG.webp',
			label: 'Surge of Hope Monument',
			category: 'Memorial & Monument',
			subtitle: 'A dramatic coastal testament to courage and rebirth along the Leyte Gulf'
		},
		{
			id: 'parish-church',
			img: '/tourist-spots-web/our-lady-of-the-assumption-parish-church/_MG_1665_JPG.webp',
			label: 'Our Lady of the Assumption Parish',
			category: 'Faith & Heritage',
			subtitle: '400-year-old stone sanctuary and historic belfry in the heart of Poblacion'
		},
		{
			id: 'tanauan-shoreline',
			img: '/tourist-spots-web/tanauan-shoreline/Tanauan_Leyte_Beach_4.webp',
			label: 'Tanauan Shoreline & Beaches',
			category: 'Coastal & Nature',
			subtitle: 'Golden morning surf, seaside cottages, and Eastern Visayas skimboarding haven'
		},
		{
			id: 'haiyan-hotel-and-resort',
			img: '/tourist-spots-web/haiyan-hotel-and-resort/_MG_3033_JPG.webp',
			label: 'Haiyan Hotel and Resort',
			category: 'Hospitality & Leisure',
			subtitle: 'Premier accommodations, refreshing tropical pool, and signature Leyteño hospitality'
		},
		{
			id: 'heart-handshape-marker',
			img: '/tourist-spots-web/heart-handshape-marker/_MG_1777_JPG.webp',
			label: 'Heart Handshape Marker',
			category: 'Landmark & Photo Spot',
			subtitle: 'Two sculpted hands framing the Pacific sunrise in a celebration of communal love'
		},
		{
			id: 'i-love-tanauan-marker',
			img: '/tourist-spots-web/i-love-tanauan-marker/_MG_1758_JPG.webp',
			label: 'I Love Tanauan Landmark',
			category: 'Civic Pride Landmark',
			subtitle: 'Vibrant tourism color tiles and the town’s most beloved souvenir photo destination'
		}
	];

	function nextHeroSlide() {
		activeHeroSlide = (activeHeroSlide + 1) % heroSpots.length;
	}

	function prevHeroSlide() {
		activeHeroSlide = (activeHeroSlide - 1 + heroSpots.length) % heroSpots.length;
	}

	// Filter Categories
	const categories = [
		{ id: 'all', label: 'All 10 Destinations', icon: Compass },
		{ id: 'coastal', label: 'Coastal & Nature', icon: Waves },
		{ id: 'heritage', label: 'Faith & Heritage', icon: Church },
		{ id: 'historical', label: 'Monuments & History', icon: Landmark },
		{ id: 'civic', label: 'Civic & Parks', icon: Trees },
		{ id: 'hospitality', label: 'Hospitality & Leisure', icon: Building2 }
	];

	// ── State ────────────────────────────────────────────────────────────
	let activeCategory = 'all';
	let searchQuery = '';
	let activeImageMap = {};
	let lightboxOpen = false;
	let currentLightboxSpot = null;
	let currentLightboxIndex = 0;
	let gsapInstance = null;
	let activeHeroSlide = 0;
	let heroInterval;

	// Initialize active image map
	spots.forEach((spot) => {
		activeImageMap[spot.id] = 0;
	});

	$: filteredSpots = spots.filter((spot) => {
		const matchesCat = activeCategory === 'all' || spot.category === activeCategory;
		const query = searchQuery.trim().toLowerCase();
		const matchesSearch =
			!query ||
			spot.name.toLowerCase().includes(query) ||
			spot.tagline.toLowerCase().includes(query) ||
			spot.specificLocation.toLowerCase().includes(query) ||
			spot.locationDetails.toLowerCase().includes(query) ||
			spot.categoryLabel.toLowerCase().includes(query) ||
			spot.vibeBadge.toLowerCase().includes(query);
		return matchesCat && matchesSearch;
	});

	function setActiveThumbnail(spotId, index) {
		activeImageMap[spotId] = index;
		activeImageMap = { ...activeImageMap };
	}

	function openLightbox(spot, index = 0) {
		if (!spot.gallery || spot.gallery.length === 0) return;
		currentLightboxSpot = spot;
		currentLightboxIndex = index;
		lightboxOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeLightbox() {
		lightboxOpen = false;
		currentLightboxSpot = null;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function nextLightboxImage() {
		if (!currentLightboxSpot) return;
		currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxSpot.gallery.length;
	}

	function prevLightboxImage() {
		if (!currentLightboxSpot) return;
		currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxSpot.gallery.length) % currentLightboxSpot.gallery.length;
	}

	function handleKeydown(e) {
		if (!lightboxOpen) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') nextLightboxImage();
		if (e.key === 'ArrowLeft') prevLightboxImage();
	}

	function handleFilterChange(catId) {
		activeCategory = catId;
		if (typeof window !== 'undefined' && gsapInstance) {
			setTimeout(() => {
				gsapInstance.fromTo(
					'.destination-card',
					{ opacity: 0, y: 30 },
					{ opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
				);
			}, 30);
		}
	}

	function scrollToSection(id) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	// ── Lifecycle ────────────────────────────────────────────────────────
	onMount(async () => {
		// Hero slideshow
		heroInterval = setInterval(() => {
			activeHeroSlide = (activeHeroSlide + 1) % heroSpots.length;
		}, 4500);

		try {
			const gsapModule = await import('gsap');
			const gsap = gsapModule.default || gsapModule;
			const stModule = await import('gsap/ScrollTrigger');
			const ScrollTrigger = stModule.default || stModule.ScrollTrigger;
			gsap.registerPlugin(ScrollTrigger);
			gsapInstance = gsap;

			// Hero animations
			gsap.from('.hero-left-content', { opacity: 0, x: -30, duration: 0.8, ease: 'power3.out' });
			gsap.from('.hero-showcase', { opacity: 0, x: 30, duration: 0.8, delay: 0.1, ease: 'power3.out' });

			// Cards scroll reveal
			const cards = document.querySelectorAll('.destination-card');
			cards.forEach((card) => {
				gsap.from(card, {
					opacity: 0,
					y: 35,
					duration: 0.7,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: card,
						start: 'top 85%'
					}
				});
			});
		} catch (err) {
			console.warn('GSAP animations initialized with fallback:', err);
		}

		return () => {
			if (heroInterval) clearInterval(heroInterval);
		};
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
	<title>Tourist Spots & Destinations | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Experience the finest tourist spots in Tanauan, Leyte. From sun-kissed Leyte Gulf beaches and historic Spanish-era stone sanctuaries to the iconic Jaime C. de Veyra Marker, Surge of Hope, vibrant public plazas, and the grand Pasaka Festival."
	/>
</svelte:head>

<div class="min-h-screen bg-stone-50 font-sans text-slate-800 antialiased selection:bg-teal-500 selection:text-white">

	<!-- ══════════════════════════════════════════════════════════════════════
	     REVAMPED HERO: EDITORIAL TOURISM SHOWCASE (NO DUPLICATE NAVBAR)
	══════════════════════════════════════════════════════════════════════ -->
	<header class="hero-container relative overflow-hidden bg-gradient-to-b from-teal-50/50 via-sky-50/25 to-stone-100 text-slate-800">

		<!-- Background: Soft Sunlit Coastal Ambience & Faded Ambient Slideshow -->
		<div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
			{#each heroSpots as hs, idx}
				<div
					class="absolute inset-0 bg-cover bg-center transition-opacity duration-[1800ms] ease-in-out"
					style="background-image: url('{hs.img}'); opacity: {activeHeroSlide === idx ? 0.12 : 0}; filter: blur(5px);"
				></div>
			{/each}
			<!-- Luminous Coastal Gradient Overlays -->
			<div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-teal-50/70"></div>
			<div class="absolute -top-32 -left-20 h-[480px] w-[480px] rounded-full bg-teal-200/30 blur-3xl"></div>
			<div class="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl"></div>
			<div class="absolute -bottom-24 right-10 h-[420px] w-[420px] rounded-full bg-sky-200/30 blur-3xl"></div>
		</div>

		<!-- Main Hero Content -->
		<div class="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
			<div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">

				<!-- LEFT: Editorial Content -->
				<div class="hero-left-content lg:col-span-6 xl:col-span-6">
					<!-- Official Tourism Office Card Chip with prominent logo -->
					<div class="mb-6 inline-flex flex-wrap items-center gap-3.5 rounded-2xl border border-teal-200/80 bg-white/95 p-2.5 pr-5 shadow-xs backdrop-blur-md">
						<img src="/tourist-spots-web/tourism_logo.png" alt="Municipal Tourism Office Seal" class="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-contain drop-shadow-sm ring-1 ring-teal-100" />
						<div class="flex flex-col">
							<div class="flex items-center gap-2">
								<span class="text-xs font-bold tracking-wider text-teal-900 uppercase sm:text-sm">Municipal Tourism Office</span>
								<span class="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700 border border-teal-200/60">Official</span>
							</div>
							<div class="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-0.5">
								<span class="text-amber-700 font-semibold">10 Curated Destinations</span>
								<span class="text-stone-300">·</span>
								<span>Municipality of Tanauan, Leyte</span>
							</div>
						</div>
						<div class="ml-auto hidden sm:flex items-center pl-3 border-l border-stone-200">
							<img src="/tourist-spots-web/love_ph.png" alt="Love The Philippines" class="h-6 w-auto object-contain" />
						</div>
					</div>

					<!-- Main Headline (Balanced Typography, No Dangling 'OF') -->
					<h1 class="font-serif text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] leading-[1.12]">
						Discover the Heart & Heritage of <br class="hidden sm:inline" />
						<span class="font-serif italic font-semibold text-teal-700 underline decoration-amber-400/50 decoration-wavy decoration-2 underline-offset-8">
							Tanauan
						</span>, Leyte
					</h1>

					<!-- Persuasive Travel Lead -->
					<p class="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base font-normal">
						Where gentle Pacific tides meet four centuries of sacred stone faith, triumphant coastal memorials, tree-canopied civic plazas, and the thunderous joy of the Pasaka Festival. Step into Eastern Visayas' most welcoming sanctuary.
					</p>

					<!-- Action CTAs -->
					<div class="mt-8 flex flex-wrap items-center gap-3.5">
						<button
							on:click={() => scrollToSection('destinations-grid')}
							class="group inline-flex items-center space-x-2.5 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-teal-700/35 active:scale-[0.98]"
						>
							<span>Explore All 10 Spots</span>
							<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</button>
						<a
							href="/Tourism/Pasaka Festival"
							class="inline-flex items-center space-x-2 rounded-xl border border-amber-300 bg-amber-50/90 px-5 py-3.5 text-sm font-semibold text-amber-900 shadow-xs transition-all hover:bg-amber-100 hover:border-amber-400 active:scale-[0.98]"
						>
							<span>Pasaka Festival</span>
						</a>
					</div>

					<!-- Quick Slide Switcher & Tracker -->
					<div class="mt-8 flex items-center justify-between border-t border-stone-200/80 pt-4">
						<div class="flex items-center space-x-3">
							<span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Showcasing</span>
							<span class="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse"></span>
							<button
								on:click={() => scrollToSection(heroSpots[activeHeroSlide].id)}
								class="text-xs font-semibold text-teal-800 transition hover:text-teal-950 underline decoration-teal-400/40 underline-offset-4"
							>
								{heroSpots[activeHeroSlide].label}
							</button>
						</div>

						<!-- Slide Progress Dots -->
						<div class="flex items-center space-x-1.5">
							{#each heroSpots as _, idx}
								<button
									on:click={() => (activeHeroSlide = idx)}
									class="h-1.5 rounded-full transition-all duration-500 {activeHeroSlide === idx ? 'w-7 bg-teal-600' : 'w-2.5 bg-stone-300 hover:bg-teal-400'}"
									aria-label="Go to slide {idx + 1}"
								></button>
							{/each}
						</div>
					</div>
				</div>

				<!-- RIGHT: Hero Visual Showcase (Magazine Stage Card + Interactive Controls) -->
				<div class="hero-showcase lg:col-span-6 xl:col-span-6">
					<div class="relative overflow-hidden rounded-3xl border-4 border-white bg-stone-100 shadow-2xl shadow-teal-950/15">
						<!-- Aspect ratio image stage -->
						<div class="aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden relative">
							{#each heroSpots as hs, idx}
								<img
									src={hs.img}
									alt={hs.label}
									class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out {activeHeroSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}"
								/>
							{/each}
						</div>

						<!-- Ambient Gradient Overlay -->
						<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>

						<!-- Top Floating Controls -->
						<div class="absolute top-4 left-4 right-4 flex items-center justify-between">
							<span class="inline-flex items-center space-x-1.5 rounded-full border border-white/30 bg-slate-950/60 px-3 py-1 text-[11px] font-semibold tracking-wider text-white backdrop-blur-md uppercase">
								<Sparkles class="h-3 w-3 text-teal-300" />
								<span>{heroSpots[activeHeroSlide].category}</span>
							</span>

							<!-- Prev/Next Controls -->
							<div class="flex items-center space-x-1 rounded-full border border-white/20 bg-slate-950/60 p-1 backdrop-blur-md">
								<button
									on:click={prevHeroSlide}
									class="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20 hover:text-white"
									aria-label="Previous slide"
								>
									<ChevronLeft class="h-4 w-4" />
								</button>
								<span class="px-1 text-[10px] font-bold text-white/90">{activeHeroSlide + 1}/{heroSpots.length}</span>
								<button
									on:click={nextHeroSlide}
									class="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20 hover:text-white"
									aria-label="Next slide"
								>
									<ChevronRight class="h-4 w-4" />
								</button>
							</div>
						</div>

						<!-- Bottom Content Panel -->
						<div class="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
							<p class="font-serif text-xl sm:text-2xl font-medium tracking-tight text-white drop-shadow-sm">
								{heroSpots[activeHeroSlide].label}
							</p>
							<p class="mt-1 text-xs sm:text-sm text-teal-200/90 font-light drop-shadow-sm">
								{heroSpots[activeHeroSlide].subtitle}
							</p>
							<div class="mt-3 flex items-center justify-between pt-2 border-t border-white/15">
								<span class="text-[11px] text-slate-300 font-light">Tanauan, Leyte, Philippines</span>
								<button
									on:click={() => scrollToSection(heroSpots[activeHeroSlide].id)}
									class="inline-flex items-center space-x-1 text-xs font-semibold text-teal-300 transition hover:text-teal-200"
								>
									<span>View Spot Details</span>
									<ArrowRight class="h-3.5 w-3.5" />
								</button>
							</div>
						</div>
					</div>

					<!-- Thumbnail Selector Strip (Click any photo to jump to slide) -->
					<div class="mt-3.5 flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
						{#each heroSpots as hs, idx}
							<button
								on:click={() => (activeHeroSlide = idx)}
								class="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 {activeHeroSlide === idx
									? 'border-teal-600 ring-2 ring-teal-600/30 shadow-md scale-105'
									: 'border-white opacity-65 hover:opacity-100 hover:border-stone-300'}"
								aria-label="Show {hs.label}"
							>
								<img src={hs.img} alt={hs.label} class="h-full w-full object-cover" />
								<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
								<span class="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white truncate text-left drop-shadow-xs">
									{hs.label}
								</span>
							</button>
						{/each}
					</div>
				</div>

			</div>
		</div>

	</header>

	<!-- ══════════════════════════════════════════════════════════════════════
	     STICKY FILTER & SEARCH NAVIGATION BAR
	══════════════════════════════════════════════════════════════════════ -->
	<section id="destinations-grid" class="sticky top-0 z-30 border-b border-stone-200/90 bg-white/95 shadow-sm backdrop-blur-md">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Row 1: Filter Pills (always scrollable, never truncated) -->
			<div class="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-stone-100 py-2.5">
				{#each categories as cat}
					{@const IconComponent = cat.icon}
					<button
						on:click={() => handleFilterChange(cat.id)}
						class="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 {activeCategory === cat.id
							? 'bg-teal-700 text-white shadow-md shadow-teal-700/25 ring-1 ring-teal-700'
							: 'bg-stone-100 text-slate-700 hover:bg-teal-50 hover:text-teal-800'}"
					>
						<svelte:component this={IconComponent} class="h-3.5 w-3.5 shrink-0" />
						<span>{cat.label}</span>
					</button>
				{/each}
			</div>
			<!-- Row 2: Search + Count -->
			<div class="flex items-center justify-between gap-3 py-2">
				<div class="relative w-full max-w-xs sm:max-w-sm">
					<Search class="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search by name, location, or vibe..."
						class="w-full rounded-full border border-stone-300 bg-stone-50/80 py-1.5 pr-4 pl-9 text-xs text-slate-800 placeholder-slate-400 transition-colors focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
					/>
					{#if searchQuery}
						<button on:click={() => (searchQuery = '')} class="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Clear search">
							<X class="h-3 w-3" />
						</button>
					{/if}
				</div>
				<div class="shrink-0 text-xs font-medium text-slate-500">
					<span class="font-semibold text-slate-900">{filteredSpots.length}</span> of {spots.length} destinations
				</div>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════════════════════════════
	     FEATURED DESTINATIONS — EDITORIAL SPREAD WITH GOOGLE MAPS
	══════════════════════════════════════════════════════════════════════ -->
	<main class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		{#if filteredSpots.length === 0}
			<div class="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center">
				<div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-slate-400">
					<SlidersHorizontal class="h-6 w-6" />
				</div>
				<h3 class="mt-4 font-serif text-xl font-medium text-slate-800">No destinations match your search</h3>
				<p class="mt-1 text-sm text-slate-500">Try clearing your search query or selecting a different category tab.</p>
				<button
					on:click={() => { searchQuery = ''; activeCategory = 'all'; }}
					class="mt-5 inline-flex items-center rounded-xl bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-800 shadow-sm"
				>Reset Filters</button>
			</div>
		{:else}
			<div class="space-y-24 lg:space-y-32">
				{#each filteredSpots as spot, index (spot.id)}
					{@const activeIdx = activeImageMap[spot.id] ?? 0}
					{@const isEven = index % 2 === 1}
					{@const hasImages = spot.gallery && spot.gallery.length > 0}
					{@const activePhoto = hasImages ? (spot.gallery[activeIdx] || spot.gallery[0]) : null}

					<article
						id={spot.id}
						class="destination-card group relative scroll-mt-24 rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl sm:p-8 lg:p-10"
					>
						<!-- Decorative Background Accent -->
						<div class="pointer-events-none absolute -top-12 -right-12 h-72 w-72 rounded-full opacity-5 blur-3xl" style="background-color: {spot.accent};"></div>

						<div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12 {isEven ? 'lg:grid-flow-dense' : ''}">

							<!-- ──── IMAGE & GALLERY (7 cols) ──── -->
							<div class="lg:col-span-7 {isEven ? 'lg:col-start-6' : ''}">

								{#if hasImages && activePhoto}
									<!-- Main Preview Frame -->
									<div class="relative overflow-hidden rounded-2xl bg-stone-900 shadow-md">
										<div class="aspect-[16/10] w-full overflow-hidden">
											<img
												src={activePhoto.src}
												alt={activePhoto.title}
												loading="lazy"
												class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
											/>
										</div>
										<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>

										<!-- Top Badges -->
										<div class="absolute top-4 right-4 left-4 flex items-center justify-between">
											<span class="inline-flex items-center space-x-1 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1 text-[11px] font-semibold tracking-wider text-white backdrop-blur-md uppercase">
												<span>{spot.categoryLabel}</span>
											</span>
											<button
												on:click={() => openLightbox(spot, activeIdx)}
												class="inline-flex items-center space-x-1.5 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-950"
												title="View Fullscreen"
											>
												<Maximize2 class="h-3.5 w-3.5" />
												<span class="hidden sm:inline">Fullscreen</span>
											</button>
										</div>

										<!-- Bottom Caption -->
										<div class="absolute right-4 bottom-4 left-4 flex items-end justify-between text-white">
											<div class="max-w-[75%]">
												<p class="text-xs font-semibold tracking-wide text-teal-300 drop-shadow-sm uppercase">{activePhoto.title}</p>
												<p class="text-[11px] text-slate-200 line-clamp-1 drop-shadow-sm">{activePhoto.caption}</p>
											</div>
											<div class="inline-flex items-center space-x-1 rounded-md bg-black/60 px-2 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-sm">
												<Camera class="h-3 w-3" />
												<span>{activeIdx + 1}/{spot.gallery.length}</span>
											</div>
										</div>
									</div>

									<!-- Thumbnail Strip -->
									{#if spot.gallery.length > 1}
										<div class="mt-3 flex items-center space-x-2 overflow-x-auto pb-1">
											{#each spot.gallery as item, thumbIdx}
												<button
													on:click={() => setActiveThumbnail(spot.id, thumbIdx)}
													class="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 focus:outline-none {activeIdx === thumbIdx
														? 'border-teal-500 ring-2 ring-teal-500/30'
														: 'border-transparent opacity-60 hover:opacity-100'}"
													aria-label="View photo {thumbIdx + 1}"
												>
													<img src={item.src} alt={item.title} loading="lazy" class="h-full w-full object-cover" />
												</button>
											{/each}
										</div>
									{/if}
								{:else}
									<!-- No Image — Festival Showcase Gradient Card -->
									<div class="relative overflow-hidden rounded-2xl shadow-md" style="background: linear-gradient(135deg, {spot.accent}22, {spot.accent}44, {spot.accent}22);">
										<div class="flex aspect-[16/10] w-full flex-col items-center justify-center border border-amber-200/50 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8 text-center">
											<div class="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-600 shadow-inner">
												<PartyPopper class="h-10 w-10" />
											</div>
											<span class="mt-4 inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold tracking-wider text-amber-700 uppercase">
												Annual August 14 Celebration
											</span>
											<p class="mt-2 font-serif text-2xl font-medium text-stone-900 sm:text-3xl">{spot.name}</p>
											<p class="mt-2 max-w-md text-xs leading-relaxed text-stone-600 sm:text-sm font-light">
												Experience the soul of Tanauan come alive through dazzling street dancing, vibrant brass bands, and deep religious devotion to Our Lady of the Assumption.
											</p>
											{#if spot.hasLink}
												<a
													href={spot.linkHref}
													class="group mt-5 inline-flex items-center space-x-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-amber-600"
												>
													<span>Explore Dedicated Pasaka Festival Showcase</span>
													<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
												</a>
											{/if}
										</div>

										<!-- Top Badge -->
										<div class="absolute top-4 left-4">
											<span class="inline-flex items-center rounded-full border border-amber-300/40 bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-wider text-amber-700 uppercase shadow-sm">
												{spot.categoryLabel}
											</span>
										</div>
									</div>
								{/if}

								<!-- Google Maps Accurate Location Card (under photo) -->
								<div class="mt-4 rounded-xl border border-stone-200 bg-stone-50/90 p-4 transition-colors hover:border-teal-300">
									<div class="flex items-start justify-between gap-3">
										<div class="flex items-start space-x-2.5">
											<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
												<MapPin class="h-4 w-4" />
											</div>
											<div>
												<div class="flex items-center space-x-2">
													<p class="text-xs font-bold text-slate-900">Specific Location & Landmarks</p>
													<span class="rounded bg-teal-50 px-1.5 py-0.5 text-[10px] font-semibold text-teal-700">Verified</span>
												</div>
												<p class="mt-1 text-xs font-medium text-slate-700">{spot.specificLocation}</p>
												<p class="mt-1 text-[11px] leading-relaxed text-slate-500 font-light">{spot.locationDetails}</p>
											</div>
										</div>
									</div>

									<div class="mt-3 flex items-center justify-between border-t border-stone-200/60 pt-2.5">
										<span class="text-[11px] text-slate-400">Accurate Google Maps Navigation</span>
										<a
											href={spot.mapsUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center space-x-1.5 text-xs font-semibold text-teal-700 transition hover:text-teal-900"
										>
											<span>Open in Google Maps</span>
											<ExternalLink class="h-3.5 w-3.5" />
										</a>
									</div>
								</div>
							</div>

							<!-- ──── CONTENT & SELLING DETAILS (5 cols) ──── -->
							<div class="flex flex-col justify-center lg:col-span-5 {isEven ? 'lg:col-start-1' : ''}">

								<!-- Number, Category & Vibe Badge -->
								<div class="flex flex-wrap items-center gap-2">
									<span class="font-serif text-3xl font-light text-stone-300 sm:text-4xl">{spot.number}</span>
									<span class="h-px w-6 bg-stone-300"></span>
									<span class="rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase text-white" style="background-color: {spot.accent};">
										{spot.vibeBadge}
									</span>
								</div>

								<!-- Destination Name -->
								<h2 class="mt-3 font-serif text-2xl leading-tight font-medium text-slate-900 sm:text-3xl lg:text-[2.1rem]">
									{spot.name}
								</h2>

								<!-- Tagline Selling Hook -->
								<p class="mt-2 font-serif text-sm italic text-stone-600 sm:text-base">
									"{spot.tagline}"
								</p>

								<!-- Persuasive Storytelling Description -->
								<p class="mt-4 text-xs leading-relaxed text-slate-600 sm:text-sm font-light">
									{spot.description}
								</p>

								<!-- Visitor Essentials Compact Grid -->
								<div class="mt-5 grid grid-cols-1 gap-2.5 rounded-xl border border-stone-100 bg-stone-50/80 p-3.5 text-xs sm:grid-cols-2">
									<div class="flex items-start space-x-2">
										<Clock class="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
										<div>
											<span class="font-semibold text-slate-900">Best Hours:</span>
											<p class="text-[11px] text-slate-600 leading-snug">{spot.bestTime}</p>
										</div>
									</div>
									<div class="flex items-start space-x-2">
										<Sparkles class="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
										<div>
											<span class="font-semibold text-slate-900">Admission:</span>
											<p class="text-[11px] text-slate-600 leading-snug">{spot.admission}</p>
										</div>
									</div>
								</div>

								<!-- Selling Highlights -->
								<div class="mt-5 border-t border-stone-100 pt-4">
									<h4 class="text-xs font-bold tracking-wider text-slate-900 uppercase">Why You'll Love This Destination</h4>
									<ul class="mt-3 space-y-2">
										{#each spot.highlights as item}
											<li class="flex items-start space-x-2.5 text-xs text-slate-600 sm:text-[13px]">
												<span class="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full" style="background-color: {spot.accent};"></span>
												<span class="leading-snug">{item}</span>
											</li>
										{/each}
									</ul>
								</div>

								<!-- Insider Tip Box -->
								<div class="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-3.5 text-xs text-amber-900">
									<div class="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px] text-amber-800">
										<Sparkles class="h-3 w-3 text-amber-600" />
										<span>Insider Traveler Tip</span>
									</div>
									<p class="mt-1 text-[11px] leading-relaxed text-amber-800/90 font-light">
										{spot.insiderTip}
									</p>
								</div>

								<!-- Action Buttons -->
								<div class="mt-6 flex flex-wrap items-center gap-2.5 pt-1">
									<a
										href={spot.mapsUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center space-x-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-teal-700/20 transition hover:bg-teal-800"
									>
										<MapPin class="h-3.5 w-3.5 text-teal-200" />
										<span>Get Directions</span>
										<ExternalLink class="h-3 w-3 opacity-70" />
									</a>

									{#if hasImages}
										<button
											on:click={() => openLightbox(spot, activeIdx)}
											class="inline-flex items-center space-x-1.5 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-stone-50"
										>
											<Camera class="h-3.5 w-3.5 text-slate-500" />
											<span>View Gallery ({spot.gallery.length} Photos)</span>
										</button>
									{/if}

									{#if spot.hasLink}
										<a
											href={spot.linkHref}
											class="group inline-flex items-center space-x-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600"
										>
											<span>Festival Showcase</span>
											<ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
										</a>
									{/if}
								</div>

							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</main>

	<!-- ══════════════════════════════════════════════════════════════════════
	     TOURISM RATIONALE & OFFICIAL MANDATE SECTION
	══════════════════════════════════════════════════════════════════════ -->
	<section id="tourism-rationale" class="border-t border-stone-200 bg-white py-16 sm:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 p-2 text-teal-700">
					<img src="/tourist-spots-web/tourism_logo.png" alt="Tanauan Seal" class="h-full w-full object-contain" />
				</div>
				<p class="mt-4 text-xs font-bold tracking-widest text-teal-700 uppercase">Official Municipal Statement</p>
				<h3 class="mt-2 font-serif text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
					Tourism Framework of Tanauan, Leyte
				</h3>
				<p class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base font-light">
					A balanced, community-centered approach to sustainable tourism that celebrates
					natural coastlines, protects living history, and nurtures civic progress.
				</p>
			</div>

			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
				<div class="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 sm:p-8">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600"><Waves class="h-6 w-6" /></div>
					<h4 class="mt-4 font-serif text-lg font-medium text-slate-900">Coastal Identity & Maritime Life</h4>
					<p class="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm font-light">
						Tanauan's seaside setting along the historic Leyte Gulf is a defining hallmark of
						local identity. Coastal initiatives prioritize clean beaches, livelihood protection
						for fisherfolk, and community-managed recreation.
					</p>
				</div>
				<div class="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 sm:p-8">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600"><Landmark class="h-6 w-6" /></div>
					<h4 class="mt-4 font-serif text-lg font-medium text-slate-900">Historical Integrity & Living Faith</h4>
					<p class="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm font-light">
						Centuries of religious heritage at Our Lady of the Assumption Parish and monuments
						to statesmen like Jaime C. de Veyra provide educational and spiritual depth for
						travelers seeking meaningful cultural journeys.
					</p>
				</div>
				<div class="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 sm:p-8">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600"><Sparkles class="h-6 w-6" /></div>
					<h4 class="mt-4 font-serif text-lg font-medium text-slate-900">Resilience, Memory & Community Pride</h4>
					<p class="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm font-light">
						The Surge of Hope and welcoming civic landmarks represent a town that rose united.
						Tourism in Tanauan is grounded in hospitality, genuine civic pride, and authentic
						Waray generosity.
					</p>
				</div>
			</div>

			<div class="mt-12 rounded-2xl border border-stone-200 bg-stone-100/70 p-6 text-center sm:p-8">
				<h4 class="text-xs font-bold tracking-wider text-slate-700 uppercase">Municipal Tourism Office · Contact & Visitor Guidance</h4>
				<p class="mt-2 text-sm text-slate-600">Ground Floor, Tanauan Municipal Hall, Real Street, Barangay Poblacion, Tanauan, Leyte, Philippines 6501</p>
				<p class="mt-1 text-xs text-slate-500">Office Hours: Monday to Friday · 8:00 AM – 5:00 PM PST · Ready to Welcome Travelers</p>
			</div>
		</div>
	</section>

	<!-- Footer Ribbon -->
	<div class="w-full"><img src="/tourist-spots-web/footer.png" alt="" class="h-3 w-full object-cover" /></div>

	<!-- ══════════════════════════════════════════════════════════════════════
	     FULLSCREEN LIGHTBOX
	══════════════════════════════════════════════════════════════════════ -->
	{#if lightboxOpen && currentLightboxSpot}
		{@const currentImage = currentLightboxSpot.gallery[currentLightboxIndex]}
		<div class="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white backdrop-blur-xl" role="dialog" aria-modal="true">
			<div class="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
				<div>
					<p class="text-[11px] font-semibold tracking-wider text-teal-400 uppercase">{currentLightboxSpot.name}</p>
					<h3 class="text-sm font-medium text-white sm:text-base">{currentImage.title}</h3>
				</div>
				<div class="flex items-center space-x-3">
					<span class="text-xs text-stone-400">{currentLightboxIndex + 1} / {currentLightboxSpot.gallery.length}</span>
					<button on:click={closeLightbox} class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none" aria-label="Close fullscreen">
						<X class="h-5 w-5" />
					</button>
				</div>
			</div>

			<div class="relative flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
				{#if currentLightboxSpot.gallery.length > 1}
					<button on:click={prevLightboxImage} class="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/80 focus:outline-none" aria-label="Previous image">
						<ChevronLeft class="h-6 w-6" />
					</button>
				{/if}
				<div class="relative max-h-[75vh] max-w-5xl">
					<img src={currentImage.src} alt={currentImage.title} class="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-2xl" />
				</div>
				{#if currentLightboxSpot.gallery.length > 1}
					<button on:click={nextLightboxImage} class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/80 focus:outline-none" aria-label="Next image">
						<ChevronRight class="h-6 w-6" />
					</button>
				{/if}
			</div>

			<div class="border-t border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md sm:px-6">
				<p class="mx-auto max-w-3xl text-center text-xs text-stone-300">{currentImage.caption}</p>
				{#if currentLightboxSpot.gallery.length > 1}
					<div class="mt-3 flex items-center justify-center space-x-2 overflow-x-auto pb-1">
						{#each currentLightboxSpot.gallery as thumb, idx}
							<button
								on:click={() => (currentLightboxIndex = idx)}
								class="h-12 w-16 shrink-0 overflow-hidden rounded border-2 transition-all {currentLightboxIndex === idx ? 'border-teal-400 opacity-100' : 'border-transparent opacity-40 hover:opacity-80'}"
								aria-label="Jump to image {idx + 1}"
							>
								<img src={thumb.src} alt={thumb.title} class="h-full w-full object-cover" />
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.no-scrollbar::-webkit-scrollbar { display: none; }
	.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
