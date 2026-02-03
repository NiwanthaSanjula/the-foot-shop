/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { MdSend } from 'react-icons/md'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

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
        staggerChildren: 0.15
      }
    }
  }

  const contactInfo = [
    {
      icon: <FaPhone size={24} />,
      title: "Phone",
      details: ["+94 77 123 4567", "+94 11 234 5678"],
      color: "text-blue-500"
    },
    {
      icon: <FaEnvelope size={24} />,
      title: "Email",
      details: ["info@shoestore.lk", "support@shoestore.lk"],
      color: "text-red-500"
    },
    {
      icon: <FaMapMarkerAlt size={24} />,
      title: "Address",
      details: ["123 Main Street", "Negombo, Sri Lanka"],
      color: "text-green-500"
    },
    {
      icon: <FaClock size={24} />,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
      color: "text-purple-500"
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true)
      console.log('Form submitted:', formData)
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setIsSubmitted(false)
      }, 3000)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-56 2xl:mx-auto pt-24 lg:pt-42 pb-16 min-h-screen'>
      
      {/* Hero Section */}
      <motion.div 
        className='text-center mb-16'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h1 className='text-4xl font-Zalando text-gray-700 mb-4'>
          Get In Touch
        </h1>
        <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </motion.div>

      {/* Contact Info Cards */}
      <motion.div 
        className='mb-20'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              className='bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-red-500 hover:shadow-2xl transition-shadow'
            >
              <div className={`flex justify-center mb-4 ${info.color}`}>
                {info.icon}
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>
                {info.title}
              </h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className='text-gray-600 text-sm md:text-base'>
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Form and Map Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20'>
        
        {/* Contact Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
            <h2 className='text-3xl font-Zalando font-bold text-gray-800 mb-6'>
              Send Us a Message
            </h2>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg'
              >
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>
                  Full Name *
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='John Doe'
                />
                {errors.name && (
                  <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
                )}
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2'>
                  Email Address *
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='john@example.com'
                />
                {errors.email && (
                  <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                )}
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2'>
                  Phone Number *
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='+94 77 123 4567'
                />
                {errors.phone && (
                  <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
                )}
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2'>
                  Subject *
                </label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='How can we help you?'
                />
                {errors.subject && (
                  <p className='text-red-500 text-sm mt-1'>{errors.subject}</p>
                )}
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2'>
                  Message *
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows='5'
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='Tell us more about your inquiry...'
                />
                {errors.message && (
                  <p className='text-red-500 text-sm mt-1'>{errors.message}</p>
                )}
              </div>

              <motion.button
                type='submit'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-red-500 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2'
              >
                <MdSend size={20} />
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Map and Additional Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className='space-y-6'
        >
          {/* Map */}
          <div className='bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100'>
            <div className='h-80 bg-gray-200 flex items-center justify-center'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80796023347!2d79.79609877910156!3d7.208850099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2ee9c6bb2f73b%3A0xa51626e908186f3e!2sNegombo!5e0!3m2!1sen!2slk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              />
            </div>
          </div>

          {/* FAQ Section */}
          <div className='bg-linear-to-br from-red-50 to-white rounded-2xl shadow-xl p-8 border border-red-100'>
            <h3 className='text-2xl font-Zalando font-bold text-gray-800 mb-6'>
              Quick Answers
            </h3>
            <div className='space-y-4'>
              <div>
                <h4 className='font-bold text-gray-800 mb-1'>What are your shipping options?</h4>
                <p className='text-gray-600 text-sm'>We offer standard and express delivery across Sri Lanka. Delivery times vary by location.</p>
              </div>
              <div>
                <h4 className='font-bold text-gray-800 mb-1'>Do you accept returns?</h4>
                <p className='text-gray-600 text-sm'>Yes! We accept returns within 14 days of purchase with original packaging and tags.</p>
              </div>
              <div>
                <h4 className='font-bold text-gray-800 mb-1'>How can I track my order?</h4>
                <p className='text-gray-600 text-sm'>Once shipped, you'll receive a tracking number via email and SMS.</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className='bg-gray-800 rounded-2xl shadow-xl p-8 text-white'>
            <h3 className='text-2xl font-Zalando font-bold mb-6 text-center'>
              Follow Us
            </h3>
            <div className='flex justify-center gap-6'>
              <motion.a
                href='#'
                whileHover={{ scale: 1.2, rotate: 5 }}
                className='bg-blue-600 p-4 rounded-full hover:bg-blue-700 transition-colors'
              >
                <FaFacebook size={24} />
              </motion.a>
              <motion.a
                href='#'
                whileHover={{ scale: 1.2, rotate: 5 }}
                className='bg-pink-600 p-4 rounded-full hover:bg-pink-700 transition-colors'
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a
                href='#'
                whileHover={{ scale: 1.2, rotate: 5 }}
                className='bg-blue-400 p-4 rounded-full hover:bg-blue-500 transition-colors'
              >
                <FaTwitter size={24} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}

export default ContactUs