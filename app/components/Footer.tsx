// src/app/components/Footer.tsx
'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

// Replace with your actual image import
import footerImage from '../../public/images/landing2.jpg';

const Footer: React.FC = () => {
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
        staggerChildren: 0.2
      }
    }
  };

  const leftContentVariants = {
    hidden: { 
      opacity: 0, 
      x: -80,
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

  const rightContentVariants = {
    hidden: { 
      opacity: 0, 
      x: 80,
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

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const socialItemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300 }
    }
  };

  const contactItems = [
    { icon: Phone, text: "+55 (11) 99999-9999", href: "tel:+5511999999999" },
    { icon: Mail, text: "contato@poliform.com.br", href: "mailto:contato@poliform.com.br" },
    { icon: MapPin, text: "São Paulo, Brasil", href: "#" }
  ];

  const socialIcons = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
  ];

  return (
    <motion.footer 
      ref={containerRef}
      className="bg-gradient-to-br bg-black text-white p-6 md:p-12 lg:p-16 mt-12"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Content */}
        <motion.div 
          className="space-y-8"
          variants={leftContentVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Engage with us in{' '}
            <span className="text-accent">Conversation.</span>
          </motion.h2>

          {/* Contact Information */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.p 
              className="text-lg font-semibold text-gray-300 mb-4"
              whileHover={{ color: "#ffffff", x: 5 }}
            >
              Fale Conosco
            </motion.p>
            
            <div className="space-y-4">
              {contactItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="p-2 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon size={16} />
                  </motion.div>
                  <span className="text-sm md:text-base">{item.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.p 
              className="text-lg font-semibold text-gray-300"
              whileHover={{ color: "#ffffff", x: 5 }}
            >
              Redes Sociais
            </motion.p>
            
            <motion.div 
              className="flex gap-4"
              variants={socialVariants}
            >
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300 group"
                  variants={socialItemVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    boxShadow: "0 10px 25px rgba(255,255,255,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} className="group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          className="flex flex-col justify-between items-start lg:items-end space-y-8"
          variants={rightContentVariants}
        >
          {/* Image */}
          <motion.div
            ref={imageRef}
            className="relative w-full h-48 md:h-64 lg:h-72 rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 15 }}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ 
              scale: 1.02,
              rotateY: -2,
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
                src={footerImage}
                alt="Poliform Interior Design"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300" />
            
            {/* Floating badge */}
            <motion.div
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Premium Design
            </motion.div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            className="w-full lg:text-right"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h3 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider bg-gradient-to-r bg-primary bg-clip-text text-transparent"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              Raisa Gräef
            </motion.h3>
            <motion.div
              className="w-0 h-1 bg-gradient-to-r bg-primary mt-2 lg:ml-auto"
              animate={isInView ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.p 
          className="text-gray-400 text-sm"
          whileHover={{ color: "#ffffff" }}
        >
          © 2024 Poliform. Todos os direitos reservados.
        </motion.p>
        <motion.div 
          className="flex gap-6 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {['Privacidade', 'Termos', 'Cookies'].map((item, index) => (
            <motion.a
              key={item}
              href="#"
              className="hover:text-white transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;