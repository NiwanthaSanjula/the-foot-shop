/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { assets } from '../../assets/assets';

// --- MOCK DATA FOR SLIDES ---
const slides = [
  {
    id: 1,
    // Mobile: Vertical/Portrait Image
    mobileImg: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", 
    // Desktop: Horizontal/Landscape Image
    desktopImg: assets.HeroBanner1, 
    subtitle: "New Arrivals",
    title: "Run The Future",
    description: "Engineered for speed, designed for comfort. Experience the next generation of running.",
    cta: "Shop Sport"
  },
  {
    id: 2,
    mobileImg: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=800&auto=format&fit=crop",
    desktopImg: assets.HeroBanner2,
    subtitle: "Premium Collection",
    title: "Urban Elegance",
    description: "Step into luxury with our hand-crafted leather series. Perfect for the modern gentleman.",
    cta: "Shop Formal"
  },
  {
    id: 3,
    mobileImg: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
    desktopImg: assets.HeroBanner4,
    subtitle: "Limited Edition",
    title: "Street Style",
    description: "Bold colors and unique designs. Stand out from the crowd with our exclusive drops.",
    cta: "Shop Casual"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      
      {/* --- SLIDESHOW WRAPPER --- */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={current} // Key is crucial for triggering animation on change
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }} // Start slightly zoomed in
          animate={{ opacity: 1, scale: 1 }}    // Zoom out to normal
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }} // Smooth fade transition
        >
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* DESKTOP IMAGE (Hidden on mobile) */}
          <img 
            src={slides[current].desktopImg} 
            alt={slides[current].title}
            className="hidden md:block w-full h-full object-cover object-center"
          />
          
          {/* MOBILE IMAGE (Hidden on desktop) */}
          <img 
            src={slides[current].mobileImg} 
            alt={slides[current].title}
            className="block md:hidden w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* --- TEXT CONTENT --- */}
      <div className="absolute inset-0 z-20 flex items-center justify-center md:justify-start">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full">
          
          {/* Text Animation Stagger */}
          <AnimatePresence mode='wait'>
            <motion.div 
              key={current}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
                },
                exit: { opacity: 0, x: -30, transition: { duration: 0.2 } }
              }}
              className="text-center md:text-left max-w-xl"
            >
              
              {/* Subtitle */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center justify-center md:justify-start gap-2 mb-4"
              >
                <span className="w-8 h-0.5 bg-red-500 inline-block"/>
                <span className="text-red-500 font-bold uppercase font-Zalando tracking-widest text-sm md:text-base">
                  {slides[current].subtitle}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-wide font-BebasNeue text-white mb-6 leading-tight"
              >
                {slides[current].title}
              </motion.h1>

              {/* Description */}
              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-gray-200 text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed font-RobotoCondensed"
              >
                {slides[current].description}
              </motion.p>

              {/* CTA Button */}
              <motion.button 
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto md:mx-0 hover:bg-gray-100 transition-colors shadow-lg"
              >
                {slides[current].cta}
                <FaArrowRight className="text-sm" />
              </motion.button>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- NAVIGATION ARROWS (Hidden on very small screens) --- */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 md:p-4 rounded-full backdrop-blur-sm transition-all hidden sm:block group"
      >
        <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 md:p-4 rounded-full backdrop-blur-sm transition-all hidden sm:block group"
      >
        <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* --- DOTS INDICATOR --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index 
              ? "bg-red-500 w-8" 
              : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

    </div>
  )
}

export default Hero;