/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

const ProductSection = ({title, subtitle, products = [], maxItems = 10}) => {

    const displayProducts = products.slice(0, maxItems);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
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

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3,
            }
        }
    }

    return (
        <motion.div
            className='px-4 sm:px-6 md:px-12 lg:px-16 xl:px-32 2xl:px-56 py-8 sm:py-12 md:py-16 lg:py-20'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={containerVariants}
        >
            {/* Header Section */}
            {title && subtitle && <motion.div
                className='flex flex-col items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12'
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
            >
                <motion.h2
                    className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-Zalando text-gray-900 mb-2 sm:mb-3 text-center px-2'
                    variants={titleVariants}
                >
                    {title}
                </motion.h2>

                <motion.div
                    className='w-12 h-1 bg-linear-to-r from-red-500 to-blue-500 rounded-full mb-4'
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: false }}
                />

                <motion.p
                    className='text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto text-center px-2'
                    variants={subtitleVariants}
                >
                    {subtitle}
                </motion.p>
            </motion.div>}

            {/* Responsive Grid with Animations */}
            <motion.div
                className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6'
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
            >
                {displayProducts.map((product, index) => (
                    <ProductCard product={product} key={product._id} index={index} />
                ))}
            </motion.div>
        </motion.div>
    )
}

export default ProductSection