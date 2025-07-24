'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaBrain, FaServer, FaPalette, FaReact, FaNodeJs, FaFigma, FaTimes } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFirebase, SiSupabase, SiMongodb, SiOpenai, SiLangchain, SiBlender, SiThreedotjs, SiExpress } from 'react-icons/si';

// --- Reusable UI Components ---

// Using React.forwardRef to pass the ref to the underlying motion.section
const Section = React.forwardRef<HTMLElement, { id: string; title: string; children: React.ReactNode; style: any }>(
  ({ id, title, children, style }, ref) => {
    return (
      <motion.section ref={ref} id={id} className="min-h-screen py-24 space-y-12" style={style}>
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
      <div className="text-white text-2xl">{icon}</div>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
    </div>
    <div className="text-slate-400 space-y-2">{children}</div>
  </motion.div>
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
            {tech.icon && <div className="text-xl">{tech.icon}</div>}
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

// --- Main Work Content Component ---

export const WorkContent = ({ onClose }: { onClose: () => void }) => {
  const containerRef = useRef(null); // Ref for the popup's scrollable container
  const servicesRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // useScroll is now safe. It uses the `container` option to track scrolling
  // within the popup itself, not the main window.
  const { scrollYProgress: servicesScroll } = useScroll({ container: containerRef, target: servicesRef, offset: ['start end', 'end start'] });
  const servicesOpacity = useTransform(servicesScroll, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const servicesY = useTransform(servicesScroll, [0.2, 0.5], ['50px', '0px']);

  const { scrollYProgress: techScroll } = useScroll({ container: containerRef, target: techRef, offset: ['start end', 'end start'] });
  const techOpacity = useTransform(techScroll, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const techY = useTransform(techScroll, [0.2, 0.5], ['50px', '0px']);

  const { scrollYProgress: contactScroll } = useScroll({ container: containerRef, target: contactRef, offset: ['start end', 'end start'] });
  const contactOpacity = useTransform(contactScroll, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const contactY = useTransform(contactScroll, [0.2, 0.5], ['50px', '0px']);

  // --- Data ---
  const WHATSAPP_NUMBER = '1234567890';
  const EMAIL_ADDRESS = 'hello@teamcreators.com';
  const whatsappMessage = encodeURIComponent('Hi! I have a project inquiry.');

  const techStacks = {
    frontend: [{ icon: <SiNextdotjs />, name: 'Next.js' }, { icon: <FaReact />, name: 'React' }, { icon: <SiTailwindcss />, name: 'Tailwind' }, { icon: <SiTypescript />, name: 'TypeScript' }],
    backend: [{ icon: <FaNodeJs />, name: 'Node.js' }, { icon: <SiExpress />, name: 'Express' }, { icon: <SiFirebase />, name: 'Firebase' }, { icon: <SiSupabase />, name: 'Supabase' }, { icon: <SiMongodb />, name: 'MongoDB' }],
    ai: [{ icon: <SiOpenai />, name: 'OpenAI' }, { icon: <SiLangchain />, name: 'Langchain' }, { icon: null, name: 'Agentic AI' }, { icon: null, name: 'Automation' }],
    design: [{ icon: <FaFigma />, name: 'Figma' }, { icon: <SiBlender />, name: 'Blender' }, { icon: <SiThreedotjs />, name: 'Three.js' }, { icon: null, name: 'Shaders' }],
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 overflow-y-auto p-4 md:p-10"
    >
        <div className="max-w-5xl mx-auto relative">
            <button
                onClick={onClose}
                className="fixed top-6 right-6 text-white text-4xl hover:text-red-500 transition-colors z-50"
                aria-label="Close work popup"
            >
                <FaTimes />
            </button>
            <h2 className="text-4xl font-bold mb-8 text-white mt-12 md:mt-0">Our Work & Expertise</h2>

            <Section ref={servicesRef} id="services" title="Services" style={{ opacity: servicesOpacity, y: servicesY }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ServiceCard icon={<FaBrain />} title="AI Integration">Building AI-powered tools and chatbots for your brand.</ServiceCard>
                    <ServiceCard icon={<FaServer />} title="Backend Systems">Robust backend APIs and cloud infrastructure setup.</ServiceCard>
                    <ServiceCard icon={<FaPalette />} title="UI/UX Design">Pixel-perfect and responsive user interfaces.</ServiceCard>
                    <ServiceCard icon={<FaReact />} title="Frontend Development">Modern React and Next.js web apps with animations.</ServiceCard>
                </div>
            </Section>

            <Section ref={techRef} id="tech" title="Tech Stack" style={{ opacity: techOpacity, y: techY }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <TechStackCard title="Frontend" techs={techStacks.frontend} />
                    <TechStackCard title="Backend" techs={techStacks.backend} />
                    <TechStackCard title="AI" techs={techStacks.ai} />
                    <TechStackCard title="Design & 3D" techs={techStacks.design} />
                </div>
            </Section>

            <Section ref={contactRef} id="contact" title="Contact" style={{ opacity: contactOpacity, y: contactY }}>
                <div className="flex flex-col max-w-lg gap-4 text-slate-300">
                    <p>
                    Reach out to us anytime for your product needs. We're excited to help your brand shine online.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700 transition-colors">
                          <FaWhatsapp /> WhatsApp Chat
                      </a>
                      <a href={`mailto:${EMAIL_ADDRESS}`} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors">
                          <FaEnvelope /> Send Email
                      </a>
                    </div>
                </div>
            </Section>
        </div>
    </motion.div>
  );
};