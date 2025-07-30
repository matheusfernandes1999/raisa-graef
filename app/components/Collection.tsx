// src/app/components/Collection.tsx
'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Replace these with your actual image imports
import img1 from '../../public/images/landing.jpg';
import img2 from '../../public/images/landing1.jpg';
import img3 from '../../public/images/landing2.jpg';

// Collection data with real images
const collectionData = [
  { name: "Mondrian", image: img1, span: "row-span-2" },
  { name: "Arles", image: img2, span: "" },
  { name: "Brera", image: img3, span: "row-span-2" },
  { name: "Nirnia", image: img1, span: "" },
  { name: "Aleo Pro", image: img2, span: "" },
  { name: "Viunins", image: img3, span: "" }
];

const CollectionItem: React.FC<{ 
  name: string; 
  image: any; 
  className?: string; 
  index: number;
}> = ({ name, image, className = '', index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden text-primary group cursor-pointer ${className}`}
      initial={{ 
        opacity: 0, 
        scale: 0.8,
        y: 60
      }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1,
        y: 0
      } : { 
        opacity: 0, 
        scale: 0.8,
        y: 60
      }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0 w-full h-[110%] -top-[5%]"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-300" />
      
      {/* Content */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
      >
        <motion.h4 
          className="font-bold text-lg md:text-xl lg:text-2xl transform transition-transform duration-300 group-hover:translate-y-[-2px]"
          whileHover={{ scale: 1.05 }}
        >
          {name}
        </motion.h4>
        <motion.div
          className="w-0 h-0.5 bg-white mt-2 group-hover:w-12 transition-all duration-300"
        />
      </motion.div>
    </motion.div>
  );
};

const Collection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  const dotsVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300 }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      className="px-0 md:px-0 w-full"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4"
        variants={headerVariants}
      >
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-black"
          whileHover={{ scale: 1.02 }}
        >
          Explore Our <br className="md:hidden" />
          <span className="text-accent">Proudly Collection</span>
        </motion.h2>
        
        <motion.div 
          className="flex items-center gap-4"
          variants={dotsVariants}
        >
          {/* Navigation dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((dot) => (
              <motion.button
                key={dot}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === dot ? 'bg-black scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                variants={dotVariants}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentSlide(dot)}
              />
            ))}
          </div>
          
          {/* Navigation arrows for mobile */}
          <div className="flex gap-2 md:hidden">
            <motion.button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 lg:gap-6 h-[500px] lg:h-[600px]">
        {collectionData.map((item, index) => (
          <CollectionItem
            key={item.name}
            name={item.name}
            image={item.image}
            className={item.span}
            index={index}
          />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="grid grid-cols-1 gap-4 h-[400px]">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-2 gap-4 h-full"
          >
            {collectionData.slice(currentSlide * 2, currentSlide * 2 + 2).map((item, index) => (
              <CollectionItem
                key={`${item.name}-${currentSlide}`}
                name={item.name}
                image={item.image}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Collection;