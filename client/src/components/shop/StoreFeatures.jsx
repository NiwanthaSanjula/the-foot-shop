/* eslint-disable no-unused-vars */
import React from 'react'
import { motion} from 'framer-motion'
import { FaStar, FaTruck, FaUndoAlt, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa'

const features = [
    {
      id: 1,
      icon: FaStar,
      heading: 'Crafted for Quality',
      desc: 'We source only premium materials for long-lasting wear and performance.'
    },
    {
      id: 2,
      icon: FaTruck,
      heading: 'Fast Delivery',
      desc: 'Enjoy quick, reliable shipping always free on orders above 8000 LKR.'
    },
    {
      id: 3,
      icon: FaUndoAlt,
      heading: '7 Days Exchange',
      desc: 'Change your mind? Send it back within 7 days, no questions asked.'
    },
    {
      id: 4,
      icon: FaMoneyBillWave,
      heading: 'Cash on Delivery',
      desc: 'Pay securely with cash when your order arrives at your doorstep.'
    },
    {
      id: 5,
      icon: FaCreditCard,
      heading: 'Online Payments',
      desc: 'Secure card payments at checkout with trusted payment gateways.'
    },
]

const headerVarients = {
    hidden : { opacity : 0, y : -20 },
    visible : { opacity : 1, y : 0, transition : { duration : 0.6, ease : 'easeOut'}}
}

const containerVarients = {
    hidden : { opacity : 0 },
    visible : { opacity : 1, transition : { staggerChildren : 0.1, delayChildren : 0.2}}
}

const itemVarients = {
    hidden : { opacity : 0, y : 20 },
    visible : { opacity : 1, y: 0, transition : { duration : 0.6, ease : 'easeOut'}}
}

const iconVarients = {
    hidden : { opacity : 0, rotate : 360 },
    visible : { opacity : 1, rotate: 0, transition : { duration : 0.2, ease : 'easeOut'}}
}



const StoreFeatures = () => {
  return (
    <div 
        
        className='w-full bg-linear-to-b from-white to-gray-50 py-16 md:py-24'
    >

      <div className='px-4 sm:px-6 md:px-12 lg:px-24 xl:px-56'>

        {/* Features Grid */}
        <motion.div 
            variants={containerVarients}
            initial='hidden'
            whileInView='visible'
            viewport={{ once : false}}
            className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6'
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                variants={itemVarients}
                whileHover={{ y : -12}}
                viewport={{ once : false}}
                key={index}
                className='group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-2 lg:py-8 flex flex-row md:flex-col items-center gap-2 md:gap-0 text-center border border-gray-200'
              >
                {/* Icon Container */}
                <motion.div 
                    variants={ iconVarients }
                    whileHover={{ rotate : 360 }}
                    viewport={{ once : true }}
                    className='mb-4 p-4 bg-linear-to-br from-red-50 to-red-100 rounded-full group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300'
                >
                  <Icon size={40} className='text-red-500 group-hover:scale-110 transition-transform duration-300' />
                </motion.div>

                <div className='flex flex-col items-start md:items-center'>
                  {/* Heading */}
                  <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-red-500 transition-colors duration-300'>
                    {feature.heading}
                  </h3>

                  {/* Description */}
                  <p className='text-gray-600 text-sm md:text-base lg:leading-relaxed text-left md:text-center'>
                    {feature.desc}
                  </p>
                </div>


                {/* Decorative line */}
                <div className='mt-4 h-1 w-0 bg-linear-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300' />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
      
    </div>
  )
}

export default StoreFeatures