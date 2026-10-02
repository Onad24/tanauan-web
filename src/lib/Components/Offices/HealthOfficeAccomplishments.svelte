<script>
	import { fade, scale, fly } from 'svelte/transition';

	// ==========================================
	// MUNICIPAL HEALTH OFFICE ACCOMPLISHMENTS
	// Compact Dossier Folders System:
	// 1. School-Based Immunization (Bakuna Eskwela - 15 Records)
	// 2. Measles-Rubella Supplemental Immunization (MR-SIA 2026 - 5 Records)
	// 3. Active Case Finding (ACF) & Mobile Chest X-Ray Caravan (11 Records)
	// All pictures reside inside folders; clicking a folder opens the animated pop-up modal.
	// ==========================================

	// Modal State
	let isModalOpen = $state(false);
	let activeFolderId = $state('sbi'); // 'sbi' | 'mrsia' | 'acf'
	let activePhotoIndex = $state(0);
	let isFullscreen = $state(false);

	// ------------------------------------------
	// FOLDER 1: SCHOOL-BASED IMMUNIZATION (BAKUNA ESKWELA - 15 RECORDS)
	// DepEd & DOH Eastern Visayas Partnership
	// ------------------------------------------
	const sbiPhotos = [
		{
			id: 'sbi-bridge',
			stepCode: 'ACTIVITY 01 // REMOTE SCHOOL REACH',
			stationName: 'River Suspension Bridge Crossing to Remote Schools',
			badge: 'Remote School Reach',
			badgeColor: 'bg-blue-600 text-white border-blue-400',
			src: '/images/accomplishments/health-office/sbi/sbi-3.jpg',
			title: 'Crossing River Suspension Bridge to Reach Remote Public Schools',
			subtitle: 'Dedicated MHO Healthcare Teams Delivering Vaccines Across Hanging Bridges',
			shortDesc:
				'Tanauan MHO healthcare workers carry portable cold-chain vaccine carriers across a high suspension bridge over the river to reach isolated school communities.',
			fullDescription:
				'Demonstrating remarkable dedication to rural public health, the Tanauan Municipal Health Office healthcare squad traverses a hanging suspension cable bridge spanning a major river waterway to conduct School-Based Immunization. Carrying insulated vaccine cold-chain transport boxes maintaining strict +2°C to +8°C temperatures, the medical team overcomes geographic barriers so that children in upland and island-catchment public schools receive the exact same quality of preventive healthcare as town-center pupils.',
			highlights: [
				'Cold-chain vaccine transport across challenging river terrain and suspension bridges',
				'Zero-compromise outreach reaching isolated rural public elementary schools',
				'Strict temperature integrity monitored using calibrated cold-box data loggers',
				'Exemplary civic dedication of Tanauan healthcare personnel and logistical support'
			],
			details: {
				station: 'Activity 1: Remote School Logistics',
				venue: 'River Suspension Bridge to Remote Public School, Tanauan, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'Tanauan MHO Nurses & Cold-Chain Logistics Officers',
				cost: '100% Free Public Health Service (Zero Cost to Schools)',
				output: 'Safe Delivery of Potent Vaccines to Last-Mile School Campuses'
			}
		},
		{
			id: 'sbi-advocacy',
			stepCode: 'ACTIVITY 02 // CAMPAIGN ADVOCACY',
			stationName: 'Bakuna Eskwela Student Advocacy & Peer Confidence',
			badge: 'Student Advocacy',
			badgeColor: 'bg-pink-600 text-white border-pink-400',
			src: '/images/accomplishments/health-office/sbi/sbi-1.jpg',
			title: 'Bakuna Eskwela Student Advocacy & Vaccine Confidence',
			subtitle: 'Public School Pupil Promoting the DOH & DepEd Immunization Campaign',
			shortDesc:
				'A smiling elementary student holds the official Bakuna Eskwela placard in front of the DOH-DepEd campaign banner, inspiring peer vaccine confidence.',
			fullDescription:
				'A young elementary student proudly holds the official "Bakuna Eskwela" emblem in front of the prominent campaign backdrop featuring the Department of Health (DOH), Department of Education (DepEd), and Municipality of Tanauan seals. The visual messaging emphasizes that school-based immunization protects children from life-threatening communicable diseases while they study, fostering positive peer motivation and reassuring parents across the municipality.',
			highlights: [
				'Positive child-centered health promotion creating fear-free vaccine attitudes',
				'Clear civic branding with DOH, DepEd, and Municipality of Tanauan official seals',
				'Empowering students as youth health champions in their classrooms and homes',
				'Strengthening school-community trust in government immunization safety'
			],
			details: {
				station: 'Activity 2: Student Campaign Advocacy',
				venue: 'Public Elementary School Campus, Tanauan, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'DepEd School Health Teachers & MHO Immunization Staff',
				cost: '100% Free Public Service',
				output: 'Positive Student Vaccine Acceptance & Community Trust'
			}
		},
		{
			id: 'sbi-live-shot',
			stepCode: 'ACTIVITY 03 // CLINICAL INOCULATION',
			stationName: 'Live Vaccine Administration at the Bakuna Eskwela Station',
			badge: 'Clinical Inoculation',
			badgeColor: 'bg-rose-600 text-white border-rose-400',
			src: '/images/accomplishments/health-office/sbi/sbi-10.jpg',
			title: 'Live Vaccine Administration at the Bakuna Eskwela Station',
			subtitle: 'Precise Inoculation of Student Holding the Bakuna Eskwela Emblem',
			shortDesc:
				'A seasoned MHO healthcare nurse gently administers a vaccine dose to a calm female student holding the Bakuna Eskwela placard in front of the official banner.',
			fullDescription:
				'Under strict aseptic techniques, an experienced public health nurse from the Tanauan Municipal Health Office administers an intramuscular vaccine dose to a student holding the Bakuna Eskwela placard. The presence of the official Department of Health and Department of Education background banner reinforces compliance with national immunization standards, safe auto-disable syringe protocols, and calm, supportive bedside manner.',
			highlights: [
				'Administration by licensed, certified government public health nurses',
				'Strict adherence to aseptic injection protocols and auto-disable syringes',
				'Supportive bedside interaction minimizing childhood anxiety and distress',
				'Immediate record annotation on the student’s permanent health card'
			],
			details: {
				station: 'Activity 3: Clinical Inoculation Desk',
				venue: 'School Clinic & Campaign Station, Tanauan, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'Licensed Senior MHO Public Health Nurses',
				cost: '100% Free Public Service',
				output: 'Safe and Effective Immunization Against Preventable Diseases'
			}
		},
		{
			id: 'sbi-comfort-care',
			stepCode: 'ACTIVITY 04 // COMPASSIONATE CARE',
			stationName: 'Compassionate Classroom Vaccine Administration with Comfort Care',
			badge: 'Comfort Care',
			badgeColor: 'bg-teal-600 text-white border-teal-400',
			src: '/images/accomplishments/health-office/sbi/sbi-9.jpg',
			title: 'Compassionate Classroom Vaccine Administration with Comfort Care',
			subtitle: 'Multi-Personnel Emotional Support and Gentle Inoculation in Class',
			shortDesc:
				'Healthcare staff in RESBAKUNA shirts and nurses provide comforting shoulder support to students while gently administering their school vaccines.',
			fullDescription:
				'Highlighting the warm, compassionate atmosphere of Tanauan’s School-Based Immunization missions, healthcare personnel in official "RESBAKUNA - Kasangga ng Bida" shirts team up with school nurses. One officer gently rests a comforting hand on the student’s shoulder, offering reassurance and relaxation techniques while the vaccinating nurse delivers the injection painlessly and swiftly.',
			highlights: [
				'Dedicated emotional comfort and calming presence during vaccine delivery',
				'Two-person nursing protocol ensuring patient stability and precise injection',
				'Positive classroom setting surrounded by supportive educators and peers',
				'Immediate positive reinforcement and post-injection observation'
			],
			details: {
				station: 'Activity 4: In-Class Comfort Administration',
				venue: 'Elementary Classroom, Tanauan Public School, Tanauan, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'MHO Nursing Staff & RESBAKUNA Health Officers',
				cost: '100% Free Public Service',
				output: 'Trauma-Free Pediatric Immunization Delivery'
			}
		},
		{
			id: 'sbi-classroom-boys',
			stepCode: 'ACTIVITY 05 // CLASSROOM CARDS',
			stationName: 'Classroom Vaccination Session & Card Issuance',
			badge: 'Classroom Vaccination',
			badgeColor: 'bg-amber-600 text-white border-amber-400',
			src: '/images/accomplishments/health-office/sbi/sbi-4.jpg',
			title: 'Classroom Immunization & Vaccine Card Issuance',
			subtitle: 'Young Pupils Proudly Displaying Their "Bakunado Na Ako" Certificates',
			shortDesc:
				'Elementary school boys seated at their classroom desks proudly showing their official Bakunado Na Ako cards alongside MHO healthcare staff and their teacher.',
			fullDescription:
				'Following safe and gentle vaccine administration in their familiar classroom setting, two young schoolboys proudly display their official "Bakunado Na Ako" (I Am Vaccinated) certificates and personalized school-age immunization cards. Accompanied by their classroom adviser and Tanauan MHO healthcare staff, the structured classroom setup provides an orderly, comforting environment where students feel supported by their classmates and educators.',
			highlights: [
				'Comfortable, anxiety-free vaccination administered inside the homeroom classroom',
				'Official issuance of the School-Age Vaccination Card recording MR, Td, and HPV doses',
				'Collaborative supervision by DepEd classroom advisers and MHO nursing staff',
				'Prompt post-vaccination observation ensuring 100% child comfort and safety'
			],
			details: {
				station: 'Activity 5: Classroom Vaccination & Documentation',
				venue: 'Grade School Classroom, Public Elementary School, Tanauan, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'MHO Public Health Nurses, Midwives & Homeroom Advisers',
				cost: '100% Free Public Service',
				output: 'Certified School-Age Immunization Records for Enrolled Pupils'
			}
		},
		{
			id: 'sbi-boy-smile',
			stepCode: 'ACTIVITY 06 // STUDENT COURAGE',
			stationName: 'Student Courage & "Bakunado Na Ako" Certificate Presentation',
			badge: 'Student Milestone',
			badgeColor: 'bg-cyan-600 text-white border-cyan-400',
			src: '/images/accomplishments/health-office/sbi/sbi-7.jpg',
			title: 'Student Courage & "Bakunado Na Ako" Certificate Presentation',
			subtitle: 'Proud Young Pupil Displaying His Official Bakuna Eskwela Card at His Desk',
			shortDesc:
				'A bright young student smiles cheerfully at his green school desk while holding his official Bakunado Na Ako certificate alongside his vaccination record.',
			fullDescription:
				'A close-up portrait of student bravery and civic celebration. Having successfully received his school-age vaccination dose, this young student sits happily at his desk holding up the colorful "Bakunado Na Ako - Bakuna Eskwela" placard. The initiative celebrates every child’s step toward disease immunity, creating fond memories and positive associations with municipal public health services.',
			highlights: [
				'Celebrating pediatric courage and health protection with personalized placards',
				'Tangible proof of completed immunization retained by the child and family',
				'Eliminating vaccine stigma and fear through celebratory recognition',
				'Fostering peer enthusiasm and participation across the grade levels'
			],
			details: {
				station: 'Activity 6: Pupil Milestone Presentation',
				venue: 'Elementary Classroom Desk, Tanauan, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'MHO Vaccination Team & Classroom Educator',
				cost: '100% Free Public Service',
				output: 'Individual Student Vaccine Acceptance & Commemorative Milestone'
			}
		},
		{
			id: 'sbi-girl-cert',
			stepCode: 'ACTIVITY 07 // INDIVIDUAL CERTIFICATION',
			stationName: 'Individual Student Immunization Certificate Awarding',
			badge: 'Student Certification',
			badgeColor: 'bg-emerald-600 text-white border-emerald-400',
			src: '/images/accomplishments/health-office/sbi/sbi-5.jpg',
			title: 'Individual Student Immunization Certificate Awarding',
			subtitle: 'Empowered Elementary Schoolgirl Celebrating Her Completed Vaccine Dose',
			shortDesc:
				'A young female student in school uniform proudly holds her "Bakunado Na Ako" completion certificate in her classroom.',
			fullDescription:
				'A grade school pupil in uniform smiles warmly as she presents her personalized "Bakunado Na Ako - Bakuna Eskwela" certificate inside the school science and reading corner. Providing children with tangible certificates of courage and health protection instills lifelong pride in health wellness, demystifies healthcare procedures, and serves as official proof of immunization for DepEd school health monitoring.',
			highlights: [
				'Individualized completion certification celebrating each child\'s health milestone',
				'Demystifying pediatric injections through rewarding, celebratory recognition',
				'Verification of vaccine batch, expiration, and dose on school health archives',
				'Promoting gender equity in vaccine access, including protection against HPV'
			],
			details: {
				station: 'Activity 7: Individual Student Certification',
				venue: 'Elementary Classroom & Science Corner, Tanauan, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'MHO Nursing Team & School Guidance / Health Coordinator',
				cost: '100% Free Public Service',
				output: 'Verified Individual Student Immunization Certification'
			}
		},
		{
			id: 'sbi-classroom-thumbsup',
			stepCode: 'ACTIVITY 08 // COLLABORATIVE PARTNERSHIP',
			stationName: 'Collaborative Classroom Milestone with Teachers & Health Workers',
			badge: 'Inter-Agency Teamwork',
			badgeColor: 'bg-indigo-600 text-white border-indigo-400',
			src: '/images/accomplishments/health-office/sbi/sbi-8.jpg',
			title: 'Collaborative Classroom Milestone with Teachers & Health Workers',
			subtitle: 'DepEd Educators, MHO Health Staff & Vaccinated Students Celebrate Together',
			shortDesc:
				'Classroom celebration showing vaccinated boys and girls with their health cards alongside smiling teachers and MHO health workers giving thumbs-up.',
			fullDescription:
				'A vibrant classroom group capture illustrating the unified spirit between public school teachers and municipal health frontliners. Students proudly seated at their green wooden desks hold up their official vaccination cards and certificates, while five educators and MHO personnel in RESBAKUNA shirts give enthusiastic thumbs-up signs, validating a 100% successful classroom vaccination rollout.',
			highlights: [
				'Strong synergy between DepEd public school teachers and MHO healthcare personnel',
				'Seamless classroom health management with zero disruption to academic schedules',
				'Peer encouragement creating an uplifting and unified school health milestone',
				'Synchronized logging into municipal and DepEd school health tracking ledgers'
			],
			details: {
				station: 'Activity 8: Classroom Cohort Celebration',
				venue: 'Computer & Academic Classroom, Tanauan Public School, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'DepEd Faculty Advisers & MHO Immunization Staff',
				cost: '100% Free Public Service',
				output: 'High-Turnout Classroom Protection & Joint Mission Success'
			}
		},
		{
			id: 'sbi-assembly-chalkboard',
			stepCode: 'ACTIVITY 09 // CLASSROOM TURNOUT',
			stationName: 'School-Wide Assembly & Inter-Agency Completion Milestone',
			badge: 'Classroom Turnout',
			badgeColor: 'bg-purple-600 text-white border-purple-400',
			src: '/images/accomplishments/health-office/sbi/sbi-2.jpg',
			title: 'School-Wide Assembly & Inter-Agency Completion Milestone',
			subtitle: 'Teachers, Healthcare Workers, and Vaccinated Students Celebrate 100% Turnout',
			shortDesc:
				'Group celebration of vaccinated students, classroom teachers, school principal, and the MHO medical mission team in front of the chalkboard.',
			fullDescription:
				'A joyous and triumphant culmination of the Bakuna Eskwela campaign session. Vaccinated students gather in front of the classroom chalkboard with their proud classroom teachers, school principal, and the Tanauan Municipal Health Office vaccination team. Holding their colorful "Bakunado Na Ako" certificates, the successful school mission proves that seamless DepEd-DOH-LGU collaboration ensures zero missed children across Tanauan’s educational institutions.',
			highlights: [
				'Complete classroom cohort immunization achieving maximum institutional herd immunity',
				'United partnership between school administrators, faculty, and MHO healthcare staff',
				'Comprehensive recording into the DepEd Learner Information System (LIS) health module',
				'Celebratory culmination reinforcing a healthy, protected educational learning environment'
			],
			details: {
				station: 'Activity 9: School Cohort Milestone Celebration',
				venue: 'Elementary Classroom, Tanauan Public School, Tanauan, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'Full MHO Vaccination Deployment Team & DepEd Faculty',
				cost: '100% Free Public Service',
				output: '100% School-Level Immunization Coverage & Cohort Protection'
			}
		},
		{
			id: 'sbi-stage-camire',
			stepCode: 'ACTIVITY 10 // STAGE CEREMONY',
			stationName: 'Camire Elementary School Immunization Stage Ceremony',
			badge: 'Stage Ceremony',
			badgeColor: 'bg-amber-600 text-white border-amber-400',
			src: '/images/accomplishments/health-office/sbi/sbi-6.jpg',
			title: 'Camire Elementary School Immunization Stage Ceremony',
			subtitle: 'School-Wide Stage Recognition with Principal, Teachers & Vaccinated Pupils',
			shortDesc:
				'Ten vaccinated pupils and MHO healthcare staff gather on the decorated stage of Camire Elementary School holding their official vaccination record cards.',
			fullDescription:
				'An official school-wide stage ceremony held at Camire Elementary School in Tanauan, Leyte. Ten proud elementary students line up on the covered stage under hanging floral decorations alongside their school principal, classroom teachers, and the Tanauan MHO vaccination team wearing RESBAKUNA uniforms. Holding their verified health cards, this ceremony marks the achievement of comprehensive school herd immunity for the entire barangay catchment area.',
			highlights: [
				'Official school stage ceremony celebrating full cohort vaccine completion',
				'Direct community representation at Camire Elementary School, Tanauan, Leyte',
				'Active leadership by school principal and municipal health personnel',
				'Validation of 100% coverage among enrolled pupils in rural barangay schools'
			],
			details: {
				station: 'Activity 10: School Stage Recognition Ceremony',
				venue: 'Camire Elementary School Covered Stage, Tanauan, Leyte',
				date: 'Bakuna Eskwela School Campaign',
				personnel: 'Camire Elementary School Principal, Teachers & Tanauan MHO Team',
				cost: '100% Free Public Health Service',
				output: 'School-Wide Immunization Milestone & Institutional Recognition'
			}
		},
		{
			id: 'sbi-classroom-cohort-girls',
			stepCode: 'ACTIVITY 11 // CLASSROOM COHORT',
			stationName: 'Female Student Cohort Immunization Milestone & Staff Assembly',
			badge: 'Cohort Milestone',
			badgeColor: 'bg-emerald-600 text-white border-emerald-400',
			src: '/images/accomplishments/health-office/sbi/sbi-11.jpg',
			title: 'Female Student Cohort Immunization Milestone & Staff Assembly',
			subtitle: 'Pupils Celebrate Vaccine Protection with School Advisers and Healthcare Personnel',
			shortDesc:
				'Young female students seated at their green classroom desks proudly raise their "Bakunado Na Ako" cards alongside smiling educators and the MHO medical team.',
			fullDescription:
				'A heartening classroom celebration featuring a cohort of young female elementary students after completing their routine school-based vaccinations. Proudly displaying their colorful "Bakunado Na Ako - Bakuna Eskwela" cards, the girls are joined by their dedicated classroom advisers and the Tanauan Municipal Health Office immunization team in official RESBAKUNA uniforms. The structured classroom setting ensures an encouraging, fearless environment where students celebrate public health together.',
			highlights: [
				'Comprehensive immunization coverage achieved for female classroom cohort',
				'Collaborative guidance by DepEd homeroom teachers and MHO healthcare frontliners',
				'Celebration of completed vaccination milestone with official Bakuna Eskwela cards',
				'Post-inoculation comfort monitoring ensuring student wellness in the classroom'
			],
			details: {
				station: 'Activity 11: Classroom Cohort Immunization Desk',
				venue: 'Elementary Homeroom Classroom, Tanauan Public School, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'Tanauan MHO Vaccination Squad & DepEd Faculty Advisers',
				cost: '100% Free Public Health Service',
				output: 'Protected Classroom Cohort & Validated Vaccination Cards'
			}
		},
		{
			id: 'sbi-advocate-girl-banner',
			stepCode: 'ACTIVITY 12 // YOUTH ADVOCACY',
			stationName: 'Youth Health Champion & Bakuna Eskwela Placard Presentation',
			badge: 'Youth Advocacy',
			badgeColor: 'bg-pink-600 text-white border-pink-400',
			src: '/images/accomplishments/health-office/sbi/sbi-12.jpg',
			title: 'Youth Health Champion & Bakuna Eskwela Placard Presentation',
			subtitle: 'Empowered Student Promotes Disease Prevention in Front of Official Campaign Banner',
			shortDesc:
				'A bright young schoolgirl smiles warmly as she holds the official Bakuna Eskwela placard in front of the DOH and DepEd partnership backdrop.',
			fullDescription:
				'An inspiring close-up of a young public school student holding the official "Bakuna Eskwela" placard bearing the Department of Health (DOH), Department of Education (DepEd), and Bagong Pilipinas seals. Her bright smile and confidence demonstrate how child-friendly health communication dispels vaccination hesitation, transforming young students into proud advocates of preventive healthcare and wellness within their schools and families.',
			highlights: [
				'Empowering elementary pupils as positive health advocates among their peers',
				'Official DepEd and DOH Eastern Visayas campaign backdrop validation',
				'Promoting positive vaccine attitude and eliminating childhood injection fear',
				'Clear documentation of student participation in school health drives'
			],
			details: {
				station: 'Activity 12: Youth Health Advocacy Desk',
				venue: 'Public School Health Clinic, Tanauan, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'MHO Health Promotion Officers & School Health Coordinator',
				cost: '100% Free Public Service',
				output: 'Empowered Student Advocate & Enhanced Community Vaccine Confidence'
			}
		},
		{
			id: 'sbi-maternal-comfort-care',
			stepCode: 'ACTIVITY 13 // MATERNAL COMFORT',
			stationName: 'Maternal Comfort & Compassionate Pediatric Inoculation',
			badge: 'Maternal Care',
			badgeColor: 'bg-rose-600 text-white border-rose-400',
			src: '/images/accomplishments/health-office/sbi/sbi-13.jpg',
			title: 'Maternal Comfort & Compassionate Pediatric Inoculation',
			subtitle: 'Loving Mother Reassures Her Young Child During Gentle Vaccine Administration',
			shortDesc:
				'A loving mother cradles and comforts her young son in a warm embrace as a dedicated MHO nurse gently and skillfully administers his immunization dose.',
			fullDescription:
				'A poignant moment capturing the human heart of municipal healthcare. A devoted mother holds her young son securely in her arms, providing soothing emotional reassurance and physical comfort while a skilled Tanauan MHO nurse gently administers his vaccine dose. Assisted by attentive healthcare workers in the background, this compassionate family-centered approach ensures that even the most anxious pediatric patients receive vital immunizations with tenderness and trust.',
			highlights: [
				'Family-centered, compassionate care minimizing childhood injection stress',
				'Maternal presence and comforting embrace during clinical administration',
				'Swift, gentle intramuscular injection technique by experienced nurse',
				'Supportive multi-worker team ensuring patient reassurance and safety'
			],
			details: {
				station: 'Activity 13: Compassionate Pediatric Inoculation Desk',
				venue: 'School Immunization Station, Tanauan Public School, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'Tanauan MHO Senior Nurses, BHWs & Accompanied Parents',
				cost: '100% Free Public Service',
				output: 'Gentle, Trauma-Free Pediatric Immunization Delivery'
			}
		},
		{
			id: 'sbi-senior-nurse-admin',
			stepCode: 'ACTIVITY 14 // CLINICAL EXPERTISE',
			stationName: 'Senior Nurse Clinical Inoculation & Injection Safety Technique',
			badge: 'Clinical Expertise',
			badgeColor: 'bg-teal-600 text-white border-teal-400',
			src: '/images/accomplishments/health-office/sbi/sbi-14.jpg',
			title: 'Senior Nurse Clinical Inoculation & Safe Syringe Administration',
			subtitle: 'Veteran Healthcare Officer Delivering Intramuscular Vaccine at Classroom Desk',
			shortDesc:
				'A veteran MHO public health nurse wearing RESBAKUNA attire focuses intently as she safely delivers a vaccine dose to a student seated at his desk.',
			fullDescription:
				'Demonstrating decades of clinical dedication, a senior Tanauan public health nurse wearing the official "RESBAKUNA - Kasangga ng Bida" shirt expertly administers a vaccine dose into the left arm of a student seated at his green wooden classroom desk. With precise aseptic technique and gentle bedside demeanor, the healthcare veteran delivers the dose swiftly and calmly, exemplifying the gold standard of public school healthcare delivery across Tanauan.',
			highlights: [
				'Clinical administration by licensed, highly experienced public health nurse',
				'Adherence to international cold-chain and safe auto-disable syringe standards',
				'In-desk classroom delivery maximizing child comfort and routine normalcy',
				'Close peer support in a supportive, familiar educational environment'
			],
			details: {
				station: 'Activity 14: Safe Clinical Inoculation Station',
				venue: 'Elementary Classroom Desk, Tanauan Public School, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'Senior Public Health Nurse & Tanauan MHO Immunization Team',
				cost: '100% Free Public Service',
				output: 'Flawless Injection Safety & Verified Dose Delivery'
			}
		},
		{
			id: 'sbi-gentle-desk-vaccine',
			stepCode: 'ACTIVITY 15 // GENTLE ADMINISTRATION',
			stationName: 'Gentle In-Desk Immunization & Eye-Level Patient Care',
			badge: 'Pediatric Care',
			badgeColor: 'bg-indigo-600 text-white border-indigo-400',
			src: '/images/accomplishments/health-office/sbi/sbi-15.jpg',
			title: 'Gentle In-Desk Immunization & Eye-Level Pediatric Care',
			subtitle: 'MHO Healthcare Officer Kneeling Beside Pupil to Deliver Reassuring Vaccine Dose',
			shortDesc:
				'A compassionate male healthcare officer kneels down beside a green classroom bench to administer an immunization shot to a young boy at eye level.',
			fullDescription:
				'Exemplifying compassionate, empathetic public healthcare, a dedicated male healthcare officer from the Tanauan Municipal Health Office kneels directly beside a green classroom desk to meet a young pupil at eye level. By adjusting to the child\'s physical height and offering calm, friendly reassurance, the healthcare officer puts the student at ease, expertly delivering the injection with minimal discomfort in the comfortable setting of his daily classroom.',
			highlights: [
				'Empathetic eye-level interaction eliminating medical intimidation',
				'Patient-centered approach creating a comforting, calm experience for the child',
				'Precision injection delivery adhering to sterile clinical safety protocols',
				'Seamless integration of public health services within the school routine'
			],
			details: {
				station: 'Activity 15: Child-Friendly In-Desk Vaccination Desk',
				venue: 'Classroom Green Bench, Tanauan Elementary School, Leyte',
				date: 'Bakuna Eskwela Campaign',
				personnel: 'Tanauan MHO Healthcare Officer & Homeroom Adviser',
				cost: '100% Free Public Service',
				output: 'Empathetic Inoculation & Strengthened Child Immune Defense'
			}
		}
	];

	// ------------------------------------------
	// FOLDER 2: MR-SIA 2026 (CHIKITING LIGTAS - 5 RECORDS)
	// Date: August 13, 2026 | Brgy. San Roque
	// ------------------------------------------
	const mrsiaPhotos = [
		{
			id: 'mrsia-staging',
			stepCode: 'ACTIVITY 01 // TASK FORCE STAGING',
			stationName: 'Inter-Agency Task Force Assembly & Command Staging',
			badge: 'Task Force Assembly',
			badgeColor: 'bg-blue-600 text-white border-blue-400',
			src: '/images/accomplishments/health-office/mrsia/mrsia-2.jpg',
			title: 'Joint Deployment Staging at Brgy. San Roque Multi-Purpose Hall',
			subtitle: 'Inter-Agency Vaccination Briefing with DOH Eastern Visayas & BLGU',
			shortDesc:
				'Tanauan MHO medical officers, DOH Eastern Visayas monitors, Barangay San Roque council members, and BHWs assemble outside the multi-purpose building for tactical deployment.',
			fullDescription:
				'The Measles-Rubella Supplemental Immunization Activity (MR-SIA 2026) launched with an inter-agency operational briefing at the Barangay San Roque Multi-Purpose Building on August 13, 2026. Frontline healthcare teams from the Tanauan Municipal Health Office joined representatives from the Department of Health (DOH) Center for Health Development Eastern Visayas, local barangay council members, and dedicated Barangay Health Workers (BHWs). The team synchronized vaccination target registries, validated vaccine cold-chain carriers, and established tactical street sweeping routes across all puroks to ensure 100% child protection.',
			highlights: [
				'Tri-partite alignment between DOH Eastern Visayas, Tanauan MHO, and San Roque BLGU',
				'Cold-chain vaccine carrier temperature verification (strictly maintained at +2°C to +8°C)',
				'Barangay masterlist validation targeting infants and children 9 to 59 months old',
				'Standardized safety protocols for injection safety and adverse event monitoring'
			],
			details: {
				station: 'Activity 1: Command Briefing & Assembly',
				venue: 'Brgy. San Roque Multi-Purpose Building, Tanauan, Leyte',
				date: 'August 13, 2026',
				personnel: 'Tanauan MHO Nurses, DOH Eastern Visayas Monitors & BHWs',
				cost: '100% Free Public Health Service (DOH & LGU Subsidized)',
				output: 'Validated Target Child Masterlists & Synchronized Deployment Zones'
			}
		},
		{
			id: 'mrsia-sweeping',
			stepCode: 'ACTIVITY 02 // PUROK FIELD MARCH',
			stationName: 'Barangay Purok Field Deployment & Street-Level Sweeping',
			badge: 'Field March & Sweeping',
			badgeColor: 'bg-indigo-600 text-white border-indigo-400',
			src: '/images/accomplishments/health-office/mrsia/mrsia-4.jpg',
			title: 'Barangay Purok Sweeping & Community Field March',
			subtitle: 'Healthcare Foot Patrols Navigating Neighborhood Streets & Alleys',
			shortDesc:
				'Healthcare teams wearing official dark blue DOH vests march through the streets of Barangay San Roque equipped with umbrellas, tally registries, and cold-box vaccine carriers.',
			fullDescription:
				'Dedicated healthcare squads in high-visibility dark blue DOH vests, protective caps, and umbrellas march through the neighborhood streets, inland corridors, and residential lanes of Barangay San Roque. Carrying official Chikiting Ligtas vaccination registries, tally sheets, and portable cold vaccine carriers, the foot patrol ensures that every household—including families in distant purok corners away from main thoroughfares—is visited and evaluated for supplemental immunization.',
			highlights: [
				'Active street-by-street sweeping covering dense residential and peripheral purok zones',
				'Portable cold-chain vaccine carriers ensuring potent live-attenuated MR vaccines',
				'Door-to-door enumeration to eliminate zero-dose and missed immunization gaps',
				'High-visibility municipal presence promoting community trust in national vaccines'
			],
			details: {
				station: 'Activity 2: Foot Patrol & Neighborhood Sweeping',
				venue: 'Purok Corridors & Streets, Brgy. San Roque, Tanauan, Leyte',
				date: 'August 13, 2026',
				personnel: 'Frontline DOH & Tanauan MHO Vaccinator Squads',
				cost: '100% Free Public Service',
				output: 'Purok-Wide Household Coverage & Street Enumeration'
			}
		},
		{
			id: 'mrsia-household',
			stepCode: 'ACTIVITY 03 // DOORSTEP OUTREACH',
			stationName: 'House-to-House Immunization & Household Assessment',
			badge: 'Door-to-Door Outreach',
			badgeColor: 'bg-amber-600 text-white border-amber-400',
			src: '/images/accomplishments/health-office/mrsia/mrsia-1.jpg',
			title: 'Direct House-to-House Immunization & Household Intake',
			subtitle: 'Frontline Clinical Engagement Outside Community Residences',
			shortDesc:
				'DOH Eastern Visayas field supervisor and Tanauan MHO staff interview a resident mother outside her residence, evaluating child health cards and scheduling immunization.',
			fullDescription:
				'A DOH Eastern Visayas field supervisor in an official khaki vest and Tanauan MHO healthcare staff conduct a direct doorstep interaction with a resident mother in Barangay San Roque. The medical team reviews the child’s Early Childhood Care and Development (ECCD) card / Baby Book, inquires about recent health conditions or febrile illnesses, and provides compassionate explanations regarding the lifesaving benefits of Measles-Rubella immunization in preventing pneumonia, encephalitis, and congenital rubella syndrome.',
			highlights: [
				'Direct doorstep consultation eliminating travel barriers for mothers and caregivers',
				'Evaluation of child immunization cards against the National Immunization Program schedule',
				'Screening for clinical contraindications prior to vaccine administration',
				'Patient education on common minor post-immunization responses and safe home care'
			],
			details: {
				station: 'Activity 3: Direct Household Intake',
				venue: 'Residential Purok, Barangay San Roque, Tanauan, Leyte',
				date: 'August 13, 2026',
				personnel: 'DOH Eastern Visayas Supervisor & MHO Public Health Nurses',
				cost: '100% Free Public Service',
				output: 'Individual Household Health Profiling & Vaccine Intake'
			}
		},
		{
			id: 'mrsia-tracking',
			stepCode: 'ACTIVITY 04 // TARGET IDENTIFICATION',
			stationName: 'Doorstep Child Identification & Defaulter Recovery',
			badge: 'Target Child Identification',
			badgeColor: 'bg-emerald-600 text-white border-emerald-400',
			src: '/images/accomplishments/health-office/mrsia/mrsia-3.jpg',
			title: 'Doorstep Child Identification & Target Vaccine Tracking',
			subtitle: 'Locating Defaulters and Zero-Dose Children Right at Their Doorsteps',
			shortDesc:
				'Vaccinators knocking at a residential gate while a young beneficiary holding health documents observes the team, enabling rapid catch-up vaccination.',
			fullDescription:
				'Healthcare personnel knock at a resident’s gated entrance to identify eligible toddlers and children for supplemental vaccination. A young child with health documents in hand eagerly watches the team. This targeted doorstep outreach is vital for defaulter recovery—ensuring that children who missed regular Wednesday immunization sessions at the Rural Health Unit or Barangay Health Station are safely identified, registered, and provided with timely measles-rubella protection.',
			highlights: [
				'Active identification and verification of target children aged 9 to 59 months',
				'Zero-dose tracing bringing vaccines directly to the child’s immediate environment',
				'Friendly, calm interaction minimizing childhood fear of clinical injections',
				'Immediate recording on official DOH Chikiting Ligtas vaccination monitoring forms'
			],
			details: {
				station: 'Activity 4: Doorstep Child Identification',
				venue: 'Household Residence, Brgy. San Roque, Tanauan, Leyte',
				date: 'August 13, 2026',
				personnel: 'Tanauan MHO Field Vaccinators & DOH Monitors',
				cost: '100% Free Public Service',
				output: 'Catch-up Immunization of Previously Missed Beneficiaries'
			}
		},
		{
			id: 'mrsia-advocacy',
			stepCode: 'ACTIVITY 05 // COMMUNITY ADVOCACY',
			stationName: 'Parental Vaccine Counseling, Advocacy & Catch-up Verification',
			badge: 'Parental Counseling',
			badgeColor: 'bg-purple-600 text-white border-purple-400',
			src: '/images/accomplishments/health-office/mrsia/mrsia-5.jpg',
			title: 'Parental Vaccine Counseling, Advocacy & Catch-up Verification',
			subtitle: 'Addressing Vaccine Concerns and Reinforcing Community Herd Immunity',
			shortDesc:
				'Supervising DOH officer providing in-depth vaccine counseling to a community mother with the field vaccination squad in attendance, reinforcing community herd immunity.',
			fullDescription:
				'A vital component of the MR-SIA campaign is intensive community dialogue. A supervising DOH Eastern Visayas health specialist addresses a mother’s questions, addressing vaccine hesitancy with science-backed reassurance on vaccine efficacy, safety, and strict cold-chain compliance. Meanwhile, MHO recording officers cross-check the encounter against the electronic barangay health information system to validate coverage benchmarks and ensure that Tanauan achieves municipal herd immunity.',
			highlights: [
				'One-on-one compassionate counseling addressing parental concerns with medical clarity',
				'Countering vaccine misinformation through trusted, transparent healthcare dialogue',
				'Real-time digital encoding and validation of vaccinated beneficiaries',
				'Strengthening long-term parental commitment to routine pediatric healthcare'
			],
			details: {
				station: 'Activity 5: Community Advocacy & Verification',
				venue: 'Residential Walkway, Brgy. San Roque, Tanauan, Leyte',
				date: 'August 13, 2026',
				personnel: 'DOH Supervising Specialist, Tanauan MHO Nurses & BHWs',
				cost: '100% Free Public Health Service',
				output: 'Parental Reassurance & Validated Municipal Coverage Metrics'
			}
		}
	];

	// ------------------------------------------
	// FOLDER 3: ACTIVE CASE FINDING (ACF - 11 RECORDS)
	// TB Screening & Mobile Chest X-Ray Caravan
	// Theme: Strictly Royal Blue & Amber Yellow
	// ------------------------------------------
	const acfPhotos = [
		{
			id: 'acf-community-registration',
			stepCode: 'STATION 01 // COMMUNITY REGISTRATION',
			stationName: 'Barangay Cabuynan Registration & Demographic Intake Desk',
			badge: 'Community Registration',
			badgeColor: 'bg-blue-700 text-amber-300 border-amber-400/60',
			src: '/images/accomplishments/health-office/active-case-finding/acf-6.jpg',
			title: 'Barangay Cabuynan Community Registration & Patient Intake',
			subtitle: 'Frontline Registration Desk with Dedicated Municipal Health Workers',
			shortDesc:
				'MHO healthcare workers and BHWs manage the frontline registration desk at Barangay Cabuynan covered court, logging resident profiles and issuing caravan slips.',
			fullDescription:
				'The Active Case Finding (ACF) caravan begins with structured community registration managed by Tanauan Municipal Health Office staff and Barangay Health Workers (BHWs). Stationed at the primary intake table with an official "REGISTRATION" placard at the Cabuynan covered court, healthcare workers record patient profiles, check baseline demographic records, and issue individual routing slips that guide residents smoothly toward physician consultation and the mobile digital X-ray unit.',
			highlights: [
				'Systematic patient demographic logging and initial caravan orientation',
				'Issuance of individualized routing slips ensuring smooth station-by-station flow',
				'Close coordination with dedicated Barangay Health Workers (BHWs)',
				'Confidential intake protocols adhering to DOH patient data privacy standards'
			],
			details: {
				station: 'Station 1: Community Registration Desk',
				venue: 'Barangay Cabuynan Covered Court, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'MHO Intake Personnel & Barangay Health Workers',
				cost: '100% Free Public Service (Zero Out-of-Pocket)',
				output: 'Validated Patient Registration & Caravan Routing Slip'
			}
		},
		{
			id: 'acf-konsulta-intake',
			stepCode: 'STATION 02 // KONSULTA PROFILING',
			stationName: 'Clinical Intake & PhilHealth Konsulta Verification Desk',
			badge: 'Konsulta Verification',
			badgeColor: 'bg-amber-400 text-blue-950 border-amber-500',
			src: '/images/accomplishments/health-office/active-case-finding/acf-4.jpg',
			title: 'Clinical Intake & PhilHealth Konsulta Verification Desk',
			subtitle: 'Universal Health Care Coverage & Systematic Diagnostic Tracking',
			shortDesc:
				'Health officers conduct in-depth clinical intake and verify PhilHealth Konsulta registration beside the Philippine flag, preparing patients for medical evaluation.',
			fullDescription:
				'At the second documentation station alongside the Philippine national flag, MHO clinical personnel perform detailed intake verification and cross-reference PhilHealth Konsulta registration numbers. Ensuring complete traceability under the Universal Health Care mandate, every resident is screened for previous respiratory treatments and issued validated laboratory and radiologic routing slips.',
			highlights: [
				'Cross-referencing PhilHealth Konsulta registries for universal health coverage',
				'Detailed medical history intake and previous TB treatment verification',
				'Structured diagnostic referral generation for mobile radiography',
				'Patriotic public service delivery under official municipal health supervision'
			],
			details: {
				station: 'Station 2: Clinical Intake & Konsulta Station',
				venue: 'Barangay Cabuynan Covered Court, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'MHO Clinical Intake Officers & Nurses',
				cost: '100% Free Public Service',
				output: 'Universal Health Care Patient Profile & Diagnostic Tag'
			}
		},
		{
			id: 'acf-anthropometric-triage',
			stepCode: 'STATION 03 // PHYSICAL TRIAGE',
			stationName: 'Anthropometric Assessment & Vital Signs Triage Station',
			badge: 'Anthropometrics & BMI',
			badgeColor: 'bg-blue-800 text-white border-blue-600',
			src: '/images/accomplishments/health-office/active-case-finding/acf-3.jpg',
			title: 'Anthropometric Measurement & Physical Vital Signs Triage',
			subtitle: 'Calibrated Stadiometer Height, Balance Scale Weight & Nutritional Profiling',
			shortDesc:
				'Municipal health worker recording patient height using an adjustable clinical stadiometer and balance beam scale to calculate Body Mass Index and detect chronic wasting.',
			fullDescription:
				'Before proceeding to medical consultation, all attending residents undergo comprehensive physical baseline triage. An MHO healthcare worker utilizes a calibrated clinical stadiometer to record standing height concurrently with accurate weight measurement on a heavy-duty beam scale. Rapid Body Mass Index (BMI) assessment enables health staff to immediately flag unexplained weight loss, malnutrition, or chronic wasting—key physical indicators associated with pulmonary tuberculosis.',
			highlights: [
				'Precision standing height evaluation with adjustable clinical stadiometer',
				'Calibrated beam scale weight capture and immediate BMI calculation',
				'Nutritional vulnerability and chronic wasting risk detection',
				'Baseline vital signs capture feeding directly into physician consultation'
			],
			details: {
				station: 'Station 3: Anthropometric Triage Station',
				venue: 'Barangay Cabuynan Covered Court, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'Municipal Health Workers & Triage Nursing Staff',
				cost: '100% Free Public Service',
				output: 'Calibrated BMI, Height, Weight & Baseline Triage Vitals'
			}
		},
		{
			id: 'acf-clinical-interview',
			stepCode: 'STATION 04 // PATIENT INTERVIEW',
			stationName: 'One-on-One Clinical Interview & Symptom Screening',
			badge: 'Clinical Screening Desk',
			badgeColor: 'bg-amber-500 text-blue-950 border-amber-400',
			src: '/images/accomplishments/health-office/active-case-finding/acf-2.jpg',
			title: 'Frontline Patient Interview & Clinical Health Assessment',
			subtitle: 'Individual Health Assessment & Confidential Symptom Screening',
			shortDesc:
				'MHO public health nurse conducting a focused interview at the green screening table to evaluate respiratory symptoms, chronic cough, and household contacts.',
			fullDescription:
				'A dedicated public health officer from the Tanauan Municipal Health Office conducts confidential, individualized clinical consultations at the covered court screening table. Using standardized Department of Health (DOH) clinical algorithms, the officer evaluates residents for cardinal tuberculosis symptoms—including cough exceeding two weeks, unexplained fever, night sweats, chest pain, and household contact with diagnosed TB patients.',
			highlights: [
				'Thorough symptom evaluation using DOH National TB Control Program guidelines',
				'Confidential medical history taking and household contact tracing assessment',
				'Immediate diagnostic tagging for on-site mobile digital chest radiography',
				'Health education counseling on respiratory hygiene and disease prevention'
			],
			details: {
				station: 'Station 4: Clinical Consultation & Assessment Desk',
				venue: 'Barangay Cabuynan Covered Court, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'MHO Public Health Nurses & Clinical Officers',
				cost: '100% Free Public Service',
				output: 'Clinical Evaluation Report & Diagnostic Radiologic Referral'
			}
		},
		{
			id: 'acf-physician-consultation',
			stepCode: 'STATION 05 // PHYSICIAN EVALUATION',
			stationName: 'Dedicated Physician Consultation & Pediatric/Adult TB Assessment',
			badge: 'Physician Consultation',
			badgeColor: 'bg-blue-700 text-amber-300 border-amber-400/60',
			src: '/images/accomplishments/health-office/active-case-finding/acf-7.jpg',
			title: 'Frontline Physician Consultation & Pediatric/Adult TB Assessment',
			subtitle: 'Physician History Intake & Presumptive TB Risk Stratification at Mobile Unit',
			shortDesc:
				'A dedicated MHO healthcare officer in medical scrubs interviews a young boy and elderly resident at the outdoor screening table adjacent to the mobile X-ray van.',
			fullDescription:
				'A dedicated medical officer from the Tanauan Municipal Health Office conducts clinical consultations at the outdoor table stationed directly beside the mobile clinic truck. Evaluating both pediatric and elderly patients for presumptive tuberculosis, the clinician performs detailed history intakes, respiratory auscultation, and immediate radiologic prioritization to ensure prompt diagnostic imaging without delays.',
			highlights: [
				'Personalized physician evaluation of pediatric and adult community residents',
				'Direct physical proximity to mobile X-ray van for seamless patient handover',
				'Immediate clinical risk stratification and prescription of initial care',
				'Supportive bedside manner minimizing pediatric anxiety and distress'
			],
			details: {
				station: 'Station 5: Physician Consultation Station',
				venue: 'Courtyard Beside Mobile Van, Cabuynan, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'MHO Medical Officers & Public Health Nurses',
				cost: '100% Free Public Service',
				output: 'Physician Clinical Evaluation & Direct X-Ray Admission'
			}
		},
		{
			id: 'acf-xray-facility',
			stepCode: 'STATION 06 // RADIOLOGIC DIAGNOSTICS',
			stationName: 'Mobile Digital Chest X-Ray Facility & Diagnostic Van Operations',
			badge: 'Mobile Digital X-Ray',
			badgeColor: 'bg-amber-400 text-blue-950 border-amber-500',
			src: '/images/accomplishments/health-office/active-case-finding/acf-1.jpg',
			title: 'Mobile Digital Chest X-Ray & Laboratory Diagnostic Van',
			subtitle: 'Direct On-Site Radiologic Diagnostics Deployed to Barangay Cabuynan',
			shortDesc:
				'Certified radiologic staff hand diagnostic slips to a resident entering the Quest & Reliance Diagnostics specialized mobile chest X-ray truck.',
			fullDescription:
				'The core diagnostic cornerstone of the Active Case Finding mission is the specialized mobile diagnostic clinic truck from Quest & Reliance Diagnostics. Stationed directly beside the covered court, certified radiologic technologists operate a climate-controlled, radiation-shielded mobile chamber with high-frequency digital X-ray sensors. The elimination of travel barriers ensures rural Tanauananons receive instant, gold-standard chest radiologic imaging within minutes of clinical evaluation.',
			highlights: [
				'Radiation-shielded mobile medical van with digital radiography apparatus',
				'Certified radiologic technologists and medical technologist operations',
				'Instant on-site diagnostic capture eliminating travel to urban medical centers',
				'Direct linkage to Tanauan RHU TB-DOTS clinic for rapid treatment initiation'
			],
			details: {
				station: 'Station 6: Mobile Radiologic Diagnostic Facility',
				venue: 'Mobile Clinic Truck, Cabuynan Covered Court, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'Licensed Radiologic Technologists (Quest & Reliance Diagnostics)',
				cost: '100% Free Public Diagnostic Examination',
				output: 'Digital Chest Radiograph & Diagnostic Assessment Slip'
			}
		},
		{
			id: 'acf-assembly-pavilion',
			stepCode: 'STATION 07 // COMMUNITY MOBILIZATION',
			stationName: 'Barangay Cabuynan Community Assembly & Mass Screening Pavilion',
			badge: 'Community Mobilization',
			badgeColor: 'bg-blue-900 text-amber-200 border-blue-700',
			src: '/images/accomplishments/health-office/active-case-finding/acf-5.jpg',
			title: 'Barangay Cabuynan Community Assembly & Mass Screening Outreach',
			subtitle: 'High-Turnout Resident Participation & Structured Multi-Station Caravan Flow',
			shortDesc:
				'Dozens of community residents seated in structured waiting zones at the Barangay Cabuynan covered court with the mobile diagnostic van visible in the background.',
			fullDescription:
				'A wide-angle perspective of the Barangay Cabuynan covered court highlighting the impressive community turnout and disciplined operational layout executed by the Tanauan Municipal Health Office. Residents sit comfortably in shaded, spaced seating sectors with their health profiling records in hand, awaiting sequential station calls. The seamless coordination between the barangay local government and the MHO medical team exemplifies community-centered healthcare delivery under the Universal Health Care mandate.',
			highlights: [
				'Robust community mobilization and high resident attendance across sectors',
				'Comfortable, shaded waiting stations with sequential patient routing',
				'Visible proximity to the on-site mobile X-ray diagnostic vehicle',
				'Exemplary inter-agency coordination between MHO and Cabuynan Barangay Council'
			],
			details: {
				station: 'Station 7: Mass Assembly & Waiting Pavilion',
				venue: 'Barangay Cabuynan Covered Court, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'Barangay Tanods, Health Workers & MHO Marshals',
				cost: 'Community-Wide Free Access',
				output: 'Comprehensive Barangay Health Screening Coverage'
			}
		},
		{
			id: 'acf-parallel-screening',
			stepCode: 'STATION 08 // SYMPTOM SCREENING DESK',
			stationName: 'Parallel Clinical Screening & Patient Symptom Intake Desks',
			badge: 'Symptom Screening',
			badgeColor: 'bg-blue-700 text-amber-300 border-amber-400/60',
			src: '/images/accomplishments/health-office/active-case-finding/acf-8.jpg',
			title: 'Parallel Clinical Screening & Patient Symptom Intake Desks',
			subtitle: 'DOH & Tanauan MHO Personnel Conducting In-Depth Respiratory Consultations',
			shortDesc:
				'Healthcare personnel in black DOH uniform and MHO staff at green and purple draped tables interview female residents to assess respiratory health and exposure.',
			fullDescription:
				'Operating at dual interview tables covered in vibrant clinic cloths, dedicated frontline public health personnel from the Department of Health and the Tanauan Municipal Health Office conduct focused symptom assessments. By running parallel consultation desks, the health team significantly expedites patient throughput, carefully evaluating each resident for persistent cough, unexplained fever, and household contact risks while providing empathetic counseling on tuberculosis prevention and free cure availability under the National TB Control Program.',
			highlights: [
				'High-efficiency parallel consultation desks reducing patient waiting time',
				'Comprehensive clinical intake evaluating cardinal pulmonary symptoms',
				'Empathetic patient counseling destigmatizing tuberculosis and treatment',
				'Direct clinical routing to laboratory triage and on-site radiography'
			],
			details: {
				station: 'Station 8: Parallel Symptom Screening Desk',
				venue: 'Barangay Cabuynan Covered Court, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'DOH Health Personnel & MHO Public Health Nurses',
				cost: '100% Free Public Health Service',
				output: 'Clinical Symptom Evaluation & Priority Diagnostic Tag'
			}
		},
		{
			id: 'acf-queue-marshaling',
			stepCode: 'STATION 09 // QUEUE FLOW TRIAGE',
			stationName: 'Queue Triage Management & In-Aisle Form Verification',
			badge: 'Queue Triage',
			badgeColor: 'bg-amber-400 text-blue-950 border-amber-500',
			src: '/images/accomplishments/health-office/active-case-finding/acf-9.jpg',
			title: 'Queue Triage Management & In-Aisle Form Verification',
			subtitle: 'Active Patient Flow Marshaling Ensuring Rapid Diagnostic Progression',
			shortDesc:
				'MHO health officers actively move through the seated rows of residents in the covered court, verifying profiling forms and coordinating station call-outs.',
			fullDescription:
				'To maintain flawless operational discipline and prevent bottlenecks, roving Tanauan Municipal Health Office marshals and nurse supervisors navigate the seating aisles of the covered court. Interacting directly with seated residents, officers pre-screen demographic cards, verify questionnaire completeness, answer patient inquiries, and systematically guide groups of attendees to the next active clinical station. This proactive queue management ensures a dignified, comfortable, and well-organized caravan experience for elderly and pediatric attendees alike.',
			highlights: [
				'Proactive in-aisle pre-screening ensuring 100% complete diagnostic paperwork',
				'Dignified, comfortable patient flow management across covered court seating zones',
				'Direct communication and guidance for senior citizens and vulnerable residents',
				'Zero delays in feeding qualified patients to the mobile radiologic facility'
			],
			details: {
				station: 'Station 9: Queue Flow Triage Station',
				venue: 'Barangay Cabuynan Covered Court, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'MHO Queue Marshals & Supervising Public Health Nurses',
				cost: '100% Free Public Service',
				output: 'Pre-Screened Patient Routing & Orderly Caravan Progression'
			}
		},
		{
			id: 'acf-radiologic-consent',
			stepCode: 'STATION 10 // DIAGNOSTIC CONSENT',
			stationName: 'Radiologic Consent & Diagnostic Routing Desk',
			badge: 'Radiologic Consent',
			badgeColor: 'bg-blue-800 text-white border-blue-600',
			src: '/images/accomplishments/health-office/active-case-finding/acf-10.jpg',
			title: 'Radiologic Consent & Diagnostic Routing Desk',
			subtitle: 'Quest & Reliance Personnel Synchronizing Patient Records for X-Ray Imaging',
			shortDesc:
				'A Quest & Reliance diagnostic officer in a green polo and a BHW assist residents at a purple-draped table with official examination consent and radiologic slips.',
			fullDescription:
				'Stationed at a dedicated purple-draped intake desk directly adjacent to the mobile X-ray van, a specialized diagnostic officer from Quest & Reliance Diagnostics teams up with a Barangay Health Worker. Together, they review clinical referrals, obtain informed radiologic consent, issue official digital X-ray tracking numbers, and instruct residents on safe imaging procedures. This meticulous handover station bridges primary municipal triage with advanced radiologic imaging.',
			highlights: [
				'Formal validation of radiologic referral slips and patient consent documentation',
				'Direct coordination between private diagnostic partner and municipal BHWs',
				'Issuance of digital barcode tracking tags linked to radiologist reading queues',
				'Comprehensive patient orientation on auto-radiography safety protocols'
			],
			details: {
				station: 'Station 10: Radiologic Consent & Intake Desk',
				venue: 'Mobile Diagnostic Staging Area, Cabuynan, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'Quest & Reliance Diagnostic Officer & Barangay Health Workers',
				cost: '100% Free Diagnostic Service',
				output: 'Informed Radiologic Consent & Digital Examination Barcode'
			}
		},
		{
			id: 'acf-veranda-waiting',
			stepCode: 'STATION 11 // VERANDA WAITING PAVILION',
			stationName: 'Shaded Clinic Veranda Waiting Pavilion & Pre-Screening Area',
			badge: 'Veranda Waiting Area',
			badgeColor: 'bg-amber-500 text-blue-950 border-amber-400',
			src: '/images/accomplishments/health-office/active-case-finding/acf-11.jpg',
			title: 'Shaded Clinic Veranda Waiting Pavilion & Pre-Screening Line',
			subtitle: 'Orderly Community Seating Area Outside the Rural Health Unit Annex',
			shortDesc:
				'Rows of community residents wearing protective face masks sit comfortably under the covered veranda outside the barangay health building holding their documents.',
			fullDescription:
				'Illustrating high civic trust and outstanding community participation, dozens of residents of all ages sit in neat, shaded rows under the covered veranda pavilion of the health center. Equipped with protective masks and holding their medical questionnaires, attendees wait comfortably with electric cooling fans provided by the municipal health team. This shaded holding area ensures patient safety from tropical sun exposure while maintaining orderly progression into the diagnostic caravan.',
			highlights: [
				'Comfortable, weather-protected veranda seating equipped with ventilation fans',
				'Strict infection prevention and respiratory hygiene compliance with masks',
				'Inclusive participation of diverse age groups, youth, mothers, and elders',
				'Exemplary community engagement under Tanauan’s Universal Health Care mandate'
			],
			details: {
				station: 'Station 11: Veranda Waiting Pavilion',
				venue: 'Health Center Covered Veranda, Cabuynan, Tanauan, Leyte',
				date: 'Community Health Caravan',
				personnel: 'Barangay Tanods, Health Staff & Community Marshals',
				cost: '100% Free Public Service',
				output: 'Protected Community Staging & Sequential Patient Call-Outs'
			}
		}
	];

	// ------------------------------------------
	// THE 3 DOSSIER FOLDERS CATALOG
	// ------------------------------------------
	const folders = [
		{
			id: 'sbi',
			folderCode: 'DOSSIER // MHO-SBI-2026',
			title: 'School-Based Immunization (Bakuna Eskwela)',
			category: 'School Health & Child Immunization',
			badge: 'Bakuna Eskwela Campaign',
			badgeBg: 'bg-emerald-500/20 text-emerald-900 border-emerald-400/40',
			tabBg: 'bg-emerald-400 text-blue-950 border-emerald-500',
			accentGrad: 'from-emerald-500/20 via-blue-500/10 to-amber-500/20',
			icon: '🏫',
			partner: 'DepEd & DOH Eastern Visayas',
			venue: 'Camire & Tanauan Public Elementary Schools',
			description:
				'Joint immunization drive by the Tanauan Municipal Health Office, DepEd, and DOH delivering Measles-Rubella, Tetanus-Diphtheria, and HPV vaccines directly to public school classrooms and remote island/river communities.',
			metrics: [
				{ label: 'Photos', value: '15 Records' },
				{ label: 'Outreach', value: 'Hanging Bridge Logistics' },
				{ label: 'Vaccines', value: 'MR, Td & HPV' },
				{ label: 'Beneficiary Cost', value: '₱0 Free' }
			],
			photos: sbiPhotos
		},
		{
			id: 'mrsia',
			folderCode: 'DOSSIER // MHO-MRSIA-2026',
			title: 'Measles-Rubella Supplemental Immunization (MR-SIA 2026)',
			category: 'Supplementary Immunization Campaign',
			badge: 'Chikiting Ligtas Campaign',
			badgeBg: 'bg-amber-500/20 text-amber-950 border-amber-400/40',
			tabBg: 'bg-amber-400 text-blue-950 border-amber-500',
			accentGrad: 'from-amber-500/20 via-rose-500/10 to-blue-500/20',
			icon: '💉',
			partner: 'DOH Eastern Visayas & BLGU San Roque',
			venue: 'Barangay San Roque & Purok Residences',
			description:
				'Door-to-door supplemental immunization sweeping conducted on August 13, 2026, mobilizing inter-agency squads for doorstep child tracking, defaulter recovery, and parental vaccine counseling.',
			metrics: [
				{ label: 'Campaign Date', value: 'August 13, 2026' },
				{ label: 'Strategy', value: 'Doorstep Sweeping' },
				{ label: 'Target Age', value: '9–59 Months' },
				{ label: 'Beneficiary Cost', value: '₱0 Free' }
			],
			photos: mrsiaPhotos
		},
		{
			id: 'acf',
			folderCode: 'DOSSIER // MHO-ACF-2024-TB',
			title: 'TB Active Case Finding & Mobile Chest X-Ray Caravan',
			category: 'Primary Diagnostic Caravan',
			badge: 'Mobile X-Ray Caravan',
			badgeBg: 'bg-amber-400/20 text-blue-950 border-amber-400/50',
			tabBg: 'bg-blue-900 text-amber-300 border-blue-950',
			accentGrad: 'from-blue-900/25 via-blue-800/15 to-amber-500/25',
			icon: '⚕️',
			partner: 'Quest & Reliance Diagnostics',
			venue: 'Barangay Cabuynan Covered Court',
			description:
				'On-site mobile radiologic screening and comprehensive 11-station clinical triage caravan deployed to rural barangays to actively detect, diagnose, and treat presumptive tuberculosis cases.',
			metrics: [
				{ label: 'Photos', value: '11 Records' },
				{ label: 'Diagnostic Van', value: 'Digital Chest X-Ray' },
				{ label: 'Stations', value: '11 Clinical Stations' },
				{ label: 'Beneficiary Cost', value: '₱0 Free' }
			],
			photos: acfPhotos
		}
	];

	// Derived Selected Folder & Active Photo
	const currentFolder = $derived(folders.find((f) => f.id === activeFolderId) || folders[0]);
	const activePhoto = $derived(currentFolder.photos[activePhotoIndex]);

	// Open Folder Modal
	function openFolderModal(folderId, photoIndex = 0) {
		activeFolderId = folderId;
		activePhotoIndex = photoIndex;
		isModalOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeModal() {
		isModalOpen = false;
		isFullscreen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function nextPhoto() {
		activePhotoIndex = (activePhotoIndex + 1) % currentFolder.photos.length;
	}

	function prevPhoto() {
		activePhotoIndex = (activePhotoIndex - 1 + currentFolder.photos.length) % currentFolder.photos.length;
	}

	function switchFolder(folderId) {
		activeFolderId = folderId;
		activePhotoIndex = 0;
	}

	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
	}

	function handleKeydown(e) {
		if (!isModalOpen) return;
		if (e.key === 'Escape') {
			if (isFullscreen) {
				isFullscreen = false;
			} else {
				closeModal();
			}
		} else if (e.key === 'ArrowRight') {
			nextPhoto();
		} else if (e.key === 'ArrowLeft') {
			prevPhoto();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- COMPACT MULTI-FOLDER ACCOMPLISHMENTS CONTAINER -->
<!-- Clean, concise, and non-stretched design -->
<div class="relative w-full space-y-8">
	<!-- Top Section Description & Quick Summary -->
	<div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
		<div>
			<span class="text-[11px] font-mono font-black tracking-widest text-blue-900 uppercase">
				MUNICIPAL HEALTH OFFICE // OFFICIAL DOSSIERS
			</span>
			<h3 class="text-xl sm:text-2xl font-black text-blue-950 tracking-tight">
				Public Health Field Operations & Outreach Folders
			</h3>
			<p class="text-xs sm:text-sm text-slate-600 mt-1">
				Click any folder below to open its animated inspection window with all high-resolution photos and clinical details.
			</p>
		</div>

		<div class="flex items-center gap-2">
			<span class="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-black text-blue-900 shadow-sm">
				📁 3 Official Campaign Folders
			</span>
			<span class="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-black text-emerald-900 shadow-sm">
				📸 31 Total Photo Records
			</span>
		</div>
	</div>

	<!-- ============================================== -->
	<!-- COMPACT 3-FOLDER GRID                         -->
	<!-- All pictures are safely stored inside folders  -->
	<!-- ============================================== -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		{#each folders as folder}
			<button
				type="button"
				onclick={() => openFolderModal(folder.id, 0)}
				class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-slate-300 bg-gradient-to-b from-white via-slate-50 to-slate-100 p-6 sm:p-7 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-2xl focus:outline-none cursor-pointer"
			>
				<!-- Top Manila Tab -->
				<div class="absolute -top-1 left-6 flex items-center">
					<div
						class="flex items-center gap-1.5 rounded-t-xl border-t-2 border-x-2 px-3.5 py-1 text-[10px] font-black tracking-wider uppercase shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 {folder.tabBg}"
					>
						<span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-950 animate-pulse"></span>
						<span>{folder.folderCode}</span>
					</div>
				</div>

				<!-- Subtle Watermark -->
				<div class="pointer-events-none absolute right-2 -bottom-2 text-slate-200/50 font-black text-7xl select-none">
					{folder.id.toUpperCase()}
				</div>

				<div class="relative z-10 pt-4 space-y-4">
					<!-- Folder Icon & Badge -->
					<div class="flex items-start justify-between gap-3">
						<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-amber-300 text-2xl shadow-md border border-white/20">
							{folder.icon}
						</div>
						<span class="rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider {folder.badgeBg}">
							{folder.badge}
						</span>
					</div>

					<!-- Folder Title & Subtitle -->
					<div>
						<h4 class="text-lg font-black text-blue-950 tracking-tight leading-snug group-hover:text-blue-900 transition-colors">
							{folder.title}
						</h4>
						<span class="inline-block text-[11px] font-bold {folder.id === 'acf' ? 'text-blue-900' : 'text-cyan-800'} mt-1">
							📍 {folder.venue}
						</span>
					</div>

					<!-- Description Snippet -->
					<p class="text-xs leading-relaxed text-slate-600 line-clamp-3">
						{folder.description}
					</p>

					<!-- Visual 3D Stacked Preview of Photos Peeking Out -->
					<div class="relative h-24 w-full rounded-2xl bg-slate-100 border border-slate-200 p-2 overflow-hidden">
						<div class="flex items-center justify-center h-full relative">
							<!-- 3rd Stacked Photo -->
							<div
								class="absolute h-18 w-24 rounded-lg border-2 border-white shadow-md overflow-hidden transition-all duration-300 group-hover:rotate-12 group-hover:translate-x-12 rotate-6 translate-x-8"
							>
								<img src={folder.photos[2].src} alt="" class="h-full w-full object-cover" />
							</div>
							<!-- 2nd Stacked Photo -->
							<div
								class="absolute h-18 w-24 rounded-lg border-2 border-white shadow-md overflow-hidden transition-all duration-300 group-hover:-rotate-12 group-hover:-translate-x-12 -rotate-6 -translate-x-8"
							>
								<img src={folder.photos[1].src} alt="" class="h-full w-full object-cover" />
							</div>
							<!-- 1st Top Photo -->
							<div
								class="relative z-10 h-20 w-28 rounded-lg border-2 border-amber-400 shadow-xl overflow-hidden transition-transform duration-300 group-hover:scale-105"
							>
								<img src={folder.photos[0].src} alt="" class="h-full w-full object-cover" />
								<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1">
									<span class="text-[9px] font-black text-amber-300 uppercase tracking-wider">
										{folder.photos.length} Photos
									</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Quick Metric Pills -->
					<div class="grid grid-cols-2 gap-2 pt-1 text-[11px]">
						<div class="rounded-xl border border-slate-200 bg-white/90 px-2.5 py-1.5">
							<span class="block text-[9px] font-bold text-slate-400 uppercase">Records</span>
							<span class="font-black text-blue-950 truncate block">{folder.photos.length} Photos Available</span>
						</div>
						<div class="rounded-xl border border-slate-200 bg-white/90 px-2.5 py-1.5">
							<span class="block text-[9px] font-bold text-slate-400 uppercase">Cost</span>
							<span class="font-black {folder.id === 'acf' ? 'text-blue-900' : 'text-emerald-700'} truncate block">100% Free Public Service</span>
						</div>
					</div>
				</div>

				<!-- Folder Bottom Click CTA -->
				<div class="relative z-10 mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4 text-xs font-black text-blue-950">
					<span class="inline-flex items-center gap-1 group-hover:text-amber-600 transition-colors">
						Open Folder & Inspect Photos ({folder.photos.length})
					</span>
					<span class="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-950 text-amber-300 shadow transition-transform duration-300 group-hover:scale-110">
						↗
					</span>
				</div>
			</button>
		{/each}
	</div>
</div>

<!-- ============================================== -->
<!-- ANIMATED POP-UP WINDOW / LIGHTBOX MODAL        -->
<!-- Opens upon clicking any of the 3 folders       -->
<!-- ============================================== -->
{#if isModalOpen}
	<!-- Backdrop with Smooth Blur & Fade Animation -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
		transition:fade={{ duration: 220 }}
		onclick={closeModal}
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-folder-title"
		tabindex="-1"
	>
		<!-- Modal Window with Smooth Scale & Fly Animation -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative my-auto w-full {isFullscreen ? 'max-w-[96vw]' : 'max-w-6xl'} rounded-3xl border-2 border-amber-400/80 bg-white shadow-2xl overflow-hidden transition-all duration-300"
			transition:scale={{ duration: 250, start: 0.95 }}
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Top Modal Bar -->
			<div class="relative border-b-2 border-slate-200 bg-gradient-to-r from-[#071328] via-[#091a38] to-[#040d1c] px-5 sm:px-7 py-4 text-white">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
					<div class="flex items-center gap-3">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-blue-950 text-xl font-black shadow-md">
							{currentFolder.icon}
						</div>
						<div>
							<div class="flex flex-wrap items-center gap-2">
								<span class="text-[10px] font-mono font-black tracking-widest text-amber-400 uppercase">
									{currentFolder.folderCode}
								</span>
								<span class="rounded {activeFolderId === 'acf' ? 'bg-blue-950 text-amber-300 border border-amber-400/40' : 'bg-cyan-900/80 text-cyan-200'} px-2 py-0.5 text-[9px] font-black uppercase">
									Photo {activePhotoIndex + 1 < 10 ? '0' : ''}{activePhotoIndex + 1} of {currentFolder.photos.length < 10 ? '0' : ''}{currentFolder.photos.length}
								</span>
								<span class="rounded {activeFolderId === 'acf' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-emerald-900/80 text-emerald-200'} px-2 py-0.5 text-[9px] font-black uppercase truncate max-w-xs">
									{currentFolder.venue}
								</span>
							</div>
							<h3 id="modal-folder-title" class="text-base sm:text-xl font-black text-white tracking-tight leading-snug truncate max-w-xl">
								{activePhoto.title}
							</h3>
						</div>
					</div>

					<!-- Window Controls & Folder Switcher Tabs -->
					<div class="flex items-center gap-2 self-end sm:self-auto">
						<!-- Switch Between the 3 Folders in Modal -->
						<div class="inline-flex rounded-xl bg-white/10 p-1 border border-white/15">
							{#each folders as f}
								<button
									type="button"
									onclick={() => switchFolder(f.id)}
									class="rounded-lg px-2.5 py-1 text-[11px] font-black transition-all cursor-pointer {activeFolderId === f.id ? 'bg-amber-400 text-blue-950 shadow-sm' : 'text-slate-300 hover:text-white'}"
									title={f.title}
								>
									{f.badge.split(' ')[0]} ({f.photos.length})
								</button>
							{/each}
						</div>

						<!-- Fullscreen Toggle -->
						<button
							type="button"
							onclick={toggleFullscreen}
							class="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 cursor-pointer"
							title={isFullscreen ? 'Exit Fullscreen' : 'Expand View'}
							aria-label="Toggle Fullscreen"
						>
							{#if isFullscreen}
								⤓
							{:else}
								⤢
							{/if}
						</button>

						<!-- Close Window Button -->
						<button
							type="button"
							onclick={closeModal}
							class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-all hover:bg-red-600 hover:border-red-500 active:scale-95 cursor-pointer"
							title="Close Window (Esc)"
							aria-label="Close modal"
						>
							✕
						</button>
					</div>
				</div>
			</div>

			<!-- Modal Body (Two-Column Interactive Stage) -->
			<div class="max-h-[82vh] overflow-y-auto bg-slate-50/70 p-4 sm:p-6 md:p-8 space-y-6">
				<!-- Stage Row: Photo Viewer & Information Deck -->
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
					<!-- LEFT / TOP COLUMN: Full-Res Photo Stage (7 cols) -->
					<div class="lg:col-span-7 space-y-3">
						<!-- Image Display Box with Zoom and Navigation Arrows -->
						<div
							class="relative overflow-hidden rounded-2xl bg-slate-950 border-2 border-slate-300 shadow-xl flex items-center justify-center"
						>
							<img
								src={activePhoto.src}
								alt={activePhoto.title}
								class="w-full {isFullscreen ? 'max-h-[72vh]' : 'max-h-[52vh] sm:max-h-[60vh]'} object-contain bg-slate-950 transition-all duration-300"
							/>

							<!-- Previous Button -->
							<button
								type="button"
								onclick={prevPhoto}
								class="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/80 text-white border border-white/25 backdrop-blur-md shadow-xl transition-all hover:bg-amber-400 hover:text-blue-950 hover:scale-110 active:scale-95 cursor-pointer"
								title="Previous photo (Left Arrow)"
								aria-label="Previous photo"
							>
								←
							</button>

							<!-- Next Button -->
							<button
								type="button"
								onclick={nextPhoto}
								class="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/80 text-white border border-white/25 backdrop-blur-md shadow-xl transition-all hover:bg-amber-400 hover:text-blue-950 hover:scale-110 active:scale-95 cursor-pointer"
								title="Next photo (Right Arrow)"
								aria-label="Next photo"
							>
								→
							</button>

							<!-- Top Left Step Pill -->
							<div class="absolute top-3 left-3">
								<span
									class="rounded-lg border px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md {activePhoto.badgeColor}"
								>
									{activePhoto.stepCode}
								</span>
							</div>

							<!-- Bottom Left Photo Caption -->
							<div class="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
								<span class="rounded-lg bg-slate-900/85 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md shadow">
									Photo {activePhotoIndex + 1} of {currentFolder.photos.length}
								</span>
								<span class="rounded-lg bg-slate-900/85 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur-md shadow truncate">
									{currentFolder.title}
								</span>
							</div>
						</div>

						<!-- Interactive Thumbnail Row (Scrollable if many photos) -->
						<div class="flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
							{#each currentFolder.photos as thumb, idx}
								<button
									type="button"
									onclick={() => (activePhotoIndex = idx)}
									class="relative h-16 w-20 sm:h-20 sm:w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer {activePhotoIndex === idx ? 'border-amber-400 ring-2 ring-amber-400/50 scale-102' : 'border-slate-300 opacity-60 hover:opacity-100'}"
									title={thumb.stationName}
								>
									<img src={thumb.src} alt="" class="h-full w-full object-cover" />
									<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
										<span class="text-[9px] font-black text-white font-mono">
											{idx + 1 < 10 ? '0' : ''}{idx + 1}
										</span>
									</div>
								</button>
							{/each}
						</div>
					</div>

					<!-- RIGHT / BOTTOM COLUMN: Rich Clinical Information Deck (5 cols) -->
					<div class="lg:col-span-5 space-y-4">
						<!-- Station / Activity Identity Card -->
						<div class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-3">
							<div class="flex items-center justify-between border-b border-slate-100 pb-3">
								<span class="inline-flex items-center gap-1.5 rounded-lg {activeFolderId === 'acf' ? 'bg-blue-950 text-amber-300 border border-blue-800' : 'bg-blue-100 text-blue-900'} px-2.5 py-1 text-[11px] font-mono font-black uppercase">
									<span>📍</span> {activePhoto.details.station}
								</span>
								<span class="text-xs font-bold {activeFolderId === 'acf' ? 'text-blue-950 bg-amber-400 border border-amber-500 font-black' : 'text-emerald-700 bg-emerald-50 border border-emerald-200'} px-2.5 py-0.5 rounded-full">
									{activePhoto.details.cost}
								</span>
							</div>

							<div>
								<h4 class="text-lg font-black text-blue-950 tracking-tight">
									{activePhoto.title}
								</h4>
								<p class="text-xs font-bold {activeFolderId === 'acf' ? 'text-amber-600' : 'text-cyan-800'} mt-0.5">
									{activePhoto.subtitle}
								</p>
							</div>

							<!-- Full Narrative Description -->
							<p class="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
								{activePhoto.fullDescription}
							</p>
						</div>

						<!-- Key Operational Highlights -->
						<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2.5">
							<h5 class="text-xs font-black uppercase tracking-wider text-blue-950 flex items-center gap-2">
								<span class="flex h-5 w-5 items-center justify-center rounded bg-amber-400 text-blue-950 text-xs font-black">✓</span>
								Activity Protocol Highlights
							</h5>
							<ul class="space-y-2">
								{#each activePhoto.highlights as highlight}
									<li class="flex items-start gap-2 text-xs leading-relaxed text-slate-700">
										<span class="{activeFolderId === 'acf' ? 'text-amber-500' : 'text-cyan-600'} font-black mt-0.5">•</span>
										<span>{highlight}</span>
									</li>
								{/each}
							</ul>
						</div>

						<!-- Station / Activity Specifications Box -->
						<div class="rounded-2xl border border-slate-200 bg-slate-100/80 p-4 text-xs space-y-2">
							<div class="flex items-center justify-between text-slate-600 border-b border-slate-200/80 pb-1.5">
								<span class="font-bold text-slate-800">Operational Venue:</span>
								<span class="font-semibold text-blue-950 truncate max-w-[200px]">{activePhoto.details.venue}</span>
							</div>
							<div class="flex items-center justify-between text-slate-600 border-b border-slate-200/80 pb-1.5">
								<span class="font-bold text-slate-800">Program / Date:</span>
								<span class="font-semibold text-blue-950">{activePhoto.details.date}</span>
							</div>
							<div class="flex items-center justify-between text-slate-600 border-b border-slate-200/80 pb-1.5">
								<span class="font-bold text-slate-800">Field Personnel:</span>
								<span class="font-semibold text-blue-950 truncate max-w-[200px]">{activePhoto.details.personnel}</span>
							</div>
							<div class="flex items-center justify-between text-slate-600">
								<span class="font-bold text-slate-800">Key Deliverable:</span>
								<span class="font-semibold {activeFolderId === 'acf' ? 'text-blue-900' : 'text-emerald-800'} truncate max-w-[200px]">{activePhoto.details.output}</span>
							</div>
						</div>

						<!-- Quick Step Switcher Footer -->
						<div class="flex items-center justify-between gap-3 pt-2">
							<button
								type="button"
								onclick={prevPhoto}
								class="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-black text-blue-950 transition-colors hover:bg-blue-950 hover:text-amber-300 hover:border-blue-950 shadow-sm text-center cursor-pointer"
							>
								← Previous Photo
							</button>
							<button
								type="button"
								onclick={nextPhoto}
								class="flex-1 rounded-xl bg-blue-950 border border-blue-950 px-3 py-2 text-xs font-black text-amber-300 transition-colors hover:bg-blue-900 shadow-sm text-center cursor-pointer"
							>
								Next Photo →
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
