import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import adaniGrowth from "../components/images/adani growth.jpg";
import utthanProject from "../components/images/utthanproject.jpg";
import utthanGrp from "../components/images/utthangrp.jpg";

const images = [adaniGrowth, utthanProject, utthanGrp];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#82298B] to-[#2B3E8E] py-8 md:py-16 px-4 transition-colors duration-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white transition-colors duration-300 drop-shadow-lg">
          Welcome to Utthan
        </h1>

        <p className="text-gray-100 text-base md:text-lg lg:text-xl mt-3 md:mt-4 transition-colors duration-300 drop-shadow-sm max-w-2xl mx-auto">
          A CSR Initiative of Adani Electricity and Adani Foundation.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-10 md:mb-16 w-full max-w-md px-4"
      >
        <a
          href="/examination"
          className="flex-1 text-center bg-white text-[#82298B] px-6 md:px-8 py-3 rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 font-semibold"
        >
          Explore Dashboard
        </a>

        <a
          href="/about"
          className="flex-1 text-center bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 rounded-xl shadow-lg hover:bg-white/10 hover:scale-105 transition-all duration-300 font-semibold"
        >
          Learn More
        </a>
      </motion.div>

      {/* Image Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-6xl"
      >
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white/20 backdrop-blur-sm bg-gradient-to-br from-slate-900/20 to-slate-800/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 w-full h-full object-scale-down"
            />
          </AnimatePresence>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 shadow-md ${index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
