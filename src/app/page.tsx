'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaWhatsapp, FaEnvelope, FaBrain, FaServer, FaPalette, FaReact, FaNodeJs, FaFigma, FaTimes } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFirebase, SiSupabase, SiMongodb, SiOpenai, SiLangchain, SiBlender, SiThreedotjs, SiExpress } from 'react-icons/si';
import { Share_Tech_Mono } from 'next/font/google';

// --- Font ---
const techMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
});

// --- Custom Hooks ---
const useLongPress = (callback = () => {}, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: any;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  return {
    onPointerDown: () => setStartLongPress(true),
    onPointerUp: () => setStartLongPress(false),
    onPointerLeave: () => setStartLongPress(false),
  };
};

// --- Animated Text Components ---
const DecryptingText = ({ children, delay = 2500, className }: { children: string; delay?: number; className?: string }) => {
  const [text, setText] = useState('');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&<>()[]#@!?%';
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    let iteration = 0;
    const startAnimation = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setText(
          children
            .split('')
            .map((_letter, index) =>
              index < iteration ? children[index] : letters[Math.floor(Math.random() * letters.length)]
            )
            .join('')
        );
        if (iteration >= children.length) clearInterval(intervalRef.current);
        iteration += 1 / 4;
      }, 30);
    };
    const timeout = setTimeout(startAnimation, delay);
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeout);
    };
  }, [children, delay]);

  return <span className={className}>{text || children}</span>;
};

// --- UI Components ---
const Navbar = ({ onShowWork }: { onShowWork: () => void }) => {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed top-0 left-0 w-full z-40"
        >
            <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-white font-bold text-2xl tracking-widest">
                    <DecryptingText delay={1000} className="text-2xl font-bold tracking-widest">TEAM CREATORS</DecryptingText>
                </div>
                <motion.button
                    onClick={onShowWork}
                    whileHover={{ scale: 1.05, textShadow: '0 0 8px #ef4444', boxShadow: '0 0 12px #ef4444' }}
                    className="px-4 py-2 bg-red-600/90 text-white font-bold rounded-md text-sm border border-red-600 transition-all"
                >
                    View Work
                </motion.button>
            </div>
        </motion.header>
    );
};

// --- Page Sections ---
const HeroSection = ({ longPressProps }: { longPressProps: any }) => (
  <section className="min-h-screen flex flex-col justify-center items-start text-left" {...longPressProps}>
    <h1 className="text-4xl md:text-5xl font-light text-slate-300 drop-shadow-lg mb-4">
      <TypeAnimation sequence={['Connecting vision...', 2000, 'Connecting vision... to reality.']} wrapper="span" speed={50} cursor={true} />
    </h1>
    <div className="relative">
      <h2 className="absolute top-0 left-0 w-full h-full text-slate-200 opacity-80 blur-lg animate-pulse">
        <DecryptingText className="font-bold text-6xl md:text-8xl tracking-widest">TEAM CREATORS</DecryptingText>
      </h2>
      <h2 className="relative text-white">
        <DecryptingText className="font-bold text-6xl md:text-8xl tracking-widest">TEAM CREATORS</DecryptingText>
      </h2>
    </div>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4, duration: 0.8 }}
      className="text-lg max-w-xl mt-8 text-slate-300 drop-shadow-md"
    >
      We are a product engineering team specializing in building high-end digital experiences for serious clients.
    </motion.p>
  </section>
);

const Section = React.forwardRef<HTMLElement, { id: string; title: string; children: React.ReactNode; style: any }>(
    ({ id, title, children, style }, ref) => {
        return (
            <motion.section ref={ref} id={id} className="min-h-screen py-32 space-y-12" style={style}>
                <h2 className="text-4xl font-bold mb-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">// {title}</h2>
                {children}
            </motion.section>
        );
    }
);
Section.displayName = 'Section';

const ServiceCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <motion.div
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

const ProjectCard = ({ title, description, isComingSoon = false }: { title: string; description: string; isComingSoon?: boolean }) => (
  <motion.article
    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255, 255, 255, 0.3)' }}
    className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700 transition-shadow duration-300 shadow-lg relative overflow-hidden"
  >
    {isComingSoon && <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">COMING SOON</div>}
    <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </motion.article>
);

const TechStackCard = ({ title, techs }: { title: string; techs: { icon: React.ReactNode | null; name: string }[] }) => (
  <div className="bg-black/50 p-6 rounded-lg border border-slate-700">
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <div className="grid grid-cols-2 gap-4">
      {techs.map((tech) => (
        <div
          key={tech.name}
          className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
        >
          {tech.icon && <div>{tech.icon}</div>}
          <span>{tech.name}</span>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Page Component ---
export default function Page() {
  const [showWork, setShowWork] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const servicesRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const { scrollYProgress: servicesScroll } = useScroll({ target: servicesRef, offset: ['start end', 'end start'] });
  const servicesOpacity = useTransform(servicesScroll, [0, 0.4, 0.9, 1], [0, 1, 1, 0]);
  const servicesY = useTransform(servicesScroll, [0, 0.5, 1], ['50px', '0px', '-50px']);

  const { scrollYProgress: techScroll } = useScroll({ target: techRef, offset: ['start end', 'end start'] });
  const techOpacity = useTransform(techScroll, [0, 0.4, 0.9, 1], [0, 1, 1, 0]);
  const techY = useTransform(techScroll, [0, 0.5, 1], ['50px', '0px', '-50px']);

  const { scrollYProgress: contactScroll } = useScroll({ target: contactRef, offset: ['start end', 'end start'] });
  const contactOpacity = useTransform(contactScroll, [0, 0.4, 0.9, 1], [0, 1, 1, 0]);
  const contactY = useTransform(contactScroll, [0, 0.5, 1], ['50px', '0px', '-50px']);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === 'escape' && showWork) {
        setShowWork(false);
        setShowPrompt(true);
        return;
      }

      // Handle long hold keys
      const actions: { [key: string]: () => void } = {
        'h': () => {
          if (!showWork) {
            setShowWork(true);
            setShowPrompt(false);
          }
        },
        's': () => servicesRef.current?.scrollIntoView({ behavior: 'smooth' }),
        't': () => techRef.current?.scrollIntoView({ behavior: 'smooth' }),
        'c': () => contactRef.current?.scrollIntoView({ behavior: 'smooth' }),
      };
      actions[key]?.();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'h' && showWork) {
        setShowWork(false);
        setShowPrompt(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [showWork]);

  const handleShowWork = () => {
    setShowWork(true);
    setShowPrompt(false);
  };
  const handleCloseWork = () => {
    setShowWork(false);
    setShowPrompt(true);
  };

  const longPressProps = useLongPress(() => {
    if (isMobile) {
      handleShowWork();
    }
  }, 500);

  const handleRelease = () => {
    if (isMobile) {
      handleCloseWork();
    }
  };

  const WHATSAPP_NUMBER = '1234567890';
  const EMAIL_ADDRESS = 'hello@teamcreators.com';
  const whatsappMessage = encodeURIComponent('Hi! I have a project inquiry.');

  const techStacks = {
    frontend: [{ icon: <SiNextdotjs />, name: 'Next.js' }, { icon: <FaReact />, name: 'React' }, { icon: <SiTailwindcss />, name: 'Tailwind' }, { icon: <SiTypescript />, name: 'TypeScript' }],
    backend: [{ icon: <FaNodeJs />, name: 'Node.js' }, { icon: <SiExpress />, name: 'Express' }, { icon: <SiFirebase />, name: 'Firebase' }, { icon: <SiSupabase />, name: 'Supabase' }, { icon: <SiMongodb />, name: 'MongoDB' }],
    ai: [{ icon: <SiOpenai />, name: 'OpenAI' }, { icon: <SiLangchain />, name: 'Langchain' }, { icon: null, name: 'Agentic' }, { icon: null, name: 'Automation' }],
    design: [{ icon: <FaFigma />, name: 'Figma' }, { icon: <SiBlender />, name: 'Blender' }, { icon: <SiThreedotjs />, name: 'Three.js' }, { icon: null, name: 'Shaders' }],
  };

  return (
    <>
      <div className={`${techMono.className} bg-black`}>
        <Navbar onShowWork={handleShowWork} />
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
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 bg-black/50 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg backdrop-blur-sm select-none"
            >
              {isMobile ? 'Tap and Hold to see our work' :
                <TypeAnimation
                  sequence={[
                    'Hold [H] to see our work', 2000,
                    'Hold [S] for capabilities', 2000,
                    'Hold [T] for tech stack', 2000,
                    'Hold [C] for contact', 2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              }
            </motion.div>
          )}
        </AnimatePresence>
        <main className="relative z-10 max-w-5xl mx-auto px-6 text-white" onPointerUp={handleRelease}>
          <HeroSection longPressProps={longPressProps} />
          <Section ref={servicesRef} id="services" title="Capabilities" style={{ opacity: servicesOpacity, y: servicesY }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard icon={<FaBrain size={24} />} title="AI & Automation"><p>Custom AI agents, autonomous workflows, and intelligent automation to solve complex business problems.</p></ServiceCard>
              <ServiceCard icon={<FaServer size={24} />} title="Full-Stack Platforms"><p>Scalable web applications, company dashboards, and robust platforms built with best-in-class technology.</p></ServiceCard>
              <ServiceCard icon={<FaPalette size={24} />} title="Immersive Experiences"><p>Aesthetic-first landing pages and digital installations using 3D, motion, and shader artistry.</p></ServiceCard>
            </div>
          </Section>
          <AnimatePresence>
            {showWork && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
                onClick={handleCloseWork}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-4xl bg-black/80 border border-slate-700 rounded-lg p-8 shadow-2xl shadow-white/5 relative"
                  onClick={(e) => e.stopPropagation()} // Prevents click from closing modal
                >
                    <button onClick={handleCloseWork} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                        <FaTimes size={24} />
                    </button>
                  <h2 className="text-4xl font-bold mb-8 text-white">// Selected_Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProjectCard title="Theyala Social Platform" description="Full social media app (chat, auth, content) for NovusTales LLC, built from the ground up." />
                    <ProjectCard title="Danfe Tea AI Salesbot" description="Custom AI-powered chatbot to boost sales and engagement for a US-based tea company." />
                    <ProjectCard title="SRM Event Portal (Zoho Collab)" description="Internal platform to manage college events for SRM's CTech department." />
                    <ProjectCard title="Gameflix" description="A web-based game streaming + discovery platform, like 'Steam meets Netflix'." isComingSoon={true} />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <Section ref={techRef} id="tech" title="Technology_Stack" style={{ opacity: techOpacity, y: techY }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TechStackCard title="Frontend" techs={techStacks.frontend} />
              <TechStackCard title="Backend" techs={techStacks.backend} />
              <TechStackCard title="AI / Automation" techs={techStacks.ai} />
              <TechStackCard title="Design / 3D" techs={techStacks.design} />
            </div>
          </Section>
          <Section ref={contactRef} id="contact" title="Contact" style={{ opacity: contactOpacity, y: contactY }}>
            <p className="mb-8 max-w-xl text-lg text-slate-300">We partner with a select group of clients. If you have a serious project, we'd love to hear from you.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, textShadow: '0 0 8px #ffffff', boxShadow: '0 0 12px #ffffff' }} className="flex items-center justify-center gap-3 px-8 py-4 bg-white/90 text-black font-bold rounded-md transition-all border border-white">
                <FaWhatsapp size={24} /> Message on WhatsApp
              </motion.a>
              <motion.a href={`mailto:${EMAIL_ADDRESS}?subject=Project%20Inquiry`} whileHover={{ scale: 1.05, textShadow: '0 0 8px #ef4444', boxShadow: '0 0 12px #ef4444' }} className="flex items-center justify-center gap-3 px-8 py-4 bg-red-600/90 text-white font-bold rounded-md transition-all border border-red-600">
                <FaEnvelope size={24} /> Send an Email
              </motion.a>
            </div>
          </Section>
        </main>
      </div>
    </>
  );
}