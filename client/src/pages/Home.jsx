import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import adaniGrowth from "../components/images/adani growth.jpg";
import utthanProject from "../components/images/utthanproject.jpg";
import utthanGrp from "../components/images/utthangrp.jpg";

const images = [adaniGrowth, utthanProject, utthanGrp];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mouse interaction setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms for different layers
  // We use a safe fallback for window dimensions or just arbitrary ranges since we update mouseX/Y with client coordinates
  const moveX1 = useTransform(springX, [0, 2000], [-50, 50]);
  const moveY1 = useTransform(springY, [0, 2000], [-50, 50]);

  const moveX2 = useTransform(springX, [0, 2000], [50, -50]);
  const moveY2 = useTransform(springY, [0, 2000], [50, -50]);

  const moveX3 = useTransform(springX, [0, 2000], [-25, 25]);
  const moveY3 = useTransform(springY, [0, 2000], [-25, 25]);

  function handleMouseMove({ clientX, clientY }) {
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center bg-slate-900 py-8 md:py-16 px-4 overflow-hidden"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
      />

      {/* 3D Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Deep Purple Orb - Interactive */}
        <motion.div
          style={{ x: moveX1, y: moveY1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#82298B] rounded-full mix-blend-screen filter blur-[120px]"
        />

        {/* Royal Blue Orb - Interactive */}
        <motion.div
          style={{ x: moveX2, y: moveY2 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#2B3E8E] rounded-full mix-blend-screen filter blur-[120px]"
        />

        {/* Cyan/Light Blue Orb - Interactive */}
        <motion.div
          style={{ x: moveX3, y: moveY3 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px]"
        />

        {/* Pink Accent Orb - Interactive */}
        <motion.div
          style={{ x: moveX2, y: moveY1 }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-[10%] right-[30%] w-[45vw] h-[45vw] bg-pink-600 rounded-full mix-blend-screen filter blur-[120px]"
        />
      </div>

      {/* Header with Gradient Text and 3D Effect */}
      <motion.div
        initial={{ opacity: 0, y: -50, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative text-center mb-8 md:mb-12 z-10"
        style={{ perspective: "1000px" }}
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100 drop-shadow-2xl tracking-tight"
        >
          Welcome to Utthan
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 w-32 md:w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-100 text-base md:text-lg lg:text-xl mt-4 md:mt-6 drop-shadow-lg max-w-3xl mx-auto font-light"
        >
          A CSR Initiative of Adani Electricity and Adani Foundation.
        </motion.p>
      </motion.div>

      {/* 3D Buttons with Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12 md:mb-20 w-full max-w-md px-4 z-10"
        style={{ perspective: "1000px" }}
      >
        <motion.a
          href="/examination"
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex-1 flex items-center justify-center bg-white/95 backdrop-blur-sm text-[#82298B] px-6 md:px-8 py-4 rounded-2xl shadow-2xl font-bold text-lg overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="relative z-10 whitespace-nowrap">Explore Dashboard</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#82298B]/20 to-[#2B3E8E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.a>

        <motion.a
          href="/about"
          whileHover={{
            scale: 1.05,
            rotateY: -5,
            boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex-1 flex items-center justify-center bg-white/10 backdrop-blur-md border-2 border-white/50 text-white px-6 md:px-8 py-4 rounded-2xl shadow-2xl font-bold text-lg overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="relative z-10 whitespace-nowrap">Learn More</span>
          <motion.div
            className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.a>
      </motion.div>

      {/* 3D Carousel with Enhanced Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 100 }}
        className="relative w-full max-w-6xl z-10"
        style={{ perspective: "2000px" }}
      >
        <motion.div
          whileHover={{ scale: 1.02, rotateY: 2 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-2xl md:rounded-3xl overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-[3px] md:p-[4px]">
            <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/30 to-slate-800/20 backdrop-blur-sm">

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Slide ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 1.1, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-scale-down"
                />
              </AnimatePresence>

              {/* Gradient Overlay for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Enhanced Carousel Indicators */}
              <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 md:gap-4 z-20">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative rounded-full transition-all duration-300 ${index === currentIndex
                      ? "w-10 md:w-12 h-3 md:h-3.5 bg-white shadow-lg shadow-white/50"
                      : "w-3 md:h-3.5 h-3 bg-white/60 hover:bg-white/80"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index === currentIndex && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Shadow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-2xl -z-10 rounded-3xl" />
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute w-2 h-2 bg-white/40 rounded-full blur-sm"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}
    </section>
  );
}
