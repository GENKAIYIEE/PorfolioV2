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
import lms from '../assets/LMS (2).png';
import deans from '../assets/deans.jpg';


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
    image: deans,
    label: 'View Honor',
    featured: true,
  },
  {
    title: 'Best in Programming',
    org: 'IT Department — PCLU',
    year: '2026',
    icon: '💻',
    description: 'Awarded for exceptional proficiency in software development and algorithmic problem-solving, standing out among peers for clean, efficient, and innovative code.',
    image: prog,
    label: 'View Certificate',
    featured: true,
  },
  {
    title: 'Excellence Awardee — IT Internship',
    org: 'DOST Region 1',
    year: '2026',
    icon: '🎖️',
    description: 'Received top intern recognition for outstanding performance and technical contributions during the OJT program, directly impacting the agency\'s digital transformation initiatives.',
    image: intern,
    label: 'View Certificate',
    featured: true,
  },
  {
    title: 'DOST Region 1 Certificate of Completion (OJT)',
    org: 'DOST Region 1',
    year: '2026',
    icon: '📜',
    description: 'Officially certified for successfully completing the rigorous On-the-Job Training program at the Department of Science and Technology Region 1, contributing to impactful web development and digital projects.',
    image: '/cert_placeholder.png',
    label: 'View Certificate',
    featured: true,
  },
  {
    title: 'Most Innovative Capstone Project',
    org: 'College of Information Technology — PCLU',
    year: '2026',
    icon: '🚀',
    description: 'Developed and presented a capstone project lauded as the most innovative of the batch, introducing practical technology-driven solutions to real-world institutional challenges.',
    image: innovate,
    label: 'View Certificate',
    featured: true,
  },
  {
    title: 'Top 10 Finalist — Interschool Startup Challenge',
    org: 'Representing PCLU',
    year: '2026',
    icon: '💡',
    description: 'Competed in an interschool startup competition, pitching an innovative business idea to industry judges and securing a Top 10 spot among competing colleges.',
    image: top10,
    label: 'View Certificate',
    featured: false,
  },
]



export const projects = [
  {
    title: 'Upcoming Project',
    description:
      'Waiting for another project... currently exploring new horizons and putting together something amazing.',
    image: null,
    tech: ['Research', 'Idea Generation', 'Planning'],
    github: null,
    demo: null,
    category: 'TBD',
    featured: true,
    isUpcoming: true,
  },
]

export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'projects', label: 'Projects' },
  { id: 'work-with-me', label: 'Work With Me' },
  { id: 'contact', label: 'Contact' },
]
