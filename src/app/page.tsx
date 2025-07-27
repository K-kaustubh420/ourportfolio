'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, useScroll, useTransform, AnimatePresence, MotionStyle } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import useSound from 'use-sound';
import { FaWhatsapp, FaEnvelope, FaBrain, FaServer, FaPalette, FaReact, FaNodeJs, FaFigma, FaTimes, FaUserSecret } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFirebase, SiSupabase, SiMongodb, SiOpenai, SiLangchain, SiBlender, SiThreedotjs, SiExpress } from 'react-icons/si';
import { Share_Tech_Mono } from 'next/font/google';

// --- Font ---
const techMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
});

// --- Custom Cursor for Desktop ---
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return <div ref={cursorRef} className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-red-500 rounded-full pointer-events-none z-[9999] mix-blend-difference" />;
}

// --- DecryptingText Component ---
const DecryptingText = ({
    children,
    delay = 0,
    className = ''
}: {
    children: string;
    delay?: number;
    className?: string;
}) => {
    const [text, setText] = useState(' ');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&<>()[]#@!?%';

    useEffect(() => {
        let interval: NodeJS.Timeout;
        const startAnimation = () => {
             let iteration = 0;
             interval = setInterval(() => {
                 setText(
                     children
                         .split('')
                         .map((_l, index) => {
                             if (index < iteration) {
                                 return children[index];
                             }
                             return letters[Math.floor(Math.random() * letters.length)];
                         })
                         .join('')
                 );

                 if (iteration >= children.length) {
                     clearInterval(interval);
                 }
                 iteration += 1 / 3;
             }, 45);
        };

        const timer = setTimeout(startAnimation, delay);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [children, delay]);

    return <span className={className}>{text}</span>;
};


// --- Preloader Component ---
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [text, setText] = useState('INITIALIZING');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&<>()[]#@!?%';

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setText(prev => prev.split('').map((_l, index) => index < iteration ? 'BYTE CREATORS'[index] : letters[Math.floor(Math.random() * letters.length)]).join(''));
            if (iteration >= 'BYTE CREATORS'.length) {
                clearInterval(interval);
                setTimeout(onComplete, 750);
            }
            iteration += 1 / 3;
        }, 60);

        setTimeout(() => setText('BYTE CREATORS'), 1500);

        return () => clearInterval(interval);
    }, [onComplete]);


    return (
        <motion.div className="fixed inset-0 bg-black flex justify-center items-center z-[10000]">
            <h1 className="text-2xl md:text-4xl text-white font-bold tracking-widest">
                {text}
            </h1>
        </motion.div>
    );
};


// --- UI Components ---
const Navbar = ({ onShowWork, playHover, playClick }: { onShowWork: () => void; playHover: () => void; playClick: () => void; }) => {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed top-0 left-0 w-full z-40"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-white font-bold text-2xl tracking-widest">
                    <DecryptingText delay={1000} className="text-2xl font-bold tracking-widest">TEAM BYTE CREATORS</DecryptingText>
                </div>
                <motion.button
                    onClick={() => { playClick(); onShowWork(); }}
                    onHoverStart={() => playHover()}
                    whileHover={{ scale: 1.05, textShadow: '0 0 8px #ef4444', boxShadow: '0 0 12px #ef4444' }}
                    className="px-4 py-2 bg-red-600/90 text-white font-bold rounded-md text-sm border border-red-600 transition-all"
                >
                    View Case Files
                </motion.button>
            </div>
        </motion.header>
    );
};

// --- Page Sections ---
const HeroSection = () => (
  <section className="min-h-screen flex flex-col justify-center items-start text-left">
    <h1 className="text-4xl md:text-5xl font-light text-slate-300 drop-shadow-lg mb-4">
      <TypeAnimation sequence={['Connecting vision...', 2000, 'Connecting vision... to reality.']} wrapper="span" speed={50} cursor={true} />
    </h1>
    <div className="relative">
       <h2 className="absolute top-0 left-0 w-full h-full text-slate-200 opacity-80 blur-lg animate-pulse">
        <DecryptingText className="font-bold text-6xl md:text-8xl tracking-widest">TEAM BYTE CREATORS</DecryptingText>
      </h2>
      <h2 className="relative text-white">
        <DecryptingText className="font-bold text-6xl md:text-8xl tracking-widest">TEAM BYTE CREATORS</DecryptingText>
      </h2>
    </div>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4, duration: 0.8 }}
      className="text-lg max-w-2xl mt-8 text-slate-300 drop-shadow-md"
    >
       We are a two-person independent software development team specializing in full-stack development, AI-driven solutions, and gamified web platforms. Our focus is on rapid iteration, clean scalable code, and building innovative, impactful products for startups and small businesses.
    </motion.p>
  </section>
);

// --- FIX: Moved scroll animation logic inside the Section component ---
const Section = React.forwardRef<HTMLElement, { id: string; title: string; children: React.ReactNode }>(
    ({ id, title, children }, ref) => {
        const { scrollYProgress } = useScroll({
            target: ref as React.RefObject<HTMLElement>,
            offset: ['start end', 'end start']
        });
        const opacity = useTransform(scrollYProgress, [0, 0.4, 0.9, 1], [0, 1, 1, 0]);
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ['50px', '0px', '-50px']);

        return (
            <motion.section
                ref={ref}
                id={id}
                className="min-h-screen py-32 space-y-12"
                style={{ opacity, y }} // Apply animation styles directly
            >
                <h2 className="text-4xl font-bold mb-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{`// ${title}`}</h2>
                {children}
            </motion.section>
        );
    }
);
Section.displayName = 'Section';


const ServiceCard = ({ icon, title, children, playHover }: { icon: React.ReactNode; title: string; children: React.ReactNode; playHover: () => void; }) => (
  <motion.div
    onHoverStart={() => playHover()}
    whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}
    className="bg-black/50 p-6 rounded-lg border border-slate-700 backdrop-blur-sm"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="text-white">{icon}</div>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
    </div>
    <div className="text-slate-400 space-y-2">{children}</div>
  </motion.div>
);

const ProjectCard = ({ title, description, isComingSoon = false, playHover }: { title: string; description: string; isComingSoon?: boolean; playHover: () => void; }) => (
  <motion.article
    onHoverStart={() => playHover()}
    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255, 255, 255, 0.3)' }}
    className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700 transition-shadow duration-300 shadow-lg relative overflow-hidden h-full"
  >
    {isComingSoon && <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">IN DEVELOPMENT</div>}
    <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </motion.article>
);

const TechStackCard = ({ title, techs, playHover }: { title: string; techs: { icon: React.ReactNode | null; name: string }[], playHover: () => void }) => (
  <div className="bg-black/50 p-6 rounded-lg border border-slate-700">
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <div className="grid grid-cols-2 gap-4">
      {techs.map((tech) => (
        <motion.div
          key={tech.name}
          onHoverStart={() => playHover()}
          whileHover={{ x: 5, color: '#FFFFFF' }}
          className="flex items-center gap-3 text-slate-300 transition-colors"
        >
          {tech.icon && <div>{tech.icon}</div>}
          <span>{tech.name}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

const TeamMemberCard = ({ name, role, description, playHover }: { name: string; role: string; description: string; playHover: () => void; }) => (
    <motion.div
        onHoverStart={() => playHover()}
        whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' }}
        className="bg-black/50 p-6 rounded-lg border border-slate-700 backdrop-blur-sm"
    >
        <div className="flex items-center gap-4 mb-3">
            <FaUserSecret size={28} className="text-red-500" />
            <div>
                <h3 className="text-2xl font-semibold text-white">{name}</h3>
                <p className="text-red-400 text-sm">{role}</p>
            </div>
        </div>
        <p className="text-slate-400">{description}</p>
    </motion.div>
);


// --- Main Page Component ---
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWork, setShowWork] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [playHover] = useSound('/hover.mp3', { volume: 0.0 });
  const [playClick] = useSound('/click2.mp3', { volume: 0.5 });

  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // --- FIX: Removed useScrollAnim hook and direct calls from here ---

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'escape' && showWork) {
        handleCloseWork();
        return;
      }
      const actions: { [key: string]: () => void } = {
        'h': handleShowWork,
        'i': () => aboutRef.current?.scrollIntoView({ behavior: 'smooth' }),
        's': () => servicesRef.current?.scrollIntoView({ behavior: 'smooth' }),
        't': () => techRef.current?.scrollIntoView({ behavior: 'smooth' }),
        'c': () => contactRef.current?.scrollIntoView({ behavior: 'smooth' }),
      };
      if (document.activeElement?.tagName !== 'INPUT') {
          actions[key]?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showWork]);

  const handleShowWork = () => {
    if(!showWork) {
        playClick();
        setShowWork(true);
        setShowPrompt(false);
    }
  };
  const handleCloseWork = () => {
    playClick();
    setShowWork(false);
    setShowPrompt(true);
  };

  const WHATSAPP_NUMBER = '7521850380';
  const EMAIL_ADDRESS = 'kkaustubh92@gmail.com';
  const whatsappMessage = encodeURIComponent('Hi! I have a project inquiry.');

  const techStacks = {
    frontend: [{ icon: <SiNextdotjs />, name: 'Next.js' }, { icon: <FaReact />, name: 'React' }, { icon: <SiTailwindcss />, name: 'Tailwind' }, { icon: <SiTypescript />, name: 'TypeScript' }],
    backend: [{ icon: <FaNodeJs />, name: 'Node.js' }, { icon: <SiExpress />, name: 'Express' }, { icon: <SiFirebase />, name: 'Firebase' }, { icon: <SiSupabase />, name: 'Supabase' }, { icon: <SiMongodb />, name: 'MongoDB' }],
    ai: [{ icon: <SiOpenai />, name: 'OpenAI' }, { icon: <SiLangchain />, name: 'Langchain' }, { icon: null, name: 'Agentic' }, { icon: null, name: 'Automation' }],
    design: [{ icon: <FaFigma />, name: 'Figma' }, { icon: <SiBlender />, name: 'Blender' }, { icon: <SiThreedotjs />, name: 'Three.js' }, { icon: null, name: 'Shaders' }],
  };

  if(isLoading) {
      return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <div className={`${techMono.className} bg-black text-slate-200 select-none md:cursor-none`}>
        <CustomCursor />
        <Navbar onShowWork={handleShowWork} playHover={playHover} playClick={playClick} />
        <video
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-[2]"
          controls={false}
          disablePictureInPicture
        />
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[-1]" />
        <Canvas className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 3, 3]} intensity={4} color="#ffffff" />
          <EffectComposer>
            <Bloom intensity={0.3} luminanceThreshold={0.3} luminanceSmoothing={0.9} height={1000} />
          </EffectComposer>
        </Canvas>
        
        <AnimatePresence>
          {showPrompt && !showWork && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 bg-black/50 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              {isMobile ? 'Tap screen to navigate' :
                <TypeAnimation
                  sequence={[
                    'Hold [H] for Case Files', 2000,
                    'Hold [I] for Intel', 2000,
                    'Hold [S] for Capabilities', 2000,
                    'Hold [T] for Tech Stack', 2000,
                    'Hold [C] for Contact', 2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              }
            </motion.div>
          )}
        </AnimatePresence>
        
        <main className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <HeroSection />

          {/* FIX: Removed style prop from Section components */}
           <Section ref={aboutRef} id="about" title="Intel">
                <p className="text-lg text-slate-300 max-w-3xl">We are an early-stage, agile team committed to pushing the boundaries of AI and gamified web experiences. Our partnership is built on a shared passion for technology and a commitment to delivering excellence.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <TeamMemberCard name="Kaustubh Kushwaha" role="Lead Developer & AI Architect" description="Specializing in full-stack architecture and implementing complex AI-driven solutions. Experienced in taking projects from concept to deployment." playHover={playHover}/>
                    <TeamMemberCard name="Kiran Prasad Neupane" role="Full-Stack Developer & UI/UX Specialist" description="Focuses on building intuitive, gamified user interfaces and robust backend systems. Also handles smaller client projects and landing pages." playHover={playHover}/>
                </div>
           </Section>

          <Section ref={servicesRef} id="services" title="Capabilities">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard icon={<FaBrain size={24} />} title="AI & Automation" playHover={playHover}><p>Custom AI agents, autonomous workflows, and intelligent automation to solve complex business problems.</p></ServiceCard>
              <ServiceCard icon={<FaServer size={24} />} title="Full-Stack Platforms" playHover={playHover}><p>Scalable web applications, company dashboards, and robust platforms built with best-in-class technology.</p></ServiceCard>
              <ServiceCard icon={<FaPalette size={24} />} title="Immersive Experiences" playHover={playHover}><p>Aesthetic-first landing pages and digital installations using 3D, motion, and shader artistry.</p></ServiceCard>
            </div>
          </Section>
          
          <AnimatePresence>
            {showWork && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                onClick={handleCloseWork}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="w-full max-w-5xl bg-black/80 border border-slate-700 rounded-lg p-8 shadow-2xl shadow-red-500/10 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={handleCloseWork} onMouseEnter={() => playHover()} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                        <FaTimes size={24} />
                    </button>
                  <h2 className="text-4xl font-bold mb-8 text-white">{`// _Case_Files`}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProjectCard playHover={playHover} title="Theyala Social Platform" description="One-of-a-kind social media platform for NovusTales LLC. Built from the ground up, featuring full chat, auth, and content systems." />
                    <ProjectCard playHover={playHover} title="Danfe Tea AI Salesbot" description="AI-powered sales agent for a US-based tea company. It handles customer queries and boosts engagement, effectively replacing a human salesperson." />
                    <ProjectCard playHover={playHover} title="SRM Event Portal (Zoho Collab)" description="Internal platform to manage college events for SRM's CTech department, streamlining organization and participation." />
                    <ProjectCard playHover={playHover} title="Gameflix" description="Instagram-like platform for games and interactive media. Features AI-powered visual creation tools and social engagement." isComingSoon={true} />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <Section ref={techRef} id="tech" title="Technology_Stack">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TechStackCard title="Frontend" techs={techStacks.frontend} playHover={playHover} />
              <TechStackCard title="Backend" techs={techStacks.backend} playHover={playHover} />
              <TechStackCard title="AI / Automation" techs={techStacks.ai} playHover={playHover} />
              <TechStackCard title="Design / 3D" techs={techStacks.design} playHover={playHover} />
            </div>
          </Section>
          
          <Section ref={contactRef} id="contact" title="Contact">
            <p className="mb-8 max-w-xl text-lg text-slate-300">We partner with a select group of clients with serious projects. If you're ready to build something impactful, we would love to hear from you.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" onHoverStart={() => playHover()} onClick={() => playClick()} whileHover={{ scale: 1.05, textShadow: '0 0 8px #25D366', boxShadow: '0 0 12px #25D366' }} className="flex items-center justify-center gap-3 px-8 py-4 bg-green-500/90 text-white font-bold rounded-md transition-all border border-green-500">
                <FaWhatsapp size={24} /> Message on WhatsApp
              </motion.a>
              <motion.a href={`mailto:${EMAIL_ADDRESS}?subject=Project%20Inquiry`} onHoverStart={() => playHover()} onClick={() => playClick()} whileHover={{ scale: 1.05, textShadow: '0 0 8px #ef4444', boxShadow: '0 0 12px #ef4444' }} className="flex items-center justify-center gap-3 px-8 py-4 bg-red-600/90 text-white font-bold rounded-md transition-all border border-red-600">
                <FaEnvelope size={24} /> Send an Email
              </motion.a>
            </div>
          </Section>
        </main>
      </div>
    </>
  );
}