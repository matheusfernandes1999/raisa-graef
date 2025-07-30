// src/app/components/TimelessCharm.tsx
'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// You can replace this with your actual image import
import interiorImage from '../../public/images/landing.jpg'; // Replace with your actual image path

const TimelessCharm: React.FC = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Parallax effect for the image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 1.2,
      x: -100
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: 100,
      y: 50
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        type: "spring" as const,
        stiffness: 200
      }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4 md:px-0 py-12"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Image Section */}
      <motion.div
        ref={imageRef}
        className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden order-2 md:order-1"
        variants={imageVariants}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.4 }
        }}
      >
        <motion.div
          style={{ 
            y: imageY,
            scale: imageScale
          }}
          className="absolute inset-0 w-full h-[110%] -top-[5%]"
        >
          <Image
            src={interiorImage}
            alt="Modern Style Interior"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Overlay for better image presentation */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 rounded-2xl" />
      </motion.div>

      {/* Content Section */}
      <motion.div 
        className="pr-0 md:pr-8 order-1 md:order-2"
        variants={textVariants}
      >
        <motion.h3 
          className="text-xs md:text-sm font-bold text-gray-400 tracking-widest mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          POLIFORM
        </motion.h3>
        
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold my-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Modern Style <br className="hidden md:block" />
          <span className="text-gray-700">Timeless Charm</span>
        </motion.h2>
        
        <motion.p 
          className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Discover the perfect blend of contemporary design and timeless elegance. Our curated collection transforms 
          spaces into sophisticated sanctuaries that reflect your unique style and personality.
        </motion.p>
        
        <motion.button 
          className="bg-black text-white px-6 md:px-8 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-800 transition-colors duration-300 text-sm md:text-base font-medium"
          variants={buttonVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Collection
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default TimelessCharm;