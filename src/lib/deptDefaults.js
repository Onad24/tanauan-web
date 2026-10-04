// Department default data & dynamic merge helper
export const DEPT_DEFAULTS = {
  Accounting: {
    officeName: 'Municipal Accounting Office',
    officeCode: 'MAO-ACC',
    category: 'Fiscal & Financial Administration',
    citizensCharterUrl: '/citizens-charter/accounting',
    tagline: 'Maintaining fiscal accountability, accurate financial recording, and transparent government accounting for the Municipality of Tanauan.',
    typewriterWords: [
      'Transparent Financial Governance',
      'Accurate Accounting & Bookkeeping',
      'Compliant Government Fund Management',
      'Serving Tanauan with Fiscal Integrity'
    ],
    head: { name: '', title: 'Municipal Accountant', term: 'Department Head', quote: 'Sound government accounting is the bedrock of public trust and fiscal discipline.', credentials: ['Government Accounting Specialist', 'COA Compliance Officer'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '100', suffix: '%', label: 'COA Compliance', description: 'Full compliance with Commission on Audit regulations' },
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'Financial recording for all barangays in the municipality' },
      { value: '12', suffix: '+', label: 'Monthly Reports', description: 'Financial statements submitted monthly to oversight bodies' },
      { value: '100', suffix: '%', label: 'Payroll Accuracy', description: 'Error-free processing of municipal employee compensation' }
    ],
    mandates: [
      { index: '01', code: 'FIN-REC', title: 'Financial Recording', description: 'Maintains accurate books of accounts for all municipal financial transactions.', tag: 'Core Function', details: ['Journal Entry Preparation', 'General Ledger Maintenance', 'Trial Balance Reconciliation'] },
      { index: '02', code: 'PAY-PROC', title: 'Payroll Processing', description: 'Processes salaries and benefits for all regular and casual municipal employees.', tag: 'Personnel Services', details: ['Monthly Payroll Computation', 'Deductions & Remittances', 'Payslip Issuance'] },
      { index: '03', code: 'FIN-RPT', title: 'Financial Reporting', description: 'Prepares and submits financial statements to COA, BLGF, and Sangguniang Bayan.', tag: 'Reporting', details: ['Balance Sheet Preparation', 'Income & Expenditure Statements', 'COA Annual Audit Support'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'accounting@tanauanleyte.gov.ph', helpline: 'Accounting Window, Municipal Hall Main Building' }
  },
  Agriculture: {
    department: 'Agriculture',
    officeName: 'Municipal Agriculture Office',
    officeCode: 'MAO',
    category: 'Agricultural & Rural Development',
    citizensCharterUrl: '/citizens-charter/agriculture',
    tagline: 'Advancing sustainable agriculture, food security, and farmer empowerment for the communities of Tanauan, Leyte.',
    typewriterWords: [
      'Sustainable Agriculture for Tanauan',
      'Empowering Local Farmers & Fisherfolk',
      'Food Security & Livelihood Development',
      'Modern Farming for Rural Progress'
    ],
    head: {
      name: 'Susana O. Miranda',
      title: 'Municipal Agriculturist',
      term: 'Department Head',
      quote: 'True public service in agriculture empowers our farming and fishing communities through innovative extension, resilient crop systems, and sustainable livelihood support for every Tanauananon.',
      credentials: [
        'Municipal Agriculturist',
        'Department Head',
        'Licensed Agriculturist',
        'Agricultural Extension Specialist',
        'Rural Development Practitioner'
      ],
      room: 'Ground Floor, Agricultural Extension Office, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
      schedule: 'Monday to Friday | 8:00 AM – 5:00 PM (No Noon Break)'
    },
    preparedBy: {
      name: 'Susana O. Miranda',
      title: 'Municipal Agriculturist'
    },
    reviewedBy: {
      name: 'Hon. Ma. Gina E. Merilo',
      title: 'Municipal Mayor'
    },
    stats: [
      { value: '17', suffix: '', label: 'Frontline Services', description: 'Comprehensive Citizen\'s Charter services across 5 sections' },
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Agricultural & fisheries extension across all barangays' },
      { value: '100', suffix: '%', label: 'Free Intake', description: 'All frontline intake and inquiries 100% free of charge' },
      { value: '5', suffix: '', label: 'Specialized Units', description: 'Crops, Livestock, Fisheries, Institutional Dev, PCA' }
    ],
    mandates: [
      { index: '01', code: 'EXT-SVC', title: 'Agricultural Extension Services', description: 'Provides technical assistance, training, and guidance to farmers and fisherfolk in the municipality.', tag: 'Core Function', details: ['Farm Visits & Technical Guidance', 'Farmer Training & Seminars', 'Demonstration Farm Operations'] },
      { index: '02', code: 'PROG-IMPL', title: 'Program Implementation', description: 'Implements national and local agricultural programs for crop production, livestock, and fisheries.', tag: 'Program Implementation', details: ['Seed & Fertilizer Distribution', 'Livestock Dispersal Programs', 'Fisheries Development Assistance'] },
      { index: '03', code: 'DATA-MGT', title: 'Agricultural Data Management', description: 'Maintains updated records of agricultural production, farmer registry, and land use data.', tag: 'Data & Records', details: ['Farmer Registry Maintenance', 'Crop Production Monitoring', 'Agricultural Statistics Reporting'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)', location: 'Ground Floor, Agricultural Extension Office, Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '(053) 321-2045 / +63 917 842 6110', email: 'agriculture@tanauanleyte.gov.ph', helpline: 'Agriculture Helpdesk Windows 1 & 2' }
  },
  Assessors: {
    officeName: "Municipal Assessor's Office",
    officeCode: 'ASMT',
    category: 'Real Property Assessment & Taxation',
    citizensCharterUrl: '/citizens-charter/assessor',
    tagline: 'Ensuring fair, accurate, and equitable assessment of real properties for the efficient administration of real property tax in Tanauan.',
    typewriterWords: [
      'Fair & Accurate Property Valuation',
      'Transparent Real Property Assessment',
      'Equitable Taxation for All Property Owners',
      'Modern Assessment for Better Governance'
    ],
    head: { name: '', title: 'Municipal Assessor', term: 'Department Head', quote: 'Fair and accurate property assessment is the cornerstone of equitable local taxation.', credentials: ['Licensed Real Property Assessor', 'Tax Mapping Specialist'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'Property assessment across all 54 barangays' },
      { value: '100', suffix: '%', label: 'Property Records', description: 'Comprehensive and updated real property inventory' },
      { value: '3', suffix: '', label: 'Assessment Levels', description: 'Residential, commercial, and agricultural property classifications' },
      { value: '100', suffix: '%', label: 'BLGF Compliance', description: 'Full compliance with Bureau of Local Government Finance standards' }
    ],
    mandates: [
      { index: '01', code: 'PROP-ASMT', title: 'Real Property Assessment', description: 'Appraises and assesses all real properties in the municipality for real property tax purposes.', tag: 'Core Function', details: ['Land & Building Appraisal', 'Schedule of Market Values Preparation', 'Property Classification & Assessment'] },
      { index: '02', code: 'RECORDS', title: 'Property Records Management', description: 'Maintains updated records of all declared real properties including ownership, location, and assessed values.', tag: 'Records Management', details: ['Property Tax Declaration Issuance', 'Assessment Roll Maintenance', 'Title Transfer Processing'] },
      { index: '03', code: 'TAX-MAP', title: 'Tax Mapping & Cadastral Survey', description: 'Conducts tax mapping operations to identify all taxable real properties within the municipal jurisdiction.', tag: 'Field Operations', details: ['Tax Map Preparation & Updates', 'Field Survey & Inspection', 'Barangay Tax Map Maintenance'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'assessor@tanauanleyte.gov.ph', helpline: "Assessor's Window, Municipal Hall Main Building" }
  },
  Budget: {
    officeName: 'Municipal Budget Office',
    officeCode: 'MBO',
    category: 'Budget Management & Fiscal Planning',
    citizensCharterUrl: '/citizens-charter/budget',
    tagline: 'Formulating, reviewing, and managing the annual budget of Tanauan to ensure sound financial planning and efficient use of public funds.',
    typewriterWords: [
      'Sound Budget Planning for Tanauan',
      'Transparent Municipal Fund Allocation',
      'Efficient Resource Management',
      'Accountability in Every Peso Spent'
    ],
    head: { name: '', title: 'Municipal Budget Officer', term: 'Department Head', quote: 'A well-crafted budget is the roadmap to development, transparency, and public service excellence.', credentials: ['Municipal Budget Officer', 'Government Budget & Management Specialist'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '100', suffix: '%', label: 'Budget Compliance', description: 'Full adherence to DBM and LFC budget preparation guidelines' },
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'Budget allocation monitoring across all 54 barangays' },
      { value: '12', suffix: '', label: 'Monthly Reports', description: 'Budget utilization reports submitted monthly to oversight bodies' },
      { value: '100', suffix: '%', label: 'Audit Readiness', description: 'All budget documents audit-ready and compliant with COA standards' }
    ],
    mandates: [
      { index: '01', code: 'BUDGET-PREP', title: 'Annual Budget Preparation', description: 'Prepares the Executive Budget and Annual Investment Program in coordination with all departments.', tag: 'Core Function', details: ['Executive Budget Drafting', 'Annual Investment Program (AIP) Preparation', 'Budget Hearing Facilitation'] },
      { index: '02', code: 'BUDGET-REV', title: 'Budget Review & Control', description: 'Reviews allotment requests and ensures expenditures are within approved budget appropriations.', tag: 'Budget Control', details: ['Allotment Release Control', 'Obligation Request Review', 'Supplemental Budget Processing'] },
      { index: '03', code: 'FIN-RPT', title: 'Financial Performance Reporting', description: 'Monitors and reports on the financial performance and budget utilization of all municipal departments.', tag: 'Reporting', details: ['Budget Utilization Rate Monitoring', 'Monthly Budget Report Preparation', 'SARO & NCA Management'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'budget@tanauanleyte.gov.ph', helpline: 'Budget Office, Municipal Hall Main Building' }
  },
  Cemetery: {
    officeName: 'Municipal Cemetery Office',
    officeCode: 'MCO',
    category: 'Cemetery Administration & Services',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Managing and maintaining the municipal cemetery with dignity, order, and compassion for the bereaved families of Tanauan.',
    typewriterWords: [
      'Dignified Cemetery Administration',
      'Compassionate Service for Families',
      'Orderly & Well-Maintained Cemetery',
      'Preserving the Memory of Our Departed'
    ],
    head: { name: '', title: 'Cemetery Administrator', term: 'Department Head', quote: 'We serve with compassion, ensuring every family finds dignity and peace in their time of grief.', credentials: ['Cemetery Administration Specialist'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '100', suffix: '%', label: 'Cemetery Maintenance', description: 'Consistently maintained and well-kept municipal cemetery grounds' },
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Accessible cemetery services for all residents of Tanauan' },
      { value: '365', suffix: '', label: 'Days Open', description: 'Cemetery accessible to visitors year-round' },
      { value: '100', suffix: '%', label: 'Record Accuracy', description: 'Updated burial records for all interred individuals' }
    ],
    mandates: [
      { index: '01', code: 'CEM-ADM', title: 'Cemetery Administration', description: 'Oversees the day-to-day administration, maintenance, and regulation of the municipal cemetery.', tag: 'Core Function', details: ['Burial Permit Processing', 'Lot Allocation & Management', 'Cemetery Rules Enforcement'] },
      { index: '02', code: 'MAINT', title: 'Grounds Maintenance', description: 'Ensures the cleanliness, safety, and orderly maintenance of all cemetery grounds and facilities.', tag: 'Maintenance', details: ['Regular Grounds Cleaning', 'Infrastructure Maintenance & Repair', 'Landscaping & Beautification'] },
      { index: '03', code: 'RECORDS', title: 'Burial Records Management', description: 'Maintains accurate and updated records of all burials, lot ownership, and cemetery transactions.', tag: 'Records', details: ['Burial Record Keeping', 'Lot Ownership Documentation', 'Exhumation Permit Processing'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Municipal Cemetery, Tanauan, Leyte', contactNumber: '', email: '', helpline: 'Municipal Cemetery Administration Office' }
  },
  'Civil Registrar': {
    officeName: 'Municipal Civil Registrar Office',
    officeCode: 'MCRO',
    showAccomplishments: true,
    showPersonnel: false,
    formsAtEnd: true,
    category: 'Civil Registration & Vital Statistics',
    citizensCharterUrl: '/citizens-charter/civil-registrar',
    tagline: 'Registering vital events, safeguarding civil records, and providing essential civil registration services to all residents of Tanauan.',
    typewriterWords: [
      'Accurate & Timely Civil Registration',
      'Safeguarding Your Vital Records',
      'Birth, Marriage & Death Certificates',
      'Efficient Civil Registry Services'
    ],
    head: {
      name: 'Vincent Francis A. Salvaña',
      title: 'Municipal Civil Registrar',
      term: 'Department Head',
      image: '/MCR/head-salvana.png',
      quote: 'Accurate civil registration is the foundation of every citizen\'s legal identity and rights. We are committed to safeguarding vital records and providing compassionate, prompt frontline service to every Tanauananon.',
      credentials: ['Licensed Civil Registrar', 'PSA-Accredited Civil Registry Officer', 'Local Civil Registry Head'],
      room: 'Office of the Municipal Civil Registrar, Ground Floor, Tanauan Town Hall',
      schedule: 'Monday – Friday: 8:00 AM – 5:00 PM'
    },
    stats: [
      { value: '100', suffix: '%', label: 'Registration Accuracy', description: 'Error-free civil registration compliant with PSA standards' },
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'Civil registration services for all 54 barangays' },
      { value: '3', suffix: '', label: 'Days Processing', description: 'Standard processing time for civil registry documents' },
      { value: '100', suffix: '%', label: 'PSA Compliance', description: 'Full compliance with Philippine Statistics Authority guidelines' }
    ],
    mandates: [
      { index: '01', code: 'TIME-REG', title: 'Timely Registration of Vital Events (Birth, Marriage, Death)', description: 'Registers births, marriages, and deaths within the statutory prescribed period and issues owner’s registered copies.', tag: 'Primary Frontline Service', details: ['Timely Registration of Live Births', 'Timely Registration of Marriages', 'Timely Registration of Deaths', 'Signatory Verification & Owner Copy Releasing'] },
      { index: '02', code: 'LATE-REG', title: 'Late Registration of Vital Events (Birth, Marriage, Death)', description: 'Processes delayed registration of vital events subject to documentary verification and mandatory 10-day posting period.', tag: 'Delayed Civil Registration', details: ['Late Registration of Birth (11 Requirements)', 'Late Registration of Marriage (5 Requirements)', 'Late Registration of Death (4 Requirements)', 'Mandatory 10-Day Posting Period Adjudication'] },
      { index: '03', code: 'MARR-LIC', title: 'Application for Marriage License', description: 'Evaluates sworn applications for marriage license, coordinates MSWD pre-marriage counseling, and completes legal 10-day posting.', tag: 'Pre-Marital Clearance', details: ['CENOMAR & Birth Certificate Verification', 'Parental Consent (18-20) & Parental Advice (21-24)', 'Foreigner Legal Capacity & Clearance Evaluation', 'Mandatory 10-Day Posting & License Releasing'] },
      { index: '04', code: 'CTC-ISSUANCE', title: 'Requesting of Certified True Copies (Birth, Marriage, Death)', description: 'Searches, authenticates, and issues official certified true copies of vital event certificates from municipal archives.', tag: 'Public Records Issuance', details: ['Owner & Nearest Kin Records Verification', 'Authorized Representative & SPA Verification', 'Archival Search & Document Certification', 'Expedited Same-Day Processing'] },
      { index: '05', code: 'RA-PETITIONS', title: 'Filing of Petitions for Clerical Error (RA 9048 & RA 10172)', description: 'Adjudicates administrative petitions for correction of clerical errors, change of first name, gender, or date of birth.', tag: 'Administrative Legal Correction', details: ['Correction of Clerical Error (RA 9048)', 'Change of First Name Petition (RA 9048)', 'Change of Gender Petition (RA 10172)', 'Change of Day & Month of Birth (RA 10172)', '10-Day Bulletin Posting & OCRG Manila Affirmation'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'civilregistrar@tanauanleyte.gov.ph', helpline: 'Civil Registry Window, Ground Floor, Municipal Hall' },
    downloadableForms: [
      {
        index: '01',
        title: 'Joint Affidavit of Two Disinterested Persons (Late Registration of Birth)',
        type: 'Legal Affidavit • RA 3753 / Family Code',
        icon: '📜',
        description: 'Official sworn statement executed by two disinterested persons attesting to the facts of birth, date, place, parentage, and baptism for delayed birth registration with the Local Civil Registrar.',
        format: 'Official PDF Document',
        url: '/forms/civil-registrar/joint-affidavit-two-disinterested-persons-late-registration-birth.pdf',
        downloadUrl: '/forms/civil-registrar/joint-affidavit-two-disinterested-persons-late-registration-birth.pdf',
        htmlUrl: '/forms/civil-registrar/joint-affidavit-late-birth.html',
        requirements: [
          'Two (2) Disinterested Witnesses (not related up to 4th degree of consanguinity/affinity)',
          'Valid Government-Issued IDs of both affiants with signatures',
          'Baptismal Certificate of the subject person',
          'Marriage Certificate of parents (if married)'
        ]
      },
      {
        index: '02',
        title: 'Joint Affidavit of Two Disinterested Persons (Fact of Death)',
        type: 'Legal Affidavit • Vital Statistics',
        icon: '⚖️',
        description: 'Official sworn affidavit executed by two disinterested persons with personal knowledge of the death, wake, and funeral of a deceased person for delayed or post-mortem death registration.',
        format: 'Official PDF Document',
        url: '/forms/civil-registrar/joint-affidavit-two-disinterested-persons-fact-of-death.pdf',
        downloadUrl: '/forms/civil-registrar/joint-affidavit-two-disinterested-persons-fact-of-death.pdf',
        htmlUrl: '/forms/civil-registrar/joint-affidavit-fact-of-death.html',
        requirements: [
          'Two (2) Disinterested Witnesses who attended the wake/funeral',
          'Valid Government-Issued IDs of both affiants',
          'Certificate of Death prepared by hospital/attending physician (if applicable)',
          'Burial or Cemetery Certificate'
        ]
      },
      {
        index: '03',
        title: 'Barangay Certification for Late Registration',
        type: 'Barangay Registry Certification',
        icon: '🏛️',
        description: 'Official clearance issued by the Office of the Punong Barangay certifying that the inhabitant’s vital records (Name, Sex, DOB, Place of Birth, Parents) are duly recorded in the Barangay Registry of Inhabitants.',
        format: 'Official PDF Document',
        url: '/forms/civil-registrar/barangay-certification-late-registration.pdf',
        downloadUrl: '/forms/civil-registrar/barangay-certification-late-registration.pdf',
        htmlUrl: '/forms/civil-registrar/barangay-certification-late-registration.html',
        requirements: [
          'Barangay Inhabitant Record / Cedula (Community Tax Certificate)',
          'Valid Proof of Barangay Residency',
          'Affidavit or application for delayed civil registration'
        ]
      }
    ]
  },
  'Day Care': {
    officeName: 'Municipal Day Care Services Office',
    officeCode: 'DCSO',
    category: 'Early Childhood Care & Development',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Nurturing the holistic development of young children aged 0-6 through quality early childhood education and care programs in Tanauan.',
    typewriterWords: [
      'Nurturing Young Minds in Tanauan',
      'Quality Early Childhood Education',
      'Holistic Child Development Programs',
      'Building Strong Futures from Day One'
    ],
    head: { name: '', title: 'Day Care Coordinator', term: 'Department Head', quote: 'Every child deserves a strong start — quality early care builds the foundation for a lifetime of success.', credentials: ['Early Childhood Education Specialist', 'Licensed Child Development Worker'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays with Day Care', description: 'Day care centers operating across all 54 barangays' },
      { value: '500', suffix: '+', label: 'Children Enrolled', description: 'Young children benefiting from municipal day care programs' },
      { value: '3', suffix: 'hrs', label: 'Daily Program', description: 'Structured daily early childhood development sessions' },
      { value: '100', suffix: '%', label: 'Community Reach', description: 'Full barangay coverage for day care services' }
    ],
    mandates: [
      { index: '01', code: 'ECCD', title: 'Early Childhood Care & Development', description: 'Implements ECCD programs for children aged 0-6 years following DSWD and DepEd guidelines.', tag: 'Core Function', details: ['Structured Learning Activities', 'Nutritional Supplementation', 'Health & Immunization Monitoring'] },
      { index: '02', code: 'PARENT-EDU', title: 'Parent Education & Community Outreach', description: 'Conducts parent orientation and community programs to strengthen family support for child development.', tag: 'Community Programs', details: ['Parent Effectiveness Seminars', 'Community Nutrition Programs', 'Home Visits & Family Support'] },
      { index: '03', code: 'DCWKR-DEV', title: 'Day Care Worker Development', description: 'Provides training, supervision, and professional development for all day care workers in the municipality.', tag: 'Human Resource Development', details: ['Day Care Worker Training', 'Supervision & Quality Monitoring', 'Competency Enhancement Programs'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall & Community Day Care Centers, Tanauan, Leyte', contactNumber: '', email: '', helpline: 'DSWD-Municipal Day Care Services Coordinator' }
  },
  Dental: {
    officeName: 'Municipal Dental Office',
    officeCode: 'MDO',
    category: 'Oral Health Services',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Providing accessible, quality dental health services and promoting oral hygiene for the residents of Tanauan, Leyte.',
    typewriterWords: [
      'Healthy Smiles for Tanauan',
      'Accessible Dental Health Care',
      'Free Dental Services for All',
      'Promoting Oral Health & Hygiene'
    ],
    head: { name: '', title: 'Municipal Dentist', term: 'Department Head', quote: 'Good oral health is integral to overall well-being. We are committed to making dental care accessible to every Tanauananon.', credentials: ['Licensed Dentist', 'Public Health Dentistry Specialist'], room: 'Municipal Health Office, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Dental health outreach across all 54 barangays' },
      { value: '1000', suffix: '+', label: 'Patients Annually', description: 'Residents receiving free dental services per year' },
      { value: '100', suffix: '%', label: 'Service Access', description: 'Free dental services for all qualified residents' },
      { value: '5', suffix: '+', label: 'Outreach Missions', description: 'Annual dental outreach programs in far-flung barangays' }
    ],
    mandates: [
      { index: '01', code: 'DENT-SVC', title: 'Preventive Dental Services', description: 'Provides free preventive dental services including oral examination, prophylaxis, and fluoride treatment.', tag: 'Core Function', details: ['Oral Examination & Prophylaxis', 'Fluoride Application', 'Tooth Extraction & Minor Surgery'] },
      { index: '02', code: 'ORAL-HLTH', title: 'Oral Health Promotion', description: 'Conducts oral health education and promotion programs in schools, barangays, and the community.', tag: 'Health Promotion', details: ['School-Based Oral Health Programs', 'Community Dental Education', 'Toothbrushing Campaigns'] },
      { index: '03', code: 'OUTREACH', title: 'Dental Outreach Missions', description: 'Organizes free dental outreach missions in far-flung barangays and underserved communities.', tag: 'Outreach', details: ['Barangay Dental Mission Planning', 'Mobile Dental Services', 'Coordination with Health Partners'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Municipal Health Office, Tanauan, Leyte', contactNumber: '', email: '', helpline: 'Municipal Dental Clinic, Health Office Building' }
  },
  'Economic Enterprise': {
    officeName: 'Municipal Economic Enterprise Office',
    officeCode: 'MEEO',
    category: 'Economic Enterprise Management',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Managing and developing municipal economic enterprises to generate revenue, create local employment, and drive economic growth in Tanauan.',
    typewriterWords: [
      'Driving Local Economic Growth',
      'Sustainable Enterprise Management',
      'Revenue Generation for Tanauan',
      'Creating Jobs & Opportunities'
    ],
    head: { name: '', title: 'Economic Enterprise Manager', term: 'Department Head', quote: 'Sustainable economic enterprises are the engine of local growth, employment, and community prosperity.', credentials: ['Business Administration Specialist', 'Enterprise Development Officer'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '100', suffix: '%', label: 'Operations', description: 'All municipal enterprises operating at full capacity' },
      { value: '54', suffix: '', label: 'Barangays Benefiting', description: 'Economic benefits reaching all communities in Tanauan' },
      { value: '50', suffix: '+', label: 'Jobs Created', description: 'Employment generated through municipal enterprises' },
      { value: '100', suffix: '%', label: 'Revenue Contribution', description: 'Enterprise revenues contributing to the municipal General Fund' }
    ],
    mandates: [
      { index: '01', code: 'ENT-MGT', title: 'Enterprise Operations Management', description: 'Oversees the day-to-day operations of all municipal economic enterprises.', tag: 'Core Function', details: ['Operations Planning & Supervision', 'Revenue Collection & Monitoring', 'Quality Control & Standards'] },
      { index: '02', code: 'DEV-PLAN', title: 'Enterprise Development Planning', description: 'Plans and develops new economic enterprises to expand the municipality\'s revenue base.', tag: 'Development', details: ['Feasibility Studies', 'Business Development Planning', 'Market Research & Analysis'] },
      { index: '03', code: 'STAFF-DEV', title: 'Workforce Development', description: 'Develops and manages the human resources of all municipal economic enterprises.', tag: 'Human Resources', details: ['Staff Training & Development', 'Performance Monitoring', 'Workforce Planning'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: '', helpline: 'Economic Enterprise Office, Municipal Hall' }
  },
  Engineering: {
    officeName: 'Municipal Engineering Office',
    officeCode: 'MEO',
    category: 'Infrastructure & Public Works',
    citizensCharterUrl: '/citizens-charter/engineering',
    tagline: 'Designing, constructing, and maintaining public infrastructure to support the development and progress of the Municipality of Tanauan.',
    typewriterWords: [
      'Building Tanauan\'s Infrastructure',
      'Quality Public Works & Construction',
      'Safe Roads & Resilient Communities',
      'Engineering Excellence for Progress'
    ],
    head: { 
      name: 'Engr. Raul S. Soliva', 
      title: 'Municipal Engineer', 
      term: 'Department Head', 
      quote: 'Quality infrastructure is the foundation of community development and the driver of economic progress.', 
      credentials: ['Licensed Civil Engineer', 'Municipal Engineer', 'Building Official'], 
      room: 'Municipal Engineering Office, Tanauan Town Hall, Real St., Tanauan, Leyte', 
      schedule: 'Monday – Friday: 8:00 AM – 5:00 PM',
      image: '/Engineering/soliva-raul.jpg'
    },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Infrastructure projects across all 54 barangays' },
      { value: '100', suffix: '%', label: 'Project Compliance', description: 'Full compliance with DPWH and building code standards' },
      { value: '50', suffix: '+', label: 'Projects Annually', description: 'Infrastructure projects implemented per year' },
      { value: '100', suffix: '%', label: 'Safety Standards', description: 'All structures compliant with national building safety codes' }
    ],
    mandates: [
      { index: '01', code: 'INFRA', title: 'Infrastructure Design & Construction', description: 'Designs and supervises the construction of public infrastructure including roads, bridges, and public buildings.', tag: 'Core Function', details: ['Infrastructure Project Design', 'Construction Supervision', 'Quality Control & Inspection'] },
      { index: '02', code: 'MAINT', title: 'Infrastructure Maintenance', description: 'Maintains all municipal infrastructure to ensure safety, functionality, and longevity.', tag: 'Maintenance', details: ['Road & Bridge Maintenance', 'Public Building Upkeep', 'Emergency Repair Response'] },
      { index: '03', code: 'BUILD-PERMIT', title: 'Building Permit Processing', description: 'Reviews and processes building permit applications to ensure compliance with building codes and standards.', tag: 'Regulatory', details: ['Building Permit Issuance', 'Plan Review & Approval', 'Occupancy Permit Processing'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: '' },
    downloadableForms: [
      {
        index: '01',
        category: 'Building Permit',
        title: 'Checklist of Building Permit Documents Appended to the Application',
        type: 'Application Checklist • PD 1096',
        icon: '📋',
        description: 'Official checklist of documents required for Building Permit applications covering architectural, structural, sanitary/plumbing, electrical, and mechanical plans, MPDC zoning clearances, and proof of land ownership.',
        format: 'Official PDF Document',
        fileSize: '143 KB',
        url: '/forms/engineering/checklist-building-permit.pdf',
        downloadUrl: '/forms/engineering/checklist-building-permit.pdf',
        htmlUrl: '/forms/engineering/checklist-building-permit.html',
        requirements: [
          'Unified Building Permit Application Form (7 copies, signed and sealed, notarized)',
          'Construction Logbook (2 official copies)',
          'Complete Architectural, Structural, Electrical, Plumbing/Sanitary & Mechanical Plans (5-7 sets)',
          'Bill of Materials & Cost Estimates (Typed, 7 copies, signed and sealed, notarized)',
          'Building Specifications & Structural Design Computations (2 original copies)',
          'MPDC Zoning & Locational Clearances (5 copies)',
          'Proof of Land Ownership (Tax Dec, Title, Deed of Sale, or Lease Contract - 5 copies)',
          'Fire Safety Evaluation Clearance (FSEC) from Bureau of Fire Protection',
          'PRC & PTR IDs of all signing Engineers and Architects (5 copies)',
          'Barangay Clearance & DPWH Road Right-of-Way Clearance (if along national highway)'
        ]
      },
      {
        index: '02',
        category: 'Building Permit',
        title: 'Architectural Permit Application Form (NBC Form No. A-01)',
        type: 'NBC Form No. A-01 • Architectural Code',
        icon: '🏛️',
        description: 'Official National Building Code application form for architectural plans, spatial programming, Batas Pambansa Bilang 344 (Accessibility Law) facilities, and Fire Code conformance.',
        format: 'Official PDF Document',
        fileSize: '173 KB',
        url: '/forms/engineering/architectural-permit.pdf',
        downloadUrl: '/forms/engineering/architectural-permit.pdf',
        htmlUrl: '/forms/engineering/architectural-permit.html',
        requirements: [
          'Box 1: Accomplished in print by the Owner/Applicant with complete property identification',
          'Box 2: BP 344 accessibility features, percentage of site occupancy, and Fire Code compliance',
          'Box 3: Design professional plans and specifications signed and sealed by registered Architect',
          'Box 4: Supervisor / In-Charge of architectural works signed and sealed by registered Architect',
          'Box 5 & 6: Building Owner signature and Lot Owner written consent',
          'Five (5) complete sets of architectural drawings, floor plans, elevations, sections, and schedules'
        ]
      },
      {
        index: '03',
        category: 'Building Permit',
        title: 'Electrical Permit Application Form',
        type: 'Electrical Code of the Philippines • DPWH/OBO',
        icon: '⚡',
        description: 'Official application form for electrical installations, service entrance connections, transformers, generators/UPS capacity, and Philippine Electrical Code compliance.',
        format: 'Official PDF Document',
        fileSize: '188 KB',
        url: '/forms/engineering/electrical-permit.pdf',
        downloadUrl: '/forms/engineering/electrical-permit.pdf',
        htmlUrl: '/forms/engineering/electrical-permit.html',
        requirements: [
          'Box 1: Accomplished in print by applicant with load summary (connected load, transformer, generator)',
          'Box 2: Plans and specifications signed and sealed by Professional Electrical Engineer (PEE)',
          'Box 3: Supervisor of electrical works signed and sealed by PEE, REE, or Licensed Master Electrician',
          'Box 4 & 5: Building Owner and Lot Owner consent signatures',
          'Five (5) sets of electrical plans, single-line riser diagram, and load computation',
          'PCAB electrical contractor license for installations of 200A / 230V and above'
        ]
      },
      {
        index: '04',
        category: 'Building Permit',
        title: 'Electronics Permit Application Form (NBC Form No. A-07)',
        type: 'NBC Form No. A-07 • Electronics Code',
        icon: '📡',
        description: 'Prescribed permit for telecommunications, broadcast, CCTV security, fire alarm systems, IT networks, building automation, and structured cabling/optical fiber.',
        format: 'Official PDF Document',
        fileSize: '151 KB',
        url: '/forms/engineering/electronics-permit.pdf',
        downloadUrl: '/forms/engineering/electronics-permit.pdf',
        htmlUrl: '/forms/engineering/electronics-permit.html',
        requirements: [
          'Box 1: Accomplished in print by Owner/Applicant with location and scope of work',
          'Box 2: Nature of installation works and electronics equipment systems',
          'Box 3: Plans and specifications signed and sealed by Professional Electronics Engineer (PECE)',
          'Box 4: Supervisor/In-Charge signed and sealed by Professional Electronics Engineer (PECE)',
          'Box 5 & 6: Building Owner and Lot Owner written consent',
          'Five (5) sets of electronic documents, system layout schematics, and bill of materials'
        ]
      },
      {
        index: '05',
        category: 'Building Permit',
        title: 'Demolition Permit Application Form',
        type: 'DPWH Accessory Form • Rule XI Safety Code',
        icon: '🏗️',
        description: 'Official permit required prior to the demolition of any building or structure, enforcing Rule XI safety standards, utility line disconnections, and full-time professional supervision.',
        format: 'Official PDF Document',
        fileSize: '162 KB',
        url: '/forms/engineering/demolition-permit.pdf',
        downloadUrl: '/forms/engineering/demolition-permit.pdf',
        htmlUrl: '/forms/engineering/demolition-permit.html',
        requirements: [
          'Box 1: Accomplished by Owner/Applicant with demolition scope and location details',
          'Box 2 & 3: Demolition plans and specifications signed and sealed by Architect or Civil Engineer',
          'Box 4: Building Owner and Lot Owner signed conformity',
          'Certification that building is not subject to any pending court litigation',
          'Disconnection of all electric, water, gas, and telephone lines prior to demolition work',
          'Written notice to the Office of the Building Official at least five (5) days prior to demolition'
        ]
      },
      {
        index: '06',
        category: 'Building Permit',
        title: 'Sanitary / Plumbing Permit Application Form',
        type: 'Plumbing Code of the Philippines • DPWH/OBO',
        icon: '🚿',
        description: 'Official permit application for sanitary sewer connections, potable water piping distribution, septic vault construction, and plumbing fixture compliance.',
        format: 'Official PDF Document',
        fileSize: '191 KB',
        url: '/forms/engineering/sanitary-permit.pdf',
        downloadUrl: '/forms/engineering/sanitary-permit.pdf',
        htmlUrl: '/forms/engineering/sanitary-permit.html',
        requirements: [
          'Accomplished application with fixtures summary and plumbing specifications',
          'Plans and specs signed and sealed by Licensed Sanitary Engineer or Master Plumber',
          'Building Owner and Lot Owner signatures',
          'Five (5) sets of sanitary/plumbing plans, isometric pipe layout, and septic tank details'
        ]
      },
      {
        index: '07',
        category: 'Building Permit',
        title: 'Structural Permit Application Form',
        type: 'National Structural Code of the Philippines (NSCP)',
        icon: '🏢',
        description: 'Prescribed structural permit covering concrete, steel, timber, and foundation engineering works in full compliance with seismic and wind load safety codes.',
        format: 'Official PDF Document',
        fileSize: '219 KB',
        url: '/forms/engineering/structural-permit.pdf',
        downloadUrl: '/forms/engineering/structural-permit.pdf',
        htmlUrl: '/forms/engineering/structural-permit.html',
        requirements: [
          'Structural design computation sheets signed and sealed by Licensed Civil/Structural Engineer',
          'Foundation, column, beam, slab, and framing details (5 sets)',
          'Boring test and geotechnical soil investigation report (for commercial/multi-story structures)',
          'Material strength specifications and concrete mix design standards'
        ]
      },
      {
        index: '08',
        category: 'Fencing Permit',
        title: 'Checklist of Fencing Permit Documents Appended to the Application',
        type: 'Application Checklist • Fencing',
        icon: '🚧',
        description: 'Official checklist of documents required for Fencing Permit applications, including perspective, site development, foundation plan, structural details, MPDC clearances, and proof of land ownership.',
        format: 'Official PDF Document',
        fileSize: '135 KB',
        url: '/forms/engineering/checklist-fencing-permit.pdf',
        downloadUrl: '/forms/engineering/checklist-fencing-permit.pdf',
        htmlUrl: '/forms/engineering/checklist-fencing-permit.html',
        requirements: [
          'Fencing Permit Application Form (7 copies, signed and sealed by licensed Architect or Civil Engineer)',
          'Construction Logbook (2 official copies)',
          'Perspective, Location Plan & Site Development Plan (Scale 1:200m)',
          'Floor Plan, Elevations, Sections & Foundation Plan (Scale 1:100m)',
          'Structural Details: Columns, Wall & Column Footings (Scale 1:20m)',
          'Bill of Materials & Cost Estimates (Typed, 7 copies, signed and sealed)',
          'Building Specifications (Original copy, 7 copies)',
          'Zoning / Land Use & Locational Clearance from MPDC (5 copies)',
          'Proof of Land Ownership / Right to Use (Tax Dec, Title, Deed of Sale, or Lease - 5 copies)',
          'Fire Safety Clearance Certificate from BFP (if electrical layout is on fence design)',
          'PRC & PTR IDs of Civil Engineer & Architect (5 copies)',
          'Barangay Clearance & DPWH Road Right-of-Way Clearance (if along national highway)'
        ]
      },
      {
        index: '09',
        category: 'Fencing Permit',
        title: 'Fencing Permit Application Form',
        type: 'DPWH Accessory Form • Line & Grade',
        icon: '📐',
        description: 'Official application form for the construction, erection, addition, alteration, or renovation of fences, including measurements (length & height), fencing materials, and relocation survey compliance.',
        format: 'Official PDF Document',
        fileSize: '226 KB',
        url: '/forms/engineering/fencing-permit.pdf',
        downloadUrl: '/forms/engineering/fencing-permit.pdf',
        htmlUrl: '/forms/engineering/fencing-permit.html',
        requirements: [
          'Box 1: Accomplished in print by the Applicant with property and location details',
          'Box 7: Measurements (length & height in meters) and Type of Fencing (R.C., hollow blocks, bricks, cyclone wire, steel matting)',
          'Box 2: Design professional plans and specifications signed and sealed by Architect or Civil Engineer',
          'Box 3: Full-time inspector and supervisor of construction works signed and sealed by Architect or Civil Engineer',
          'Box 4 & 5: Building Owner signature and Lot Owner written consent',
          'Relocation survey conducted by a licensed Geodetic Engineer prior to commencement',
          'Written notification to owners of adjoining buildings at least 10 days before excavation'
        ]
      },
      {
        index: '10',
        category: 'Occupancy Permit',
        title: 'Unified Application Form for Certificate of Occupancy',
        type: 'NBCP Rule III Application Form',
        icon: '📑',
        description: 'Official unified application form for Certificate of Occupancy (Full or Partial) and joint Fire Safety Inspection Certificate (FSIC) endorsed to the Bureau of Fire Protection.',
        format: 'Official PDF Document',
        fileSize: '206 KB',
        url: '/forms/engineering/unified-application-occupancy.pdf',
        downloadUrl: '/forms/engineering/unified-application-occupancy.pdf',
        htmlUrl: '/forms/engineering/unified-application-occupancy.html',
        requirements: [
          'Accomplished in print by the Applicant/Owner with complete project and property information',
          'Declaration of Full or Partial Occupancy request and FSIC application',
          'Gross floor area, storeys, units, and actual date of completion',
          'Attested by Full-Time Inspector or Supervisor of Construction (Licensed Architect or Civil Engineer)',
          'Community Tax Certificate (CTC) details of applicant and supervising engineer'
        ]
      },
      {
        index: '11',
        category: 'Occupancy Permit',
        title: 'Certificate of Completion Form',
        type: 'NBCP Rule III Completion Clearance',
        icon: '✅',
        description: 'Official 2-page sworn certification executed by the supervising architect/civil engineer, contractor, and trade specialists (electrical, mechanical, sanitary, electronics) prior to occupancy approval.',
        format: 'Official PDF Document',
        fileSize: '983 KB',
        url: '/forms/engineering/certificate-of-completion.pdf',
        downloadUrl: '/forms/engineering/certificate-of-completion.pdf',
        htmlUrl: '/forms/engineering/certificate-of-completion.html',
        requirements: [
          'Notarized sworn certification signed by supervising Architect/Civil Engineer',
          'Summary of actual construction costs: materials, labor, equipment, and total building cost',
          'Contractor/AMO conformity and PCAB license details',
          'Signatures and professional seals of all design trade practitioners (Architect, Civil, Electrical, Mechanical, Sanitary, Electronics, Interior)',
          'Signatures of full-time specialty works construction supervisors'
        ]
      },
      {
        index: '12',
        category: 'Occupancy Permit',
        title: 'Certificate of Occupancy Form',
        type: 'Official Building Official Certificate',
        icon: '🏠',
        description: 'Official certificate authorized and issued by the Municipal Building Official confirming that the building conforms with PD 1096 and is approved for physical occupancy.',
        format: 'Official PDF Document',
        fileSize: '183 KB',
        url: '/forms/engineering/certificate-of-occupancy.pdf',
        downloadUrl: '/forms/engineering/certificate-of-occupancy.pdf',
        htmlUrl: '/forms/engineering/certificate-of-occupancy.html',
        requirements: [
          'Official certificate issued and authorized by the Municipal Building Official',
          'Certified copy required to be posted visibly within the premises of the building/structure',
          'Full or Partial Occupancy determination and FSIC reference number',
          'Official Receipt and Building Permit reference validation',
          'Strict adherence to the approved character and group of occupancy'
        ]
      },
      {
        index: '13',
        category: 'Downloadable Checklist',
        title: 'Checklist for Electrical Connection',
        type: 'DORELCO Utility Prerequisite Checklist',
        icon: '⚡',
        description: 'Official prerequisite checklist for electrical service connection in Tanauan, including DORELCO application, electrical layout plan, permit form, tax declaration, land ownership, and clearances.',
        format: 'Official PDF Document',
        fileSize: '82 KB',
        url: '/forms/engineering/checklist-electrical-connection.pdf',
        downloadUrl: '/forms/engineering/checklist-electrical-connection.pdf',
        htmlUrl: '/forms/engineering/checklist-electrical-connection.html',
        requirements: [
          'Approved Application Form from DORELCO',
          'Electrical Layout Plan signed and sealed by Professional Electrical Engineer',
          'Duly accomplished Electrical Permit Form',
          'Tax Declaration R13 (2 Photocopies)',
          'Mode of Ownership / Right over land (2 Photocopies)',
          '2 Photocopies of Entry pass and Certificate of Award (if Pabahay Beneficiary)',
          'Picture of the house/structure inside and outside with the ABE & signed by the ABE',
          'Detailed Engineering Drawing signed by the Civil Engineer/Architect (5 sets)',
          'Barangay Certification / Clearance (1 Photocopy)',
          'Locational Clearance from MPDC',
          'Reduced Copy of Electrical Layout Plan (1 copy)',
          'Fire Safety Inspection Certificate (FSIC) from BFP'
        ]
      },
      {
        index: '14',
        category: 'Downloadable Checklist',
        title: 'Checklist for Water Connection',
        type: 'Primewater Utility Prerequisite Checklist',
        icon: '🚰',
        description: 'Official prerequisite checklist for municipal water service connection, including Primewater application, tax declaration, mode of ownership, house photo, engineering drawings, and barangay clearance.',
        format: 'Official PDF Document',
        fileSize: '80 KB',
        url: '/forms/engineering/checklist-water-connection.pdf',
        downloadUrl: '/forms/engineering/checklist-water-connection.pdf',
        htmlUrl: '/forms/engineering/checklist-water-connection.html',
        requirements: [
          'Approved Application Form from Primewater',
          'Tax Declaration R13 (2 Photocopies)',
          'Mode of Ownership / Right over land (2 Photocopies)',
          'Picture of the house (2 photocopies)',
          'Detailed Engineering Drawing signed by the Civil Engineer/Architect (5 sets)',
          'Barangay Certification / Clearance (1 Photocopy)'
        ]
      },
      {
        index: '15',
        category: 'Downloadable Checklist',
        title: 'Checklist for Occupancy Permit',
        type: 'Section 309 NBCP Prerequisite Checklist',
        icon: '📋',
        description: 'Official prerequisite checklist of documents required for Certificate of Occupancy issuance, including notarized completion certificates, unified application, logbook, as-built plans, and FSIC.',
        format: 'Official PDF Document',
        fileSize: '83 KB',
        url: '/forms/engineering/checklist-occupancy-permit.pdf',
        downloadUrl: '/forms/engineering/checklist-occupancy-permit.pdf',
        htmlUrl: '/forms/engineering/checklist-occupancy-permit.html',
        requirements: [
          '5 Copies of duly accomplished & notarized Certificate of Completion signed by owner and licensed Architect/Civil Engineer (and Contractor/AMO if contract)',
          '5 Copies of duly accomplished Unified Application Form for Occupancy',
          '1 copy of the Construction Logbook with records of construction processes',
          '3 Photocopies of valid PRC licenses and PTR of all involved professionals',
          'Photograph of the Structure with substantial completion showing front, sides, and rear areas',
          '2 Photocopies of Approved Building Permit Certificate and Order of Payment',
          '4 sets of As-built plans (if changes occurred from the issued Building Permit)',
          'Fire Safety Inspection Certificate (FSIC) issued from the Municipal Fire Station'
        ]
      },
      {
        index: '16',
        category: 'Burial Permit',
        title: 'Tanauan New Cemetery Extension Burial Permit Form',
        type: 'Municipal Cemetery Lot Assignment & Burial Clearance',
        icon: '🪦',
        description: 'Official application and lot assignment permit for the Tanauan New Cemetery Extension, including panel, row, and level allocations, and prescribed fee schedules for individual lots and niches.',
        format: 'Official PDF Document',
        fileSize: '106 KB',
        url: '/forms/engineering/burial-permit.pdf',
        downloadUrl: '/forms/engineering/burial-permit.pdf',
        htmlUrl: '/forms/engineering/burial-permit.html',
        requirements: [
          'Section 1: Applicant Information (Name, Age, Sex, Civil Status, Contact No., Occupation, Complete Address)',
          'Deceased Information: Full name of deceased (†) and Age in years',
          'Section 2: Lot Assignment details (Lot No./Panel, Row, Level, Application No., Block, Lot, Date)',
          'Section 3: Lot Type selection (Individual Grave Lot, Perimeter Layer Niches Renewal, 5-Yr/10-Yr Rental or Sale, or Family Lots)',
          'Official burial permit and municipal fee assessment payment compliance'
        ]
      },
      {
        index: '17',
        category: 'Project Implementation Form',
        title: 'Request for Program of Work / Detailed Estimate',
        type: 'POW & Project Allocation Request',
        icon: '📐',
        description: 'Official form to request the preparation of Program of Work (POW) and detailed cost estimates for municipal infrastructure projects, including roadway zoning safeguards and final inspection checklists.',
        format: 'Official PDF Document',
        fileSize: '314 KB',
        url: '/forms/engineering/request-for-program-of-work.pdf',
        downloadUrl: '/forms/engineering/request-for-program-of-work.pdf',
        htmlUrl: '/forms/engineering/request-for-program-of-work.html',
        requirements: [
          'Name of project, appropriation, and fund source',
          'Implementation mode: By Administration or By Contract',
          'Social safeguard / zoning certification for existing roadway or Deed of Donation',
          'Drawing plans, detailed estimate, and contract copies',
          'Pre-construction and post-construction photographs',
          'Barangay Chairman conformity and Municipal Mayor approval'
        ]
      },
      {
        index: '18',
        category: 'Project Implementation Form',
        title: 'Concrete Pouring Permit & Request for Pouring Inspection',
        type: 'Structural Inspection & Quality Clearance',
        icon: '🏗️',
        description: 'Official pre-pouring checklist and municipal inspection clearance permit for concrete pouring across footing, column, beam, slab, wall, and pavement works.',
        format: 'Official PDF Document',
        fileSize: '207 KB',
        url: '/forms/engineering/concrete-pouring-permit.pdf',
        downloadUrl: '/forms/engineering/concrete-pouring-permit.pdf',
        htmlUrl: '/forms/engineering/concrete-pouring-permit.html',
        requirements: [
          'Structural member identification (footing, column, beam, slab, wall, pavement)',
          'Estimated volume (m³) and specified concrete compressive strength f\'c (MPa)',
          'Delivery method: pump, transit mixer, manual',
          'Pre-pouring checklist verification (formworks, rebars, spacing, cover, joints)',
          'Concrete cylinder samples and slump testing compliance',
          'MEO inspection result and Pouring Clearance sign-off'
        ]
      },
      {
        index: '19',
        category: 'Project Implementation Form',
        title: 'Request for Final Inspection of Completed Project',
        type: 'Project Completion Verification',
        icon: '🔍',
        description: 'Official formal request for Municipal Engineering Office final inspection of completed infrastructure projects prior to acceptance and final payment processing.',
        format: 'Official PDF Document',
        fileSize: '36 KB',
        url: '/forms/engineering/request-for-final-inspection.pdf',
        downloadUrl: '/forms/engineering/request-for-final-inspection.pdf',
        htmlUrl: '/forms/engineering/request-for-final-inspection.html',
        requirements: [
          'Project name, location, and contractor details',
          'Contract/PO number and contract amount',
          'Dates of commencement and completion',
          'Contractor certification of completion in accordance with approved plans',
          'MEO receiving acknowledgment and verification schedule'
        ]
      }
    ]
  },
  GSO: {
    officeName: 'General Services Office',
    officeCode: 'GSO',
    category: 'General Services & Property Management',
    citizensCharterUrl: '/citizens-charter/gso',
    tagline: 'Managing government property, venue reservations, equipment support, and general services to support the efficient delivery of public services in Tanauan.',
    typewriterWords: [
      'Borrowing of Tents, Chairs & Sound Systems',
      'Venue Scheduling & Public Civic Facilities',
      'Supply, Property & Asset Accountability',
      'Reliable Municipal Infrastructure Support'
    ],
    head: {
      name: 'Eugenio C. Ramos, Jr.',
      title: 'GSO Operation Manager',
      term: 'Department Head',
      quote: 'Effective, efficient and sustainable operation of programs, projects and activities, with competent manpower and responsive to the needs of the clients with the right quality of service.',
      credentials: ['GSO Operation Manager', 'Government Property & Facilities Management', 'Logistics & Venue Operations Specialist'],
      room: 'General Services Office, Ground Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
      schedule: 'Monday – Friday: 8:00 AM – 5:00 PM'
    },
    orgChartImage: '/GSO-OrgChart-Part1.png',
    vision:
      'Effective, efficient and sustainable operation of programs, projects and activities, with competent manpower and responsive to the needs of the clients with the right quality of service to support the vision of the Municipality.',
    mission:
      'To establish a reliable office, empowered by efficient and committed employees driven by transparency, accountability and good governance in the pursuit of its goals and objectives as provided for by the law in line with the supply and property management, maintenance of bldg. and grounds, electrical, plumbing. IT and electronic equipment, light vehicles and heavy equipment and other services.',
    preparedBy: {
      name: 'Honeyline Soyosa',
      title: 'Focal Person / GSO Staff',
      role: 'Focal Person / GSO Staff'
    },
    reviewedBy: {
      name: 'Eugenio C. Ramos, Jr.',
      title: 'GSO Operation Manager',
      role: 'GSO Operation Manager'
    },
    stats: [
      { value: '100', suffix: '%', label: 'Asset Accountability', description: 'All government property and equipment accounted for' },
      { value: '54', suffix: '', label: 'Barangays Supported', description: 'Logistical, tent, and equipment assistance to all communities' },
      { value: '3', suffix: '+', label: 'Civic Venues Managed', description: 'Tanauan Amphitheater, Municipal Lobby, and Civic Center' },
      { value: '100', suffix: '%', label: 'Service Reliability', description: 'Committed to responsive and quality public service' }
    ],
    downloadableForms: [
      {
        title: "Borrower's & Return Slip Form (Tents, Chairs, Sound System)",
        description: 'Official downloadable form for municipal equipment borrowing and return clearance.',
        url: 'https://drive.google.com/file/d/1fS19TSJvtyiP4jMTnBwMYi1GSD8glY8G/view?usp=drive_link'
      }
    ],
    servicesOffered: [
      {
        id: 'borrowing-equipment',
        serviceNumber: 1,
        title: 'Borrowing of Equipment (Tents, Chairs, Sound System)',
        badge: 'Service Offered 1',
        description: 'Standard procedure for requesting and borrowing municipal tents, tables, chairs, and sound system units for civic, community, and official events.',
        equipmentList: ['Tents', 'Chairs & Tables', 'Sound System'],
        downloadableFormUrl: 'https://drive.google.com/file/d/1fS19TSJvtyiP4jMTnBwMYi1GSD8glY8G/view?usp=drive_link',
        downloadableFormTitle: "Borrower's & Return Form",
        downloadableFormDescription: 'Official downloadable form for equipment borrowing and return inspection clearance.',
        steps: [
          'Submits Letter of Request detailing equipment, date, time and venue.',
          'Bring the approved letter request to the GSO Office for verification of availability of Tents.',
          'If the equipment is available, fill out the Borrower’s Slip.',
          'Upon returning the equipment, fill out the Return Slip.'
        ],
        note: 'In case of a lost or damaged Sound System, Tables and Chairs, the borrower/requesting party must replace or pay for the lost/damaged item/ s upon return.'
      },
      {
        id: 'venue-request',
        serviceNumber: 2,
        title: 'Venue Request (Tanauan Amphitheater, Municipal and Presedencia Lobby, Tanauan Civic Center)',
        badge: 'Service 2',
        description: 'Official procedure for venue scheduling and booking of major municipal event venues and facilities.',
        venueList: ['Tanauan Amphitheater', 'Municipal and Presedencia Lobby', 'Tanauan Civic Center'],
        steps: [
          'Submits Letter of Request detailing date, time and venue.',
          'Personally furnish a copy to the Office of the Mayor for approval of LCE.',
          'Present approved request letter to GSO for facility/equipment scheduling.',
          'Pay rental/facility fees (if required for private/commercial use)'
        ]
      }
    ],
    mandates: [
      {
        index: '01',
        code: 'PROP-MGT',
        title: 'Supply & Property Management',
        description: 'Manages, inventories, and accounts for all government properties, equipment, and supplies, including front-line equipment loaning services.',
        tag: 'Core Function',
        details: [
          'Property Inventory Management',
          'Equipment Issuance, Borrowing & Control',
          'Annual Physical Inventory & Asset Protection'
        ]
      },
      {
        index: '02',
        code: 'FAC-VENUE',
        title: 'Facility Maintenance & Venue Scheduling',
        description: 'Maintains municipal buildings and grounds, and oversees public scheduling for Tanauan civic venues.',
        tag: 'Public Facilities',
        details: [
          'Tanauan Amphitheater & Civic Center Scheduling',
          'Municipal and Presedencia Lobby Upkeep',
          'Grounds Landscaping & Facilities Maintenance'
        ]
      },
      {
        index: '03',
        code: 'TECH-LOG',
        title: 'Technical, Fleet & Operational Support',
        description: 'Handles electrical, plumbing, IT, and electronic equipment upkeep, along with light and heavy vehicle operations.',
        tag: 'Operations & Fleet',
        details: [
          'Electrical & Plumbing Maintenance',
          'IT & Electronic Equipment Support',
          'Light Vehicles & Heavy Equipment Dispatch'
        ]
      }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Ground Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'gso@tanauanleyte.gov.ph', helpline: 'General Services Office, Ground Floor' }
  },
  'Health Office': {
    department: 'Health Office',
    officeName: 'Municipal Health Office',
    officeCode: 'MHO',
    showAccomplishments: true,
    showPersonnel: false,
    formsAtEnd: true,
    category: 'Public Health & Primary Care Services',
    citizensCharterUrl: '/citizens-charter/health',
    tagline: 'Promoting and protecting the health of every Tanauananon through accessible, equitable, and quality public health programs, primary care, and Universal Health Care integration.',
    typewriterWords: [
      'Health for Every Tanauananon',
      'Quality Public Health Services',
      'Universal Health Care & PhilHealth Konsulta',
      'Accessible Healthcare for All Communities'
    ],
    head: { 
      name: 'Dr. Arlene V. Santo', 
      title: 'Municipal Health Officer', 
      term: 'Department Head', 
      quote: 'Health is a fundamental human right. Our unwavering mission is to ensure every resident across Tanauan’s 54 barangays receives accessible, compassionate, and high-quality frontline healthcare and preventive medicine.', 
      credentials: ['Licensed Medical Doctor', 'Municipal Health Officer', 'Public Health & Primary Care Lead'], 
      room: 'Office of the Municipal Health Officer, Tanauan Municipal Health Center', 
      schedule: 'Monday – Friday: 8:00 AM – 5:00 PM (24/7 Emergency Support)' 
    },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Comprehensive primary healthcare reaching all 54 barangays' },
      { value: '34', suffix: '', label: 'Healthcare Personnel', description: 'Active doctors, nurses, midwives, medtechs, and support staff' },
      { value: '100', suffix: '%', label: 'Vaccination Coverage', description: 'Expanded Program on Immunization reaching all target children' },
      { value: '11', suffix: '', label: 'Specialized Units', description: 'Clinical, diagnostic, maternal, dental, and emergency services' }
    ],
    mandates: [
      { index: '01', code: 'PREV-CTRL', title: 'Disease Prevention & Control', description: 'Implements disease surveillance, prevention, and control programs for communicable and non-communicable diseases.', tag: 'Core Function', details: ['Disease Surveillance & Reporting', 'Immunization Programs', 'Communicable Disease Control'] },
      { index: '02', code: 'MAT-CHILD', title: 'Maternal & Child Health', description: 'Provides maternal care, child health, and family planning services to promote family wellness.', tag: 'Family Health', details: ['Prenatal & Postnatal Care', 'Child Growth Monitoring', 'Family Planning Services'] },
      { index: '03', code: 'HEALTH-PROMO', title: 'Health Promotion & Education', description: 'Conducts health education, information campaigns, and community outreach to promote healthy lifestyles.', tag: 'Health Promotion', details: ['Community Health Education', 'Health Advocacy Campaigns', 'Lifestyle Disease Prevention'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Health Center, Tanauan, Leyte', contactNumber: '', email: 'health@tanauanleyte.gov.ph', helpline: 'Municipal Health Office, Consultation Room' },
    downloadableForms: [
      {
        index: '01',
        category: 'Dental Health Services',
        title: 'Individual Treatment Record — Oral Health Status & Monitoring (Form 1)',
        type: 'Dental Clinical Record • Form 1',
        icon: '🦷',
        description: 'Official Municipal Health Office oral examination and dental monitoring record for tracking oral health status, DMFT / dft caries indices, gingival condition, dental sealant, prophylaxis, fillings, and surgical extractions across 5 annual clinical monitoring cycles.',
        format: 'Official PDF Document',
        fileSize: '372 KB',
        url: '/forms/health-office/MHO-Individual-Treatment-Record-Dental.pdf',
        downloadUrl: '/forms/health-office/MHO-Individual-Treatment-Record-Dental.pdf',
        htmlUrl: '/forms/health-office/individual-treatment-record-dental.html',
        requirements: [
          'Accomplished Part I: Patient Demographics, Full Name, DOB, Age, Sex, Address, Occupation & Parent/Guardian',
          'Accomplished Medical History and Allergies disclosure before any dental intervention',
          'Oral Health Status Checklist: Dental Caries, Gingivitis, Periodontal Disease, Calculus, and Debris',
          'Summary of Services Referred: Tooth No., Oral Prophy, Temporary/Permanent Filling, Sealant, and Extraction',
          'Year 1 to Year 5 Annual Dentition Charting for permanent and deciduous teeth',
          'Attending Government Dentist Official Signature and License verification'
        ]
      },
      {
        index: '02',
        category: 'Clinical Consultation & Primary Care',
        title: 'First Patient Encounter & Comprehensive Clinical Record (PhilHealth Konsulta)',
        type: 'Primary Care Record • Accreditation P08038120',
        icon: '🩺',
        description: 'Comprehensive patient clinical evaluation dossier used by Rural Health Unit (RHU) physicians and healthcare staff covering demographic profile, PhilHealth membership details, past medical/surgical history, pediatric growth metrics, systematic physical examination (HEENT, chest, heart, abdomen), and NCD high-risk cardiovascular/diabetes assessments.',
        format: 'Official PDF Document',
        fileSize: '882 KB',
        url: '/forms/health-office/MHO-Patient-Data-Record.pdf',
        downloadUrl: '/forms/health-office/MHO-Patient-Data-Record.pdf',
        htmlUrl: '/forms/health-office/patient-data-record.html',
        requirements: [
          'Part I - Patient Demographics & Residence Address (Barangay, Town, Province, Zip Code)',
          'Part II - PhilHealth Information & Valid PHIC ID / Senior Citizen / PWD Identification',
          'Past Medical, Surgical & Family History Checklist (Hypertension, Diabetes, Asthma, TB, Cancer)',
          'Complete Immunization History: Childhood (BCG, OPV, DPT, MMR, HepB) & Adult (Pneumococcal, Flu, HPV)',
          'OB-Gyne & Family Planning Profile for female patients (Menstrual cycle, Gravidity, Parity, Deliveries)',
          'Pediatric Client Growth Monitoring (0–24 Months: Head, Arm, Waist Circumference, Height, Weight)',
          'Pertinent Physical Examination Findings & Vital Signs (BP, HR, RR, Temp, O2Sat, BMI)',
          'NCD High-Risk Assessment for age 20+ (Dietary salt/fat, Physical activity, Angina/Stroke, Glucose & Lipids)'
        ]
      },
      {
        index: '03',
        category: 'PhilHealth & Universal Health Care',
        title: 'PhilHealth Member Registration Form (PMRF — UHC v.1)',
        type: 'Statutory UHC Form • RA 11223',
        icon: '💳',
        description: 'Official statutory enrollment and member data record form for Universal Health Care (UHC) coverage, Konsulta registration, declaration of qualified dependents, and updating/amendment of member profile with the Philippine Health Insurance Corporation.',
        format: 'Official PDF Document',
        fileSize: '712 KB',
        url: '/forms/health-office/PhilHealth-Member-Registration-Form-PMRF.pdf',
        downloadUrl: '/forms/health-office/PhilHealth-Member-Registration-Form-PMRF.pdf',
        htmlUrl: '/forms/health-office/philhealth-member-registration-pmrf.html',
        requirements: [
          'Purpose Specification: Check appropriate box for New Registration or Updating / Amendment',
          'Designation of Preferred Accredited KonSulTa Primary Care Provider (Tanauan Municipal Health Office)',
          'Part I: Complete Personal Details (Full Name, Mother Maiden Name, Spouse, Birth Date/Place, Sex, Civil Status)',
          'Part II: Permanent & Mailing Address with active Mobile Number and Email Address',
          'Part III: Declaration of Qualified Legal Dependents (Spouse, Children under 21, Parents 60+)',
          'Part IV: Member Type Selection (Direct Contributor: Employed/Self-Earning/OFW vs. Indirect: 4Ps/Senior/PWD)',
          'Part V (If updating): Correction of Name, Date of Birth, Sex, Civil Status, or Contact Details',
          'Signed Member Certification with Date and Right Thumbmark if unable to write'
        ]
      }
    ]
  },
  HRMO: {
    officeName: 'Human Resource Management Office',
    officeCode: 'HRMO',
    category: 'Human Resource Management',
    citizensCharterUrl: '/citizens-charter/hr',
    tagline: 'Building a competent, motivated, and ethical workforce to drive excellent public service delivery for the residents of Tanauan.',
    typewriterWords: [
      'Building a Competent Workforce',
      'Human Capital for Public Excellence',
      'Fair & Merit-Based Employment',
      'Career Development for Public Servants'
    ],
    head: {
      name: 'Atty. Federico C. Tizon',
      title: 'HRMO Head',
      term: 'Department Head',
      quote: 'Our greatest asset is our people — investing in our workforce means investing in better service for every Tanauananon.',
      credentials: ['HRMO Head', 'HRMO III', 'EnP', 'Civil Service Commission-Accredited HR Practitioner', 'Legal & Human Resource Management Specialist'],
      room: 'HRMO Office, 2nd Floor, Tanauan Municipal Hall',
      schedule: 'Monday – Friday: 8:00 AM – 5:00 PM',
      image: '/HRMO/hrmo-head-tizon.png'
    },
    stats: [
      { value: '200', suffix: '+', label: 'Municipal Employees', description: 'Regular, casual, and job-order employees in the LGU roster' },
      { value: '100', suffix: '%', label: 'CSC Compliance', description: 'Full compliance with Civil Service Commission rules and regulations' },
      { value: '54', suffix: '', label: 'Departments Served', description: 'HR services available to all municipal offices and departments' },
      { value: '12', suffix: '+', label: 'Training Programs', description: 'Annual capacity-building programs for municipal employees' }
    ],
    mandates: [
      { index: '01', code: 'RECRUIT', title: 'Recruitment & Selection', description: 'Manages the recruitment, examination, and selection of qualified individuals for municipal government positions.', tag: 'Core Function', details: ['Position Advertisement & Posting', 'Applicant Screening & Testing', 'Interview Facilitation & Selection Board Support'] },
      { index: '02', code: 'HR-RECORDS', title: 'Personnel Records Management', description: 'Maintains accurate and updated personnel records for all municipal government employees.', tag: 'Records Management', details: ['201 File Maintenance', 'Service Record Updates', 'Leave Card Management'] },
      { index: '03', code: 'CAP-BUILD', title: 'Capacity Building & Training', description: 'Plans and implements training and development programs to enhance employee competencies and performance.', tag: 'Learning & Development', details: ['Training Needs Analysis', 'In-House Training Programs', 'CSC-Required Trainings Coordination'] }
    ],
    downloadableForms: [
      {
        title: 'Application for Leave',
        description: 'Official Civil Service Commission application for leave form. Required for all types of leave applications by municipal government employees.',
        icon: '📄',
        type: 'PDF / Printable Form',
        url: 'https://drive.google.com/file/d/1s9is-44IMmxI3fQ3IaHBjEM73xbVj3n6/view?usp=drive_link'
      },
      {
        title: 'Personal Data Sheet (PDS)',
        description: 'CSC Form 212 — the official Personal Data Sheet required for all government employment, promotion, and scholarship applications.',
        icon: '📋',
        type: 'Excel / Spreadsheet Form',
        url: 'https://docs.google.com/spreadsheets/d/1iaQLFjJevB5TbitukPX-f96usNzsLXD-/edit?usp=drive_link&ouid=107774628653199424551&rtpof=true&sd=true'
      },
      {
        title: 'Work Experience Sheet',
        description: 'Official supplemental form for the Personal Data Sheet. Used to record detailed work experience of applicants and existing government employees.',
        icon: '📝',
        type: 'PDF / Printable Form',
        url: 'https://drive.google.com/file/d/14NaXVLTr2ibjZudpFlwC2raAHLH_zvvS/view?usp=drive_link'
      }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'hrmo@tanauanleyte.gov.ph', helpline: 'HRMO Office, Municipal Hall 2nd Floor' }
  },
  IT: {
    officeName: 'Municipal Information Technology Office',
    officeCode: 'MITO',
    category: 'Information Technology & Digital Governance',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Driving digital transformation, enhancing government ICT infrastructure, and enabling efficient e-governance for the Municipality of Tanauan.',
    typewriterWords: [
      'Digital Governance for Tanauan',
      'Modernizing Municipal ICT Systems',
      'Efficient E-Government Services',
      'Technology-Driven Public Service'
    ],
    head: { name: '', title: 'IT Officer', term: 'Department Head', quote: 'Technology is a powerful enabler of transparency, efficiency, and citizen-centered governance.', credentials: ['Licensed IT Professional', 'Information Systems Specialist'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '100', suffix: '%', label: 'System Uptime', description: 'Consistent availability of municipal ICT systems and network' },
      { value: '54', suffix: '', label: 'Departments Supported', description: 'IT support and services for all municipal offices' },
      { value: '24/7', suffix: '', label: 'System Monitoring', description: 'Round-the-clock monitoring of critical government systems' },
      { value: '100', suffix: '%', label: 'Data Security', description: 'Compliant data protection and cybersecurity practices' }
    ],
    mandates: [
      { index: '01', code: 'ICT-INFRA', title: 'ICT Infrastructure Management', description: 'Manages, maintains, and upgrades the municipal government\'s ICT infrastructure including network, servers, and hardware.', tag: 'Core Function', details: ['Network Administration', 'Server & Hardware Maintenance', 'System Updates & Security Patches'] },
      { index: '02', code: 'DIGITAL-SVC', title: 'Digital Services & E-Governance', description: 'Develops and maintains digital government services and the official municipal website.', tag: 'Digital Services', details: ['Website Management & Updates', 'E-Government System Support', 'Digital Service Integration'] },
      { index: '03', code: 'TECH-SUPP', title: 'Technical Support & Training', description: 'Provides technical assistance and ICT training to all municipal employees.', tag: 'Technical Support', details: ['Helpdesk & Technical Troubleshooting', 'Software Training for Staff', 'ICT Equipment Procurement Support'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'it@tanauanleyte.gov.ph', helpline: 'IT Support Desk, Municipal Hall Ground Floor' }
  },
  'Legislative Staff': {
    officeName: 'Legislative Staff Office',
    officeCode: 'LSO',
    category: 'Legislative Support Services',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Providing professional legislative support to the Sangguniang Bayan, ensuring efficient legislative processes and accessible public records in Tanauan.',
    typewriterWords: [
      'Professional Legislative Support',
      'Efficient Sangguniang Bayan Services',
      'Transparent Legislative Records',
      'Serving the Legislative Body of Tanauan'
    ],
    head: { name: '', title: 'Legislative Staff Head', term: 'Department Head', quote: 'Efficient legislative support ensures the Sangguniang Bayan can serve the people of Tanauan with effectiveness and transparency.', credentials: ['Local Legislative Staff Specialist', 'Public Administration Professional'], room: 'Sangguniang Bayan Building, Municipal Hall Complex', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '100', suffix: '%', label: 'Session Support', description: 'Full administrative support for all SB sessions and committee hearings' },
      { value: '54', suffix: '', label: 'Barangays Represented', description: 'All 54 barangays represented in the Sangguniang Bayan' },
      { value: '12', suffix: '+', label: 'Sessions Monthly', description: 'Regular and special sessions of the Sangguniang Bayan supported' },
      { value: '100', suffix: '%', label: 'Records Accuracy', description: 'Complete and accurate legislative minutes and resolutions' }
    ],
    mandates: [
      { index: '01', code: 'SB-SUPPORT', title: 'Sangguniang Bayan Administrative Support', description: 'Provides comprehensive administrative and secretarial support to the Sangguniang Bayan and its committees.', tag: 'Core Function', details: ['Session Agenda Preparation', 'Minutes Recording & Transcription', 'Committee Meeting Facilitation'] },
      { index: '02', code: 'LEG-RECORDS', title: 'Legislative Records Management', description: 'Maintains, safeguards, and provides access to all legislative documents, resolutions, and ordinances.', tag: 'Records Management', details: ['Resolution & Ordinance Archiving', 'Document Certification', 'Legislative Reference Library'] },
      { index: '03', code: 'CERT-AUTH', title: 'Document Certification & Authentication', description: 'Issues certified copies of resolutions, ordinances, and other legislative documents to requesting parties.', tag: 'Document Services', details: ['Resolution Certification', 'Ordinance Copies Issuance', 'Document Authentication & Endorsement'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Sangguniang Bayan Building, Tanauan Municipal Hall Complex', contactNumber: '', email: '', helpline: 'Legislative Staff Office, SB Building' }
  },
  Licensing: {
    department: 'Licensing',
    officeName: 'Business Permit & Licensing Office',
    officeCode: 'BPLO',
    category: 'Business Regulation & Licensing',
    citizensCharterUrl: '/citizens-charter/business-permit',
    tagline: 'Streamlining business permit processing and regulatory compliance to support a thriving business environment in Tanauan.',
    typewriterWords: [
      'Efficient Business Permit Processing',
      'Supporting Tanauan\'s Business Community',
      'Fair & Transparent Business Regulation',
      'Ease of Doing Business in Tanauan'
    ],
    head: {
      name: 'Rodele E. Maceda',
      title: 'BPLO - Officer-In-Charge',
      term: 'Officer-In-Charge',
      quote: 'Streamlining local business regulation and providing prompt, transparent, and ARTA-compliant licensing services empower entrepreneurs and promote sustainable investment in Tanauan.',
      credentials: ['Business Permit & Licensing Specialist', 'ARTA Compliance Officer', 'Local Revenue Administration'],
      room: 'Municipal Hall, Ground Floor, Tanauan, Leyte',
      schedule: 'Monday – Friday: 8:00 AM – 5:00 PM (No Noon Break)'
    },
    orgChartPdf: '/BPLO-Organizational-Chart.pdf',
    orgChartImage: '/bplo-logo-1.jpg',
    stats: [
      { value: '1000', suffix: '+', label: 'Registered Businesses', description: 'Active business permits issued annually in Tanauan' },
      { value: '3', suffix: 'days', label: 'Processing Time', description: 'Maximum processing time per ARTA guidelines' },
      { value: '100', suffix: '%', label: 'ARTA Compliance', description: 'Full compliance with Ease of Doing Business Act (RA 11032)' },
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'Business licensing services for all barangays in Tanauan' }
    ],
    mandates: [
      { index: '01', code: 'BP-PROCESS', title: 'Business Permit Processing', description: 'Processes new and renewal business permit applications for commercial establishments in the municipality.', tag: 'Core Function', details: ['New Business Permit Applications', 'Annual Business Permit Renewal', 'Business Permit Certificate Issuance'] },
      { index: '02', code: 'INSPECT', title: 'Business Inspection & Compliance', description: 'Conducts regular inspections of business establishments to ensure compliance with municipal ordinances and national regulations.', tag: 'Regulatory Enforcement', details: ['Annual Business Inspection', 'Fire Safety Compliance Verification', 'Zoning & Sanitary Permit Coordination'] },
      { index: '03', code: 'CLOSURES', title: 'Business Closure & Violation Processing', description: 'Processes business closure notices and violations of local business regulations and ordinances.', tag: 'Enforcement', details: ['Non-Compliant Business Action', 'Violation Notice Issuance', 'Business Closure Processing'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)', location: 'Ground Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'bplo@tanauanleyte.gov.ph', helpline: 'Business Permit Window, Municipal Hall Ground Floor' },
    showPersonnel: false,
    formsAtEnd: true,
    downloadableForms: [
      {
        index: '01',
        category: 'Business Permits',
        title: 'Unified Application Form (UAF) for Business Permit (Annex 1)',
        type: 'ARTA & DILG Prescribed Form • RA 11032',
        icon: '',
        description: 'Standardized national 2-page unified application form (UAF) for new business applications, annual renewals, and gross sales assessments in Tanauan, Leyte.',
        format: 'Official PDF Document',
        fileSize: '191 KB',
        url: '/forms/licensing/BPLO-Unified-Application-Form-Business-Permit.pdf',
        downloadUrl: '/forms/licensing/BPLO-Unified-Application-Form-Business-Permit.pdf',
        pdfUrl: '/forms/licensing/BPLO-Unified-Application-Form-Business-Permit.pdf',
        htmlUrl: '/forms/licensing/unified-business-permit-application.html',
        pages: 2,
        requirements: [
          'Duly accomplished Unified Application Form (UAF) signed under penalty of perjury',
          'Barangay Business Clearance from the barangay where business operates',
          'DTI Certificate (Sole Proprietorship) / SEC Registration (Corporation/Partnership) / CDA (Cooperative)',
          'Proof of Right Over Property (Transfer Certificate of Title, Tax Declaration, or Notarized Lease Contract)',
          'Zoning / Locational Clearance from Municipal Planning & Development Office (MPDO)',
          'Sanitary Permit & Health Certificates from Municipal Health Office (MHO)',
          'Fire Safety Inspection Certificate (FSIC) from Bureau of Fire Protection (BFP) Tanauan',
          'Previous Year Official Receipt & Gross Sales Declaration / Audited Financial Statements (for Renewals)'
        ]
      },
      {
        index: '02',
        category: 'Public Transport',
        title: 'Application Form for Public Transport Service',
        type: 'BPLO & Traffic Management Section • MTOP',
        icon: '',
        description: 'Official application for public transport service franchise and motor vehicle regulation covering MCH, e-Trike, Pedicab, and Motopot operators and drivers.',
        format: 'Official PDF Document',
        fileSize: '275 KB',
        url: '/forms/licensing/BPLO-Application-Form-Public-Transport-Service.pdf',
        downloadUrl: '/forms/licensing/BPLO-Application-Form-Public-Transport-Service.pdf',
        pdfUrl: '/forms/licensing/BPLO-Application-Form-Public-Transport-Service.pdf',
        htmlUrl: '/forms/licensing/public-transport-service-application.html',
        pages: 1,
        requirements: [
          'Duly accomplished Application Form for Public Transport Service',
          'Official Receipt (OR) and Certificate of Registration (CR) of the Motor Vehicle unit',
          'Valid Professional Driver\'s License of the designated Driver',
          'Community Tax Certificate (Cedula) and Tax Identification Number (TIN)',
          'Barangay Clearance of Operator and Driver',
          'Certificate of Attendance in Seminar on Traffic Rules & Regulations (Traffic Management Section)',
          'Vehicle Roadworthiness and Safety Inspection Certification'
        ]
      },
      {
        index: '03',
        category: 'Checklists',
        title: 'Checklist of Documentary Requirements for Business Application',
        shortTitle: 'Business Application Checklist',
        type: 'Official BPLO Documentary Checklist',
        icon: '',
        description: 'Mandatory documentary checklist and prerequisite guidelines for new and renewal commercial business permit applications in Tanauan, Leyte.',
        format: 'Official Municipal Document',
        fileSize: '159 KB',
        url: '/forms/licensing/checklists/bplo-checklist-business-application.jpg',
        downloadUrl: '/forms/licensing/checklists/bplo-checklist-business-application.jpg',
        image: '/forms/licensing/checklists/bplo-checklist-business-application.jpg',
        preview: '/forms/licensing/checklists/bplo-checklist-business-application.jpg',
        requirements: [
          'Unified Application Form (UAF)',
          'Proof of Business Identity (DTI Sole Proprietorship / SEC Corporation or Partnership / CDA Cooperative)',
          'Barangay Clearance for Business',
          'Sanitary Permit to Operate',
          'BFP - FSIC (Fire Safety Inspection Certificate)',
          'Barangay Resolution as to No Objection',
          'Notarized Sworn Statement of Gross Sales or ITR (for Renewal)',
          'Health Card for Employees (Food & Non Food Related Business)',
          'PESO Registration for Owner/Employee Profiling',
          'Declaration of Capital (New Applicant)',
          'PNP Certification for Installed CCTV',
          'MENRO / DA / MPDC Certification',
          'Copy of Contract of Lease (if Renting) & Property Identification No.',
          'Copy of Occupancy Permit & Latest Business Permit of Lessor',
          'Market Stall Verification for Market Occupants',
          'MDRRMO Certification (with Beach Resort / Pool)',
          'Business Permit of Previous Year',
          'Picture of Physical Office, e.g.: Contractor',
          'Special Power of Attorney (SPA), if representative, ID of both parties'
        ]
      },
      {
        index: '04',
        category: 'Checklists',
        title: 'Checklist Requirements for e-Trike and Pedicab',
        shortTitle: 'e-Trike & Pedicab Checklist',
        type: 'Public Transport Regulatory Checklist',
        icon: '',
        description: 'Official regulatory checklist of prerequisites for e-Trike and Pedicab operators and drivers under the Traffic Management Section and BPLO.',
        format: 'Official Municipal Document',
        fileSize: '147 KB',
        url: '/forms/licensing/checklists/bplo-checklist-etrike-pedicab.jpg',
        downloadUrl: '/forms/licensing/checklists/bplo-checklist-etrike-pedicab.jpg',
        image: '/forms/licensing/checklists/bplo-checklist-etrike-pedicab.jpg',
        preview: '/forms/licensing/checklists/bplo-checklist-etrike-pedicab.jpg',
        requirements: [
          'Accomplished Application Form',
          'Seminar / Indorsement from Traffic Head',
          'Barangay Clearance',
          'Residence Certificate / Cedula',
          'National Police Clearance',
          'Proof of Ownership / Deed of Sale',
          'Inspection of the Unit by BPLO Inspector / PNP',
          'Business Permit of Previous Year (Renewal)'
        ]
      },
      {
        index: '05',
        category: 'Checklists',
        title: 'Checklist Requirements for MCH, Motopot, & Single Motorcycle',
        shortTitle: 'MCH & Motopot Checklist',
        type: 'Motorized Transport Regulatory Checklist',
        icon: '',
        description: 'Official statutory checklist for Motorized Tricycle-for-Hire (MCH), Motopot, and Single Motorcycle public transport utility franchises.',
        format: 'Official Municipal Document',
        fileSize: '160 KB',
        url: '/forms/licensing/checklists/bplo-checklist-mch-motopot.jpg',
        downloadUrl: '/forms/licensing/checklists/bplo-checklist-mch-motopot.jpg',
        image: '/forms/licensing/checklists/bplo-checklist-mch-motopot.jpg',
        preview: '/forms/licensing/checklists/bplo-checklist-mch-motopot.jpg',
        requirements: [
          'Accomplished Application Form',
          'Barangay Clearance (Route / Residence)',
          'Residence Certificate / Cedula',
          'Seminar / Indorsement from Traffic Head',
          'National Police Clearance',
          'Xerox of Motor Vehicle Registration (CR)',
          'Xerox of Latest LTO Official Receipt (OR)',
          'Xerox Copy of Driver\'s License of Owner',
          'Xerox Copy of Driver\'s License of Driver',
          'File Copy of the Franchise',
          'Inspection of the Unit by BPLO Inspector / PNP',
          'Business Permit of Previous Year (Renewal)'
        ]
      }
    ]
  },
  LYDO: {
    officeName: "Local Youth Development Office",
    officeCode: 'LYDO',
    category: 'Youth Affairs & Development',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Empowering the youth of Tanauan through programs, leadership development, and opportunities that shape the leaders of tomorrow.',
    typewriterWords: [
      'Empowering Tanauan\'s Youth',
      'Youth Leadership & Development',
      'Creating Opportunities for Young Tanauananons',
      'Investing in the Future of Tanauan'
    ],
    head: { name: '', title: 'Local Youth Development Officer', term: 'Department Head', quote: 'The youth are not just the future — they are powerful agents of change today. We are here to empower them.', credentials: ['Youth Development Specialist', 'SK Federation Development Officer'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Reached', description: 'Youth development programs in all 54 barangays' },
      { value: '1000', suffix: '+', label: 'Youth Beneficiaries', description: 'Young Tanauananons participating in LGU youth programs' },
      { value: '12', suffix: '+', label: 'Programs Annually', description: 'Youth-focused programs and activities conducted per year' },
      { value: '100', suffix: '%', label: 'SK Partnership', description: 'Full coordination with the Sangguniang Kabataan Federation' }
    ],
    mandates: [
      { index: '01', code: 'YOUTH-PROG', title: 'Youth Program Implementation', description: 'Plans and implements programs for youth empowerment, education, livelihood, and civic engagement.', tag: 'Core Function', details: ['Youth Empowerment Programs', 'Livelihood & Skills Training', 'Sports & Cultural Activities'] },
      { index: '02', code: 'SK-COORD', title: 'Sangguniang Kabataan Coordination', description: 'Coordinates with the SK Federation and barangay SK councils in planning and implementing youth activities.', tag: 'SK Partnership', details: ['SK Capacity Building', 'Annual Youth Investment Plan Facilitation', 'SK Program Monitoring'] },
      { index: '03', code: 'YOUTH-RECORD', title: 'Youth Records & Data Management', description: 'Maintains updated records of youth organizations, beneficiaries, and program activities in the municipality.', tag: 'Data Management', details: ['National Youth Commission Reporting', 'Youth Organization Registry', 'Program Impact Documentation'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: '', helpline: 'Local Youth Development Office, Municipal Hall' }
  },
  MAO: {
    officeName: "Municipal Administrator's Office",
    officeCode: 'MAdmin',
    category: 'Municipal Administration & Management',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Coordinating administrative operations, implementing municipal policies, and ensuring efficient delivery of local government services in Tanauan.',
    typewriterWords: [
      'Efficient Municipal Administration',
      'Coordinating Government Excellence',
      'Policy Implementation for Tanauan',
      'Administrative Leadership for Progress'
    ],
    head: { name: '', title: 'Municipal Administrator', term: 'Department Head', quote: 'Effective administration is the backbone of good governance — ensuring that every department works in harmony for the people.', credentials: ['Municipal Administrator', 'Public Administration Professional'], room: 'Municipal Hall, 2nd Floor, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '37', suffix: '+', label: 'Departments Coordinated', description: 'All municipal departments under administrative coordination' },
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'Administrative oversight covering all 54 barangays' },
      { value: '100', suffix: '%', label: 'Policy Compliance', description: 'Full implementation of municipal ordinances and policies' },
      { value: '12', suffix: '+', label: 'Monthly Reports', description: 'Administrative reports submitted to the Municipal Mayor' }
    ],
    mandates: [
      { index: '01', code: 'ADMIN-COORD', title: 'Administrative Coordination', description: 'Coordinates the administrative activities of all municipal departments to ensure efficient operations.', tag: 'Core Function', details: ['Department Coordination Meetings', 'Cross-Departmental Issue Resolution', 'Municipal Operations Monitoring'] },
      { index: '02', code: 'POLICY-IMPL', title: 'Policy Implementation', description: 'Implements policies, programs, and directives of the Municipal Mayor and Sangguniang Bayan.', tag: 'Policy Management', details: ['Executive Order Implementation', 'Municipal Policy Enforcement', 'Program Monitoring & Evaluation'] },
      { index: '03', code: 'EXEC-SUPP', title: 'Executive Support Services', description: 'Provides administrative and executive support to the Office of the Municipal Mayor.', tag: 'Executive Support', details: ['Mayor\'s Office Administrative Support', 'Official Communication Management', 'Executive Schedule Coordination'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, 2nd Floor, Real St., Tanauan, Leyte', contactNumber: '', email: '', helpline: "Municipal Administrator's Office, 2nd Floor" }
  },
  Market: {
    officeName: 'Municipal Market Office',
    officeCode: 'MMO',
    category: 'Market Administration & Services',
    citizensCharterUrl: '/citizens-charter/market',
    tagline: 'Managing the municipal public market to provide a clean, safe, and orderly trading environment for vendors and consumers in Tanauan.',
    typewriterWords: [
      'Clean & Orderly Public Market',
      'Supporting Local Vendors & Traders',
      'Fair Market Administration',
      'Vibrant Commerce in Tanauan'
    ],
    head: { name: 'Engr. Lue M. Maderazo', title: 'Market Supervisor', term: 'Department Head', quote: 'A well-managed public market is the heart of our community\'s commerce — bringing together farmers, vendors, and consumers.', credentials: ['Market Administration Specialist', 'Revenue Collection Officer'], room: 'Municipal Public Market, Tanauan, Leyte', schedule: 'Monday – Saturday: 6:00 AM – 6:00 PM' },
    orgChartImage: '/Market-OrgChart.jpg',
    stats: [
      { value: '500', suffix: '+', label: 'Registered Vendors', description: 'Active market stall holders in the municipal public market' },
      { value: '6', suffix: ' days', label: 'Market Operation', description: 'Market open Monday to Saturday for trading activities' },
      { value: '100', suffix: '%', label: 'Sanitary Compliance', description: 'Regular sanitary inspections ensuring food safety' },
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Market serving buyers and sellers from all barangays' }
    ],
    dutiesAndResponsibilities: {
      preamble:
        'The Municipal Market Office shall be responsible for the proper administration, supervision, regulation, and maintenance of the public market and its facilities, subject to existing national laws, municipal ordinances, rules, and regulations.',
      list: [
        'Administer and supervise the daily operations of the Municipal Public Market and ensure that its facilities and services are properly managed.',
        'Implement and enforce applicable municipal ordinances, rules, and regulations governing the use and operation of the public market.',
        'Regulate the use and occupancy of market stalls, booths, spaces, and other market facilities and maintain updated records of authorized occupants.',
        'Monitor and regulate market vendors, stallholders, lessees, and other persons conducting business within the public market to ensure compliance with applicable regulations.',
        'Conduct regular inspection of market stalls, spaces, facilities, and common areas and report violations, unsafe conditions, and other concerns requiring appropriate action.',
        'Coordinate with the Municipal Treasurer\'s Office regarding market rentals, fees, charges, arrears, and other lawful collections related to market operations.',
        'Ensure the proper implementation of policies concerning the assignment, renewal, transfer, cancellation, or termination of market stall occupancy, subject to applicable laws and ordinances.',
        'Maintain cleanliness, sanitation, orderliness, and proper waste management within the public market, in coordination with the appropriate municipal offices.',
        'Coordinate with the Municipal Health Office, Municipal Engineering Office, General Services Office, Bureau of Fire Protection, Philippine National Police, and other concerned agencies on matters affecting market sanitation, safety, security, infrastructure, and public welfare.',
        'Receive and act upon complaints, concerns, and requests from vendors, stallholders, consumers, and the general public concerning market operations, within the authority of the office.',
        'Monitor unauthorized vending, illegal occupation of market spaces, obstruction of passageways, and other prohibited activities and coordinate with the proper authorities for appropriate action.',
        'Monitor the condition of market buildings, stalls, drainage, water supply, electrical facilities, comfort rooms, waste disposal areas, and other market infrastructure, and recommend necessary repairs or improvements.',
        'Maintain complete and updated records and documents pertaining to market operations, including stall occupancy, vendor information, inspections, violations, complaints, and other official transactions.',
        'Prepare periodic reports and recommendations concerning the operation, administration, maintenance, and improvement of the public market for submission to the Municipal Mayor and other concerned offices.',
        'Assist in the preparation and implementation of programs, policies, and projects intended to improve the efficiency, safety, sanitation, and overall operation of the Municipal Public Market.',
        'Ensure that the public market is operated in an orderly, safe, sanitary, and equitable manner for the benefit of vendors, consumers, and the general public.',
        'Perform such other functions and responsibilities as may be provided by law, municipal ordinances, rules and regulations, and as may be lawfully assigned by the Municipal Mayor.'
      ]
    },
    mandates: [
      {
        index: '01',
        code: 'MKT-ADM',
        title: 'Market Administration & Operations',
        description: 'Manages the day-to-day operations, regulations, and administration of the municipal public market.',
        tag: 'Core Function',
        details: [
          'Stall Allocation & Management',
          'Market Fee Collection',
          'Vendor Registration & Accreditation'
        ]
      },
      {
        index: '02',
        code: 'SANIT',
        title: 'Sanitation & Market Hygiene',
        description: 'Ensures cleanliness, sanitation, and food safety standards throughout the public market.',
        tag: 'Health & Safety',
        details: [
          'Daily Market Cleaning',
          'Sanitary Inspection Coordination',
          'Food Safety Standards Enforcement'
        ]
      },
      {
        index: '03',
        code: 'ORDER',
        title: 'Order Maintenance & Security',
        description: 'Maintains peace, order, and security within the market premises for vendors and consumers.',
        tag: 'Security & Order',
        details: [
          'Market Security Personnel Management',
          'Vendor Compliance Monitoring',
          'Dispute Resolution'
        ]
      }
    ],
    downloadableForms: [
      {
        title: 'Stall / Space Verification (For Business Permit Issuance)',
        description: 'Official Municipal Market Office verification form for market stallholders, vendors, and space lessees certifying compliance with tenancy, rental accounts, and utility payments for business permit issuance.',
        icon: '📋',
        type: 'Printable Verification Slip / Form',
        url: '/forms/market/Stall-Space-Verification-Form.png',
        htmlUrl: '/forms/market/stall-space-verification-form.html',
        preview: '/forms/market/Stall-Space-Verification-Form.png',
        format: 'Official Form / Printable'
      }
    ],
    schedule: { hours: 'Monday – Saturday | 6:00 AM – 6:00 PM', location: 'Municipal Public Market, Tanauan, Leyte', contactNumber: '', email: '', helpline: 'Market Administration Office, Public Market Building' }
  },
  'Mayors-Office': {
    officeName: "Office of the Municipal Mayor",
    officeCode: 'OMM',
    category: 'Chief Executive Administration',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Leading the local government with integrity, vision, and service — championing the welfare and progress of every community in Tanauan.',
    typewriterWords: [
      'Visionary Leadership for Tanauan',
      'Executive Governance with Integrity',
      'Progress & Prosperity for All Tanauananons',
      'Building a Better Tanauan Together'
    ],
    head: { name: '', title: 'Municipal Mayor', term: 'Chief Executive', quote: 'Our mandate is clear — to serve every Tanauananon with integrity, transparency, and a steadfast commitment to progress.', credentials: ['Elected Chief Executive', 'Local Chief Executive'], room: "Office of the Mayor, 2nd Floor, Municipal Hall", schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Led', description: 'Executive oversight of all 54 barangays in Tanauan' },
      { value: '37', suffix: '+', label: 'Departments', description: 'Supervision of all municipal government departments' },
      { value: '100', suffix: '%', label: 'Accountability', description: 'Full accountability to the people of Tanauan' },
      { value: '3', suffix: 'yr', label: 'Term of Office', description: 'Term of service as elected Municipal Mayor' }
    ],
    mandates: [
      { index: '01', code: 'EXEC-LEAD', title: 'Executive Leadership & Policy Direction', description: 'Provides overall leadership, vision, and policy direction for the local government of Tanauan.', tag: 'Executive Function', details: ['Policy Formulation & Implementation', 'Executive Orders Issuance', 'Intergovernmental Relations'] },
      { index: '02', code: 'BUDGET-EXEC', title: 'Budget Execution & Fiscal Management', description: 'Executes the approved annual budget and oversees the efficient use of municipal funds.', tag: 'Fiscal Executive', details: ['Annual Budget Approval & Submission', 'Fund Utilization Oversight', 'Development Fund Management'] },
      { index: '03', code: 'PROG-MGT', title: 'Program & Project Management', description: 'Oversees the implementation of all municipal development programs and infrastructure projects.', tag: 'Development Management', details: ['Priority Program Oversight', 'Infrastructure Project Management', 'Barangay Development Coordination'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: "2nd Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte", contactNumber: '', email: 'mayor@tanauanleyte.gov.ph', helpline: "Mayor's Office, 2nd Floor, Municipal Hall" }
  },
  MDRRMO: {
    officeName: 'Municipal Disaster Risk Reduction & Management Office',
    officeCode: 'MDRRMO',
    category: 'Disaster Risk Reduction & Management',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Protecting lives and properties through proactive disaster risk reduction, preparedness, response, and rehabilitation programs in Tanauan.',
    typewriterWords: [
      'Protecting Tanauan from Disasters',
      'Disaster Preparedness & Community Resilience',
      'Swift Response & Recovery Services',
      'Building Safer Communities Together'
    ],
    head: { name: 'Ricardo Alejo N. Mazo', title: 'MDRRM Officer', term: 'Department Head', quote: 'Disaster preparedness is not just our mandate — it is our commitment to protecting every life in Tanauan.', credentials: ['Disaster Risk Reduction Specialist', 'Emergency Management Professional'], room: 'MDRRMO Office, Municipal Hall Complex, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM (24/7 Emergency Response)' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Protected', description: 'DRRM coverage across all 54 barangays in Tanauan' },
      { value: '24/7', suffix: '', label: 'Emergency Response', description: 'Round-the-clock emergency response capability' },
      { value: '100', suffix: '%', label: 'DRRM Fund Compliance', description: 'Full compliance with NDRRMC guidelines for DRRM fund use' },
      { value: '12', suffix: '+', label: 'Annual Drills', description: 'Evacuation drills and preparedness exercises conducted yearly' }
    ],
    mandates: [
      {
        index: '01',
        code: 'EMERG-RESP',
        title: 'Emergency Response Services',
        description: '24/7 on-scene emergency rescue, basic life support, patient trauma triage, and rapid ambulance transport to the nearest hospital facility by the Tanauan Emergency Response Team (TERT).',
        tag: '24/7 Emergency Dispatch',
        details: [
          'Immediate Dispatch via 0916-197-7360 / 0931-739-3333 & 167.600 MHz Radio',
          'On-Scene Medical Assessment, First Aid & Basic Life Support (BLS)',
          'Hazardous Situation Extraction & Patient Packaging',
          'Emergency Vehicle Transport to Nearest Hospital & Medical Turnover',
          'Post-Operation Incident Logging & Multi-Agency Reporting'
        ]
      },
      {
        index: '02',
        code: 'MED-TRANSPORT',
        title: 'Non-Emergency Medical Transport Support Services',
        description: 'Scheduled compassionate patient transport for medical referrals, hospital check-ups, post-treatment discharges, and specialized healthcare mobility for Tanauan residents.',
        tag: 'Medical Transport',
        details: [
          'In-Person Submission of Approved Request Letter (24–48 Hours Prior)',
          'MDRRMO Verification, Patient Assessment & Unit Scheduling',
          'Assisted Boarding, Continuous Patient Monitoring & Safe Turnover',
          'Official Transport Logbook Recording & Healthcare Coordination'
        ]
      },
      {
        index: '03',
        code: 'COMM-SERVICES',
        title: 'Community Services Support (Logistics & Transport)',
        description: 'Logistical vehicle deployment and community transport support for burial assistance, municipal activities, educational field logistics, and civic public services.',
        tag: 'Logistics & Community Support',
        details: [
          'Request Letter to Mayor Gina E. Merilo thru MDRRM Officer Ricardo Alejo N. Mazo',
          'Advance Filing (24–48 Hours Prior) for Fleet & Crew Availability',
          'Vehicle Deployment with Dedicated Driver & Safety Protocol Compliance',
          'Return Trip Inspection & Driver/Crew Logbook Sign-Off'
        ]
      },
      {
        index: '04',
        code: 'EVAC-SUPPORT',
        title: 'Evacuation Support Services',
        description: 'Coordinated disaster evacuation transport during hydrometeorological calamities, pre-emptive evacuations, and emergency shelter transfers across Tanauan’s 54 barangays.',
        tag: 'Disaster Evacuation',
        details: [
          'Coordination with MSWDO & Barangay Emergency Officials',
          'MDRRMO Hazard Assessment & Rapid Evacuation Fleet Mobilization',
          'Designated Barangay Pick-Up & Drop-Off Point Synchronization',
          'Safe Transit & Turnover to Certified Storm-Resilient Evacuation Centers'
        ]
      },
      {
        index: '05',
        code: 'INCIDENT-CERT',
        title: 'Issuance of Disaster Incident Certification',
        description: 'Official issuance of verified Disaster Incident Certifications for insurance, legal, social welfare assistance, and calamity recovery documentation.',
        tag: 'Public Certification',
        details: [
          'Securing Supporting Incident/Spot Report from PNP, BFP, or Barangay',
          'Filing Formal Request with Blotter & Identification Proof at MDRRMO',
          'Information Verification: Affected Person/Family, Location & Event Date',
          'Official Certification Preparation & Authorized Issuance'
        ]
      }
    ],
    downloadableForms: [
      {
        title: 'Emergency Response Services Step-by-Step Guide',
        category: 'Emergency Dispatch',
        description: 'Official 5-step operational protocol for emergency reporting, on-scene rescue, and patient hospital transport.',
        downloadUrl: '/docs/mdrrmo/emergency-response-and-medical-transport.pdf',
        url: '/docs/mdrrmo/emergency-response-and-medical-transport.pdf',
        preview: '/docs/mdrrmo/emergency-response-preview.png',
        image: '/docs/mdrrmo/emergency-response-preview.png',
        icon: '🚨',
        type: 'Step-by-Step Guide / PDF',
        format: 'Official PDF Document',
        fileSize: '821 KB',
        fileType: 'PDF Document',
        requirements: [
          'Immediate call to 0916-197-7360 / 0931-739-3333 or VHF 167.600 MHz',
          'Provide clear incident location, landmarks, and count of affected persons',
          'Stay calm and follow emergency operator instructions until rescue arrives'
        ]
      },
      {
        title: 'Non-Emergency Medical Transport Support Guide',
        category: 'Medical Transport',
        description: 'Step-by-step application procedure for requesting scheduled patient ambulance transport and check-up logistics.',
        downloadUrl: '/docs/mdrrmo/emergency-response-and-medical-transport.pdf',
        url: '/docs/mdrrmo/emergency-response-and-medical-transport.pdf',
        preview: '/docs/mdrrmo/medical-transport-preview.jpg',
        image: '/docs/mdrrmo/medical-transport-preview.jpg',
        icon: '🚑',
        type: 'Step-by-Step Guide / PDF',
        format: 'Official PDF Document',
        fileSize: '821 KB',
        fileType: 'PDF Document',
        requirements: [
          'Request letter addressed to Mayor Hon. Ma. Gina E. Merilo thru Ricardo Alejo N. Mazo',
          'Submit at least 24–48 hours before needed transport date',
          'Include applicant and patient contact number/s and destination clinic/hospital'
        ]
      },
      {
        title: 'Community Services Support Step-by-Step Guide',
        category: 'Community Support',
        description: 'Guidelines and request procedure for municipal vehicle logistics, burial transport, and school activity support.',
        downloadUrl: '/docs/mdrrmo/community-services-support.pdf',
        url: '/docs/mdrrmo/community-services-support.pdf',
        preview: '/docs/mdrrmo/community-services-preview.jpg',
        image: '/docs/mdrrmo/community-services-preview.jpg',
        icon: '🤝',
        type: 'Step-by-Step Guide / PDF',
        format: 'Official PDF Document',
        fileSize: '445 KB',
        fileType: 'PDF Document',
        requirements: [
          'Request letter to the Local Chief Executive specifying exact transport service needed',
          'Secure official Mayor\'s Office approval prior to MDRRMO scheduling',
          'Filing at least 24–48 hours before the event date to ensure vehicle and driver availability'
        ]
      },
      {
        title: 'Evacuation Support Services Guide',
        category: 'Disaster Evacuation',
        description: 'Barangay coordination, MSWDO intake, and fleet transport protocol for pre-emptive and mandatory calamity evacuations.',
        downloadUrl: '/docs/mdrrmo/evacuation-support-services.pdf',
        url: '/docs/mdrrmo/evacuation-support-services.pdf',
        preview: '/docs/mdrrmo/evacuation-support-preview.jpg',
        image: '/docs/mdrrmo/evacuation-support-preview.jpg',
        icon: '🛡️',
        type: 'Step-by-Step Guide / PDF',
        format: 'Official PDF Document',
        fileSize: '306 KB',
        fileType: 'PDF Document',
        requirements: [
          'Intake coordination with Ms. Arleen B. Cinco (MSWDO) at 0995-005-8959',
          'Provide pickup point, number of evacuees, and special needs (children, elderly, PWDs)',
          'Coordination with Barangay Officials for safe rendezvous point staging'
        ]
      },
      {
        title: 'Disaster Incident Certification Request Guide',
        category: 'Public Certification',
        description: 'Requirements, agency spot report verifications, and processing steps for securing a Disaster Incident Certificate.',
        downloadUrl: '/docs/mdrrmo/disaster-incident-certification.pdf',
        url: '/docs/mdrrmo/disaster-incident-certification.pdf',
        preview: '/docs/mdrrmo/disaster-certification-preview.jpg',
        image: '/docs/mdrrmo/disaster-certification-preview.jpg',
        icon: '📜',
        type: 'Step-by-Step Guide / PDF',
        format: 'Official PDF Document',
        fileSize: '336 KB',
        fileType: 'PDF Document',
        requirements: [
          'Official supporting report from PNP, BFP, or Barangay blotter / spot report',
          'Valid government-issued ID and formal request letter to MDRRMO',
          'Accurate incident details: date, location, affected family name, and damages incurred'
        ]
      }
    ],
    schedule: {
      hours: '24/7 Emergency Dispatch & Operations (Office: Mon – Fri | 8:00 AM – 5:00 PM)',
      location: 'MDRRMO Office & Operations Center, Tanauan Municipal Hall Complex, Real St., Tanauan, Leyte',
      contactNumber: 'Globe: 0916-197-7360 | Smart: 0931-739-3333',
      globeNumber: '0916-197-7360',
      smartNumber: '0931-739-3333',
      radioFrequency: '167.600 MHz',
      facebook: 'MDRRMO-TANAUAN LEYTE',
      facebookUrl: 'https://www.facebook.com/search/top?q=MDRRMO-TANAUAN%20LEYTE',
      email: 'mdrrmo@tanauanleyte.gov.ph',
      helpline: 'MDRRMO Emergency Operations Center (EOC)'
    }
  },
  MENRO: {
    department: 'MENRO',
    officeName: 'Municipal Environment & Natural Resources Office',
    officeCode: 'MENRO',
    category: 'Environment & Natural Resources Management',
    citizensCharterUrl: '/citizens-charter/environment',
    showAccomplishments: true,
    tagline: 'Enforcing ecological solid waste management, sustainable natural resource conservation, and environmental protection under RA 9003 for the Municipality of Tanauan.',
    typewriterWords: [
      'Ecological Solid Waste Management',
      'Implementing the 10-Year SWM Plan (2024–2033)',
      'Protecting Tanauan\'s Natural Resources',
      'Enforcing RA 9003 & Municipal Ordinance No. 2024-20'
    ],
    head: { name: 'Mark Leo T. Cinco', title: 'MENRO Designate', term: 'Department Head', quote: 'A healthy environment is not a privilege but a constitutional right — we protect and preserve it through strict waste segregation, diversion, and community stewardship.', credentials: ['MENRO Designate', 'Environmental Management Specialist', 'Natural Resources Conservation Officer'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '64.03', suffix: '%', label: 'Waste Diversion Rate', description: '18,656.75 kgs/day diverted under the approved 10-Year SWM Plan' },
      { value: '60,700', suffix: '', label: 'Projected Population', description: 'Served across all 54 barangays in the Municipality of Tanauan' },
      { value: '29,136', suffix: ' kg', label: 'Daily Waste Generated', description: 'Municipal daily waste volume based on 0.48 kg/capita generation' },
      { value: '10-Yr', suffix: ' Plan', label: 'Solid Waste Plan', description: 'Approved 2024–2033 roadmap under RA 9003 & MO No. 2024-20' }
    ],
    mandates: [
      {
        index: '01',
        code: 'BIO-WASTE',
        title: 'Nabubulok na Basura (Biodegradable Waste)',
        description: 'Organikong basura mula sa kusina, pagkain, at bakuran na maaaring gawing pataba o kompos sa lupa.',
        tag: 'Compostable',
        details: [
          'Balat ng prutas & gulay',
          'Hasang, bituka at tinik ng isda',
          'Tuyong dahon at tirang pagkain'
        ]
      },
      {
        index: '02',
        code: 'RECY-WASTE',
        title: 'Nareresiklo na Basura (Recyclable Waste)',
        description: 'Mga tuyo at malinis na materyales na maaari pang gamitin muli, dalhin sa MRF, o ibenta sa junk shop.',
        tag: 'Recyclables',
        details: [
          'Papel, karton, at dry paper packaging',
          'Bote (glass containers) at tin cans',
          'PET bottles, plastics atbp.'
        ]
      },
      {
        index: '03',
        code: 'RESI-WASTE',
        title: 'Di-Nareresiklo na Basura (Residual Waste)',
        description: 'Mga basurang hindi na maaaring gawing kompos o iresiklo; tanging kinokolekta patungo sa Sanitary Landfill.',
        tag: 'Landfill Disposal',
        details: [
          'Sanitary napkins at disposable diapers',
          'Sachets at balat ng kendi',
          'Tissue at iba pang di-nabubulok'
        ]
      },
      {
        index: '04',
        code: 'SPEC-WASTE',
        title: 'Nakakalason na Basura (Special Waste)',
        description: 'Mapanganib at kemikal na basura kasama ang sirang appliances at electronic waste na may espesyal na pagtatapon.',
        tag: 'Special / Hazardous',
        details: [
          'Pintura, spray canister at thinner',
          'Baterya (lead-acid at household)',
          'Mga sirang gamit: aparador, TV, radyo, refrigerator'
        ]
      }
    ],
    downloadableForms: [
      {
        title: 'Checklist for Cutting Permit (MENRO Certification)',
        category: 'Tree Cutting Permitting',
        description: 'Official documentary requirements and certification checklist for tree cutting permit applications filed through the Municipal Environment & Natural Resources Office.',
        downloadUrl: '/docs/menro/checklist-for-cutting-permit.pdf',
        url: '/docs/menro/checklist-for-cutting-permit.pdf',
        icon: '🌳',
        type: 'Permit Checklist / PDF',
        format: 'Official PDF Document',
        fileSize: '68 KB',
        fileType: 'PDF Document',
        requirements: [
          'Barangay Certification (2 Original Copies)',
          'Tax Declaration / Xerox copy if original Certificate of Title (If the applicant is not the landowner, attach photocopy of Affidavit of Heirship)',
          'Picture han Puno (Clear printed photo of the tree to be cut)',
          'Picture of newly planted tree (Greening and reforestation compliance)',
          'Certification Fee: ₱80.00 pesos per tree (payable at the Municipal Treasurer\'s Office)',
          'Letter of Intent addressed to CENR Officer Edgardo D. Alegre, RPF'
        ]
      },
      {
        title: 'Certification for Business Permit (Citizen\'s Charter & Guide)',
        category: 'Business Permitting',
        description: 'Official Citizen\'s Charter, requirements, and step-by-step procedure for securing an Environmental Certification for Business Permit (residential, commercial, and industrial).',
        downloadUrl: '/docs/menro/certification-for-business-permit.pdf',
        url: '/docs/menro/certification-for-business-permit.pdf',
        icon: '📋',
        type: 'Citizen\'s Charter / PDF',
        format: 'Official PDF Document',
        fileSize: '82 KB',
        fileType: 'PDF Document',
        requirements: [
          'Certificate of Non-Coverage (CNC) or Environmental Compliance Certificate (ECC) from the Department of Environment and Natural Resources (DENR)',
          'Barangay Resolution endorsing the business operation from the host Barangay',
          'Step 1 (Client): Secure all necessary documents needed to be attached (CNC/ACC, Barangay Resolution)',
          'Step 2 (Client): Pay ₱80.00 Certification Fee at the Municipal Treasurer\'s Office and present proof of payment',
          'Step 3 (Client): File complete documents at the Office of the MENRO',
          'Agency Action: Immediately make and print the certification (Processing time: 10 minutes by MENRO Staff)'
        ]
      },
      {
        title: 'Solid Waste Segregation & Classification Guidelines (RA 9003)',
        category: 'Solid Waste Management',
        description: 'Official waste sorting and mandatory at-source segregation guidelines under RA 9003 and Municipal Ordinance No. 2024-20 covering Biodegradable, Recyclable, Residual, and Special Waste.',
        downloadUrl: '/docs/menro/residual-waste-guidelines.pdf',
        url: '/docs/menro/residual-waste-guidelines.pdf',
        icon: '♻️',
        type: 'Citizen Guide / PDF',
        format: 'Official PDF Document',
        fileSize: '1.7 MB',
        fileType: 'PDF Document',
        requirements: [
          'Nabubulok na Basura (Biodegradable): Fruit & vegetable peels, fish entrails/bones, dry leaves, leftover food',
          'Nareresiklo na Basura (Recyclable): Clean paper, cardboard boxes, bottles, tin cans, PET plastics',
          'Di-Nareresiklo na Basura (Residual): Sanitary napkins, diapers, sachets, candy wrappers, tissue',
          'Nakakalason na Basura (Special): Paint, spray canisters, thinner, batteries, defective electronic appliances'
        ]
      },
      {
        title: 'MENRO Official Hierarchy & Collection Fleet Blueprint',
        category: 'Administrative Hierarchy',
        description: 'Complete civil service structure, operational hierarchy, and 5-vehicle collection fleet directory of the Municipal Environment & Natural Resources Office.',
        downloadUrl: '/images/org-charts/menro/menro-org-chart.pdf',
        url: '/images/org-charts/menro/menro-org-chart.pdf',
        icon: '🏛️',
        type: 'CSC Ratified Chart / PDF',
        format: 'Official PDF Document',
        fileSize: '2.1 MB',
        fileType: 'PDF Document',
        requirements: [
          'Executive Governance under Hon. Ma. Gina E. Merilo and Mark Leo T. Cinco',
          'Natural Resources & Landfill Heavy Equipment Section directory',
          '5-truck weekday collection fleet routes and personnel assignments'
        ]
      }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'menro@tanauanleyte.gov.ph', helpline: 'MENRO Office, Municipal Hall Ground Floor' }
  },
  MSWDO: {
    officeName: 'Municipal Social Welfare & Development Office',
    officeCode: 'MSWDO',
    category: 'Social Welfare & Community Development',
    citizensCharterUrl: '/citizens-charter/social-welfare',
    tagline: 'Delivering compassionate social protection, welfare programs, and community development services to the most vulnerable sectors of Tanauan.',
    typewriterWords: [
      'Compassionate Social Welfare Services',
      'Protecting Tanauan\'s Vulnerable Sectors',
      'Community Development & Empowerment',
      'Social Protection for Every Tanauananon'
    ],
    head: { name: '', title: 'Municipal Social Welfare & Development Officer', term: 'Department Head', quote: 'Every vulnerable citizen deserves dignity, protection, and support — that is the heart of social welfare.', credentials: ['Licensed Social Worker', 'DSWD-Accredited Social Welfare Practitioner'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Social welfare programs reaching all 54 barangays' },
      { value: '5000', suffix: '+', label: 'Beneficiaries Annually', description: 'Residents receiving social protection and assistance' },
      { value: '12', suffix: '+', label: 'Programs', description: 'Active social protection and welfare programs' },
      { value: '100', suffix: '%', label: 'DSWD Compliance', description: 'Full compliance with DSWD standards and guidelines' }
    ],
    mandates: [
      { index: '01', code: 'SOC-PROT', title: 'Social Protection Programs', description: 'Implements social protection programs for indigent families, senior citizens, PWDs, and other vulnerable sectors.', tag: 'Core Function', details: ['4Ps & AICS Assistance', 'Senior Citizen Pension Management', 'PWD Benefits & Assistance'] },
      { index: '02', code: 'CRISIS-INT', title: 'Crisis Intervention & Social Services', description: 'Provides crisis intervention, counseling, and emergency assistance to individuals and families in need.', tag: 'Crisis Services', details: ['Emergency Financial Assistance', 'Crisis Counseling & Intervention', 'Referral Services & Coordination'] },
      { index: '03', code: 'COMM-DEV', title: 'Community Development Programs', description: 'Facilitates community development initiatives to empower local communities and strengthen social capital.', tag: 'Community Development', details: ['Livelihood Program Implementation', 'Community Organizing & Mobilization', 'Self-Help Group Development'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'mswdo@tanauanleyte.gov.ph', helpline: 'MSWDO Office, Municipal Hall Ground Floor' }
  },
  'Municipal-Administrator': {
    officeName: "Office of the Municipal Administrator",
    officeCode: 'OMA',
    category: 'Municipal Administration',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Coordinating and supervising administrative operations across all municipal departments to ensure efficient and effective local governance.',
    typewriterWords: [
      'Administrative Excellence in Governance',
      'Efficient Coordination of Municipal Services',
      'Supporting the Mayor in Executive Management',
      'Effective Administration for Tanauan'
    ],
    head: { name: '', title: 'Municipal Administrator', term: 'Department Head', quote: 'Good administration means every department works seamlessly as one team, all in service of the people of Tanauan.', credentials: ['Public Administration Professional', 'Local Government Management Expert'], room: "2nd Floor, Municipal Hall, Tanauan, Leyte", schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '37', suffix: '+', label: 'Departments Supervised', description: 'All municipal departments under administrative oversight' },
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'Administrative coverage of all 54 barangays' },
      { value: '100', suffix: '%', label: 'Policy Compliance', description: 'Full implementation of all municipal policies and directives' },
      { value: '12', suffix: '+', label: 'Monthly Reports', description: 'Administrative performance reports submitted monthly' }
    ],
    mandates: [
      { index: '01', code: 'COORD', title: 'Inter-Departmental Coordination', description: 'Coordinates the activities of all municipal departments to ensure alignment with the Mayor\'s development agenda.', tag: 'Core Function', details: ['Department Coordination Meetings', 'Cross-Department Issue Resolution', 'Work Plan Alignment'] },
      { index: '02', code: 'POLICY', title: 'Policy & Directive Implementation', description: 'Oversees the implementation of executive orders, policies, and directives of the Office of the Mayor.', tag: 'Policy Management', details: ['Executive Directive Enforcement', 'Program Implementation Monitoring', 'Administrative Circular Management'] },
      { index: '03', code: 'PERFORM', title: 'Performance Monitoring & Evaluation', description: 'Monitors and evaluates the performance of all municipal departments against set targets and KPIs.', tag: 'Performance Management', details: ['Departmental Performance Reviews', 'KPI Tracking & Reporting', 'SGLG Preparation & Compliance'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: "2nd Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte", contactNumber: '', email: '', helpline: "Municipal Administrator's Office, 2nd Floor" }
  },
  OSCA: {
    officeName: "Office for Senior Citizens Affairs",
    officeCode: 'OSCA',
    category: 'Senior Citizens Affairs & Services',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Championing the rights, welfare, and dignity of senior citizens in Tanauan through comprehensive programs, privileges, and social services.',
    typewriterWords: [
      'Honoring Our Senior Citizens',
      'Comprehensive Care for the Elderly',
      'Protecting Senior Rights & Privileges',
      'Dignity & Wellness for Our Elders'
    ],
    head: { name: '', title: 'OSCA Head', term: 'Department Head', quote: 'Our senior citizens have given their best years to our community — it is our duty to honor and care for them with the dignity they deserve.', credentials: ['Senior Citizens Affairs Specialist', 'Social Welfare Professional'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Senior citizen services across all 54 barangays' },
      { value: '2000', suffix: '+', label: 'Registered Seniors', description: 'Active registered senior citizens in the municipality' },
      { value: '20', suffix: '%', label: 'Discount Privilege', description: 'Mandated discount for seniors on goods and services' },
      { value: '100', suffix: '%', label: 'Quarterly Pension', description: 'Social pension distribution to all qualified senior citizens' }
    ],
    mandates: [
      { index: '01', code: 'SENIOR-PRIV', title: 'Senior Citizen Privileges & Benefits', description: 'Administers and facilitates all privileges, discounts, and benefits for registered senior citizens.', tag: 'Core Function', details: ['Senior Citizen ID Issuance', 'OSCA Booklet Distribution', 'Privileges & Discounts Facilitation'] },
      { index: '02', code: 'SOC-PENSION', title: 'Social Pension Program', description: 'Manages the distribution of social pension to indigent senior citizens per DSWD guidelines.', tag: 'Social Protection', details: ['Beneficiary Registration & Validation', 'Quarterly Pension Distribution', 'Eligibility Monitoring'] },
      { index: '03', code: 'SENIOR-PROG', title: 'Senior Citizens Programs & Activities', description: 'Organizes programs, activities, and services to promote the health, wellness, and social participation of senior citizens.', tag: 'Programs & Activities', details: ['Senior Health & Wellness Programs', 'Senior Citizens Day Activities', 'Livelihood & Skills Training for Seniors'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: '', helpline: 'OSCA Office, Municipal Hall' }
  },
  Peso: {
    officeName: 'Public Employment Service Office',
    officeCode: 'PESO',
    category: 'Employment & Livelihood Services',
    citizensCharterUrl: '/citizens-charter/peso',
    tagline: 'Connecting job seekers with employment opportunities and providing livelihood services to strengthen the workforce of Tanauan.',
    typewriterWords: [
      'Connecting Tanauan to Employment',
      'Livelihood & Jobs for All',
      'Workforce Development Programs',
      'Building Careers for Tanauananons'
    ],
    head: { name: '', title: 'PESO Manager', term: 'Department Head', quote: 'Every Tanauananon deserves the opportunity to earn a dignified living — our mission is to make that connection happen.', credentials: ['PESO Manager', 'DOLE-Accredited Employment Service Provider', 'LEO III'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Employment services reaching all 54 barangays' },
      { value: '500', suffix: '+', label: 'Job Seekers Assisted', description: 'Job seekers placed and assisted annually' },
      { value: '100', suffix: '+', label: 'Partner Employers', description: 'Local and national employers partnered with PESO' },
      { value: '12', suffix: '+', label: 'Job Fairs Annually', description: 'Employment and livelihood events organized per year' }
    ],
    mandates: [
      { index: '01', code: 'JOB-MATCH', title: 'Employment Facilitation & Job Matching', description: 'Facilitates the matching of job seekers with local and overseas employment opportunities through DOLE programs.', tag: 'Core Function', details: ['Job Vacancy Posting & Referral', 'Local Job Fairs & Recruitment Events', 'OFW Pre-Departure Orientation'] },
      { index: '02', code: 'LIVELIHOOD', title: 'Livelihood Program Implementation', description: 'Implements DOLE and LGU livelihood programs to provide alternative income sources for unemployed residents.', tag: 'Livelihood', details: ['Skills Training & Certification', 'Livelihood Starter Kits', 'TUPAD Program Implementation'] },
      { index: '03', code: 'LABOR-INFO', title: 'Labor Market Information', description: 'Maintains updated labor market information and employment statistics for the municipality.', tag: 'Information Services', details: ['Employment Data Collection', 'Labor Market Analysis', 'DOLE Reporting & Coordination'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'peso@tanauanleyte.gov.ph', helpline: 'PESO Office, Municipal Hall' }
  },
  PhilHealth: {
    officeName: 'PhilHealth Service Desk',
    officeCode: 'PHSVC',
    category: 'National Health Insurance Services',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Assisting Tanauan residents with PhilHealth enrollment, contributions, and benefits to ensure access to quality, affordable healthcare.',
    typewriterWords: [
      'Universal Health Coverage for Tanauan',
      'PhilHealth Benefits Made Accessible',
      'Securing Health Insurance for All',
      'Healthcare Access for Every Filipino'
    ],
    head: { name: '', title: 'PhilHealth Officer-in-Charge', term: 'Department Head', quote: 'Health insurance is every Filipino\'s right — we are here to ensure every Tanauananon can access the benefits they deserve.', credentials: ['PhilHealth-Accredited Service Officer', 'Health Insurance Specialist'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'PhilHealth services accessible to all 54 barangays' },
      { value: '5000', suffix: '+', label: 'Members Assisted', description: 'PhilHealth members assisted with enrollment and benefits' },
      { value: '100', suffix: '%', label: 'Service Coverage', description: 'Full municipal coverage for PhilHealth enrollment assistance' },
      { value: '12', suffix: '+', label: 'Monthly Transactions', description: 'Monthly PhilHealth-related transactions processed' }
    ],
    mandates: [
      { index: '01', code: 'ENROLL', title: 'Membership Enrollment Assistance', description: 'Assists residents in enrolling as PhilHealth members and updating their membership information.', tag: 'Core Function', details: ['New Member Registration', 'Membership Data Update', 'Dependent Registration'] },
      { index: '02', code: 'CLAIMS', title: 'Benefits & Claims Assistance', description: 'Guides PhilHealth members in availing their healthcare benefits and processing claims.', tag: 'Benefits', details: ['Claims Processing Guidance', 'Benefits Information Dissemination', 'Hospital Referral Coordination'] },
      { index: '03', code: 'INFO-EDUC', title: 'Information & Education', description: 'Conducts community information campaigns to promote PhilHealth membership and awareness of benefits.', tag: 'Advocacy', details: ['PhilHealth Awareness Campaigns', 'Community Information Sessions', 'Barangay PhilHealth Orientation'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: '', helpline: 'PhilHealth Service Desk, Municipal Hall' }
  },
  Planning: {
    officeName: 'Municipal Planning & Development Office',
    officeCode: 'MPDO',
    category: 'Planning & Development Coordination',
    citizensCharterUrl: '/citizens-charter/planning',
    tagline: 'Guiding the comprehensive development of Tanauan through evidence-based planning, zoning administration, and strategic investment programming.',
    typewriterWords: [
      'Planned Growth for a Better Tanauan',
      'Evidence-Based Development Planning',
      'Strategic Investment for Progress',
      'Comprehensive & Inclusive Development'
    ],
    head: { name: '', title: 'Municipal Planning & Development Coordinator', term: 'Department Head', quote: 'Good planning transforms vision into reality — guiding Tanauan toward a future that is inclusive, sustainable, and prosperous.', credentials: ['Municipal Planning & Development Coordinator', 'Urban and Regional Planning Specialist'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Planned', description: 'Development planning coverage for all 54 barangays' },
      { value: '100', suffix: '%', label: 'HLURB Compliance', description: 'Full compliance with HLURB/DHSUD planning guidelines' },
      { value: '3', suffix: 'yr', label: 'AIP Cycle', description: 'Annual Investment Program aligned with ELA and PDPFP' },
      { value: '100', suffix: '%', label: 'Data Currency', description: 'Updated socio-economic and spatial data for planning decisions' }
    ],
    mandates: [
      { index: '01', code: 'COMP-PLAN', title: 'Comprehensive Development Planning', description: 'Prepares and updates the Comprehensive Land Use Plan (CLUP), Comprehensive Development Plan (CDP), and Annual Investment Program (AIP).', tag: 'Core Function', details: ['CLUP Preparation & Updating', 'CDP & AIP Preparation', 'ELA & PDPFP Alignment'] },
      { index: '02', code: 'ZONING', title: 'Zoning Administration', description: 'Administers the local zoning ordinance, processes locational clearances, and ensures compliance with land use plans.', tag: 'Zoning', details: ['Locational Clearance Issuance', 'Zoning Ordinance Enforcement', 'Land Use Reclassification Processing'] },
      { index: '03', code: 'DATA-MGT', title: 'Development Data Management', description: 'Maintains updated socio-economic, geographic, and statistical data to support evidence-based planning and decision-making.', tag: 'Data Management', details: ['Socio-Economic Data Collection', 'GIS & Spatial Data Management', 'Development Statistics Reporting'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'mpdo@tanauanleyte.gov.ph', helpline: 'MPDO Office, Municipal Hall' }
  },
  Procurement: {
    officeName: 'Bids & Awards Committee Secretariat',
    officeCode: 'BAC',
    category: 'Government Procurement & Bidding',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Ensuring transparent, competitive, and compliant government procurement processes for efficient delivery of public services in Tanauan.',
    typewriterWords: [
      'Transparent Government Procurement',
      'Fair & Competitive Bidding Processes',
      'RA 9184 Compliant Procurement',
      'Efficient Public Resource Acquisition'
    ],
    head: { name: '', title: 'BAC Secretariat Head', term: 'Department Head', quote: 'Transparent and competitive procurement is the guarantee that government money is spent wisely for the public good.', credentials: ['Government Procurement Specialist', 'RA 9184 Certified Procurement Officer'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '100', suffix: '%', label: 'RA 9184 Compliance', description: 'Full compliance with Government Procurement Reform Act' },
      { value: '54', suffix: '', label: 'Departments Served', description: 'Procurement assistance for all municipal departments' },
      { value: '100', suffix: '%', label: 'PhilGEPS Posting', description: 'All procurement opportunities posted on PhilGEPS' },
      { value: '3', suffix: 'days', label: 'Min Processing', description: 'Minimum processing time for procurement documents' }
    ],
    mandates: [
      { index: '01', code: 'BID-PROC', title: 'Bidding & Procurement Process', description: 'Manages the end-to-end procurement process including advertisement, pre-bid conferences, and bid opening.', tag: 'Core Function', details: ['PhilGEPS Advertisement', 'Pre-Bid Conference Management', 'Bid Opening & Evaluation'] },
      { index: '02', code: 'CONTRACT', title: 'Contract Award & Management', description: 'Facilitates the award of contracts to qualified bidders and monitors contract compliance.', tag: 'Contract Management', details: ['Notice of Award Preparation', 'Contract Signing Facilitation', 'Performance Bond Processing'] },
      { index: '03', code: 'ALT-MODES', title: 'Alternative Procurement Methods', description: 'Processes alternative modes of procurement such as direct contracting, shopping, and negotiated procurement.', tag: 'Alternative Modes', details: ['Shopping & Direct Contracting', 'Negotiated Procurement Processing', 'Emergency Procurement'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'bac@tanauanleyte.gov.ph', helpline: 'BAC Secretariat Office, Municipal Hall' }
  },
  PWD: {
    officeName: 'Persons with Disability Affairs Office',
    officeCode: 'PDAO',
    category: 'PWD Affairs & Social Inclusion',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Upholding the rights, welfare, and social inclusion of persons with disabilities in Tanauan through accessible programs and services.',
    typewriterWords: [
      'Inclusive Tanauan for PWDs',
      'Rights & Dignity for Persons with Disabilities',
      'Breaking Barriers, Creating Opportunities',
      'Social Inclusion for Every Tanauananon'
    ],
    head: { name: '', title: 'PDAO Head', term: 'Department Head', quote: 'Disability is not inability — every person with a disability deserves equal opportunity, dignity, and the full enjoyment of their rights.', credentials: ['Disability Affairs Officer', 'Social Welfare Professional'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Served', description: 'PWD services available across all 54 barangays' },
      { value: '20', suffix: '%', label: 'Discount Privilege', description: 'Mandated discount for PWDs on goods and services' },
      { value: '100', suffix: '%', label: 'Rights Advocacy', description: 'Full implementation of Magna Carta for Disabled Persons' },
      { value: '500', suffix: '+', label: 'Registered PWDs', description: 'Active registered PWDs receiving assistance in Tanauan' }
    ],
    mandates: [
      { index: '01', code: 'PWD-REG', title: 'PWD Registration & ID Issuance', description: 'Registers qualified persons with disabilities and issues official PWD identification cards.', tag: 'Core Function', details: ['PWD Registration & Validation', 'PWD ID Card Issuance', 'Registry Maintenance & Update'] },
      { index: '02', code: 'RIGHTS', title: 'PWD Rights & Privileges', description: 'Ensures the enforcement of PWD rights and privileges under RA 7277 and related laws.', tag: 'Rights Enforcement', details: ['20% Discount Privilege Monitoring', 'Accessibility Compliance Inspection', 'Anti-Discrimination Enforcement'] },
      { index: '03', code: 'PWD-PROG', title: 'PWD Programs & Services', description: 'Implements programs for the livelihood, rehabilitation, and social inclusion of persons with disabilities.', tag: 'Programs', details: ['Livelihood & Skills Training', 'Assistive Device Distribution', 'Disability Awareness Programs'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: '', helpline: 'PDAO Office, Municipal Hall' }
  },
  Sangguniang_Bayan: {
    officeName: 'Sangguniang Bayan',
    officeCode: 'SB',
    category: 'Legislative Body',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'The legislative body of the Municipality of Tanauan, enacting ordinances, approving resolutions, and representing the voice of the people.',
    typewriterWords: [
      'Serving as the Voice of Tanauan',
      'Enacting Laws for the Public Good',
      'Transparent Legislative Governance',
      'People-Centered Legislation'
    ],
    head: { name: '', title: 'Vice Mayor (Presiding Officer)', term: 'Presiding Officer', quote: 'The Sangguniang Bayan is the legislative heart of Tanauan — every ordinance we pass must reflect the needs and aspirations of our people.', credentials: ['Elected Sangguniang Bayan Member', 'Local Government Legislator'], room: 'Sangguniang Bayan Building, Municipal Hall Complex', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '10', suffix: '', label: 'Council Members', description: 'Elected Sangguniang Bayan members representing Tanauan' },
      { value: '54', suffix: '', label: 'Barangays Represented', description: 'All 54 barangays represented through council members' },
      { value: '12', suffix: '+', label: 'Sessions Monthly', description: 'Regular and special sessions of the Sangguniang Bayan' },
      { value: '100', suffix: '%', label: 'Transparency', description: 'All sessions and deliberations open to the public' }
    ],
    mandates: [
      { index: '01', code: 'LEGISLATION', title: 'Legislation & Ordinance Making', description: 'Enacts ordinances, approves resolutions, and legislates local laws to govern the Municipality of Tanauan.', tag: 'Core Function', details: ['Ordinance Drafting & Passage', 'Resolution Approval', 'Committee Bill Reviews & Public Hearings'] },
      { index: '02', code: 'OVERSIGHT', title: 'Executive Oversight', description: 'Exercises oversight over the executive branch to ensure accountability and proper implementation of laws.', tag: 'Oversight', details: ['Budget Review & Approval', 'Executive Order Review', 'Departmental Performance Monitoring'] },
      { index: '03', code: 'PUB-CONSULT', title: 'Public Consultation & Representation', description: 'Represents the constituents of Tanauan and conducts public consultations on key local issues.', tag: 'Representation', details: ['Public Hearing Facilitation', 'Constituent Consultation', 'People\'s Legislation Initiatives'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM (Sessions per schedule)', location: 'Sangguniang Bayan Building, Tanauan Municipal Hall Complex', contactNumber: '', email: '', helpline: 'Sangguniang Bayan Secretariat' }
  },
  Sanitation: {
    officeName: 'Municipal Sanitation Office',
    officeCode: 'MSO',
    category: 'Sanitation & Environmental Health',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Promoting environmental sanitation and hygiene to protect the health and well-being of all residents in the Municipality of Tanauan.',
    typewriterWords: [
      'Clean & Sanitary Tanauan',
      'Environmental Health for All',
      'Sanitation for Community Wellness',
      'Hygienic Communities Across Tanauan'
    ],
    head: { name: '', title: 'Sanitation Inspector', term: 'Department Head', quote: 'A clean environment is the foundation of a healthy community — sanitation is every citizen\'s right and responsibility.', credentials: ['Registered Sanitary Engineer', 'Environmental Health Officer'], room: 'Municipal Health Office, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'Sanitation inspection and services in all 54 barangays' },
      { value: '100', suffix: '%', label: 'Inspection Compliance', description: 'All food establishments inspected for sanitary compliance' },
      { value: '12', suffix: '+', label: 'Inspections Monthly', description: 'Routine sanitation inspections of establishments per month' },
      { value: '100', suffix: '%', label: 'DOH Standards', description: 'Full compliance with DOH sanitation and hygiene standards' }
    ],
    mandates: [
      { index: '01', code: 'INSPECT', title: 'Establishment Sanitation Inspection', description: 'Conducts regular sanitation inspections of food establishments, markets, and public facilities.', tag: 'Core Function', details: ['Food Establishment Inspection', 'Sanitary Permit Issuance', 'Market & Public Facility Inspection'] },
      { index: '02', code: 'VECTOR', title: 'Vector Control & Disease Prevention', description: 'Implements vector control programs to prevent mosquito-borne and water-borne diseases.', tag: 'Disease Prevention', details: ['Mosquito Fogging Operations', 'Clean-Up Drive Coordination', 'Dengue Prevention Programs'] },
      { index: '03', code: 'WATER-SAN', title: 'Water & Sanitation Facility Management', description: 'Monitors the quality and safety of water sources and sanitation facilities in the municipality.', tag: 'Water Sanitation', details: ['Water Quality Monitoring', 'Toilet Facility Inspection', 'Safe Water Access Programs'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Municipal Health Office, Tanauan, Leyte', contactNumber: '', email: '', helpline: 'Sanitation Office, Health Office Building' }
  },
  Slaugtherhouse: {
    officeName: 'Municipal Slaughterhouse',
    officeCode: 'MSH',
    category: 'Meat Inspection & Slaughterhouse Services',
    citizensCharterUrl: '/citizens-charter/ABATTOIR',
    tagline: 'Ensuring the safety of meat products through humane slaughter practices, strict meat inspection, and compliance with food safety standards in Tanauan.',
    typewriterWords: [
      'Safe & Humane Meat Processing',
      'Food Safety Through Strict Inspection',
      'Quality Meat for Tanauan Communities',
      'Compliant Slaughterhouse Services'
    ],
    head: { name: '', title: 'Slaughterhouse Administrator', term: 'Department Head', quote: 'Food safety begins at the slaughterhouse — we are committed to ensuring only safe, quality meat reaches the Tanauan community.', credentials: ['Registered Veterinarian', 'Meat Inspector', 'Food Safety Officer'], room: 'Municipal Slaughterhouse, Tanauan, Leyte', schedule: '4:00 AM – 10:00 AM (Slaughter Operations) | Administrative: Mon-Fri 8AM-5PM' },
    stats: [
      { value: '100', suffix: '%', label: 'Ante-Mortem Inspection', description: 'All animals inspected before slaughter for health compliance' },
      { value: '100', suffix: '%', label: 'Post-Mortem Inspection', description: 'All carcasses inspected after slaughter for food safety' },
      { value: '365', suffix: '', label: 'Days Operating', description: 'Slaughterhouse operating daily to meet market supply' },
      { value: '100', suffix: '%', label: 'BAI Compliance', description: 'Full compliance with Bureau of Animal Industry standards' }
    ],
    mandates: [
      { index: '01', code: 'SLAUGHTER', title: 'Slaughter Operations', description: 'Manages the day-to-day slaughter operations ensuring humane practices and food safety compliance.', tag: 'Core Function', details: ['Slaughter Schedule Management', 'Slaughter Fee Collection', 'Humane Handling Protocols'] },
      { index: '02', code: 'MEAT-INSPECT', title: 'Meat Inspection Services', description: 'Conducts ante-mortem and post-mortem inspection of all animals slaughtered in the facility per RA 9296.', tag: 'Food Safety', details: ['Ante-Mortem Animal Inspection', 'Post-Mortem Carcass Inspection', 'Meat Inspection Certificate Issuance'] },
      { index: '03', code: 'FACILITY', title: 'Facility Maintenance & Sanitation', description: 'Ensures the cleanliness, sanitation, and proper maintenance of all slaughterhouse facilities and equipment.', tag: 'Facility Management', details: ['Daily Facility Cleaning & Disinfection', 'Equipment Maintenance', 'Wastewater & Offal Management'] }
    ],
    schedule: { hours: 'Slaughter: 4:00 AM – 10:00 AM | Admin: Mon-Fri 8:00 AM – 5:00 PM', location: 'Municipal Slaughterhouse, Tanauan, Leyte', contactNumber: '', email: '', helpline: 'Municipal Slaughterhouse Administration Office' }
  },
  'Solo-Parent': {
    officeName: 'Solo Parent Affairs Office',
    officeCode: 'SPAO',
    category: 'Solo Parent Affairs & Social Services',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Providing support, assistance, and advocacy for solo parents in Tanauan to ensure their welfare and the well-being of their families.',
    typewriterWords: [
      'Supporting Solo Parents in Tanauan',
      'Empowering Single-Parent Families',
      'Rights & Benefits for Solo Parents',
      'Stronger Families Through Support'
    ],
    head: { name: '', title: 'Solo Parent Coordinator', term: 'Department Head', quote: 'Solo parents face unique challenges — our commitment is to ensure they never face those challenges alone.', credentials: ['Social Welfare Professional', 'RA 8972 Implementation Specialist'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Solo parent services accessible to all 54 barangays' },
      { value: '500', suffix: '+', label: 'Registered Solo Parents', description: 'Active registered solo parents in the municipality' },
      { value: '10', suffix: '%', label: 'Discount Privilege', description: 'Mandated discount for solo parents under RA 8972' },
      { value: '100', suffix: '%', label: 'Rights Implementation', description: 'Full implementation of Solo Parents\' Welfare Act benefits' }
    ],
    mandates: [
      { index: '01', code: 'SP-REG', title: 'Solo Parent Registration & ID', description: 'Registers qualified solo parents and issues Solo Parent ID cards to enable access to rights and privileges.', tag: 'Core Function', details: ['Solo Parent Application Processing', 'Solo Parent ID Issuance', 'Annual Registry Renewal'] },
      { index: '02', code: 'BENEFITS', title: 'Benefits & Privileges Facilitation', description: 'Facilitates access to benefits and privileges granted to solo parents under RA 8972.', tag: 'Benefits', details: ['10% Discount Privilege Monitoring', 'Flexible Work Schedule Advocacy', 'Parental Leave Assistance'] },
      { index: '03', code: 'LIVELIHOOD', title: 'Livelihood & Support Programs', description: 'Implements livelihood programs, skills training, and support services for solo parents.', tag: 'Support Programs', details: ['Livelihood Skills Training', 'Emergency Financial Assistance', 'Counseling & Support Services'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: '', helpline: 'Solo Parent Affairs Office, Municipal Hall' }
  },
  TAME: {
    officeName: 'Tanauan Association of Municipal Employees',
    officeCode: 'TAME',
    category: 'Employee Association',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Upholding the welfare, rights, and camaraderie of municipal employees through collective advocacy, professional development, and team solidarity.',
    typewriterWords: [
      'One Team, One Tanauan',
      'Advocating for Municipal Employees',
      'Solidarity & Professional Excellence',
      'Empowering Public Servants'
    ],
    head: { name: '', title: 'TAME President', term: 'Association President', quote: 'Our strength lies in our unity — a motivated and well-supported workforce delivers better service to every Tanauananon.', credentials: ['Municipal Employee Association Leader', 'Civil Service Professional'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '200', suffix: '+', label: 'TAME Members', description: 'Active municipal employees enrolled in the association' },
      { value: '54', suffix: '', label: 'Departments Represented', description: 'Membership spanning all municipal departments' },
      { value: '12', suffix: '+', label: 'Activities Annually', description: 'Employee welfare and capacity-building activities per year' },
      { value: '100', suffix: '%', label: 'Welfare Coverage', description: 'All members covered by TAME welfare programs and benefits' }
    ],
    mandates: [
      { index: '01', code: 'EMP-WELFARE', title: 'Employee Welfare & Benefits', description: 'Advocates for and manages employee welfare programs, benefits, and mutual aid assistance for TAME members.', tag: 'Core Function', details: ['Mutual Aid Fund Management', 'Calamity & Emergency Assistance', 'Medical Benefit Programs'] },
      { index: '02', code: 'ADVOCACY', title: 'Employee Rights Advocacy', description: 'Advocates for the rights, welfare, and professional development of all municipal government employees.', tag: 'Advocacy', details: ['Employee Grievance Representation', 'Policy Advocacy for Employee Welfare', 'Civil Service Rights Promotion'] },
      { index: '03', code: 'DEV-PROG', title: 'Professional & Social Development', description: 'Organizes professional development, team building, and social activities for municipal employees.', tag: 'Development', details: ['Team Building Activities', 'Sports & Recreation Programs', 'Professional Development Seminars'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: '', helpline: 'TAME Office, Municipal Hall' }
  },
  Tourism: {
    officeName: 'Municipal Tourism Office',
    officeCode: 'MTO-TRZ',
    category: 'Tourism Development & Promotion',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Promoting the unique heritage, natural attractions, and cultural wealth of Tanauan to drive sustainable tourism and community prosperity.',
    typewriterWords: [
      'Discover the Beauty of Tanauan',
      'Cultural Heritage & Natural Wonders',
      'Sustainable Tourism for Progress',
      'Tanauan — A Destination to Remember'
    ],
    head: { name: '', title: 'Tourism Officer', term: 'Department Head', quote: 'Tourism is a bridge between our culture and the world — every visitor to Tanauan carries our story forward.', credentials: ['Tourism Planning & Development Officer', 'Heritage Conservation Specialist'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays with Tourism Potential', description: 'Tourism-rich destinations across all barangays' },
      { value: '5000', suffix: '+', label: 'Annual Visitors', description: 'Tourists visiting Tanauan and its attractions annually' },
      { value: '10', suffix: '+', label: 'Tourist Destinations', description: 'Natural, cultural, and heritage sites in the municipality' },
      { value: '12', suffix: '+', label: 'Events Annually', description: 'Cultural and tourism events organized per year' }
    ],
    mandates: [
      { index: '01', code: 'TRS-PROMO', title: 'Tourism Promotion & Marketing', description: 'Promotes Tanauan\'s tourism destinations, cultural heritage, and natural attractions to domestic and international visitors.', tag: 'Core Function', details: ['Tourism Marketing Materials', 'Social Media & Digital Promotion', 'Tourism Fairs & Expo Participation'] },
      { index: '02', code: 'DEST-DEV', title: 'Tourist Destination Development', description: 'Develops and improves tourism infrastructure, facilities, and services to enhance visitor experience.', tag: 'Development', details: ['Tourism Infrastructure Development', 'Tourist Signage & Wayfinding', 'Tourism Circuit Planning'] },
      { index: '03', code: 'EVENTS', title: 'Cultural Events & Festivals', description: 'Plans and organizes local cultural events, festivals, and tourism activities to attract visitors.', tag: 'Events Management', details: ['Festival Planning & Execution', 'Cultural Heritage Programs', 'Tourism Events Calendar Management'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'tourism@tanauanleyte.gov.ph', helpline: 'Municipal Tourism Office, Municipal Hall' }
  },
  'Vice-Mayors-Office': {
    officeName: "Office of the Vice Mayor",
    officeCode: 'OVM',
    category: 'Legislative & Executive Administration',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Presiding over the Sangguniang Bayan and supporting the Chief Executive in delivering responsive and accountable governance to the people of Tanauan.',
    typewriterWords: [
      'Legislative Leadership for Tanauan',
      'Presiding Officer of the Sangguniang Bayan',
      'Transparent & Accountable Governance',
      'Serving Tanauan with Dedication'
    ],
    head: { name: '', title: 'Vice Mayor', term: 'Presiding Officer', quote: 'As Presiding Officer, my commitment is to ensure the Sangguniang Bayan serves as a genuine voice of the people — transparent, responsive, and accountable.', credentials: ['Elected Vice Mayor', 'Presiding Officer, Sangguniang Bayan'], room: "Vice Mayor's Office, 2nd Floor, Municipal Hall Complex", schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '10', suffix: '', label: 'SB Members Presided', description: 'Sangguniang Bayan members under the presiding officer' },
      { value: '54', suffix: '', label: 'Barangays Represented', description: 'All 54 barangays served through the legislative body' },
      { value: '12', suffix: '+', label: 'Sessions Monthly', description: 'Regular and special sessions presided monthly' },
      { value: '100', suffix: '%', label: 'Transparency', description: 'All sessions conducted transparently and publicly accessible' }
    ],
    mandates: [
      { index: '01', code: 'PRESIDING', title: 'Presiding Over Sangguniang Bayan', description: 'Presides over all sessions of the Sangguniang Bayan and ensures orderly conduct of legislative proceedings.', tag: 'Core Function', details: ['Session Presiding & Facilitation', 'Quorum & Order Management', 'Committee Appointment & Oversight'] },
      { index: '02', code: 'EXEC-SUCC', title: 'Acting Mayor Functions', description: 'Acts as Mayor in the absence or incapacity of the Municipal Mayor, exercising all executive powers and functions.', tag: 'Executive Succession', details: ['Acting Mayor Responsibilities', 'Executive Function Continuity', 'Emergency Decision-Making'] },
      { index: '03', code: 'LEGISLATION', title: 'Legislative Support & Advocacy', description: 'Supports legislative work of the Sangguniang Bayan members and advocates for constituent-priority legislation.', tag: 'Legislation', details: ['Priority Bills & Ordinances', 'Public Hearings Facilitation', 'Constituent Legislative Advocacy'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: "Vice Mayor's Office, 2nd Floor, Municipal Hall Complex, Tanauan, Leyte", contactNumber: '', email: '', helpline: "Office of the Vice Mayor, 2nd Floor, Municipal Hall" }
  },
  GSO: {
    department: 'GSO',
    officeName: 'General Services Section',
    officeCode: 'GSO',
    category: 'Public Facilities, Logistics & General Services',
    municipality: 'Municipality of Tanauan, Leyte',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Maintaining municipal facilities, managing logistical operations, and ensuring reliable public infrastructure support for the Municipality of Tanauan.',
    typewriterWords: [
      'Reliable General Services & Logistics',
      'Dedicated Municipal Maintenance & Utility Support',
      'Ensuring Public Facility Integrity Across 54 Barangays',
      'Serving Tanauan with Efficiency & Professionalism'
    ],
    head: {
      name: 'Eugenio C. Ramos, Jr.',
      title: 'GSO Head / Operation Manager',
      term: 'Department Head',
      quote: 'Our commitment is to ensure all municipal facilities, vehicles, and operational assets are maintained to the highest standard of readiness in service to the people of Tanauan.',
      credentials: [
        'GSO Head / Operation Manager',
        'Civil Service Commission Eligible',
        'Municipal Facilities & Logistics Lead'
      ],
      room: 'GSO Operations Hub, Tanauan Municipal Hall Complex',
      schedule: 'Monday – Friday: 8:00 AM – 5:00 PM'
    },
    stats: [
      { value: '60', suffix: '', label: 'Total Personnel', description: 'Head, 10 Office Staff, and 49 Field Workers' },
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Logistics and maintenance support municipality-wide' },
      { value: '100', suffix: '%', label: 'Facility Readiness', description: 'Continuous maintenance of municipal halls and venues' },
      { value: '24/7', suffix: '', label: 'Disaster Support', description: 'Emergency logistical response during natural calamities' }
    ],
    mandates: [
      { index: '01', code: 'FAC-MAINT', title: 'Municipal Facilities Maintenance', description: 'Maintains all municipal government buildings, civic centers, public parks, and facilities in pristine operational condition.', tag: 'Core Function', details: ['Electrical, carpentry, plumbing, and structural maintenance', 'Daily custodial sanitation and groundskeeping', 'Public park and plaza upkeep'] },
      { index: '02', code: 'LOG-FLEET', title: 'Logistics & Motor Pool Management', description: 'Manages municipal vehicle dispatch, transport operations, equipment logistics, and official event setups.', tag: 'Logistics', details: ['Official vehicle dispatch and fleet maintenance', 'Event logistics, stage, sound, and seating arrangements', 'Heavy equipment and generator maintenance'] },
      { index: '03', code: 'REC-PROP', title: 'Asset Care & Office Administration', description: 'Oversees office records binding, property custodial logistics, and inter-departmental support.', tag: 'Administrative', details: ['Official book binding and archival document protection', 'Clerical assistance and administrative document dispatch', 'Inter-office utility and logistical coordination'] }
    ],
    schedule: {
      hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
      location: 'GSO Operations Hub, Tanauan Municipal Hall Complex, Real St., Tanauan, Leyte',
      contactNumber: '(053) Tanauan LGU',
      email: 'gso@tanauanleyte.gov.ph',
      helpline: 'General Services Office, Ground Floor, Municipal Hall'
    }
  }
};

// Departments that already have custom implementations (don't need to map directory name to DEPT_DEFAULTS)
// Mapping directory name → defaults key

export const DIR_TO_KEY = {
  'Accounting': 'Accounting',
  'Agriculture': 'Agriculture',
  'Assessors': 'Assessors',
  'Budget': 'Budget',
  'Cemetery': 'Cemetery',
  'Civil Registrar': 'Civil Registrar',
  'Day Care': 'Day Care',
  'Dental': 'Dental',
  'Economic Enterprise': 'Economic Enterprise',
  'Engineering': 'Engineering',
  'GSO': 'GSO',
  'Health Office': 'Health Office',
  'HRMO': 'HRMO',
  'IT': 'IT',
  'Legislative Staff': 'Legislative Staff',
  'Licensing': 'Licensing',
  'LYDO': 'LYDO',
  'MAO': 'MAO',
  'Market': 'Market',
  'Mayors-Office': 'Mayors-Office',
  'MDRRMO': 'MDRRMO',
  'MENRO': 'MENRO',
  'MSWDO': 'MSWDO',
  'Municipal-Administrator': 'Municipal-Administrator',
  'OSCA': 'OSCA',
  'Peso': 'Peso',
  'PhilHealth': 'PhilHealth',
  'Planning': 'Planning',
  'Procurement': 'Procurement',
  'PWD': 'PWD',
  'Sangguniang-Bayan': 'Sangguniang_Bayan',
  'Sanitation': 'Sanitation',
  'Slaugtherhouse': 'Slaugtherhouse',
  'Solo-Parent': 'Solo-Parent',
  'TAME': 'TAME',
  'Tourism': 'Tourism',
  'Vice-Mayors-Office': 'Vice-Mayors-Office',
};


export function slugify(str) {
	if (!str) return '';
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

/**
 * Normalizes any department name, route path, or key into the canonical defaults object.
 */
export function getDeptDefaults(deptName) {
	if (!deptName) return null;
	const clean = deptName.trim();
	if (DEPT_DEFAULTS[clean]) return DEPT_DEFAULTS[clean];

	const keyFromDir = DIR_TO_KEY[clean];
	if (keyFromDir && DEPT_DEFAULTS[keyFromDir]) return DEPT_DEFAULTS[keyFromDir];

	// Try matching by slug
	const targetSlug = slugify(clean);
	for (const [k, val] of Object.entries(DEPT_DEFAULTS)) {
		if (slugify(k) === targetSlug) return val;
	}
	for (const [dir, k] of Object.entries(DIR_TO_KEY)) {
		if (slugify(dir) === targetSlug && DEPT_DEFAULTS[k]) return DEPT_DEFAULTS[k];
	}

	return null;
}

/**
 * Merges dynamic Firestore data over department fallback defaults.
 * Only overwrites non-empty / valid fields so empty admin fields do not wipe out defaults.
 */
export function mergeOfficeData(defaults = {}, dynamic = {}) {
	if (!dynamic || typeof dynamic !== 'object' || Object.keys(dynamic).length === 0) {
		return { ...defaults };
	}

	const result = { ...defaults };

	// String fields: overwrite only if non-empty string
	const stringKeys = [
		'officeName',
		'officeCode',
		'category',
		'municipality',
		'citizensCharterUrl',
		'tagline',
		'department',
		'vision',
		'mission',
		'orgChartImage',
		'orgChartPdf'
	];
	for (const key of stringKeys) {
		if (typeof dynamic[key] === 'string' && dynamic[key].trim() !== '') {
			result[key] = dynamic[key].trim();
		}
	}

	// Services Offered array: overwrite only if non-empty array
	if (Array.isArray(dynamic.servicesOffered) && dynamic.servicesOffered.length > 0) {
		result.servicesOffered = dynamic.servicesOffered;
	}

	// Downloadable forms array: overwrite only if non-empty array
	if (Array.isArray(dynamic.downloadableForms) && dynamic.downloadableForms.length > 0) {
		result.downloadableForms = dynamic.downloadableForms;
	}

	// Signatories: merge if provided
	if (dynamic.preparedBy && typeof dynamic.preparedBy === 'object') {
		result.preparedBy = dynamic.preparedBy;
	}
	if (dynamic.reviewedBy && typeof dynamic.reviewedBy === 'object') {
		result.reviewedBy = dynamic.reviewedBy;
	}

	// Typewriter words: only overwrite if non-empty array with actual items
	if (Array.isArray(dynamic.typewriterWords)) {
		const validWords = dynamic.typewriterWords.filter((w) => typeof w === 'string' && w.trim() !== '');
		if (validWords.length > 0) {
			result.typewriterWords = validWords;
		}
	}

	// Head of office object: merge fields individually
	if (dynamic.head && typeof dynamic.head === 'object') {
		const dh = dynamic.head;
		const defH = defaults.head || {};
		result.head = {
			...defH,
			name: (typeof dh.name === 'string' && dh.name.trim()) ? dh.name.trim() : (defH.name || ''),
			title: (typeof dh.title === 'string' && dh.title.trim()) ? dh.title.trim() : (defH.title || ''),
			term: (typeof dh.term === 'string' && dh.term.trim()) ? dh.term.trim() : (defH.term || 'Department Head'),
			quote: (typeof dh.quote === 'string' && dh.quote.trim()) ? dh.quote.trim() : (defH.quote || ''),
			room: (typeof dh.room === 'string' && dh.room.trim()) ? dh.room.trim() : (defH.room || ''),
			schedule: (typeof dh.schedule === 'string' && dh.schedule.trim()) ? dh.schedule.trim() : (defH.schedule || 'Monday – Friday: 8:00 AM – 5:00 PM'),
			image: (typeof dh.image === 'string' && dh.image.trim()) ? dh.image.trim() : (defH.image || ''),
			credentials:
				Array.isArray(dh.credentials) && dh.credentials.filter((c) => typeof c === 'string' && c.trim()).length > 0
					? dh.credentials.filter((c) => typeof c === 'string' && c.trim())
					: (defH.credentials ?? [])
		};
	}

	// Stats array: only overwrite if has valid items with value and label
	if (Array.isArray(dynamic.stats)) {
		const validStats = dynamic.stats.filter(
			(s) => s && typeof s === 'object' && String(s.value ?? '').trim() !== '' && String(s.label ?? '').trim() !== ''
		);
		if (validStats.length > 0) {
			result.stats = validStats;
		}
	}

	// Mandates array: only overwrite if has valid items with title or description
	if (Array.isArray(dynamic.mandates)) {
		const validMandates = dynamic.mandates.filter(
			(m) => m && typeof m === 'object' && (String(m.title ?? '').trim() !== '' || String(m.description ?? '').trim() !== '')
		);
		if (validMandates.length > 0) {
			result.mandates = validMandates;
		}
	}

	// Schedule object: merge fields individually
	if (dynamic.schedule && typeof dynamic.schedule === 'object') {
		const ds = dynamic.schedule;
		const defS = defaults.schedule || {};
		result.schedule = {
			...defS,
			hours: (typeof ds.hours === 'string' && ds.hours.trim()) ? ds.hours.trim() : (defS.hours || ''),
			location: (typeof ds.location === 'string' && ds.location.trim()) ? ds.location.trim() : (defS.location || ''),
			contactNumber: (typeof ds.contactNumber === 'string' && ds.contactNumber.trim()) ? ds.contactNumber.trim() : (defS.contactNumber || ''),
			email: (typeof ds.email === 'string' && ds.email.trim()) ? ds.email.trim() : (defS.email || ''),
			helpline: (typeof ds.helpline === 'string' && ds.helpline.trim()) ? ds.helpline.trim() : (defS.helpline || '')
		};
	}

	return result;
}

