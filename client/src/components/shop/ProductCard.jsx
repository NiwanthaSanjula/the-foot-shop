/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion';
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { isNew } from '../../utils/ProductUtils';

import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const ProductCard = ({product, index = 0}) => {

    const { navigate } = useAppContext()

    const rating = product.rating;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const discountPercentage = product?.discountPrice != null ? Math.round((product.price - product.discountPrice) / product.price * 100) : null

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                delay: 0.1,
                ease: "easeOut"
            }
        }
    }

    const hoverVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.02, transition: { duration: 0.2 } }
    }

    const imageVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.08, transition: { duration: 0.3 } }
    }

    const badgeVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, delay: index * 0.1 + 0.1 }
        }
    }

    return (
        <Link 
            to={`/product/${product._id}`} 
            className='cursor-pointer'
            onClick={() => scrollTo(0, 0)}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: false }}
                className='shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full bg-white hover:shadow-xl transition-shadow'
            >
                {/* Image Container - Responsive Height */}
                <motion.div 
                    className='w-full aspect-square relative overflow-hidden bg-gray-100'
                    variants={hoverVariants}
                    initial="rest"
                    whileHover="hover"
                    viewport={{ once: false }}
                >
                    {/* Badges */}
                    <div className='absolute top-2 left-2 flex gap-2 items-center z-10 flex-wrap'>
                        {product.discountPrice && (
                            <motion.span
                                variants={badgeVariants}
                                className='px-2 sm:px-3 py-0.5 rounded bg-red-500 text-white text-xs sm:text-sm font-semibold w-fit'
                            >
                                -{discountPercentage}%
                            </motion.span>
                        )}

                        {isNew(product.createdAt) && (
                            <motion.span
                                variants={badgeVariants}
                                className='px-2 sm:px-3 py-0.5 bg-blue-500 text-white rounded text-xs sm:text-sm font-semibold'
                            >
                                NEW
                            </motion.span>
                        )}
                    </div>

                    {/* Image */}
                    <motion.img
                        src={product.images[0]}
                        alt={product.name}
                        className='w-full h-full'
                        variants={imageVariants}
                    />
                </motion.div>

                {/* Content Container - Fixed Layout */}
                <div className='flex flex-col gap-2 sm:gap-3 w-full px-3 sm:px-4 py-3 flex-1 bg-gray-100 rounded-lg'>

                    {/* Brand & Category */}
                    <motion.div
                        className='flex items-center gap-2 sm:gap-3 font-BebasNeue text-xs sm:text-sm text-white flex-wrap'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        viewport={{ once: false }}
                    >
                        <p className='bg-gray-400 w-fit px-2 sm:px-3 py-0.5 rounded'>
                            {product.brand}
                        </p>
                        <span className='bg-gray-400 px-2 sm:px-3 py-0.5 rounded'>
                            {product.subCategory}
                        </span>
                    </motion.div>

                    {/* Product Name - Fixed Height */}
                    <motion.h3
                        className='text-sm sm:text-base md:text-lg text-gray-800 h-10 sm:h-12 line-clamp-2 font-semibold'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.25 }}
                        viewport={{ once: false }}
                    >
                        {product.name}
                    </motion.h3>

                    {/* Color */}
                    <motion.div
                        className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                    >
                        <p className='text-gray-600'>Color:</p>
                        <motion.div
                            className='border-2 border-gray-300 w-4 h-4 sm:w-5 sm:h-5 rounded-full'
                            style={{ backgroundColor: product.color.hex }}
                            whileHover={{ scale: 1.3 }}
                        />
                    </motion.div>

                    {/* Rating Section */}
                    <motion.div
                        className='flex items-center justify-between w-full'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.1 + 0.35 }}
                    >
                        <div className='flex items-center gap-0.5'>
                            {[...Array(5)].map((_, i) => {
                                if (i < fullStars) {
                                    return <FaStar size={12} key={i} className='text-yellow-400 sm:w-4 sm:h-4'/>
                                }
                                if (i === fullStars && hasHalfStar) {
                                    return <FaRegStarHalfStroke size={12} key={i} className='text-yellow-400 sm:w-4 sm:h-4' />
                                }
                                return <FaStar size={12} key={i} className='text-gray-300 sm:w-4 sm:h-4' />
                            })}
                        </div>

                        <div className='flex gap-0.5 sm:gap-1 font-semibold text-gray-700 text-xs sm:text-sm'>
                            <span>{product.rating}</span>
                            <span>({product.reviewsCount})</span>
                        </div>
                    </motion.div>

                    {/* Spacer */}
                    <div className='flex-1'></div>

                    {/* Price Section */}
                    <motion.div
                        className='flex gap-1 sm:gap-2 w-full border-t border-red-300 pt-2 sm:pt-3'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                    >
                        {product.discountPrice ? (
                            <>
                                <motion.p
                                    className='text-lg sm:text-xl font-medium text-red-500 '
                                    whileHover={{ scale: 1.1 }}
                                >
                                    ${product.discountPrice}
                                </motion.p>
                                <p className='text-sm sm:text-base text-gray-600 line-through'>
                                    ${product.price}
                                </p>
                            </>
                        ) : (
                            <p className='text-lg sm:text-xl font-medium'>${product.price}</p>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    )
}

export default ProductCard