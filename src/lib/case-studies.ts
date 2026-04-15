export interface CaseStudy {
  slug: string
  num: string
  title: string
  subtitle: string
  role: string
  timeline: string
  team: string
  tags: string[]
  overview: string
  problem: string
  solution: string
  process: {
    title: string
    description: string
  }[]
  results: string[]
  nextProject?: {
    slug: string
    title: string
    num: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-exam-portal',
    num: '01',
    title: 'AI Exam Portal',
    subtitle: 'End-to-end AI-powered exam management and assessment platform',
    role: 'Full Stack Developer',
    timeline: 'Nov 2023 — Feb 2024',
    team: 'Solo + 1 Designer',
    tags: ['Flutter', 'Node.js', 'Firebase', 'AI', 'Mobile'],
    overview:
      'A comprehensive exam management platform built with Flutter and backed by Node.js + Firebase. The system handles everything from exam creation to AI-powered grading, providing a seamless experience for both educators and students.',
    problem:
      'Traditional exam systems rely on manual question creation, rigid scheduling, and time-consuming grading. Educators spend more time on logistics than on actual teaching. Students receive delayed feedback that diminishes the learning loop.',
    solution:
      'Built a Flutter-based cross-platform application integrated with a Node.js backend and Firebase for real-time data sync. The AI module generates questions from topic inputs, auto-grades subjective answers using NLP, and provides instant analytics dashboards for educators.',
    process: [
      {
        title: 'Research & Architecture',
        description:
          'Mapped the end-to-end exam lifecycle — creation, distribution, proctoring, grading, analytics. Chose Flutter for cross-platform reach, Firebase for real-time sync, and a Node.js service layer for AI integration.',
      },
      {
        title: 'Core Platform Build',
        description:
          'Built the exam engine with timed sessions, question randomization, anti-cheat mechanisms, and offline caching. Implemented role-based access for students, teachers, and administrators.',
      },
      {
        title: 'AI Integration & Analytics',
        description:
          'Integrated NLP-based answer evaluation for subjective questions. Built analytics dashboards showing performance trends, difficulty analysis, and class-wide insights with real-time data from Firebase.',
      },
    ],
    results: [
      'Reduced exam grading time by 80%',
      'Cross-platform support — iOS, Android, Web',
      'Real-time analytics for 500+ concurrent users',
      'AI-generated questions from topic inputs',
    ],
    nextProject: { slug: 'icho', title: 'iCho — Head Motion Sound', num: '02' },
  },
  {
    slug: 'icho',
    num: '02',
    title: 'iCho — Head Motion Sound',
    subtitle: 'Hands-free immersive audio controlled by head movement',
    role: 'AI Developer & Audio Engineer',
    timeline: 'Jan 2023 — Apr 2023',
    team: 'Solo Project',
    tags: ['Python', 'AI Tracking', 'Audio DSP', 'Computer Vision'],
    overview:
      'An experimental AI project that tracks head movement in real-time and spatially balances audio accordingly. Turn your head left — audio pans left. Look up — volume adjusts. No hands, no controllers, just natural movement.',
    problem:
      'Immersive audio experiences typically require expensive hardware (spatial audio headphones, VR headsets) or manual controls. Accessibility-focused users and creative professionals need a hands-free, intuitive way to control audio spatialization.',
    solution:
      'Built a Python application using computer vision (MediaPipe) to track head orientation in real-time via webcam. The tracking data drives a custom audio DSP pipeline that dynamically pans, adjusts volume, and applies spatial effects based on the user\'s head position and rotation.',
    process: [
      {
        title: 'Head Tracking Pipeline',
        description:
          'Used MediaPipe Face Mesh to extract 468 facial landmarks in real-time. Calculated head pitch, yaw, and roll from landmark positions using geometric transformations, achieving <15ms latency per frame.',
      },
      {
        title: 'Audio Spatialization Engine',
        description:
          'Built a custom audio processing pipeline in Python using PyAudio and NumPy. Mapped head orientation to stereo panning, volume attenuation, and reverb parameters for convincing spatial audio.',
      },
      {
        title: 'Calibration & UX',
        description:
          'Implemented an auto-calibration sequence that adapts to the user\'s natural head position. Added visual feedback overlay showing tracking confidence and audio parameter states.',
      },
    ],
    results: [
      'Real-time head tracking at 30fps via standard webcam',
      'Sub-20ms audio response latency',
      'No specialized hardware required',
      'Open-source Python library published',
    ],
    nextProject: {
      slug: 'decentralized-file-sharing',
      title: 'Decentralized File Sharing',
      num: '03',
    },
  },
  {
    slug: 'decentralized-file-sharing',
    num: '03',
    title: 'Decentralized File Sharing',
    subtitle: 'Censorship-resistant file storage with no single point of failure',
    role: 'Blockchain Developer',
    timeline: 'Aug 2022 — Dec 2022',
    team: 'Team of 3',
    tags: ['HTML/CSS/JS', 'IPFS', 'Blockchain', 'Web3'],
    overview:
      'A web application where files are distributed across a decentralized network using IPFS. No central server controls access — files are content-addressed, immutable, and resistant to censorship or single points of failure.',
    problem:
      'Centralized file storage services (Google Drive, Dropbox) create single points of failure, enable censorship, and require trust in a third party. Users have no control over their data once it\'s uploaded to a centralized server.',
    solution:
      'Built a web interface that connects to IPFS for decentralized file storage. Files are split into chunks, distributed across the network, and addressed by content hash — meaning the same file always resolves to the same address regardless of where it\'s stored.',
    process: [
      {
        title: 'IPFS Integration',
        description:
          'Set up an IPFS node and built a JavaScript client library for file upload, retrieval, and pinning. Implemented content addressing using CIDs (Content Identifiers) for tamper-proof file verification.',
      },
      {
        title: 'Web Interface & UX',
        description:
          'Built a clean, minimal frontend with drag-and-drop upload, real-time upload progress, file browsing, and shareable links. Designed for non-technical users to interact with decentralized storage seamlessly.',
      },
      {
        title: 'Network & Security',
        description:
          'Implemented file encryption before upload for private sharing. Added pinning service integration to ensure file availability. Built a gateway proxy for browser-native access without requiring an IPFS node.',
      },
    ],
    results: [
      'Zero-downtime file availability across the network',
      'Content-addressed storage — tamper-proof by design',
      'Client-side encryption for private file sharing',
      'No central authority or single point of failure',
    ],
    nextProject: { slug: 'ai-exam-portal', title: 'AI Exam Portal', num: '01' },
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getAllSlugs(): string[] {
  return caseStudies.map((cs) => cs.slug)
}
