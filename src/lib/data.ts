export const heroData = {
  eyebrow: 'Ontario, Canada · Open to Work',
  firstName: 'Kumar',
  lastName: 'Sashank',
  role: 'AI Product Engineer',
  title: 'AI Product Engineer',
  description:
    'Curiosity is the stack I keep coming back to. I build software so I can be lazy about the parts that matter less.',
  availability:
    'Finishing my Masters at Wilfrid Laurier. Open to new grad roles in Canada.',
  stats: [
    { value: '5', suffix: '+', label: 'Internships' },
    { value: '4', suffix: '×', label: 'Hackathon Wins' },
    { value: '4', suffix: '×', label: 'Research Papers' },
  ],
  callouts: [
    {
      label: 'Now building',
      value:
        'AI products at EONVERSE — multi-agent GenAI pipelines, agentic workflows, and the quiet plumbing underneath.',
    },
    {
      label: 'Best at',
      value:
        'Starting projects without knowing how deep they go, then shipping them anyway. Architecture, AI plumbing, and polish.',
    },
    {
      label: 'Looking for',
      value:
        'New grad engineering roles in Canada. Startups that ship, teams that trust engineers with product decisions.',
    },
  ],
  disciplines: ['AI engineering', 'Product systems', 'Backend architecture', 'Creative development'],
}

export const aboutData = {
  intro:
    'I build the things I can\u2019t stop thinking about \u2014 usually at 3 AM, usually before I know how hard they\u2019ll be.',
  text:
    'My projects range from an AI research agent that beat GPT Deep Research (2 min vs 24 min), to a Spotify-Wrapped clone for LeetCode with 400+ users in 23 countries, to a certificate issuance system that has signed 12,000+ certificates in production. I\u2019m a CS Masters student at Wilfrid Laurier, a founding engineer at a stealth AI startup, and someone who keeps mistaking sleep for a deployment window.',
  pillars: [
    {
      title: 'Ship first, polish with intent',
      description:
        'I move from idea to running prototype fast, then tune the architecture, the motion, and the edges until the whole thing feels deliberate.',
    },
    {
      title: 'Automate the repeatable',
      description:
        'Anything I do twice becomes a script, a workflow, or a tool. My n8n pipeline tailors resumes and pushes them to Notion so I can spend time on the parts that actually need me.',
    },
    {
      title: 'Learn the depth on the way down',
      description:
        'I start projects without knowing how deep they go. Whether it\u2019s shader code, Hyperledger, RAG pipelines, or head-tracking audio, I dive in and come back with it working.',
    },
  ],
  skills: [
    { category: 'AI / GenAI', items: 'Claude, Gemini, RAG, agentic workflows, prompt & context engineering, local LLMs, fine-tuning' },
    { category: 'Frontend', items: 'React, Next.js, TypeScript, Tailwind, GSAP, Framer Motion' },
    { category: 'Backend', items: 'Node.js, Express, Django, Python, REST APIs, system design' },
    { category: 'Data', items: 'PostgreSQL, Firebase, BigQuery, MongoDB, SQL, caching strategies' },
    { category: 'Infra / DevOps', items: 'Docker, CI/CD, Vercel, domains, analytics, SEO, error tracking' },
    { category: 'Automation', items: 'n8n, workflow orchestration, scraping, personal tooling' },
    { category: 'Mobile', items: 'Flutter, Android (Java), Swift (learning), cross-platform patterns' },
    { category: 'Security', items: 'Cryptography, key exchange, digital certificates, steganography, OSI-level networking' },
  ],
}

export const operatingPrinciples = [
  {
    id: '01',
    title: 'Start before you\u2019re ready',
    description:
      'I pick problems I don\u2019t fully understand yet. Depth comes from doing the thing, not from planning to do it.',
  },
  {
    id: '02',
    title: 'Automate so you can think',
    description:
      'Every recurring task is a tool waiting to be built. I pay the upfront cost so the future version of me gets to focus on what\u2019s actually hard.',
  },
  {
    id: '03',
    title: 'Ship it publicly',
    description:
      'LeetWrap has 400+ users in 23 countries because it exists on the internet, not on my machine. The work isn\u2019t done until someone else can use it.',
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
    role: 'Founding Engineer',
    description:
      'Building GenAI products from the ground up \u2014 multi-agent orchestration, custom output-consistency engines, and agentic media pipelines. Leading technical direction, architecture, and hiring.',
    location: 'Remote \u00b7 India',
    impact: 'Shaping the stack, the product, and the team at an early-stage AI startup.',
    focus: ['GenAI pipelines', 'Agentic orchestration', 'Architecture & hiring'],
  },
  {
    dateStart: 'May 2024',
    dateEnd: 'Jun 2024',
    company: 'Dock.',
    role: 'Technical Intern',
    description:
      'Shipped campaign-facing websites for political clients and supported IVR systems running at public-election scale.',
    location: 'Hyderabad',
    impact: 'Reliable delivery on high-visibility, short-deadline comms infrastructure.',
    focus: ['Rapid builds', 'Campaign tech', 'Systems support'],
  },
  {
    dateStart: 'Nov 2023',
    dateEnd: 'Nov 2024',
    company: 'SPOCSQ.',
    role: 'SDE Intern',
    description:
      'Solely built the backend for an AI assessment portal and delivered eCommerce products end-to-end \u2014 payments, SEO, UI, deployment.',
    location: 'Hyderabad',
    impact: 'Owned infra-heavy and customer-facing work across multiple shipped products.',
    focus: ['Backend architecture', 'AI assessment', 'Commerce delivery'],
  },
  {
    dateStart: 'Jun 2023',
    dateEnd: 'Aug 2023',
    company: 'Fidelity Investments',
    role: 'Full Stack Intern',
    description:
      'Built a centralized dashboard that unified fragmented enterprise data sources using Angular and Fidelity\u2019s internal component system.',
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
      'Ran user interviews and delivered empathy maps, journey maps, personas, and low-fidelity flows \u2014 the research foundation of my product instinct.',
    location: 'Guntur',
    impact: 'Built the habit of grounding product decisions in real conversations.',
    focus: ['User research', 'Journey mapping', 'Wireframes'],
  },
]

export interface Project {
  num: string
  title: string
  description: string
  tags: string[]
  slug?: string
  link?: string
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
    title: 'LeetWrap',
    description:
      'A Spotify-Wrapped-style year-in-review for LeetCode developers. I shipped the product, wrote the architecture post, and let the thing grow on its own.',
    tags: ['Next.js', 'Analytics', 'Public product'],
    slug: 'leetwrap',
    link: 'https://www.leetwrap.com/',
    year: '2024',
    role: 'Sole builder \u00b7 design, engineering, infra',
    type: 'Shipped public product',
    outcome: '400+ users across 23 countries, a companion YouTube Wrap, and an architectural write-up that drove most of the traffic.',
    accent: '#ff8d68',
    metrics: ['400+ users', '23 countries', 'Architectural blog post'],
  },
  {
    num: '02',
    title: 'AI Co-Investigator for Pre-Clinical Research',
    description:
      'An agent that plans BigQuery jobs, runs them, and synthesizes insights for pre-clinical research teams. Built for the specific shape of scientific questions, not generic search.',
    tags: ['Agents', 'BigQuery', 'RAG', 'Python'],
    slug: 'ai-co-investigator',
    year: '2024',
    role: 'Architect + Engineer',
    type: 'Research agent',
    outcome: 'Completed a research query in 2 minutes that took ChatGPT Deep Research 24 minutes \u2014 on the same prompt.',
    accent: '#83b7ff',
    metrics: ['12\u00d7 faster than GPT Deep Research', 'BigQuery orchestration', 'Domain-specific RAG'],
  },
  {
    num: '03',
    title: 'Multi-Agent GenAI Pipeline',
    description:
      'An agentic media pipeline built at EONVERSE. Multiple models coordinate through a shared state layer, and a custom consistency engine keeps generated outputs stable across steps. Product details are under NDA \u2014 the architecture is not.',
    tags: ['GenAI', 'Multi-agent', 'Gemini', 'Orchestration'],
    year: '2025',
    role: 'Architect + Engineer (EONVERSE)',
    type: 'GenAI pipeline',
    outcome: 'Owned the MVP architecture, designed agent-to-agent communication, and built the consistency engine the rest of the system depends on.',
    accent: '#d3b26c',
    metrics: ['Multi-agent orchestration', 'Custom consistency engine', 'Agent-to-agent state layer'],
  },
  {
    num: '04',
    title: 'AI Notetaker with Longitudinal Context',
    description:
      'Fireflies and Otter hand you a meeting summary and forget it. This one remembers what you said three meetings ago, tracks unclosed questions, and flags the tasks that keep slipping.',
    tags: ['RAG', 'Agents', 'Full stack'],
    slug: 'ai-notetaker',
    year: '2025',
    role: 'Project lead \u2014 backend, frontend, architecture',
    type: 'AI productivity tool',
    outcome: 'Handled every code-level decision: recording fallbacks, bot joining, extension flow, transcripts, and the longitudinal memory layer.',
    accent: '#7cf2c3',
    metrics: ['Longitudinal context', 'RAG-grounded citations', 'Obsidian integration (WIP)'],
  },
  {
    num: '05',
    title: 'Certificate Issuance Platform',
    description:
      'A digital certificate system for a testing company serving thousands of students. Handles generation, storage, delivery, and verification end-to-end.',
    tags: ['Node.js', 'Firebase', 'Cloud Storage', 'Vercel'],
    slug: 'certificate-platform',
    year: '2023',
    role: 'Sole backend + infra',
    type: 'Production infrastructure',
    outcome: '12,000+ certificates issued through the system and counting \u2014 integrated with the client\u2019s frontend via Vercel deployment.',
    accent: '#b491ff',
    metrics: ['12,000+ certificates issued', 'Firebase + Cloud Storage', 'Production reliability'],
  },
  {
    num: '06',
    title: 'iCho \u2014 Head Motion Spatial Audio',
    description:
      'A Python tool that balances audio in real time based on where your head is looking \u2014 essentially an open version of AirPods Pro spatial audio, running off a webcam.',
    tags: ['Python', 'Computer vision', 'Audio DSP'],
    slug: 'icho',
    year: '2023',
    role: 'AI + Audio systems',
    type: 'Experimental interface',
    outcome: 'Replicated a proprietary hardware experience using only a laptop camera and open-source tooling.',
    accent: '#ffcf70',
    metrics: ['Real-time head tracking', 'No special hardware', 'AirPods Pro-style spatial audio'],
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
    date: 'Aug \u2013 Dec 2022',
    title: 'Food Supply Chain Security in Smart Cities',
    description:
      'Published IEEE research on blockchain-enabled entity verification and hash-based trust for tamper-resistant food supply chains.',
    link: 'https://ieeexplore.ieee.org/document/10580235',
    linkLabel: 'Read publication',
    status: 'IEEE published',
  },
  {
    date: '2025',
    title: 'Do Prompt Personas Matter? A Security Analysis of ChatGPT-Generated Code Across Developer Roles',
    description:
      'Examined how persona prompting (junior dev, senior dev, security engineer) changes the vulnerability profile of LLM-generated code \u2014 and what that means for teams shipping with AI in the loop.',
    linkLabel: 'Masters research',
    status: 'AI / security',
  },
  {
    date: '2025',
    title: 'A Comparative Evaluation of Secure Email Protocols: PGP vs. S/MIME',
    description:
      'Compared trust models, key management, and real-world deployment friction across PGP and S/MIME to surface where each protocol actually earns its complexity.',
    linkLabel: 'Masters research',
    status: 'Cryptography',
  },
  {
    date: 'Aug \u2013 Dec 2023',
    title: 'Inter-Blockchain Communication for Medical Records',
    description:
      'Explored secure cross-chain medical data exchange using Hyperledger Cactus to preserve privacy without sacrificing interoperability.',
    linkLabel: 'In progress',
    status: 'Systems research',
  },
]

export const proofMetrics = [
  { value: '12K+', label: 'Certificates issued through infrastructure I built' },
  { value: '23', label: 'Countries reached by LeetWrap, shipped solo' },
  { value: '4\u00d7', label: 'Peer-reviewed research papers (1 IEEE-published)' },
]

export const achievements = [
  { icon: '01', text: '1st Place \u2014 Smacathon' },
  { icon: '02', text: '1st Place \u2014 WebMobDevthon' },
  { icon: '03', text: '3rd Place \u2014 Designex' },
  { icon: '04', text: 'Won 9Hacks hackathon twice' },
  { icon: '05', text: 'Hacktoberfest 2022 \u2014 4 merged contributions' },
  { icon: '06', text: 'IEEE-published researcher' },
  { icon: '07', text: 'Led a UI/UX design workshop' },
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
    year: 'Jan 2025 \u2014 Present',
  },
  {
    school: 'SRM University \u2014 AP',
    degree: 'B.Tech Computer Science & Engineering',
    gpa: 'CGPA 9.03',
    year: 'Nov 2020 \u2014 Jun 2024',
  },
  {
    school: 'Sri Chaitanya Educational Institutions',
    degree: 'BIEAP',
    gpa: 'CGPA 9.03',
    year: 'Jun 2018 \u2014 Mar 2020',
  },
]

export const contactData = {
  email: 'kumarsashank2003@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kumarsashank/',
  github: 'https://github.com/KumarSashank',
  headline: "Got an idea? Let's build it.",
  availability: 'Open to new grad engineering roles in Canada. Always open to conversations about AI, products, or 3 AM ideas.',
}
