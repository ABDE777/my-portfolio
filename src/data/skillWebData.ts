
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
    id: "bootstrap", 
    name: "Bootstrap", 
    level: 80, 
    group: "Frontend", 
    color: "#7952b3",
    iconName: "SiBootstrap"
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
    id: "netlify", 
    name: "Netlify", 
    level: 70, 
    group: "DevOps", 
    color: "#00C7B7",
    iconName: "SiNetlify"
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
    id: "postman", 
    name: "Postman", 
    level: 78, 
    group: "Outil", 
    color: "#FF6C37",
    iconName: "SiPostman"
  },
  {
    id: "excel",
    name: "Excel",
    level: 85,
    group: "Outil",
    color: "from-green-600 to-green-700",
    iconName: ""
  },
  {
  id: "word",
  name: "Word",
  level: 88,
  group: "Outil",
  color: "from-blue-700 to-blue-800",
  iconName: ""
},
{
  id: "powerpoint",
  name: "PowerPoint",
  level: 83,
  group: "Outil",
  color: "from-red-600 to-red-700",
  iconName: ""
},
{
  id: "googleforms",
  name: "Google Forms",
  level: 78,
  group: "Outil",
  color: "from-purple-700 to-purple-800",
  iconName: ""
}

];
