// src/app/components/Header.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    closed: {
      opacity: 0,
      x: '100%',
      transition: { staggerChildren: 0.1, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: { y: { stiffness: 1000 } }
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-2xl font-bold tracking-wider text-primary hover:text-gray-200 transition-colors drop-shadow-lg">
              Raisa Gräef
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={item.href}
                  className="text-primary hover:text-white font-medium transition-colors relative group drop-shadow-md"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden focus:outline-none z-50"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5 w-8">
              <motion.span
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                className="block w-8 h-0.5 bg-primary drop-shadow-md"
              ></motion.span>
              <motion.span
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="block w-8 h-0.5 bg-primary drop-shadow-md"
              ></motion.span>
              <motion.span
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                className="block w-8 h-0.5 bg-primary drop-shadow-md"
              ></motion.span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-black/80 backdrop-blur-md md:hidden pt-24 px-6 z-40"
          >
            <motion.ul className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={item.href}
                    className="text-3xl font-medium text-primary hover:text-gray-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div 
              className="absolute bottom-8 left-6 right-6"
              variants={itemVariants}
            >
              <p className="text-primary text-sm">© {new Date().getFullYear()} Raisa Gräef</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;