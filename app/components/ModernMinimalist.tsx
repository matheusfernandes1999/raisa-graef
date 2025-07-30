"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import main from "../../public/images/landing.jpg";
import chair from "../../public/images/landing2.jpg";

const ModernMinimalist = () => {
  const containerRef = useRef(null);
  const mainImageRef = useRef(null);
  const chairImageRef = useRef(null);

  const { scrollYProgress: mainScrollProgress } = useScroll({
    target: mainImageRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: chairScrollProgress } = useScroll({
    target: chairImageRef,
    offset: ["start end", "end start"],
  });

  const mainImageY = useTransform(mainScrollProgress, [0, 1], ["1%", "-55%"]);
  const chairImageY = useTransform(chairScrollProgress, [0, 1], ["5%", "-50%"]);

  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch py-20"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Imagem Principal com Título */}
      <motion.div
        className="relative col-span-1 lg:col-span-2 rounded-[40px] overflow-hidden bg-white h-[600px]"
        variants={fadeUp}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <div
          ref={mainImageRef}
          className="relative w-full h-full overflow-hidden"
        >
          <motion.div
            style={{ y: mainImageY }}
            className="absolute top-0 left-0 w-full h-[120%]"
          >
            <Image
              src={main}
              alt="Modern Living Room"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
        <div
          ref={chairImageRef}
          className="relative w-full h-full overflow-hidden"
        >
          <motion.div
            style={{ y: chairImageY }}
            className="absolute top-0 left-0 w-full h-[120%]"
          >
            <Image
              src={chair}
              alt="Best Furniture"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col justify-end bg-gradient-to-t from-black/50 via-transparent to-transparent">
          <motion.span
            className="bg-accent text-black px-4 py-1 rounded-full text-sm w-fit mb-4"
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
          >
            Gorgeous Interior
          </motion.span>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight text-primary"
            variants={fadeUp}
          >
            <motion.span className="block" variants={fadeUp}>
              Modern
            </motion.span>
            <motion.span className="block" variants={fadeUp}>
              Minimalist
            </motion.span>
          </motion.h1>
        </div>
      </motion.div>

      {/* Coluna Lateral */}
      <div className="flex flex-col gap-6">
        {/* Card Texto */}
        <motion.div
          className="bg-accent p-6 rounded-[32px] flex flex-col justify-between h-full min-h-[260px]"
          variants={fadeUp}
          whileHover={{ scale: 1.03, rotate: 1 }}
        >
          <motion.span
            className="text-xs uppercase border border-black px-3 py-1 w-fit rounded-full mb-2"
            variants={fadeUp}
            whileHover={{ backgroundColor: "#000", color: "#fff" }}
          >
            Aesthetic
          </motion.span>

          <motion.h3
            className="text-2xl sm:text-3xl font-semibold leading-snug"
            variants={fadeUp}
          >
            Into a gallery
            <br />
            of elegance
          </motion.h3>

          <motion.p className="text-sm mt-2 text-gray-700" variants={fadeUp}>
            Aesthetic furniture where every piece tells a story of style
          </motion.p>
        </motion.div>

        {/* Card Imagem com Botão */}
        <motion.div
          className="relative rounded-[32px] overflow-hidden h-full min-h-[260px]"
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
        >
          <div
            ref={chairImageRef}
            className="relative w-full h-full overflow-hidden"
          >
            <motion.div
              style={{ y: chairImageY }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <Image
                src={chair}
                alt="Best Furniture"
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-black/30 p-6 text-white flex flex-col justify-between">
            <motion.div variants={fadeUp} >
              <span className="text-xs text-primary uppercase border hover:bg-accent hover:text-black duration-300 ease-linear hover:border-accent border-primary px-3 py-1 w-fit rounded-full mb-2">
                Best Furniture
              </span>
              <h3 className="text-xl text-primary sm:text-2xl font-semibold leading-snug mt-4">
                Indulge in the artistry
                <br />
                of everyday living
              </h3>
            </motion.div>

            <motion.div
              className="self-end"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 0.5,
                delay: 1.2,
                type: "spring",
                stiffness: 200,
              }}
            >
              <motion.button
                className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 45 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUpRight size={20} />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ModernMinimalist;
