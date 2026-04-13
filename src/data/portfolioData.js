// Portfolio Data - John Vincent Joaquin Edition
import {
  SiJavascript, SiPhp, SiHtml5, SiCss,
  SiReact, SiNextdotjs, SiExpress, SiLaravel, SiTailwindcss,
  SiGit, SiGithub, SiVercel, SiDocker
} from 'react-icons/si';
import innovate from '../assets/innovate.png';
import intern from '../assets/intern.png';
import top10 from '../assets/top10.png';
import prog from '../assets/prog.png';
import kip from '../assets/kip.png';
import ecash from '../assets/ecash.png';
import lms from '../assets/lms.png';


export const personalInfo = {
  name: 'John Vincent Joaquin',
  initials: 'JVJ',
  title: 'Full-Stack Developer & Designer',
  email: 'john@example.com',
  location: 'Philippines',
  resumeUrl: '/jv-resume.png',
  socialLinks: {
    github: 'https://github.com/johnjoaquin',
    linkedin: 'https://linkedin.com/in/johnjoaquin',
    email: 'mailto:john@example.com',
  },
}

export const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast']

export const stats = [
  { label: 'Motivated', value: 100 },
  { label: 'Projects Completed', value: 4 },
  { label: 'Certifications', value: 4 },
]

export const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'PHP', icon: SiPhp },
      { name: 'HTML/CSS', icon: SiHtml5 },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'Laravel', icon: SiLaravel },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    title: 'Tools & Cloud',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Docker', icon: SiDocker },
    ],
  },
]

export const experiences = [
  {
    type: 'work',
    role: 'System Developer Intern (KIP Project)',
    company: 'DOST Region 1',
    period: 'OJT Period',
    link: 'https://kip.dost1.ph/',
    image: kip,
    bullets: [
      'Engineered the KIP Record Management System to digitize and streamline administrative operations for the regional office.',
      'Implemented an intuitive interface and secure data structure for efficient document tracking and storage.',
      'Awarded "Best IT Intern" for outstanding performance and technical contribution to the regional digital transformation projects.',
    ],
  },
  {
    type: 'work',
    role: 'System Developer Intern (eCash Project)',
    company: 'DOST Region 1',
    period: 'OJT Period',
    link: 'https://ecash.dost1.ph/',
    image: ecash,
    bullets: [
      'Built a centralized eCash Disbursement System to facilitate secure digital financial transactions for department cashiers.',
      'Programmed core database features to ensure precise fund tracking, automated receipt generation, and reliable reporting.',
      'Transitioned the accounting process from manual logging to a modernized digital workflow, reducing transaction errors.',
    ],
  },
  {
    type: 'work',
    role: 'Full-Stack Developer',
    company: 'Polytechnic College of La Union',
    period: 'Project Period',
    link: null,
    image: lms,
    bullets: [
      'Collaborated on building a comprehensive Library Management System tailored to the localized needs of the college campus.',
      'Integrated mission-critical modules including automated book tracking, real-time student attendance monitoring, and dynamic analytics.',
      'Configured and deployed the application on a local LAN server to provide high-availability access for library personnel.',
    ],
  },
]

export const educationData = [
  {
    id: 'elem-laoag',
    level: 'Elementary (Kinder – Grade 4)',
    degree: 'Elementary Education',
    school: 'Laoag City Elementary School',
    location: 'Laoag City, Ilocos Norte',
    period: 'Kinder — Grade 4',
    graduationDate: null,
    link: null,
    emoji: '🌱',
    highlights: [
      'Started schooling in Laoag City — the beginning of the academic journey',
      'Built early literacy, numeracy, and social foundations',
    ],
    featured: false,
  },
  {
    id: 'elem-agoo',
    level: 'Elementary (Grade 5–6)',
    degree: 'Elementary Education',
    school: 'Agoo West Central School',
    location: 'Agoo, La Union',
    period: 'Grade 5 — Grade 6',
    graduationDate: null,
    link: null,
    emoji: '🏫',
    highlights: [
      'Transferred to Agoo and continued elementary education',
      'Adapted to a new school environment and thrived academically',
    ],
    featured: false,
  },
  {
    id: 'jhs',
    level: 'Junior High School',
    degree: 'Junior High School Diploma',
    school: 'Agoo Kiddie Special School',
    location: 'Agoo, La Union',
    period: '2016 — 2020',
    graduationDate: null,
    link: null,
    emoji: '✏️',
    highlights: [
      'Completed Junior High School at a specialized institution in Agoo',
      'Built a strong academic foundation in core sciences and mathematics',
    ],
    featured: false,
  },
  {
    id: 'shs',
    level: 'Senior High School',
    degree: 'Humanities and Social Science (HUMSS)',
    school: 'DEFEMNHS',
    location: 'Agoo, La Union',
    period: '2020 — 2022',
    graduationDate: null,
    link: null,
    emoji: '📚',
    highlights: [
      'Strand: Humanities and Social Science (HUMSS)',
      'Developed critical thinking, communication, and analytical skills',
      'Participated in various socio-civic and leadership activities',
    ],
    featured: false,
  },
  {
    id: 'college',
    level: 'College',
    degree: 'Bachelor of Science in Information Technology',
    school: 'Polytechnic College of La Union',
    location: 'La Union, Philippines',
    period: '2022 — April 10, 2026',
    graduationDate: 'April 10, 2026',
    link: 'https://pclu.edu.ph/',
    emoji: '🎓',
    highlights: [
      'IT graduate experienced in systems and Arduino projects, driven by technical challenges.',
    ],
    featured: true,
  },
]

export const achievements = [
  {
    title: "Dean's Lister",
    org: 'Polytechnic College of La Union',
    year: '2024 – Present',
    icon: '📜',
    description: 'Consistently maintained an academic average of 90 since 2024, earning recognition for unwavering dedication to academic excellence throughout the BSIT program.',
    image: '/cert_placeholder.png',
    featured: true,
  },
  {
    title: 'Best in Programming',
    org: 'IT Department — PCLU',
    year: '2024',
    icon: '💻',
    description: 'Awarded for exceptional proficiency in software development and algorithmic problem-solving, standing out among peers for clean, efficient, and innovative code.',
    image: prog,
    featured: true,
  },
  {
    title: 'Excellence Awardee — IT Internship',
    org: 'DOST Region 1',
    year: '2024',
    icon: '🎖️',
    description: 'Received top intern recognition for outstanding performance and technical contributions during the OJT program, directly impacting the agency\'s digital transformation initiatives.',
    image: intern,
    featured: true,
  },
  {
    title: 'DOST Region 1 Certificate of Completion (OJT)',
    org: 'DOST Region 1',
    year: '2024',
    icon: '📜',
    description: 'Officially certified for successfully completing the rigorous On-the-Job Training program at the Department of Science and Technology Region 1, contributing to impactful web development and digital projects.',
    image: '/cert_placeholder.png',
    featured: true,
  },
  {
    title: 'Most Innovative Capstone Project',
    org: 'College of Information Technology — PCLU',
    year: '2024',
    icon: '🚀',
    description: 'Developed and presented a capstone project lauded as the most innovative of the batch, introducing practical technology-driven solutions to real-world institutional challenges.',
    image: innovate,
    featured: true,
  },
  {
    title: 'Top 10 Finalist — Interschool Startup Challenge',
    org: 'Representing PCLU',
    year: '2024',
    icon: '💡',
    description: 'Competed in an interschool startup competition, pitching an innovative business idea to industry judges and securing a Top 10 spot among competing colleges.',
    image: top10,
    featured: false,
  },
  {
    title: '2024 Mr. IT',
    org: 'Polytechnic College of La Union',
    year: '2024',
    icon: '👑',
    description: 'Served as Mr. IT 2024, representing the IT department in events and competitions. A testament to being not just technically driven, but an active contributor to campus culture and IT community engagement.',
    image: '/cert_placeholder.png',
    featured: false,
  },
]

export const projectCategories = ['All', 'Web', 'Mobile', 'Data', 'DevOps']

export const projects = [
  {
    title: 'Nexus Analytics Platform',
    description:
      'A real-time business intelligence dashboard with interactive charts, custom report builders, and role-based access control. Handles 10M+ data points with sub-second query performance.',
    image: null,
    tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/johnjoaquin/nexus-analytics',
    demo: 'https://nexus-analytics.demo.dev',
    category: 'Web',
    featured: true,
  },
  {
    title: 'CloudDeploy CLI',
    description:
      'An open-source command-line tool for automating multi-cloud deployments. Supports AWS, GCP, and Azure with infrastructure-as-code templates.',
    image: null,
    tech: ['Go', 'Terraform', 'Docker', 'AWS', 'GCP'],
    github: 'https://github.com/johnjoaquin/clouddeploy',
    demo: null,
    category: 'DevOps',
    featured: false,
  },
  {
    title: 'FitTrack Mobile',
    description:
      'A cross-platform fitness tracking app with workout logging, progress photos, and AI-powered meal planning. 4.8★ rating on both app stores.',
    image: null,
    tech: ['React Native', 'Firebase', 'TensorFlow Lite', 'Stripe'],
    github: 'https://github.com/johnjoaquin/fittrack',
    demo: 'https://fittrack.app',
    category: 'Mobile',
    featured: false,
  },
  {
    title: 'DataPulse ETL Engine',
    description:
      'A scalable ETL pipeline framework for processing terabytes of streaming data with fault tolerance and exactly-once delivery guarantees.',
    image: null,
    tech: ['Python', 'Apache Kafka', 'Spark', 'Airflow'],
    github: 'https://github.com/johnjoaquin/datapulse',
    demo: null,
    category: 'Data',
    featured: false,
  },
  {
    title: 'DevConnect Social',
    description:
      'A developer-focused social platform with real-time code collaboration, project showcases, and mentorship matching. Built for the dev community.',
    image: null,
    tech: ['Next.js', 'Prisma', 'WebSocket', 'Tailwind CSS'],
    github: 'https://github.com/johnjoaquin/devconnect',
    demo: 'https://devconnect.demo.dev',
    category: 'Web',
    featured: false,
  },
  {
    title: 'SentimentScope',
    description:
      'A natural language processing tool that analyzes customer feedback at scale, providing actionable insights through sentiment scoring and topic clustering.',
    image: null,
    tech: ['Python', 'spaCy', 'FastAPI', 'React', 'MongoDB'],
    github: 'https://github.com/johnjoaquin/sentimentscope',
    demo: 'https://sentimentscope.demo.dev',
    category: 'Data',
    featured: false,
  },
]

export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
