'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import hero1 from '../../public/images/landing.jpg';
import hero2 from '../../public/images/landing1.jpg';
import hero3 from '../../public/images/landing2.jpg';
import Header from './Header';

const images = [hero1, hero2, hero3];
const centerWords = ['ELEGANCE', 'LUXURY', 'MODERN'];

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax transformations
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-70%']);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  // Fade out components during scroll
  const componentsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const componentsScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Animation detection
  const isInView = useInView(containerRef, { once: true });

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Animation variants
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

  const textBoxVariants = {
    hidden: { 
      opacity: 0, 
      x: -60,
      y: 60 
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

  const navigationVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        type: "spring" as const,
        stiffness: 200
      }
    }
  };

  // Enhanced slide variants for smoother transitions
  const slideVariants = {
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    }
  };

  const enter = (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  });

  const exit = (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 }
    }
  });


  return (
    <section>
      <Header />
      <motion.div 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Container com parallax para as imagens */}
        <div ref={heroRef} className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ 
              y: imageY,
              scale: scaleImage
            }}
            className="absolute inset-0 w-full h-[120%] -top-[20%]"
          >
            {/* Carrossel com transições melhoradas */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={images[index]}
                  alt={`Slide ${index}`}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay de transição suave */}
            <motion.div 
              className="absolute inset-0 bg-black/80 z-10"
            />
          </motion.div>

          {/* Overlay gradient fixo */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/80 z-10" />
        </div>

        {/* Conteúdo com parallax separado */}
        <motion.div
          style={{ y: contentY }}
          className="absolute inset-0 z-20"
        >
          {/* Big Center Word - Simplified with no animation */}
          <div className="absolute inset-0 flex items-center justify-center z-25">
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-primary text-center select-none pointer-events-none">
              {centerWords[index]}
            </h1>
          </div>

          {/* Texto inferior esquerdo - com fade durante scroll */}
          <motion.div 
            className="hidden absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-30 w-[90%] sm:max-w-md"
            variants={textBoxVariants}
            style={{ 
              opacity: componentsOpacity,
              scale: componentsScale
            }}
          >
            <motion.div 
              className="bg-black/40 backdrop-blur-lg p-4 sm:p-6 rounded-xl text-primary shadow-2xl text-sm sm:text-base border border-white/10"
              whileHover={{
                scale: 1.01,
                boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
                backdropFilter: "blur(25px)",
                backgroundColor: "rgba(0,0,0,0.5)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="leading-relaxed"
              >
                Crafting spaces that harmonize modern aesthetics with timeless elegance, our
                contemporary interior designs breathe life into every room, redefining the essence of
                chic living.
              </motion.p>
              
              <motion.button 
                className="mt-4 px-6 py-3 bg-black/90 text-primary font-medium rounded-lg hover:bg-white transition text-sm sm:text-base backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.95)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Mais →
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Setas de navegação - com fade durante scroll */}
          <motion.button
            onClick={prevSlide}
            className="hidden md:block absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-black/30 backdrop-blur-lg text-white rounded-full hover:bg-black/50 transition-all duration-300 border border-white/20"
            variants={navigationVariants}
            style={{ 
              opacity: componentsOpacity,
              scale: componentsScale
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: -5,
              boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
              backgroundColor: "rgba(0,0,0,0.6)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} className="sm:size-7" />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            className="hidden md:block  absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-black/30 backdrop-blur-lg text-white rounded-full hover:bg-black/50 transition-all duration-300 border border-white/20"
            variants={navigationVariants}
            style={{ 
              opacity: componentsOpacity,
              scale: componentsScale
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
              backgroundColor: "rgba(0,0,0,0.6)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} className="sm:size-7" />
          </motion.button>

          {/* Indicadores de slide - com fade durante scroll */}
          <motion.div 
            className="absolute bottom-8 right-6 sm:bottom-10 sm:right-10 flex space-x-2 z-30"
            variants={navigationVariants}
            style={{ 
              opacity: componentsOpacity,
              scale: componentsScale
            }}
          >
            {images.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;