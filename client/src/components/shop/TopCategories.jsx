/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../../assets/assets'
import { delay, motion } from 'framer-motion' 
import { NavLink } from 'react-router-dom'

const MotionLink = motion(NavLink)

const categories = [
    { 
        path : '/shop?gender=men&category=sport',
        category: "Men's Sport shoes collection",
        background: assets.MensSportCollectionBg,
        floatingImage: assets.MensSportCategory,
        color: 'rgb(224, 0, 0, 0.3)'
    },
    { 
        path : '/shop?gender=women&category=sport',
        category: "Women's Sport shoes collection",
        background: assets.WomensSportCollectionBg,
        floatingImage: assets.WomensSportCategory,
        color: 'rgb(255, 0, 72, 0.3)'
    },
    { 
        path : '/shop?gender=men&category=formal',
        category: "Men's Formal shoes collection",
        background: assets.MensFormalCollectionBg,
        floatingImage: assets.MensFormalCategory,
        color: 'rgb(2, 46, 207, 0.3)'
    },
    { 
        path : '/shop?gender=women&category=party',
        category: "Women's Heels collection",
        background: assets.WomensHeelsBg,
        floatingImage: assets.HeelCategory,
        color: 'rgb(200, 33, 255, 0.3)'
    }
]

const containerVarients = {
    hidden : { opacity : 0 },
    visible : { opacity : 1 , transition : { staggerChildren : 0.2, delayChildren : 0.1}}
}

const itemVarients = {
    hidden : { opacity : 0, y : 25 },
    visible : { opacity : 1, y: 0, transition : { duration : 0.6, ease : 'easeOut', delay : 0.2}},
    
}

const headerVarients = {
    hidden : { opacity : 0, y : -20 },
    visible : { opacity : 1, y : 0, transition : { duration : 0.6, ease : 'easeOut'}}
}

const floatingImgVariants = {
    hidden: { x: -8, y: 0 },
    visible: { x: -8, y: 0 },
    hover: {
      x: 20,
      y: -30,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }
  

const TopCategories = () => {
  return (
    <div className='w-full px-4 sm:px-6 md:px-16 lg:px-24 xl:px-56 py-12 sm:py-16 md:py-20 lg:py-24'>
        
        <motion.div 
            variants={headerVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once : false}}
            className='flex flex-col items-center mb-8 sm:mb-10 md:mb-12 lg:mb-16'
        >
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-Zalando text-gray-900 mb-2 sm:mb-3 text-center'>Browse Our Top Categories</h2>
            <p className='text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-center px-2'>Find the perfect pair for every style and occasion.</p>
        </motion.div>

        <motion.div 
            className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6'
            variants = { containerVarients }
            initial = 'hidden'
            whileInView = 'visible' 
            viewport = {{ once : false}}
        >
            {categories.map((item, index) => (

                <MotionLink
                    to={item.path}
                    className='group relative flex flex-col items-center w-full' 
                    key={index}
                    
                    variants={itemVarients}
                    viewport={{ once : false}}
                    initial='hidden'
                    whileInView='visible'
                    whileHover = 'hover'
                    
                >

                    <motion.img 
                        src={item.floatingImage} 
                        alt={item.category}
                        className='w-28 sm:w-32 md:w-56 xl:w-56 2xl:w-64 absolute z-30 top-0 -right-2 sm:-right-4 md:-right-6 object-contain'
                        variants={floatingImgVariants}
                    />

                    <div className='w-full aspect-square relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden'>
                        
                        <div 
                            className='absolute w-full h-full z-20 opacity-0 group-hover:opacity-100 transition-all duration-300'
                            style={{backgroundColor : item.color}}
                        />
                        <div className='absolute w-full h-full z-10 bg-white/50'/>

                        <img 
                          src={item.background} 
                          alt={item.category}
                          className='w-full h-full object-cover group-hover:scale-110 transition-all duration-300'
                        />
                    </div>

                    <div className='flex items-center justify-center py-3 sm:py-4 md:py-5 lg:py-6 w-full px-2'>
                        <h3 className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold font-Zalando text-gray-900 text-center leading-snug'>
                          {item.category}
                        </h3>
                    </div>
                    
                </MotionLink>
            ))}
        </motion.div>
      
    </div>
  )
}

export default TopCategories