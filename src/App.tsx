/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  PerspectiveCamera,
  Environment,
  ContactShadows
} from '@react-three/drei';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { 
  User, 
  ShoppingBag, 
  Menu, 
  X,
  Zap
} from 'lucide-react';
import * as THREE from 'three';

// Import sections
import Home from './sections/Home';
import About from './sections/About';
import Learn from './sections/Learn';
import Book from './sections/Book';

// --- 3D Components ---

function DumbbellModel({ scrollYProgress }: { scrollYProgress: any }) {
  const group = useRef<THREE.Group>(null);

  // Transform scroll progress to 3D positions and rotations
  const x = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [2, -2, 2, 0]);
  const y = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 0.5, -0.5, 0]);
  const rotationZ = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, Math.PI / 2, -Math.PI / 4, Math.PI * 2]);
  const scale = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [1.5, 1.2, 1.8, 1.5]);

  // Use spring for smoother movement
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });
  const springRotationZ = useSpring(rotationZ, { stiffness: 50, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 50, damping: 20 });

  useFrame((state) => {
    if (group.current) {
      group.current.position.x = springX.get();
      group.current.position.y = springY.get();
      group.current.rotation.z = springRotationZ.get() + Math.sin(state.clock.getElapsedTime()) * 0.1;
      group.current.scale.setScalar(springScale.get());
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group}>
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2, 32]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.15, 32]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.7, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.15, 32]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.9, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.41, 0.41, 0.02, 32]} />
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[0.41, 0.41, 0.02, 32]} />
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Scene({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <DumbbellModel scrollYProgress={scrollYProgress} />
      </Float>
      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
      <Environment preset="city" />
    </>
  );
}

// --- UI Components ---

const NavItem = ({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
      active ? 'text-yellow-500' : 'text-gray-400 hover:text-white'
    }`}
  >
    {label}
    {active && (
      <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 mx-4" />
    )}
  </button>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Learn', id: 'learn' },
    { label: 'Book', id: 'book' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-white font-sans selection:bg-yellow-500 selection:text-black">
      {/* Fixed Background Text */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <motion.h1 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.02, 0.05]) }}
          className="text-[25vw] font-black tracking-tighter text-white leading-none uppercase"
        >
          {activeSection === 'home' ? 'KAIZEN' : activeSection}
        </motion.h1>
      </div>

      {/* Fixed 3D Scene */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Canvas shadows dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Scene scrollYProgress={scrollYProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm md:backdrop-blur-none md:bg-none">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <Zap className="text-black fill-current" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none uppercase italic">KAIZEN</span>
            <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">FITNESS</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavItem 
              key={item.id} 
              label={item.label} 
              active={activeSection === item.id} 
              onClick={() => scrollToSection(item.id)} 
            />
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button className="hidden md:block text-gray-400 hover:text-white transition-colors"><User size={20} /></button>
          <button className="hidden md:block text-gray-400 hover:text-white transition-colors"><ShoppingBag size={20} /></button>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: '100%' }} 
            className="fixed inset-0 z-40 bg-black pt-32 px-8 flex flex-col gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className={`text-6xl font-black tracking-tighter text-left uppercase ${activeSection === item.id ? 'text-yellow-500' : 'text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-20">
        <div id="home"><Home /></div>
        <div id="about"><About /></div>
        <div id="learn"><Learn /></div>
        <div id="book"><Book /></div>
      </main>

      {/* Fixed UI Elements */}
     <div className="fixed right-0 sm:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-none z-0 sm:z-30">
  <div className="h-24 w-px bg-gray-800" />
  <span className="rotate-90 text-[10px] font-bold tracking-[0.3em] text-yellow-500 uppercase whitespace-nowrap">EST. 2024 / MARIKINA</span>
  <div className="h-24 w-px bg-gray-800" />
</div>

      <div className="fixed bottom-6 left-6 text-[10px] font-bold tracking-widest text-gray-600 uppercase pointer-events-none z-30">
        KAIZEN FITNESS MARIKINA / PH
      </div>

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-500 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
