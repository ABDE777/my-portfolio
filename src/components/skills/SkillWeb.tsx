
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Skill {
  id: string;
  name: string;
  level: number;
  group: string;
  color: string;
}

interface SkillNode {
  id: string;
  name: string;
  level: number;
  group: string;
  color: string;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

interface SkillWebProps {
  skills: Skill[];
  width?: number;
  height?: number;
}

const SkillWeb: React.FC<SkillWebProps> = ({ skills, width = 900, height = 600 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  
  const groups = [...new Set(skills.map(skill => skill.group))];
  const nodes = useRef<SkillNode[]>([]);
  const animationRef = useRef<number | null>(null);
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null);

  // Initialize nodes
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvasContext.current = ctx;
    
    // Create nodes based on skills
    nodes.current = skills.map(skill => ({
      ...skill,
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 10 + (skill.level / 10), // Size based on skill level
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }));
    
    startAnimation();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [skills, width, height]);
  
  // Handle mouse interactions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      
      // Check if mouse is over any node
      const hoveredNode = nodes.current.find(node => {
        const dx = node.x - x;
        const dy = node.y - y;
        return Math.sqrt(dx * dx + dy * dy) < node.radius;
      });
      
      if (hoveredNode) {
        setHoveredSkill(hoveredNode);
        document.body.style.cursor = 'pointer';
      } else {
        setHoveredSkill(null);
        document.body.style.cursor = 'default';
      }
    };
    
    const handleClick = () => {
      if (hoveredSkill) {
        setSelectedGroup(prevGroup => 
          prevGroup === hoveredSkill.group ? null : hoveredSkill.group
        );
      }
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      document.body.style.cursor = 'default';
    };
  }, [hoveredSkill]);
  
  // Filter nodes based on selected group
  useEffect(() => {
    if (!selectedGroup) return;
    
    nodes.current.forEach(node => {
      if (node.group === selectedGroup) {
        node.vx += (Math.random() - 0.5) * 5;
        node.vy += (Math.random() - 0.5) * 5;
      }
    });
  }, [selectedGroup]);
  
  const startAnimation = () => {
    const animate = () => {
      if (!canvasContext.current || !canvasRef.current) return;
      
      const ctx = canvasContext.current;
      const canvas = canvasRef.current;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.current.length; i++) {
        const nodeA = nodes.current[i];
        
        for (let j = i + 1; j < nodes.current.length; j++) {
          const nodeB = nodes.current[j];
          
          // Only connect nodes in same group or if no group selected
          if (!selectedGroup || nodeA.group === selectedGroup && nodeB.group === selectedGroup) {
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) { // Only draw connections for close nodes
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              
              // Gradient line with opacity based on distance
              const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
              const colorA = hexToRgba(nodeA.color, 0.5 - distance / 300);
              const colorB = hexToRgba(nodeB.color, 0.5 - distance / 300);
              
              gradient.addColorStop(0, colorA);
              gradient.addColorStop(1, colorB);
              ctx.strokeStyle = gradient;
              ctx.stroke();
            }
          }
        }
      }
      
      // Update and draw nodes
      nodes.current.forEach(node => {
        // Apply forces
        node.x += node.vx;
        node.y += node.vy;
        
        // Dampen velocity
        node.vx *= 0.99;
        node.vy *= 0.99;
        
        // Boundary conditions
        if (node.x < node.radius) {
          node.x = node.radius;
          node.vx *= -1;
        }
        if (node.x > canvas.width - node.radius) {
          node.x = canvas.width - node.radius;
          node.vx *= -1;
        }
        if (node.y < node.radius) {
          node.y = node.radius;
          node.vy *= -1;
        }
        if (node.y > canvas.height - node.radius) {
          node.y = canvas.height - node.radius;
          node.vy *= -1;
        }
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        // Change appearance based on group filter and hover
        let fillStyle = node.color;
        let strokeStyle = '#ffffff';
        let lineWidth = 1;
        
        if (selectedGroup && node.group !== selectedGroup) {
          fillStyle = hexToRgba(node.color, 0.3); // Fade non-selected groups
        } else if (hoveredSkill && hoveredSkill.id === node.id) {
          strokeStyle = '#8B5CF6';
          lineWidth = 3;
          fillStyle = hexToRgba(node.color, 1);
        }
        
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        
        // Draw node name if hovered or in selected group
        if (
          (hoveredSkill && hoveredSkill.id === node.id) || 
          (selectedGroup && node.group === selectedGroup)
        ) {
          ctx.font = 'bold 14px Poppins, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(node.name, node.x, node.y + node.radius + 20);
          
          // Draw skill level bar
          const barWidth = 50;
          const barHeight = 4;
          const barX = node.x - barWidth / 2;
          const barY = node.y + node.radius + 25;
          
          // Bar background
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fillRect(barX, barY, barWidth, barHeight);
          
          // Progress bar
          ctx.fillStyle = node.color;
          ctx.fillRect(barX, barY, barWidth * (node.level / 100), barHeight);
        }
      });
      
      // Draw tooltip for hovered skill
      if (hoveredSkill) {
        drawSkillTooltip(ctx, mousePosition.x, mousePosition.y, hoveredSkill);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const drawSkillTooltip = (ctx: CanvasRenderingContext2D, x: number, y: number, skill: Skill) => {
    const tooltipWidth = 200;
    const tooltipHeight = 80;
    const padding = 10;
    
    // Position tooltip to stay within canvas
    let tooltipX = x + 15;
    let tooltipY = y - tooltipHeight - 10;
    
    if (tooltipX + tooltipWidth > width) {
      tooltipX = x - tooltipWidth - 15;
    }
    if (tooltipY < 0) {
      tooltipY = y + 15;
    }
    
    // Draw tooltip background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = skill.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);
    ctx.fill();
    ctx.stroke();
    
    // Draw skill name
    ctx.font = 'bold 16px Poppins, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText(skill.name, tooltipX + padding, tooltipY + padding + 15);
    
    // Draw skill group
    ctx.font = '12px Poppins, sans-serif';
    ctx.fillStyle = '#a0aec0';
    ctx.fillText(skill.group, tooltipX + padding, tooltipY + padding + 35);
    
    // Draw skill level bar
    const barWidth = tooltipWidth - padding * 2;
    const barHeight = 8;
    const barX = tooltipX + padding;
    const barY = tooltipY + padding + 45;
    
    // Bar background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Progress bar
    const gradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
    gradient.addColorStop(0, skill.color);
    gradient.addColorStop(1, lightenColor(skill.color, 30));
    ctx.fillStyle = gradient;
    ctx.fillRect(barX, barY, barWidth * (skill.level / 100), barHeight);
    
    // Draw level percentage
    ctx.font = 'bold 12px Poppins, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.fillText(`${skill.level}%`, tooltipX + tooltipWidth - padding, barY + barHeight + 15);
  };
  
  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  // Helper function to lighten a color
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1)}`;
  };
  
  return (
    <div className="flex flex-col items-center w-full">
      {/* Filter by group */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setSelectedGroup(null)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            !selectedGroup ? 'bg-portfolio-accent text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          All Skills
        </button>
        {groups.map(group => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedGroup === group ? 'bg-portfolio-accent text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            {group}
          </button>
        ))}
      </div>
      
      <Card className="p-4 bg-slate-900/30 border-slate-700/20 w-full max-w-[900px] mx-auto overflow-hidden">
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="touch-none"
          />
          <div className="absolute bottom-2 left-2 text-xs text-slate-400">
            Click on a skill node to filter by category
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SkillWeb;
