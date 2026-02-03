/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../../assets/assets'

import { FaArrowRight } from "react-icons/fa";
import { motion } from 'framer-motion';


const SmBanners = () => {
  const banners = [
    {
      id: 1,
      image: assets.flipFlopBanner,
      title: 'Slip Into Comfort - Step Into Style',
      subtitle: 'Lightweight • Durable • Everyday Essential',
    },
    {
      id: 2,
      image: assets.seasonalSaleBanner,
      title: 'Seasonal Sale!',
      subtitle: 'Up to 40% OFF on chosen items',
    }
  ]

  const containerVariants = {
    hidden : { opacity : 0 },
    visible : {
        opacity : 1,
        transition : {
            staggerChildren : 0.2,
            delayChildren : 0.2
        }
    }
  }

  const itemVarients = {
    hidden : { opacity : 0, y : 25 },
    visible : {
        opacity : 1,
        y : 0,
        transition : {
            duration : 0.5,
            ease : 'easeOut',
        }
    } 
  }


  return (


    <div className='px-4 sm:px-6 md:px-16 lg:px-24 xl:px-56 py-12 sm:py-16 md:py-20 lg:py-24'>
      <motion.div 
        variants={containerVariants}
        initial ="hidden"
        whileInView='visible'
        viewport={{ once : false}}
        className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8'
      >
        
        {banners.map((banner) => (
          <motion.div
            variants = {itemVarients}
            key={banner.id}
            className='relative w-full h-48 sm:h-56 md:h-72 lg:h-96 rounded-xl overflow-hidden group cursor-pointer'
          >
            {/* Background Image */}
            <div
              className='absolute inset-0 w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110'
              style={{
                backgroundImage: `url(${banner.image})`
              }}
            />

            {/* Overlay */}
            <div className='absolute inset-0 w-full h-full bg-linear-to-b from-black/50 via-black/40 to-black/50 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/60 transition-all duration-300' />

            {/* Content */}
            <div className='group relative w-full h-full flex flex-col items-center gap-4 justify-center px-6 sm:px-8'>
                <div className='text-white flex flex-col items-center gap-2 text-center'>
                    <h2 className='text-xl md:text-2xl lg:text-3xl  font-Zalando font-semibold'>{banner.title}</h2>
                    <p className='font-semibold'>{banner.subtitle}</p>
                </div>

                <button className='flex items-center gap-2 text-white text-xs md:text-sm font-semibold rounded-full transition-colors duration-200 border border-gray-300 px-4 py-2 backdrop-blur '>
                    Shop Now
                    <FaArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
                </button>
            </div>


          </motion.div>
        ))}

      </motion.div>
    </div>
  )
}

export default SmBanners