/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Testimonial = ({ reviews = [] }) => {

  const approvedReviews = reviews.filter(review => review.featured === true)

  const [isLargeScreen, setisLargeScreen] = useState(window.innerWidth > 1024)

  useEffect(() => {
    const handleResize = () => setisLargeScreen(window.innerWidth > 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ))
  }

  return (
    <motion.div
      className='w-full px-4 sm:px-6 md:px-16 lg:px-24 xl:px-56 py-12 sm:py-16 md:py-20 lg:py-24'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className='flex flex-col items-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center'>
        <motion.h2
          className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-Zalando text-gray-900 mb-2 sm:mb-3'
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          What Our Customers Say
        </motion.h2>

        <motion.div
          className='w-12 h-1 bg-linear-to-r from-red-500 to-blue-500 rounded-full mb-4'
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        />

        <motion.p
          className='text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl'
          variants={subtitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Join thousands of satisfied customers who love our elegant collection
        </motion.p>
      </motion.div>

      {/* Swiper Section */}
      <motion.div
        className='w-full'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Swiper
          modules={[Autoplay, ...(isLargeScreen ? [Navigation] : []), Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={isLargeScreen}
          loop={true}
          className='pb-12'
        >
          {approvedReviews.map((review, index) => (
            <SwiperSlide key={review._id}>
              <motion.div
                className='bg-white border border-l-3 border-l-red-500 border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col'
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                whileHover={{ y: -5 }}
              >
                {/* Stars */}
                <div className='flex gap-1 mb-3 sm:mb-4'>
                  {renderStars(review.rating)}
                </div>

                {/* Comment */}
                <p className='text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 flex-1 leading-relaxed'>
                  "{review.comment}"
                </p>

                {/* Divider */}
                <div className='border-t border-gray-100 pt-4 sm:pt-5 mt-auto'>
                  {/* User Info */}
                  <div className='flex items-start justify-between'>
                    <div>
                      <p className='font-semibold text-gray-900 text-sm sm:text-base'>
                        {review.userName}
                      </p>
                      <p className='text-xs sm:text-sm text-gray-500 mt-1'>
                        {review.productName}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.div>
  )
}

export default Testimonial