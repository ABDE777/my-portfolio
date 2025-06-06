
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDCubeProps {
  skills: string[];
}

const ThreeDCube: React.FC<ThreeDCubeProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create cube with skill textures
    const materials = skills.slice(0, 6).map((skill, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'rgba(20, 20, 30, 0.8)';
        context.fillRect(0, 0, 256, 256);
        context.strokeStyle = '#8B5CF6';
        context.lineWidth = 4;
        context.strokeRect(8, 8, 240, 240);
        context.font = 'bold 36px Poppins, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#ffffff';
        context.fillText(skill, 128, 128);
      }
      return new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(canvas),
        transparent: true
      });
    });

    // Fill any remaining slots with blank materials
    while (materials.length < 6) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'rgba(20, 20, 30, 0.8)';
        context.fillRect(0, 0, 256, 256);
        context.strokeStyle = '#8B5CF6';
        context.lineWidth = 4;
        context.strokeRect(8, 8, 240, 240);
      }
      materials.push(
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(canvas),
          transparent: true
        })
      );
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    cubeRef.current = cube;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (cube) {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (cubeRef.current) {
        cubeRef.current.geometry.dispose();
        if (Array.isArray(cubeRef.current.material)) {
          cubeRef.current.material.forEach(material => material.dispose());
        }
      }
    };
  }, [skills]);

  return <div ref={containerRef} className="mx-auto w-[300px] h-[300px]" />;
};

export default ThreeDCube;
