/* eslint-disable no-unused-vars */
import React from 'react'
import { delay, motion, scale } from 'framer-motion'
import { assets } from '../../assets/assets'

const HeelsBanner = () => {

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.5 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  }

  const backgroundVarients = {
    hidden : { opacity : 0, scale : 1.2 },
    visible : {
      opacity :1,
      scale :  1,
      transition :{
        duration : 0.8,
        delay :0.4,
        ease : 'easeOut'
      }
    }
  }

  return (
    <div className='py-8 sm:py-12 md:py-16 lg:py-20'>
      <motion.div 
        className='relative w-full h-64 sm:h-80 md:h-96 lg:h-[75vh]'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <div className='absolute inset-0 w-full h-full object-cover object-center z-0 overflow-hidden'>
          <motion.img 
            src={assets.heelsBanner} alt=""
            variants={backgroundVarients}
            initial = "hidden"
            whileInView = "visible"
            viewport ={{ once : false}}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Overlay */}
        <motion.div
          className='absolute inset-0 w-full h-full bg-black/20 z-10'
          variants={overlayVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        />

        {/* Floating Image - Responsive */}
        <motion.div
          className='hidden sm:hidden md:block absolute z-10 right-8 xl:right-16 2xl:right-24 -top-12 sm:-top-16 md:-top-20 lg:-top-24 w-48 sm:w-56 md:w-56 lg:w-72'
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          animate="animate"
        >
          <motion.img
            src={assets.HeelCategory}
            alt="Heel Category"
            className='w-full h-auto drop-shadow-2xl'
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            viewport={{ once: false }}
          />
        </motion.div>

        {/* Content Container */}
        <motion.div
          className='relative w-full h-full z-20 flex flex-col gap-2 sm:gap-3 md:gap-4 items-center justify-center px-4'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {/* Title */}
          <motion.h2
            className='text-white font-Zalando font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center'
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Step Up Your Style
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className='text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl'
            variants={subtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Step into elegance and style with our latest collection of heels.
          </motion.p>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default HeelsBanner