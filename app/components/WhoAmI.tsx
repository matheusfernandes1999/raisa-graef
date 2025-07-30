// src/app/components/WhoAmI.tsx
'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import portraitImage from '../../public/images/me.jpg'; // Replace with actual image

const WhoAmI: React.FC = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.2, x: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -100, y: 50 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4 md:px-0 py-8"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Image Section */}
      <motion.div
        ref={imageRef}
        className="relative h-[350px] md:h-[650px] rounded-2xl overflow-hidden order-2"
        variants={imageVariants}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.4 },
        }}
      >
        <motion.div
          style={{
            y: imageY,
            scale: imageScale,
          }}
          className="absolute inset-0 w-full h-[110%] -top-[5%]"
        >
          <Image
            src={portraitImage}
            alt="Interior Designer Portrait"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-black/20 rounded-2xl" />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="order-1 md:order-1 pr-0 md:pr-8"
        variants={textVariants}
      >
        <motion.h3
          className="text-xs md:text-sm font-bold text-gray-700 tracking-widest mb-2"
        >
          WHO AM I
        </motion.h3>

        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold my-4 leading-tight text-black">
          I'm <span className="text-accent">Raisa Gräef</span><br />
          Interior Designer
        </motion.h2>

        <motion.p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
          With over a decade of transforming living and commercial spaces, I blend functionality, elegance, and emotion in every design. Each project is an invitation to explore beauty, calm, and timeless sophistication.
        </motion.p>

        <motion.a
          href="/about"
          className="bg-black text-white px-6 md:px-8 py-3 rounded-lg inline-flex items-center gap-3 hover:bg-gray-800 transition-colors duration-300 text-sm md:text-base font-medium"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          More About Me
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default WhoAmI;
