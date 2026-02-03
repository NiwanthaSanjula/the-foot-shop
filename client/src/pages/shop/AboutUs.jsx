/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { FaShippingFast, FaAward, FaUsers, FaHeart } from 'react-icons/fa'
import { MdVerified, MdSupportAgent } from 'react-icons/md'
import { GiRunningShoe } from 'react-icons/gi'

const AboutUs = () => {
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  const values = [
    {
      icon: <FaAward size={40} />,
      title: "Quality First",
      description: "We source only the finest footwear from trusted brands worldwide, ensuring every pair meets our high standards."
    },
    {
      icon: <FaUsers size={40} />,
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We're committed to providing exceptional service and support at every step."
    },
    {
      icon: <MdVerified size={40} />,
      title: "Authenticity Guaranteed",
      description: "Every shoe in our collection is 100% authentic. We stand behind the quality and origin of every product."
    },
    {
      icon: <FaShippingFast size={40} />,
      title: "Fast Delivery",
      description: "Get your shoes delivered quickly with our reliable shipping partners. Track your order every step of the way."
    }
  ]

  const stats = [
    { number: 50, label: "Happy Customers", suffix: "K+" },
    { number: 500, label: "Shoe Brands", suffix: "+" },
    { number: 10, label: "Products", suffix: "K+" },
    { number: 4.8, label: "Average Rating", suffix: "", isDecimal: true }
  ]

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-56 2xl:mx-auto pt-24 lg:pt-42 pb-16 min-h-screen'>
      
      {/* Hero Section */}
      <motion.div 
        className='text-center mb-16'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.div 
          className='flex justify-center mb-6'
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <GiRunningShoe size={80} className='text-red-500' />
        </motion.div>
        
        <h1 className='text-4xl font-Zalando  text-gray-700 mb-4'>
          About Our Store
        </h1>
        <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
          Your trusted destination for premium footwear since day one
        </p>
      </motion.div>

      {/* Story Section */}
      <motion.div 
        className='mb-20'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className='bg-linear-to-br from-red-50 to-white rounded-2xl shadow-xl p-8 md:p-12 border border-red-100'>
          <h2 className='text-3xl md:text-4xl font-Zalando text-gray-700 mb-6'>
            Our Story
          </h2>
          <div className='space-y-4 text-gray-700 text-base md:text-lg leading-relaxed'>
            <p>
              Founded with a passion for footwear and fashion, our shoe store has grown from a small local shop to a trusted online destination for shoe enthusiasts across the country. We believe that the right pair of shoes can transform not just your outfit, but your entire day.
            </p>
            <p>
              Our journey began with a simple mission: to make premium, authentic footwear accessible to everyone. We've carefully curated a collection that spans from timeless classics to the latest trends, ensuring there's a perfect pair for every style, occasion, and budget.
            </p>
            <p>
              Today, we're proud to serve thousands of satisfied customers, offering an extensive range of shoes from world-renowned brands. Our commitment to quality, authenticity, and customer satisfaction remains at the heart of everything we do.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className='mb-20'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
          {stats.map((stat, index) => (
            <AnimatedStatCard key={index} stat={stat} />
          ))}
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div 
        className='mb-20'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={staggerContainer}
      >
        <h2 className='text-3xl md:text-4xl font-Zalando text-gray-700 text-center mb-12'>
          Our Values
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ scale: 1.03 }}
              className='bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500 hover:shadow-2xl transition-shadow'
            >
              <div className='flex items-start gap-4'>
                <div className='text-red-500 shrink-0'>
                  {value.icon}
                </div>
                <div>
                  <h3 className='text-xl md:text-2xl font-bold text-gray-800 mb-3'>
                    {value.title}
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div 
        className='mb-20'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className='bg-gray-700 text-white rounded-2xl shadow-2xl p-8 md:p-12'>
          <h2 className='text-3xl md:text-4xl font-Zalando mb-8 text-center'>
            Why Choose Us?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <motion.div 
              className='text-center'
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex justify-center mb-4'>
                <div className='bg-red-500 p-4 rounded-full'>
                  <MdVerified size={32} />
                </div>
              </div>
              <h3 className='text-xl font-bold mb-3'>100% Authentic</h3>
              <p className='text-gray-300'>
                Every product is verified and sourced directly from authorized distributors
              </p>
            </motion.div>

            <motion.div 
              className='text-center'
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex justify-center mb-4'>
                <div className='bg-red-500 p-4 rounded-full'>
                  <FaHeart size={32} />
                </div>
              </div>
              <h3 className='text-xl font-bold mb-3'>14-Day Returns</h3>
              <p className='text-gray-300'>
                Not satisfied? Easy returns and exchanges within 14 days of purchase
              </p>
            </motion.div>

            <motion.div 
              className='text-center'
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex justify-center mb-4'>
                <div className='bg-red-500 p-4 rounded-full'>
                  <MdSupportAgent size={32} />
                </div>
              </div>
              <h3 className='text-xl font-bold mb-3'>24/7 Support</h3>
              <p className='text-gray-300'>
                Our customer service team is always ready to help you with any questions
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className='text-center'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className='bg-linear-to-r from-red-500 to-red-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white'>
          <h2 className='text-3xl md:text-4xl font-Zalando mb-4'>
            Ready to Find Your Perfect Pair?
          </h2>
          <p className='text-lg md:text-xl mb-8 opacity-90'>
            Explore our collection and step into comfort and style
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-white text-red-500 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-shadow'
          >
            Shop Now
          </motion.button>
        </div>
      </motion.div>

    </div>
  )
}

// Animated Counter Component using Framer Motion
const AnimatedStatCard = ({ stat }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100
  })
  
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (isInView) {
      motionValue.set(stat.number)
    }
  }, [isInView, motionValue, stat.number])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (stat.isDecimal) {
        setDisplayValue(latest.toFixed(1))
      } else {
        setDisplayValue(Math.floor(latest).toString())
      }
    })

    return unsubscribe
  }, [springValue, stat.isDecimal])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className='bg-white rounded-xl shadow-lg p-6 text-center border-2 border-gray-100 hover:border-red-500 transition-colors'
    >
      <h3 className='text-3xl md:text-4xl font-bold text-red-500 mb-2'>
        {displayValue}{stat.suffix}
      </h3>
      <p className='text-gray-600 font-medium'>{stat.label}</p>
    </motion.div>
  )
}

export default AboutUs