export const heroData = {
  eyebrow: 'Ontario, Canada · Open to Work',
  firstName: 'Kumar',
  lastName: 'Sashank',
  title: 'CS Engineer fusing blockchain, AI, and immersive web.',
  description:
    'CS Engineer fusing blockchain, AI, and immersive web. Currently pursuing Masters @ Wilfrid Laurier — building things that matter.',
  availability:
    'Currently pursuing a Masters at Wilfrid Laurier — building things that matter.',
  stats: [
    { value: '5', suffix: '+', label: 'Internships' },
    { value: '4', suffix: '×', label: 'Hackathon Wins' },
    { value: '1', suffix: '×', label: 'IEEE Published' },
  ],
  callouts: [
    {
      label: 'Now building',
      value: 'AI-assisted products, portfolio-grade interfaces, and immersive web narratives.',
    },
    {
      label: 'Best at',
      value: 'Turning technical complexity into clear, tactile experiences people actually want to use.',
    },
    {
      label: 'Looking for',
      value: 'Teams that care about craft, speed, storytelling, and shipping with intention.',
    },
  ],
  disciplines: ['Product engineering', 'Creative development', 'AI prototyping', 'Motion systems'],
}

export const aboutData = {
  intro:
    'I work where systems thinking, interface craft, and experimental energy overlap.',
  text:
    'From IEEE blockchain research to hackathon-winning prototypes to client work across India, Dubai, and North America, I keep chasing one thing: experiences that feel precise, memorable, and useful at the same time.',
  pillars: [
    {
      title: 'Design like a product partner',
      description:
        'I care about pacing, hierarchy, and narrative, but I tie them back to goals, clarity, and user trust.',
    },
    {
      title: 'Engineer for the final layer',
      description:
        'Motion, responsiveness, accessibility, and performance are part of the product, not post-processing.',
    },
    {
      title: 'Prototype with momentum',
      description:
        'I move quickly from idea to artifact, then sharpen the details until the interaction feels deliberate.',
    },
  ],
  skills: [
    { category: 'Frontend', items: 'React, Next.js, TypeScript, Tailwind, GSAP, Framer Motion' },
    { category: 'Backend', items: 'Node.js, Express, Django, Firebase, SQL, REST APIs' },
    { category: 'AI / ML', items: 'Python, TensorFlow, computer vision, NLP, inference workflows' },
    { category: 'Blockchain', items: 'Hyperledger, IPFS, decentralized apps, cross-chain concepts' },
    { category: 'Product', items: 'UI systems, wireframing, research synthesis, interaction design' },
    { category: 'Mobile', items: 'Flutter, Android development, cross-platform UX patterns' },
  ],
}

export const operatingPrinciples = [
  {
    id: '01',
    title: 'Narrative over noise',
    description:
      'The best interfaces guide attention. I use motion and contrast to create rhythm, not clutter.',
  },
  {
    id: '02',
    title: 'Systems over one-off screens',
    description:
      'I like building reusable design language and architecture so the polish survives beyond the first demo.',
  },
  {
    id: '03',
    title: 'Proof over promises',
    description:
      'Case studies, measurable outcomes, and research rigor make the work believable and memorable.',
  },
]

export interface Experience {
  dateStart: string
  dateEnd: string
  company: string
  role: string
  description: string
  location: string
  impact: string
  focus: string[]
}

export const experiences: Experience[] = [
  {
    dateStart: 'Nov 2024',
    dateEnd: 'Present',
    company: 'EONVERSE',
    role: 'Software Engineer',
    description:
      'Leading product delivery across design and engineering, shaping high-performance software with a strong emphasis on polish and execution.',
    location: 'Hyderabad · Remote',
    impact: 'Driving technical direction while mentoring teammates and raising delivery quality.',
    focus: ['Product systems', 'Technical leadership', 'UI polish'],
  },
  {
    dateStart: 'May 2024',
    dateEnd: 'Jun 2024',
    company: 'Dock.',
    role: 'Technical Intern',
    description:
      'Built campaign-facing websites and supported IVR systems used by political clients operating at public scale.',
    location: 'Hyderabad',
    impact: 'Combined rapid delivery with reliability for high-visibility communication workflows.',
    focus: ['Rapid builds', 'Campaign tech', 'Systems support'],
  },
  {
    dateStart: 'Nov 2023',
    dateEnd: 'Nov 2024',
    company: 'SPOCSQ.',
    role: 'SDE Intern',
    description:
      'Built the backend for an AI assessment portal and shipped eCommerce experiences with payments, SEO, and custom UI work.',
    location: 'Hyderabad',
    impact: 'Handled both infrastructure-heavy and customer-facing work across multiple products.',
    focus: ['Backend architecture', 'AI workflows', 'Commerce experiences'],
  },
  {
    dateStart: 'Jun 2023',
    dateEnd: 'Aug 2023',
    company: 'Fidelity Investments',
    role: 'Full Stack Intern',
    description:
      'Created a centralized dashboard that unified fragmented enterprise data sources using Angular and internal component systems.',
    location: 'Bangalore',
    impact: 'Made complex internal data easier to access, compare, and act on.',
    focus: ['Enterprise dashboards', 'Data UX', 'Angular'],
  },
  {
    dateStart: 'Jun 2022',
    dateEnd: 'Aug 2022',
    company: 'KISSS',
    role: 'UX Intern',
    description:
      'Conducted user interviews and delivered empathy maps, journey maps, personas, and low-fidelity product flows.',
    location: 'Guntur',
    impact: 'Built my foundation in research-led problem framing and product storytelling.',
    focus: ['User research', 'Journey mapping', 'Wireframes'],
  },
]

export interface Project {
  num: string
  title: string
  description: string
  tags: string[]
  slug?: string
  year: string
  role: string
  type: string
  outcome: string
  accent: string
  metrics: string[]
}

export const projects: Project[] = [
  {
    num: '01',
    title: 'AI Exam Portal',
    description:
      'A cross-platform assessment product that automates question generation, grading workflows, and performance analytics for educators.',
    tags: ['Flutter', 'Node.js', 'Firebase', 'AI'],
    slug: 'ai-exam-portal',
    year: '2024',
    role: 'Full Stack + Product Engineering',
    type: 'Education platform',
    outcome: 'Cut grading time dramatically while making analytics feel immediate and actionable.',
    accent: '#83b7ff',
    metrics: ['80% faster grading', '500+ concurrent users', 'Cross-platform rollout'],
  },
  {
    num: '02',
    title: 'iCho — Head Motion Sound',
    description:
      'A hands-free spatial audio experiment that maps head movement to sound positioning in real time using computer vision.',
    tags: ['Python', 'AI Tracking', 'Audio DSP'],
    slug: 'icho',
    year: '2023',
    role: 'AI + Audio Systems',
    type: 'Experimental interface',
    outcome: 'Turned webcam-based head tracking into a responsive, accessible interaction model.',
    accent: '#d3b26c',
    metrics: ['30fps tracking', '<20ms response latency', 'No special hardware'],
  },
  {
    num: '03',
    title: 'Decentralized File Sharing',
    description:
      'A browser-based IPFS experience for storing and sharing files without relying on a single centralized host.',
    tags: ['HTML/CSS/JS', 'IPFS', 'Blockchain'],
    slug: 'decentralized-file-sharing',
    year: '2022',
    role: 'Blockchain Developer',
    type: 'Web3 application',
    outcome: 'Made decentralized storage feel understandable, trustworthy, and usable for non-technical users.',
    accent: '#7cf2c3',
    metrics: ['Content-addressed storage', 'Client-side encryption', 'Zero single-point failure'],
  },
  {
    num: '04',
    title: 'Freelance Builds',
    description:
      'A body of launch-ready websites spanning portfolios, campaign sites, eCommerce, and custom client builds.',
    tags: ['UI/UX', 'Payments', 'SEO'],
    year: '2022 — 2025',
    role: 'Designer + Developer',
    type: 'Client delivery',
    outcome: 'Balanced brand expression, conversion, and turnaround speed across very different industries.',
    accent: '#ff8d68',
    metrics: ['Multi-region clients', 'Fast turnarounds', 'Brand-led execution'],
  },
  {
    num: '05',
    title: 'LSB Steganography',
    description:
      'A MATLAB project exploring how hidden data can be embedded inside image channels using least significant bit manipulation.',
    tags: ['MATLAB', 'Cryptography', 'Image Processing'],
    year: '2021',
    role: 'Research + Implementation',
    type: 'Security experiment',
    outcome: 'Translated an abstract security concept into a concrete, inspectable prototype.',
    accent: '#b491ff',
    metrics: ['Signal hiding', 'Image channels', 'Security-focused exploration'],
  },
  {
    num: '06',
    title: 'Full-Stack Blog Platform',
    description:
      'A CRUD publishing platform with a React frontend and Node/Express/MySQL backend for authoring and managing content.',
    tags: ['React', 'Node.js', 'MySQL'],
    year: '2021',
    role: 'Full Stack Developer',
    type: 'Content platform',
    outcome: 'Built a clean end-to-end foundation for writing, editing, publishing, and managing posts.',
    accent: '#ffcf70',
    metrics: ['CRUD workflows', 'MySQL persistence', 'REST-based architecture'],
  },
]

export interface Research {
  date: string
  title: string
  description: string
  link?: string
  linkLabel: string
  status: string
}

export const research: Research[] = [
  {
    date: 'Aug – Dec 2023',
    title: 'Inter Blockchain Communication for Medical Records',
    description:
      'Explored secure medical data exchange across private blockchains using Hyperledger Cactus to preserve interoperability and privacy.',
    linkLabel: 'In progress',
    status: 'Systems research',
  },
  {
    date: 'Jan – May 2023',
    title: 'Enhancing Diabetic Retinopathy Detection',
    description:
      'Built a CNN-based diagnostic workflow focused on earlier detection pathways for diabetic eye disease.',
    linkLabel: 'Completed',
    status: 'AI / healthcare',
  },
  {
    date: 'Aug – Dec 2022',
    title: 'Food Supply Chain Security in Smart Cities',
    description:
      'Published IEEE research on blockchain-enabled entity verification for tamper-resistant food supply chains.',
    link: 'https://ieeexplore.ieee.org/document/10580235',
    linkLabel: 'Read publication',
    status: 'IEEE published',
  },
]

export const proofMetrics = [
  { value: '9+', label: 'Products, prototypes, and client builds delivered' },
  { value: '3', label: 'Disciplines blended in most projects: code, design, research' },
  { value: '2', label: 'Continents connected through client and academic work' },
]

export const achievements = [
  { icon: '01', text: '1st Place — Smacathon' },
  { icon: '02', text: '1st Place — WebMobDevthon' },
  { icon: '03', text: '3rd Place — Designex' },
  { icon: '04', text: 'Won 9Hacks Hackathon twice' },
  { icon: '05', text: 'Published an IEEE research paper' },
  { icon: '06', text: 'Led a UI/UX design workshop' },
]

export interface Education {
  school: string
  degree: string
  gpa: string
  year: string
}

export const education: Education[] = [
  {
    school: 'Wilfrid Laurier University',
    degree: 'Masters of Applied Computing',
    gpa: 'In progress',
    year: 'Jan 2025 — Present',
  },
  {
    school: 'SRM University — AP',
    degree: 'B.Tech Computer Science & Engineering',
    gpa: 'CGPA 9.03',
    year: 'Nov 2020 — Jun 2024',
  },
  {
    school: 'Sri Chaitanya Educational Institutions',
    degree: 'BIEAP',
    gpa: 'CGPA 9.03',
    year: 'Jun 2018 — Mar 2020',
  },
]

export const contactData = {
  email: 'kumarsashank2003@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kumarsashank/',
  github: 'https://github.com/KumarSashank',
  headline: "Got an idea? Let's build it.",
  availability: 'Available for internships, freelance work, and collaborative product builds.',
}
