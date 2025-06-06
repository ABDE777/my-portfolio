
import { ReactNode } from 'react';

export interface SkillNode {
  id: string;
  name: string;
  level: number;
  group: string;
  color: string;
  iconName: string;
}

export const skillNodes: SkillNode[] = [
  // Frontend
  { 
    id: "html", 
    name: "HTML5", 
    level: 90, 
    group: "Frontend", 
    color: "#e34c26",
    iconName: "SiHtml5"
  },
  { 
    id: "css", 
    name: "CSS3", 
    level: 85, 
    group: "Frontend", 
    color: "#2965f1",
    iconName: "SiCss3"
  },
  { 
    id: "javascript", 
    name: "JavaScript", 
    level: 80, 
    group: "Frontend", 
    color: "#f0db4f",
    iconName: "SiJavascript"
  },
  { 
    id: "typescript", 
    name: "TypeScript", 
    level: 75, 
    group: "Frontend", 
    color: "#007acc",
    iconName: "SiTypescript"
  },
  { 
    id: "react", 
    name: "React", 
    level: 78, 
    group: "Frontend", 
    color: "#61dafb",
    iconName: "SiReact"
  },
  { 
    id: "tailwind", 
    name: "Tailwind CSS", 
    level: 85, 
    group: "Frontend", 
    color: "#38b2ac",
    iconName: "SiTailwindcss"
  },
  { 
    id: "bootstrap", 
    name: "Bootstrap", 
    level: 80, 
    group: "Frontend", 
    color: "#7952b3",
    iconName: "SiBootstrap"
  },
  { 
    id: "vue", 
    name: "Vue.js", 
    level: 70, 
    group: "Frontend", 
    color: "#4FC08D",
    iconName: "SiVuedotjs"
  },
  { 
    id: "angular", 
    name: "Angular", 
    level: 65, 
    group: "Frontend", 
    color: "#DD0031",
    iconName: "SiAngular"
  },
  
  // Backend
  { 
    id: "nodejs", 
    name: "Node.js", 
    level: 70, 
    group: "Backend", 
    color: "#68a063",
    iconName: "SiNodedotjs"
  },
  { 
    id: "express", 
    name: "Express", 
    level: 65, 
    group: "Backend", 
    color: "#000000",
    iconName: "SiExpress"
  },
  { 
    id: "mongodb", 
    name: "MongoDB", 
    level: 60, 
    group: "Backend", 
    color: "#4DB33D",
    iconName: "SiMongodb"
  },
  { 
    id: "mysql", 
    name: "MySQL", 
    level: 65, 
    group: "Backend", 
    color: "#00758F",
    iconName: "SiMysql"
  },
  { 
    id: "firebase", 
    name: "Firebase", 
    level: 70, 
    group: "Backend", 
    color: "#FFCA28",
    iconName: "SiFirebase"
  },
  { 
    id: "supabase", 
    name: "Supabase", 
    level: 60, 
    group: "Backend", 
    color: "#3ECF8E",
    iconName: "SiSupabase"
  },
  { 
    id: "python", 
    name: "Python", 
    level: 75, 
    group: "Backend", 
    color: "#3776AB",
    iconName: "SiPython"
  },
  { 
    id: "php", 
    name: "PHP", 
    level: 68, 
    group: "Backend", 
    color: "#777BB4",
    iconName: "SiPhp"
  },
  
  // DevOps
  { 
    id: "git", 
    name: "Git", 
    level: 75, 
    group: "DevOps", 
    color: "#F05032",
    iconName: "SiGit"
  },
  { 
    id: "github", 
    name: "GitHub", 
    level: 80, 
    group: "DevOps", 
    color: "#6e5494",
    iconName: "SiGithub"
  },
  { 
    id: "docker", 
    name: "Docker", 
    level: 55, 
    group: "DevOps", 
    color: "#2496ED",
    iconName: "SiDocker"
  },
  { 
    id: "netlify", 
    name: "Netlify", 
    level: 70, 
    group: "DevOps", 
    color: "#00C7B7",
    iconName: "SiNetlify"
  },
  { 
    id: "aws", 
    name: "AWS", 
    level: 60, 
    group: "DevOps", 
    color: "#232F3E",
    iconName: "SiAmazon"
  },
  { 
    id: "vercel", 
    name: "Vercel", 
    level: 75, 
    group: "DevOps", 
    color: "#000000",
    iconName: "SiVercel"
  },
  
  // Outil
  { 
    id: "vscode", 
    name: "VS Code", 
    level: 85, 
    group: "Outil", 
    color: "#007ACC",
    iconName: "fallback"
  },
  { 
    id: "figma", 
    name: "Figma", 
    level: 75, 
    group: "Outil", 
    color: "#F24E1E",
    iconName: "SiFigma"
  },
  { 
    id: "photoshop", 
    name: "Photoshop", 
    level: 65, 
    group: "Outil", 
    color: "#31A8FF",
    iconName: "SiAdobephotoshop"
  },
  { 
    id: "npm", 
    name: "NPM", 
    level: 80, 
    group: "Outil", 
    color: "#CB3837",
    iconName: "SiNpm"
  },
  { 
    id: "postman", 
    name: "Postman", 
    level: 78, 
    group: "Outil", 
    color: "#FF6C37",
    iconName: "SiPostman"
  },
  { 
    id: "jest", 
    name: "Jest", 
    level: 70, 
    group: "Outil", 
    color: "#C21325",
    iconName: "SiJest"
  }
];
