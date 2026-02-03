/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt,  FaClock } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { assets } from '../../assets/assets'


const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const linkHoverVariants = {
    rest: { color: '#d1d5db' },
    hover: { color: '#ef4444', transition: { duration: 0.2 } }
  }

  const socialVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  }

  const subscribeVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  }

  return (
    <motion.footer
      className='bg-linear-to-b from-gray-900 to-gray-950 text-gray-200'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={containerVariants}
    >
      {/* Newsletter Section */}
      <motion.div
        className='border-b border-red-500 px-6 sm:px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-56 py-8 sm:py-10 md:py-12'
        variants={itemVariants}
      >
        <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
          <motion.div className='flex-1' variants={itemVariants}>
            <h3 className='text-2xl sm:text-3xl md:text-4xl font-Zalando font-semibold text-red-500 mb-2'>
              STAY IN STYLE
            </h3>
            <p className='text-gray-400 text-sm sm:text-base'>
              Be the first to know about new arrivals, exclusive deals & special promotions.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubscribe}
            className='w-full lg:w-auto flex flex-col sm:flex-row'
            variants={subscribeVariants}
            whileHover="hover"
            initial="rest"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className='px-4 py-3 flex-1 bg-white text-gray-900 focus:outline-none text-sm sm:text-base rounded-tl-md rounded-bl-md'
              required
            />
            <motion.button
              type="submit"
              className='px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200 whitespace-nowrap text-sm sm:text-base rounded-tr-md rounded-br-md'
              whileHover={{ backgroundColor: '#dc2626' }}
            >
              Subscribe
            </motion.button>
          </motion.form>

          {subscribed && (
            <motion.div
              className='text-green-400 text-sm font-semibold'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              ✓ Thank you for subscribing!
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className='px-6 sm:px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-56 py-12 sm:py-14 md:py-16 lg:py-20'
        variants={containerVariants}
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10'>

          {/* Logo & Contact */}
          <motion.div variants={itemVariants} className='col-span-1'>
            <motion.img
              src={assets.footer_logo}
              alt="Footer Logo"
              className='max-w-32 sm:max-w-36 mb-8'
              whileHover={{ scale: 1.05 }}
            />

            {/* Contact Info */}
            <motion.div className='mb-8' variants={containerVariants}>
              <h4 className='text-red-500 font-bold mb-4 text-sm sm:text-base'>CONTACT US</h4>
              <div className='space-y-3 text-xs sm:text-sm'>
                {[
                  { icon: FaMapMarkerAlt, text: 'Missgoniawaya junction, Polonnaruwa rd, Dambulla, Sri Lanka' },
                  { icon: MdEmail, text: 'thefootshop.dambulla@gmail.com' },
                  { icon: FaPhone, text: '+94 66 5687 673 / +94 76 3982 136' },
                  { icon: IoLogoWhatsapp, text: '+94 76 3982 136' },
                  { icon: FaClock, text: '08:00-18:00, Mon - Sun' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className='flex items-start gap-3'
                    variants={itemVariants}
                  >
                    <item.icon size={16} className='text-red-500 shrink-0 mt-1' />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div variants={itemVariants}>
              <h4 className='text-red-500 font-bold mb-4 text-sm sm:text-base'>FOLLOW US</h4>
              <div className='flex gap-4'>
                {[
                  { white: assets.facebook_icon_white, red: assets.facebook_icon_red },
                  { white: assets.instagram_icon_white, red: assets.instagram_icon_red },
                  { white: assets.tiktok_icon_white, red: assets.tiktok_icon_red }
                ].map((social, idx) => (
                  <motion.button
                    key={idx}
                    className='w-10 h-10 group rounded-full flex items-center justify-center transition-colors duration-200'
                    variants={socialVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <img src={social.white} className='block group-hover:hidden' alt="Social Icon" />
                    <img src={social.red} className='hidden group-hover:block' alt="Social Icon Hover" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className='text-white font-bold mb-6 text-sm sm:text-base'>Quick Links</h4>
            <ul className='space-y-2 sm:space-y-3'>
              {['Home', 'FAQs', 'Return & Exchange Policy', 'Shipping Info', 'Terms & Conditions', 'Privacy Policy'].map((link, idx) => (
                <motion.li key={idx} variants={itemVariants}>
                  <motion.button
                    className='text-gray-400 text-xs sm:text-sm'
                    variants={linkHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    {link}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Account */}
          <motion.div variants={itemVariants}>
            <h4 className='text-white font-bold mb-6 text-sm sm:text-base'>Account</h4>
            <ul className='space-y-2 sm:space-y-3'>
              {['Sign In', 'View Cart', 'My Wishlist', 'Track My Order', 'Help'].map((link, idx) => (
                <motion.li key={idx} variants={itemVariants}>
                  <motion.button
                    className='text-gray-400 text-xs sm:text-sm'
                    variants={linkHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    {link}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Payment Methods */}
          <motion.div variants={itemVariants} className='col-span-1'>
            <h4 className='text-white font-bold mb-6 text-sm sm:text-base'>We Accept</h4>
            <motion.img
              src={assets.PaymentMethods}
              alt="Payment Methods"
              className='w-full sm:w-auto'
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        className='border-t border-red-500 px-6 sm:px-6 md:px-16 lg:px-24 xl:px-56 py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm'
        variants={itemVariants}
      >
        <p>©2025, The Foot Shop. All rights reserved</p>
      </motion.div>
    </motion.footer>
  )
}

export default Footer