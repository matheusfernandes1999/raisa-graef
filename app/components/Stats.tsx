// src/app/components/Stats.tsx
'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatItem: React.FC<{ value: string; label: string; index: number }> = ({ value, label, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="bg-accent rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-xs"
      initial={{ 
        opacity: 0, 
        scale: 0.2,
        y: 0
      }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1,
        y: 0
      } : { 
        opacity: 0, 
        scale: 0.5,
        y: 100
      }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.p 
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.2 + 0.3,
          ease: "easeOut"
        }}
      >
        {value}
      </motion.p>
      <motion.p 
        className="text-gray-500 text-sm mt-1"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.2 + 0.5,
          ease: "easeOut"
        }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      className="py-8 sm:py-12 w-full"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="flex flex-wrap justify-center sm:justify-around items-center gap-4 sm:gap-6 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <StatItem value="500+" label="Projects" index={0} />
        <StatItem value="20+" label="Awards" index={1} />
        <StatItem value="50+" label="Years" index={2} />
        <StatItem value="1st" label="Choice" index={3} />
      </motion.div>
    </motion.section>
  );
};

export default Stats;