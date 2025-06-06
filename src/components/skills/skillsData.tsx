import { ReactNode } from "react";
import { 
  FaGraduationCap, FaCertificate, FaCode, FaBriefcase, FaUsers, FaTerminal
} from "react-icons/fa";
import { SiCisco } from "react-icons/si";
import { 
  SiHtml5, SiCss3, SiJavascript, SiPython, SiPhp,
  SiBootstrap, SiGit, SiGithub,
  SiVercel, SiMysql,
  SiGoogle
} from "react-icons/si";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Define React component functions instead of inline JSX
const getHtmlIcon = (): ReactNode => <SiHtml5 className="text-orange-500 text-4xl" />;
const getCssIcon = (): ReactNode => <SiCss3 className="text-blue-500 text-4xl" />;
const getJsIcon = (): ReactNode => <SiJavascript className="text-yellow-400 text-4xl" />;
const getPythonIcon = (): ReactNode => <SiPython className="text-green-500 text-4xl" />;
const getPhpIcon = (): ReactNode => <SiPhp className="text-purple-500 text-4xl" />;
const getMysqlIcon = (): ReactNode => <SiMysql className="text-blue-600 text-4xl" />;
const getBootstrapIcon = (): ReactNode => <SiBootstrap className="text-purple-600 text-4xl" />;
const getGitIcon = (): ReactNode => <SiGit className="text-orange-600 text-4xl" />;
const getGithubIcon = (): ReactNode => <SiGithub className="text-slate-100 text-4xl" />;
const getTerminalIcon = (): ReactNode => <FaTerminal className="text-blue-400 text-4xl" />;
const getVsCodeIcon = (): ReactNode => <FaCode className="text-blue-500 text-4xl" />;
const getVercelIcon = (): ReactNode => <SiVercel className="text-slate-100 text-4xl" />;
const getExcelIcon = (): ReactNode => <FaCode className="text-green-600 text-4xl" />;
const getWordIcon = (): ReactNode => <FaCode className="text-blue-700 text-4xl" />;
const getPowerPointIcon = (): ReactNode => <FaCode className="text-red-600 text-4xl" />;
const getGoogleFormsIcon = (): ReactNode => <SiGoogle className="text-purple-700 text-4xl" />;
const getCertificateIcon = (color: string): ReactNode => <FaCertificate className={`text-${color}-400 text-4xl`} />;
const getGraduationIcon = (): ReactNode => <FaGraduationCap className="text-fuchsia-500 text-4xl" />;
const getBriefcaseIcon = (): ReactNode => <FaBriefcase className="text-amber-500 text-4xl" />;
const getCiscoIcon = (): ReactNode => <SiCisco className="text-blue-400 text-4xl" />;
const getAzureIcon = (): ReactNode => <FaCode className="text-blue-500 text-4xl" />;
const getMicrosoftIcon = (): ReactNode => <FaCode className="text-blue-600 text-4xl" />;

// Define avatar components
const getOFPPTAvatar = (): ReactNode => (
  <Avatar className="w-16 h-16 border-2 border-white/10">
    <AvatarImage src="/lovable-uploads/df25b901-e73e-428b-8251-8e36ae48622d.png" alt="OFPPT Logo" className="object-cover" />
    <AvatarFallback className="bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20">
      <FaGraduationCap className="text-indigo-500 text-4xl" />
    </AvatarFallback>
  </Avatar>
);

const getSKMShoreAvatar = (): ReactNode => (
  <Avatar className="w-16 h-16 border-2 border-white/10">
    <AvatarImage src="/lovable-uploads/94de8ccc-f0d2-434d-9f51-947ca673755e.png" alt="SKM SHORE Logo" className="object-cover" />
    <AvatarFallback className="bg-gradient-to-br from-amber-500/20 to-orange-500/20">
      <FaBriefcase className="text-amber-500 text-4xl" />
    </AvatarFallback>
  </Avatar>
);

const getClubITAvatar = (): ReactNode => (
  <Avatar className="w-16 h-16 border-2 border-white/10">
    <AvatarImage src="/lovable-uploads/0ec78c73-9c6e-4488-89cd-44adb4eb62e9.png" alt="CLUB IT ISFO Logo" className="object-cover" />
    <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
      <FaUsers className="text-blue-500 text-4xl" />
    </AvatarFallback>
  </Avatar>
);

export const programmingSkills = [
  {
    id: "html",
    name: "HTML",
    level: 90,
    skillLevel: "Avancé",
    icon: getHtmlIcon(),
    description: "Structure sémantique, accessibilité et formulaires avancés",
    category: "Frontend",
    color: "from-orange-500 to-red-500",
    shadowColor: "shadow-orange-500/20",
    textColor: "text-orange-400",
    bgColor: "bg-orange-500/10"
  },
  {
    id: "css",
    name: "CSS",
    level: 85,
    skillLevel: "Avancé",
    icon: getCssIcon(),
    description: "Flexbox, Grid, animations et responsive design",
    category: "Frontend",
    color: "from-blue-500 to-blue-600",
    shadowColor: "shadow-blue-500/20",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  {
    id: "javascript",
    name: "JavaScript",
    level: 80,
    skillLevel: "Avancé",
    icon: getJsIcon(),
    description: "ES6+, DOM, Asynchronisme et API modernes",
    category: "Frontend",
    color: "from-yellow-400 to-yellow-500",
    shadowColor: "shadow-yellow-500/20",
    textColor: "text-yellow-400",
    bgColor: "bg-yellow-500/10"
  },
  {
    id: "python",
    name: "Python",
    level: 75,
    skillLevel: "Avancé",
    icon: getPythonIcon(),
    description: "Automatisation, analyse de données et développement backend",
    category: "Backend",
    color: "from-green-500 to-green-600",
    shadowColor: "shadow-green-500/20",
    textColor: "text-green-400",
    bgColor: "bg-green-500/10"
  },
  {
    id: "php",
    name: "PHP",
    level: 70,
    skillLevel: "Avancé",
    icon: getPhpIcon(),
    description: "Développement backend et intégration de bases de données",
    category: "Backend",
    color: "from-purple-500 to-purple-600",
    shadowColor: "shadow-purple-500/20",
    textColor: "text-purple-400",
    bgColor: "bg-purple-500/10"
  },
  {
    id: "mysql",
    name: "MySQL",
    level: 75,
    skillLevel: "Avancé",
    icon: getMysqlIcon(),
    description: "Gestion de bases de données relationnelles",
    category: "Backend",
    color: "from-blue-600 to-blue-700",
    shadowColor: "shadow-blue-600/20",
    textColor: "text-blue-500",
    bgColor: "bg-blue-600/10"
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    level: 85,
    skillLevel: "Avancé",
    icon: getBootstrapIcon(),
    description: "Framework CSS pour développement rapide d'interfaces",
    category: "Frontend",
    color: "from-purple-600 to-indigo-600",
    shadowColor: "shadow-purple-600/20",
    textColor: "text-purple-500",
    bgColor: "bg-purple-600/10"
  },
  {
    id: "git",
    name: "Git",
    level: 80,
    skillLevel: "Avancé",
    icon: getGitIcon(),
    description: "Gestion de versions et collaboration",
    category: "DevOps",
    color: "from-orange-600 to-orange-700",
    shadowColor: "shadow-orange-600/20",
    textColor: "text-orange-500",
    bgColor: "bg-orange-600/10"
  },
  {
    id: "github",
    name: "GitHub",
    level: 85,
    skillLevel: "Avancé",
    icon: getGithubIcon(),
    description: "CI/CD, projets collaboratifs et déploiement",
    category: "DevOps",
    color: "from-slate-600 to-slate-700",
    shadowColor: "shadow-slate-500/20",
    textColor: "text-slate-300",
    bgColor: "bg-slate-600/10"
  },
  {
    id: "terminal",
    name: "Terminal CMD",
    level: 75,
    skillLevel: "Avancé",
    icon: getTerminalIcon(),
    description: "Scripts, automatisation et gestion système",
    category: "DevOps",
    color: "from-blue-600 to-blue-700",
    shadowColor: "shadow-blue-600/20",
    textColor: "text-blue-400",
    bgColor: "bg-blue-600/10"
  },
  {
    id: "vscode",
    name: "VS Code",
    level: 90,
    skillLevel: "Avancé",
    icon: getVsCodeIcon(),
    description: "Personnalisation avancée et extensions",
    category: "Outil",
    color: "from-blue-500 to-cyan-500",
    shadowColor: "shadow-blue-500/20",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  {
    id: "vercel",
    name: "Vercel",
    level: 80,
    skillLevel: "Avancé",
    icon: getVercelIcon(),
    description: "Déploiement et hébergement de sites statiques et dynamiques",
    category: "DevOps",
    color: "from-slate-700 to-slate-800",
    shadowColor: "shadow-slate-600/20",
    textColor: "text-slate-300",
    bgColor: "bg-slate-700/10"
  },
  {
    id: "excel",
    name: "Excel",
    level: 85,
    skillLevel: "Avancé",
    icon: getExcelIcon(),
    description: "Analyse de données, tableaux croisés dynamiques et formules",
    category: "Outil",
    color: "from-green-600 to-green-700",
    shadowColor: "shadow-green-600/20",
    textColor: "text-green-500",
    bgColor: "bg-green-600/10"
  },
  {
    id: "word",
    name: "Word",
    level: 88,
    skillLevel: "Avancé",
    icon: getWordIcon(),
    description: "Création de documents professionnels et rapports structurés",
    category: "Outil",
    color: "from-blue-700 to-blue-800",
    shadowColor: "shadow-blue-700/20",
    textColor: "text-blue-600",
    bgColor: "bg-blue-700/10"
  },
  {
    id: "powerpoint",
    name: "PowerPoint",
    level: 83,
    skillLevel: "Avancé",
    icon: getPowerPointIcon(),
    description: "Création de présentations dynamiques et visuellement attrayantes",
    category: "Outil",
    color: "from-red-600 to-red-700",
    shadowColor: "shadow-red-600/20",
    textColor: "text-red-500",
    bgColor: "bg-red-600/10"
  },
  {
    id: "googleforms",
    name: "Google Forms",
    level: 78,
    skillLevel: "Avancé",
    icon: getGoogleFormsIcon(),
    description: "Création et analyse de formulaires et sondages en ligne",
    category: "Outil",
    color: "from-purple-700 to-purple-800",
    shadowColor: "shadow-purple-700/20",
    textColor: "text-purple-600",
    bgColor: "bg-purple-700/10"
  }
];

export const certificates = [
  {
    name: "Learn MySQL – For Beginners",
    issuer: "Udemy",
    date: "Juin 2025",
    icon: getCertificateIcon("red"),
    description: "Cours d'initiation à MySQL couvrant les bases des bases de données relationnelles, l'utilisation de PhpMyAdmin, la gestion des privilèges, ainsi que la connexion entre PHP et MySQL.",
    link: "https://www.udemy.com/certificate/UC-8d372c9c-ae96-4e4b-bbc8-5d3052923d01/",
    projects: [
      "MySQL",
      "SQL",
      "PhpMyAdmin",
      "Gestion des privilèges",
      "Connexion PHP/MySQL"
    ]
  },
  {
    name: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    date: "16 avril 2025",
    icon: getCiscoIcon(),
    description: "Formation complète couvrant les concepts fondamentaux de l'Intelligence Artificielle moderne et des grands modèles de langage (LLM).",
    link: "#",
    projects: ["Classification d'objets", "Traduction automatique", "Génération de contenu IA"]
  },
  {
    name: "The Complete HTML Course",
    issuer: "Udemy - Formateurs Web Coding",
    date: "9 novembre 2024",
    icon: getCertificateIcon("orange"),
    description: "Formation complète de 4 heures couvrant tous les aspects du HTML moderne. Certification obtenue avec succès (N° UC-c0343473-d9c6-4070-8358-529256-a7f3c).",
    link: "https://www.udemy.com/certificate/UC-c0343a73-d9c6-4d70-8358-52825e3a178c/",
    projects: ["Structure de site", "Formulaires avancés", "SEO HTML"]
  },
  {
    name: "The Complete HTML & CSS Course",
    issuer: "Udemy - Web Coding",
    date: "9 novembre 2024",
    icon: getCertificateIcon("blue"),
    description: "Fondamentaux du développement web frontend en 4 heures. Certification obtenue (N° UC-297f1ef9-acb4-4483-b45e-e33f21013bd0).",
    link: "https://www.udemy.com/certificate/UC-297f1ef9-acb4-4483-b45e-e33f21013bd0/",
    projects: ["Layout Responsive", "Design moderne", "Animations CSS"]
  },
  {
    name: "CSS, Bootstrap, JS, PHP Full Stack",
    issuer: "Udemy - PROPER DOT INSTITUTE",
    date: "12 janvier 2025",
    icon: getCertificateIcon("purple"),
    description: "Formation intensive de 4.5 heures couvrant les technologies frontend et backend. Certification complète (N° UC-788e89a5-f108-433a-a95c-198b4b159d82).",
    link: "https://www.udemy.com/certificate/UC-788e89a5-f108-433a-a95c-198b4b159d82/",
    projects: ["Site dynamique", "Back-office", "API REST"]
  },
  {
    name: "CSS, Bootstrap, JS & Python Stack",
    issuer: "Udemy - PROPER DOT INSTITUTE",
    date: "14 janvier 2025",
    icon: getCertificateIcon("green"),
    description: "Formation complète de 7.5 heures sur le développement Full Stack moderne. Certification obtenue (N° UC-d47692bf-e185-4945-a6b6-25c96ac89b30).",
    link: "https://www.udemy.com/certificate/UC-d47692bf-e185-4945-a6b6-25c96ac89b30/",
    projects: ["Application web", "Tableau de bord", "Automatisation"]
  }
];

export const badges = [
  {
    name: "Develop generative AI apps in Azure AI Foundry",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Completed the learning path for developing generative AI applications using Azure AI Foundry.",
    skills: ["Azure AI Foundry", "Generative AI", "LLM Integration", "Cloud Development", "AI Applications"],
    link: "https://learn.microsoft.com/en-us/credentials/credentials/"
  },
  {
    name: "Copilot Foundations",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Mastered the fundamental concepts and techniques for working with Microsoft Copilot.",
    skills: ["Microsoft Copilot", "AI Pair Programming", "Code Generation", "Prompt Engineering"],
    link: "https://learn.microsoft.com/en-us/credentials/credentials/"
  },
  {
    name: "Responsible generative AI",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Learned the principles and best practices for ethical and responsible use of generative AI technologies.",
    skills: ["AI Ethics", "Responsible AI", "Bias Mitigation", "AI Governance"],
    link: "https://learn.microsoft.com/en-us/credentials/credentials/"
  },
  {
    name: "Evaluate the performance of generative AI apps with Azure AI Foundry",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Gained expertise in evaluating and measuring the performance of generative AI applications running on Azure AI Foundry.",
    skills: ["Performance Metrics", "AI Evaluation", "Azure Monitoring", "Quality Assessment"],
    link: "https://learn.microsoft.com/en-us/credentials/credentials/"
  },
  {
    name: "Fine-tune a language model with Azure AI Foundry",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Developed skills for fine-tuning language models on the Azure AI Foundry platform for specialized applications.",
    skills: ["Model Fine-tuning", "LLM Training", "Parameter Optimization", "Domain Adaptation"],
    link: "https://learn.microsoft.com/en-us/credentials/credentials/"
  },
  {
    name: "Get started with prompt flow to develop language model apps in the Azure AI Foundry",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Learned how to use prompt flow methodologies to effectively develop language model applications in Azure.",
    skills: ["Prompt Engineering", "LLM Development", "Workflow Design", "AI App Development"],
    link: "https://learn.microsoft.com/en-us/credentials/credentials/"
  },
  {
    name: "Develop an AI app with the Azure AI Foundry SDK",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Created AI applications using the Azure AI Foundry Software Development Kit.",
    skills: ["SDK Integration", "API Development", "AI App Architecture", "Cloud Integration"],
    link: "https://learn.microsoft.com/en-us/credentials/credentials/"
  },
  {
    name: "Choose and deploy models from the model catalog in Azure AI Foundry portal",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Gained expertise in selecting and deploying appropriate AI models from Azure's comprehensive model catalog.",
    skills: ["Model Selection", "Deployment Strategies", "AI Model Management", "Resource Optimization"],
    link: "https://learn.microsoft.com/en-us/credentials/credentials/"
  },
  {
    name: "Build a RAG-based agent with your own data using Azure AI Foundry",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Developed Retrieval-Augmented Generation (RAG) based AI agents that can work with custom datasets on Azure.",
    skills: ["RAG Architecture", "Data Integration", "Knowledge Retrieval", "Agent Development"],
    link: "https://learn.microsoft.com/en-us/credentials/credentials/"
  },
  {
    name: "Plan and prepare to develop AI solutions on Azure",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Mastered the planning and preparation processes for developing effective AI solutions on the Azure platform.",
    skills: ["Solution Planning", "Resource Management", "AI Solution Architecture", "Cloud Strategy"],
    link: "https://learn.microsoft.com/en-us/credentials/credentials/"
  },
  {
    name: "Get started with Microsoft Copilot Studio",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Learned to use Microsoft Copilot Studio to create and manage AI copilots for various applications.",
    skills: ["Copilot Studio", "Custom Copilots", "Conversational AI", "No-code AI Development"],
    link: "https://copilot.microsoft.com/studio"
  },
  {
    name: "Introduction to generative AI",
    issuer: "Microsoft",
    date: "12 avril 2025",
    image: "/lovable-uploads/c465080f-b8e3-4291-baad-dad133cf4226.png",
    description: "Completed the introductory course on generative AI concepts, applications, and technologies.",
    skills: ["Generative AI Fundamentals", "AI Concepts", "Machine Learning", "Foundation Models"],
    link: "https://learn.microsoft.com/en-us/training/modules/introduction-generative-ai/"
  },
  {
    name: "Verified: Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    date: "16 avril 2025",
    image: "/lovable-uploads/99069227-9f4e-43ec-ae0c-9517d0835af4.png",
    description: "Badge officiel délivré par Cisco certifiant la réussite du cours Introduction to Modern AI. Ce badge atteste des compétences acquises dans l'utilisation des technologies d'intelligence artificielle moderne, y compris les modèles de langage avancés.",
    skills: ["IA & Machine Learning", "Détection d'objets", "LLM", "Traduction automatique","Dialogue avec chatbots", "Prompting multimodal"],
    link: "https://www.netacad.com/courses/ai"
  },

];

export const education = [
  {
    degree: "Formation Développeur Full Stack",
    institution: "ISFO (OFPPT NTIC 1)",
    period: "Sep 2024 - Juin 2026 (EN COURS)",
    icon: getOFPPTAvatar(),
    description: "Formation intensive couvrant les technologies frontend et backend. Réalisation de plusieurs projets concrets avec méthodologies Agile.",
    achievements: ["Projets pratiques", "Méthodologie Agile", "Travail d'équipe"],
    courses: ["Développement Web", "Bases de données", "Frameworks modernes", "Intégration continue"]
  },
  {
    degree: "Baccalauréat Scientifique",
    institution: "AL BOUHTOURI",
    period: "2021 - 2023",
    icon: getGraduationIcon(),
    description: "2ème Année Bac Sciences Physiques - Option Français. Résultat final : Admis",
    achievements: ["Diplôme obtenu", "Option scientifique", "Formation bilingue"],
    courses: ["Mathématiques", "Physique-Chimie", "Sciences de la vie", "Informatique"]
  }
];

export const experience = [
  {
    position: "Téléconseiller",
    company: "ECO SHORE",
    period: "Juin 2024 - Juillet 2024 (2 mois)",
    icon: getSKMShoreAvatar(),
    description: "Expérience dans un centre d'appel, gestion des demandes clients et résolution des problèmes.",
    responsibilities: ["Service client", "Gestion des plaintes", "Support technique"],
    skills: ["Communication client", "Résolution de problèmes", "Gestion du stress", "Travail d'équipe"]
  }
];

export const extracurricularActivities = [
  {
    position: "Responsable Formation et Projet",
    organization: "CLUB IT ISFO",
    period: "Sep 2024 - Présent",
    icon: getClubITAvatar(),
    description: "Intégration au club informatique de l'institut en tant que responsable de la formation des membres et de la gestion des projets. Participation active à l'organisation d'événements liés au développement web et aux nouvelles technologies.",
    responsibilities: [
      "Formation des nouveaux membres",
      "Gestion de projets",
      "Organisation d'ateliers",
      "Accompagnement technique"
    ],
    achievements: [
      "Mise en place d'un programme de mentorat",
      "Développement de projets collaboratifs",
      "Création de ressources pédagogiques"
    ]
  },
  {
    position: "Ambassadeur",
    organization: "Institut Spécialisé de Formation de l'Offshoring Casablanca -ISFO Casablanca",
    period: "Mai 2025 - Présent",
    icon: getOFPPTAvatar(), // à définir selon vos icônes disponibles
    description: "Représentation de l’ISFO, centre de formation professionnelle spécialisé dans les carrières tech et numériques. Promotion des formations, accompagnement des futurs apprenants et valorisation des réussites étudiantes.",
    responsibilities: [
      "Promotion des programmes de formation en développement web, IT et métiers du digital",
      "Orientation des apprenants vers des parcours adaptés",
      "Partage d'histoires de réussite et d'exemples concrets"
    ],
    achievements: [
      "Création de contenus inspirants sur les formations",
      "Renforcement de la visibilité du centre",
      "Accompagnement personnalisé des futurs étudiants"
    ],
    skills: [
      "Communication interpersonnelle",
      "Animation de communauté",
      "Orientation professionnelle",
      "Connaissance des formations tech"
    ]
  }
];

