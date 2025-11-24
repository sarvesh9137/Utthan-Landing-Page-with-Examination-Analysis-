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
    <section className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-br from-[#82298B] to-[#2B3E8E] pt-10 pb-10 transition-colors duration-300">
      <h1 className="text-5xl font-bold text-white transition-colors duration-300 text-center px-4 drop-shadow-md">
        Welcome to Utthan
      </h1>

      <p className="text-gray-100 text-lg mt-4 transition-colors duration-300 text-center px-4 drop-shadow-sm">
        A CSR Initiative of Adani Electricity and Adani Foundation.
      </p>

      <div className="mt-10 flex gap-6">
        <a
          href="/examination"
          className="bg-white text-[#82298B] px-8 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition font-semibold"
        >
          Explore Dashboard
        </a>

        <a
          href="/about"
          className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl shadow-lg hover:bg-white/10 transition-colors duration-300 font-semibold"
        >
          Learn More
        </a>
      </div>

      <div className="mt-16 w-full max-w-5xl px-4">
        <div className="relative w-full h-64 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/5">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 shadow-sm ${index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
