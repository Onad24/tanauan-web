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
    head: { name: '', title: 'Municipal Agriculturist', term: 'Department Head', quote: 'Thriving agriculture is the foundation of food security and rural prosperity.', credentials: ['Registered Agriculturist', 'Extension Services Specialist'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Agricultural extension services across all barangays' },
      { value: '500', suffix: '+', label: 'Farmers Assisted', description: 'Registered farmers and fisherfolk receiving technical support' },
      { value: '12', suffix: '+', label: 'Programs', description: 'Annual agricultural programs and livelihood initiatives' },
      { value: '100', suffix: '%', label: 'Service Coverage', description: 'Full municipal-wide agricultural assistance and extension' }
    ],
    mandates: [
      { index: '01', code: 'EXT-SVC', title: 'Agricultural Extension Services', description: 'Provides technical assistance, training, and guidance to farmers and fisherfolk in the municipality.', tag: 'Core Function', details: ['Farm Visits & Technical Guidance', 'Farmer Training & Seminars', 'Demonstration Farm Operations'] },
      { index: '02', code: 'PROG-IMPL', title: 'Program Implementation', description: 'Implements national and local agricultural programs for crop production, livestock, and fisheries.', tag: 'Program Implementation', details: ['Seed & Fertilizer Distribution', 'Livestock Dispersal Programs', 'Fisheries Development Assistance'] },
      { index: '03', code: 'DATA-MGT', title: 'Agricultural Data Management', description: 'Maintains updated records of agricultural production, farmer registry, and land use data.', tag: 'Data & Records', details: ['Farmer Registry Maintenance', 'Crop Production Monitoring', 'Agricultural Statistics Reporting'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'agriculture@tanauanleyte.gov.ph', helpline: 'Agricultural Extension Office, Ground Floor' }
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
    category: 'Civil Registration & Vital Statistics',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Registering vital events, safeguarding civil records, and providing essential civil registration services to all residents of Tanauan.',
    typewriterWords: [
      'Accurate & Timely Civil Registration',
      'Safeguarding Your Vital Records',
      'Birth, Marriage & Death Certificates',
      'Efficient Civil Registry Services'
    ],
    head: { name: '', title: 'Municipal Civil Registrar', term: 'Department Head', quote: 'Accurate civil registration is the foundation of every citizen\'s legal identity and rights.', credentials: ['Licensed Civil Registrar', 'PSA-Accredited Civil Registry Officer'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '100', suffix: '%', label: 'Registration Accuracy', description: 'Error-free civil registration compliant with PSA standards' },
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'Civil registration services for all 54 barangays' },
      { value: '3', suffix: '', label: 'Days Processing', description: 'Standard processing time for civil registry documents' },
      { value: '100', suffix: '%', label: 'PSA Compliance', description: 'Full compliance with Philippine Statistics Authority guidelines' }
    ],
    mandates: [
      { index: '01', code: 'VITAL-REG', title: 'Vital Events Registration', description: 'Registers births, deaths, marriages, and other vital events occurring within the municipality.', tag: 'Core Function', details: ['Birth Registration & Live Birth Certificates', 'Death Registration & Death Certificates', 'Marriage Registration & Marriage Certificates'] },
      { index: '02', code: 'DOC-ISSUANCE', title: 'Document Issuance & Authentication', description: 'Issues certified true copies of civil registry documents and authenticates vital statistics records.', tag: 'Document Services', details: ['Certified True Copy Issuance', 'Document Authentication & Endorsement', 'PSA Request Facilitation'] },
      { index: '03', code: 'CORRECTION', title: 'Clerical Error Corrections & Annotations', description: 'Processes petitions for correction of clerical errors and annotations on civil registry documents under RA 9048 and RA 10172.', tag: 'Legal Services', details: ['RA 9048 Petition Processing', 'RA 10172 Petition Processing', 'Court Decree Annotations'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'civilregistrar@tanauanleyte.gov.ph', helpline: 'Civil Registry Window, Ground Floor, Municipal Hall' }
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
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Designing, constructing, and maintaining public infrastructure to support the development and progress of the Municipality of Tanauan.',
    typewriterWords: [
      'Building Tanauan\'s Infrastructure',
      'Quality Public Works & Construction',
      'Safe Roads & Resilient Communities',
      'Engineering Excellence for Progress'
    ],
    head: { name: '', title: 'Municipal Engineer', term: 'Department Head', quote: 'Quality infrastructure is the foundation of community development and the driver of economic progress.', credentials: ['Licensed Civil Engineer', 'Public Works Specialist', 'Registered Electrical Engineer'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
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
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'engineering@tanauanleyte.gov.ph', helpline: 'Engineering Office, Municipal Hall Ground Floor' }
  },
  GSO: {
    officeName: 'General Services Office',
    officeCode: 'GSO',
    category: 'General Services & Property Management',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Managing government property, procurement, and general services to support the efficient delivery of public services in Tanauan.',
    typewriterWords: [
      'Efficient Property & Procurement Management',
      'Supporting All Departments with General Services',
      'Accountable Government Asset Stewardship',
      'Reliable Infrastructure Support for Tanauan'
    ],
    head: { name: '', title: 'General Services Officer', term: 'Department Head', quote: 'Efficient property and procurement management ensures that every department can deliver excellent public service.', credentials: ['Government Property Management Specialist', 'Procurement Officer'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '100', suffix: '%', label: 'Asset Accountability', description: 'All government property accounted for and properly documented' },
      { value: '54', suffix: '', label: 'Departments Supported', description: 'General services available to all municipal offices' },
      { value: '100', suffix: '%', label: 'Procurement Compliance', description: 'Full compliance with RA 9184 Government Procurement Law' },
      { value: '12', suffix: '+', label: 'Monthly Services', description: 'Regular maintenance, janitorial, and security services managed' }
    ],
    mandates: [
      { index: '01', code: 'PROP-MGT', title: 'Government Property Management', description: 'Manages, inventories, and accounts for all government properties, equipment, and supplies.', tag: 'Core Function', details: ['Property Inventory Management', 'Equipment Issuance & Control', 'Annual Physical Inventory'] },
      { index: '02', code: 'PROC-SUPP', title: 'Procurement Support', description: 'Facilitates the procurement of goods, supplies, and services for all municipal departments.', tag: 'Procurement', details: ['Supply Requisition Processing', 'Canvassing & Purchase Orders', 'Supplier Accreditation Support'] },
      { index: '03', code: 'GEN-SVC', title: 'General Building & Maintenance Services', description: 'Manages janitorial, security, and maintenance services for all municipal government facilities.', tag: 'Facilities Management', details: ['Janitorial Services Management', 'Security Personnel Supervision', 'Building Maintenance & Repair'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'gso@tanauanleyte.gov.ph', helpline: 'General Services Office, Municipal Hall' }
  },
  'Health Office': {
    officeName: 'Municipal Health Office',
    officeCode: 'MHO',
    category: 'Public Health Services',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Promoting and protecting the health of every Tanauananon through accessible, equitable, and quality public health programs and services.',
    typewriterWords: [
      'Health for Every Tanauananon',
      'Quality Public Health Services',
      'Disease Prevention & Wellness Promotion',
      'Accessible Healthcare for All Communities'
    ],
    head: { name: '', title: 'Municipal Health Officer', term: 'Department Head', quote: 'Health is a fundamental right. Our mission is to ensure every resident of Tanauan has access to quality healthcare.', credentials: ['Licensed Medical Doctor', 'Public Health Specialist', 'Community Medicine Practitioner'], room: 'Municipal Health Office, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Health services reaching all 54 barangays' },
      { value: '5000', suffix: '+', label: 'Patients Annually', description: 'Residents served through municipal health programs' },
      { value: '100', suffix: '%', label: 'Vaccination Coverage', description: 'Immunization programs reaching all target populations' },
      { value: '12', suffix: '+', label: 'Health Programs', description: 'Active health programs addressing community needs' }
    ],
    mandates: [
      { index: '01', code: 'PREV-CTRL', title: 'Disease Prevention & Control', description: 'Implements disease surveillance, prevention, and control programs for communicable and non-communicable diseases.', tag: 'Core Function', details: ['Disease Surveillance & Reporting', 'Immunization Programs', 'Communicable Disease Control'] },
      { index: '02', code: 'MAT-CHILD', title: 'Maternal & Child Health', description: 'Provides maternal care, child health, and family planning services to promote family wellness.', tag: 'Family Health', details: ['Prenatal & Postnatal Care', 'Child Growth Monitoring', 'Family Planning Services'] },
      { index: '03', code: 'HEALTH-PROMO', title: 'Health Promotion & Education', description: 'Conducts health education, information campaigns, and community outreach to promote healthy lifestyles.', tag: 'Health Promotion', details: ['Community Health Education', 'Health Advocacy Campaigns', 'Lifestyle Disease Prevention'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM', location: 'Municipal Health Office, Tanauan, Leyte', contactNumber: '', email: 'health@tanauanleyte.gov.ph', helpline: 'Municipal Health Office, Consultation Room' }
  },
  HRMO: {
    officeName: 'Human Resource Management Office',
    officeCode: 'HRMO',
    category: 'Human Resource Management',
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Building a competent, motivated, and ethical workforce to drive excellent public service delivery for the residents of Tanauan.',
    typewriterWords: [
      'Building a Competent Workforce',
      'Human Capital for Public Excellence',
      'Fair & Merit-Based Employment',
      'Career Development for Public Servants'
    ],
    head: { name: '', title: 'Human Resource Management Officer', term: 'Department Head', quote: 'Our greatest asset is our people — investing in our workforce means investing in better service for every Tanauananon.', credentials: ['HRMO III', 'Civil Service Commission-Accredited HR Practitioner'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
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
    head: { name: '', title: 'Business Permit & Licensing Officer', term: 'Department Head', quote: 'Efficient business licensing promotes investment, creates jobs, and drives economic growth in our municipality.', credentials: ['Business Permit & Licensing Specialist', 'ARTA Compliance Officer'], room: 'Municipal Hall, Ground Floor, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM (No Noon Break)' },
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
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)', location: 'Ground Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte', contactNumber: '', email: 'bplo@tanauanleyte.gov.ph', helpline: 'Business Permit Window, Municipal Hall Ground Floor' }
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
    citizensCharterUrl: '/citizens-charter',
    tagline: 'Managing the municipal public market to provide a clean, safe, and orderly trading environment for vendors and consumers in Tanauan.',
    typewriterWords: [
      'Clean & Orderly Public Market',
      'Supporting Local Vendors & Traders',
      'Fair Market Administration',
      'Vibrant Commerce in Tanauan'
    ],
    head: { name: '', title: 'Market Supervisor', term: 'Department Head', quote: 'A well-managed public market is the heart of our community\'s commerce — bringing together farmers, vendors, and consumers.', credentials: ['Market Administration Specialist', 'Revenue Collection Officer'], room: 'Municipal Public Market, Tanauan, Leyte', schedule: 'Monday – Saturday: 6:00 AM – 6:00 PM' },
    stats: [
      { value: '500', suffix: '+', label: 'Registered Vendors', description: 'Active market stall holders in the municipal public market' },
      { value: '6', suffix: ' days', label: 'Market Operation', description: 'Market open Monday to Saturday for trading activities' },
      { value: '100', suffix: '%', label: 'Sanitary Compliance', description: 'Regular sanitary inspections ensuring food safety' },
      { value: '54', suffix: '', label: 'Barangays Served', description: 'Market serving buyers and sellers from all barangays' }
    ],
    mandates: [
      { index: '01', code: 'MKT-ADM', title: 'Market Administration & Operations', description: 'Manages the day-to-day operations, regulations, and administration of the municipal public market.', tag: 'Core Function', details: ['Stall Allocation & Management', 'Market Fee Collection', 'Vendor Registration & Accreditation'] },
      { index: '02', code: 'SANIT', title: 'Sanitation & Market Hygiene', description: 'Ensures cleanliness, sanitation, and food safety standards throughout the public market.', tag: 'Health & Safety', details: ['Daily Market Cleaning', 'Sanitary Inspection Coordination', 'Food Safety Standards Enforcement'] },
      { index: '03', code: 'ORDER', title: 'Order Maintenance & Security', description: 'Maintains peace, order, and security within the market premises for vendors and consumers.', tag: 'Security & Order', details: ['Market Security Personnel Management', 'Vendor Compliance Monitoring', 'Dispute Resolution'] }
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
    head: { name: '', title: 'MDRRM Officer', term: 'Department Head', quote: 'Disaster preparedness is not just our mandate — it is our commitment to protecting every life in Tanauan.', credentials: ['Disaster Risk Reduction Specialist', 'Emergency Management Professional'], room: 'MDRRMO Office, Municipal Hall Complex, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM (24/7 Emergency Response)' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Protected', description: 'DRRM coverage across all 54 barangays in Tanauan' },
      { value: '24/7', suffix: '', label: 'Emergency Response', description: 'Round-the-clock emergency response capability' },
      { value: '100', suffix: '%', label: 'DRRM Fund Compliance', description: 'Full compliance with NDRRMC guidelines for DRRM fund use' },
      { value: '12', suffix: '+', label: 'Annual Drills', description: 'Evacuation drills and preparedness exercises conducted yearly' }
    ],
    mandates: [
      { index: '01', code: 'PREV-MIT', title: 'Disaster Prevention & Mitigation', description: 'Implements programs and measures to prevent, reduce, and mitigate disaster risks in the municipality.', tag: 'Prevention', details: ['Hazard Mapping & Risk Assessment', 'Vulnerable Area Identification', 'Structural Mitigation Measures'] },
      { index: '02', code: 'PREP', title: 'Disaster Preparedness', description: 'Develops and implements disaster preparedness plans, training programs, and community awareness activities.', tag: 'Preparedness', details: ['Evacuation Planning & Drills', 'Early Warning System Management', 'Stockpiling of Relief Goods'] },
      { index: '03', code: 'RESPONSE', title: 'Emergency Response & Recovery', description: 'Leads emergency response operations during calamities and coordinates post-disaster recovery and rehabilitation.', tag: 'Response & Recovery', details: ['Emergency Operations Center Activation', 'Relief Distribution Management', 'Post-Disaster Rehabilitation Coordination'] }
    ],
    schedule: { hours: 'Monday – Friday | 8:00 AM – 5:00 PM (24/7 Emergency Hotline)', location: 'MDRRMO Office, Tanauan Municipal Hall Complex, Real St., Tanauan, Leyte', contactNumber: '', email: 'mdrrmo@tanauanleyte.gov.ph', helpline: 'MDRRMO Emergency Operations Center' }
  },
  MENRO: {
    officeName: 'Municipal Environment & Natural Resources Office',
    officeCode: 'MENRO',
    category: 'Environment & Natural Resources Management',
    citizensCharterUrl: '/citizens-charter/environment',
    tagline: 'Protecting and conserving the natural environment of Tanauan through sustainable resource management, environmental enforcement, and community stewardship.',
    typewriterWords: [
      'Protecting Tanauan\'s Environment',
      'Sustainable Natural Resource Management',
      'Clean Environment for Future Generations',
      'Green Governance for a Better Tanauan'
    ],
    head: { name: '', title: 'Municipal Environment & Natural Resources Officer', term: 'Department Head', quote: 'A healthy environment is not a privilege but a right — we protect it for our children and generations to come.', credentials: ['Environmental Management Specialist', 'Natural Resources Conservation Officer'], room: 'Municipal Hall, Tanauan, Leyte', schedule: 'Monday – Friday: 8:00 AM – 5:00 PM' },
    stats: [
      { value: '54', suffix: '', label: 'Barangays Covered', description: 'Environmental programs and enforcement in all 54 barangays' },
      { value: '100', suffix: '%', label: 'Compliance Rate', description: 'Compliance with environmental laws and local ordinances' },
      { value: '12', suffix: '+', label: 'Programs Annually', description: 'Environmental protection and conservation programs per year' },
      { value: '100', suffix: '%', label: 'DENR Partnership', description: 'Full coordination with DENR on environmental management' }
    ],
    mandates: [
      { index: '01', code: 'ENV-ENFC', title: 'Environmental Law Enforcement', description: 'Enforces environmental laws, ordinances, and regulations to protect the natural environment of Tanauan.', tag: 'Core Function', details: ['Environmental Violation Monitoring', 'Tree Cutting Permit Control', 'Anti-Illegal Logging Operations'] },
      { index: '02', code: 'SWM', title: 'Solid Waste Management', description: 'Implements the Municipal Solid Waste Management Plan in compliance with RA 9003.', tag: 'Waste Management', details: ['Waste Segregation Programs', 'Barangay SWM Compliance Monitoring', 'Eco-Savers Program Implementation'] },
      { index: '03', code: 'ENV-PROMO', title: 'Environmental Advocacy & Education', description: 'Conducts environmental education, advocacy, and community participation programs throughout the municipality.', tag: 'Advocacy', details: ['Tree Planting & Greening Programs', 'Environmental Education in Schools', 'Community Clean-up Campaigns'] }
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
		'department'
	];
	for (const key of stringKeys) {
		if (typeof dynamic[key] === 'string' && dynamic[key].trim() !== '') {
			result[key] = dynamic[key].trim();
		}
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

