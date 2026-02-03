/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'

import { FaStar, FaStarHalfAlt, FaRegStar, FaPlus, FaMinus } from 'react-icons/fa'
import { MdVerified, MdDone } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { CgUnavailable } from "react-icons/cg";
import { IoMdClose, IoIosWarning } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import ReviewsSection from '../../components/shop/ReviewSection';
import ProductSection from '../../components/shop/ProductSection';
import { productServices } from '../../services/productServices';
import Spinner from '../../components/common/Spinner';


const ProductDetails = () => {

  const { productId } = useParams()
  const { addToCart, globalLoading, setGlobalLoading } = useAppContext()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])

  const [mainImage, setMainImage] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [qunatity, setQunatity] = useState(1)
  const [zoom, setZoom] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Fetch Data on Mount or Id Change
  useEffect(() => {
    const fetchProductData = async () => {
      setGlobalLoading(true)
      try {
        const data = await productServices.getSingleProduct(productId)
        if (data.success) {
          setProduct(data.product)
          setRelatedProducts(data.relatedProducts)
          setMainImage(data.product.images[0])
        }

      } catch (error) {
        console.error('Failed to load product', error);
      } finally {
        setGlobalLoading(false)
      }
    }

    if (productId) {
      fetchProductData()
      scrollTo(0, 0)
      setSelectedSize(null)
      setQunatity(1)
    }
  }, [productId])

  // Loading state
  if (globalLoading) {
    return <div className='min-h-screen flex items-center justify-center'><Spinner color='text-red-500' /></div>
  }

  if (!product) {
    return <div className='min-h-screen flex items-center justify-center text-gray-500 font-bold text-xl'>Product Not Found!</div>
  }

  const selectedInventory = product?.inventory?.find(item => item.size === selectedSize)
  const availableStock = selectedInventory?.stock ?? 0

  const discountPercent = product.discountPrice
    ? Math.round(((Number(product.price) - Number(product.discountPrice)) / Number(product.price)) * 100) : 0;


  {/*=========================== MAIN IMAGE ZOOM EFFECT ========================================== */ }
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }


  /**============================ INCREASE , DECREASE QUANTITY ====================================================== */
  const increaseQtt = () => {
    if (!selectedSize) return

    setQunatity(prev => {
      if (prev >= availableStock) return prev
      return prev + 1


    })
  }
  const decreaseQtt = () => {
    setQunatity(prev => (prev > 1 ? prev - 1 : 1))
  }


  {/*============================ RENDER AVARAGE STARS IN PRODUCT DETAILS ============================ */ }
  const renderAvgStart = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const halfStars = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className='text-yellow-400' />)

      } else if (i === fullStars && halfStars) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />)

      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />)
      }
    }

    return stars
  }

  return (
    <>
      <div className='px-6 md:px-16 lg:24 xl:px-32 2xl:px-56 pt-24 lg:pt-38 pb-16 min-h-screen'>

        <div className='flex flex-col lg:flex-row items-start justify-between gap-12'>

          {/* ================ IMAGES =============== */}
          <div className='flex flex-col 2xl:flex-row gap-4 lg:sticky lg:top-36 self-start'>



            {/**MAIN IMAGE */}
            <div
              className='relative aspect-square md:w-lg 2xl:w-2xl flex items-center justify-center shadow-xl overflow-hidden cursor-zoom-in'
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}

            >
              {
                product.discountPrice &&
                <span className='absolute top-0 left-0 bg-red-500 z-20 w-fit h-fit px-4 m-4 text-white font-bold text-xl rounded-md shadow-lg'>
                  -{discountPercent}% OFF
                </span>
              }

              <img
                src={mainImage}
                alt="main-image"
                className={` w-full h-full object-cover transition-transform duration-200
                                ${zoom ? 'scale-150' : 'scale-100'} `}
                style={{
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                }}

              />
            </div>

            {/**SUB IMAGES */}
            <div className=' w-20 h-20 md:w-28 md:h-28 xl:w-32 lg:h-32 2xl:w-40 2xl:h-40 flex flex-row 2xl:flex-col items-center gap-2'>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`image` + index + 1}
                  className={`shadow-lg cursor-pointer w-full h-full object-cover border  
                                    ${mainImage === img ? 'border-red-500' : 'border-gray-200'}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>


          { /* ========= DETAILS =============*/}
          <div className='flex flex-col gap-4'>
            <div>
              <span className='px-2 py-1 bg-red-500 text-white w-fit rounded font-Zalando font-semibold '>{product.brand}</span>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-Zalando text-gray-700 '>{product.name}</h3>
              <p className='text-sm md:text-base text-gray-500'>{product.description}</p>

              <div className='flex flex-col xl:flex-row xl:items-center  justify-between gap-2 mt-2 border-t border-gray-400 py-4'>

                <div className='flex gap-2'>
                  <p>Color : </p>
                  <div
                    className='w-5 h-5 rounded-full border'
                    style={{ backgroundColor: product.color.hex }}
                  />
                </div>

                <div className='flex text-sm md:text-base items-center gap-2'>
                  <div className='flex gap-1'>
                    {renderAvgStart(product.rating)}
                  </div>

                  <div className='flex items-center gap-4'>
                    <p className='font-bold'>{product.rating.toFixed(1)}</p>
                    <p className='text-gray-700'>({product.reviewsCount} Reviews)</p>

                    <p className='bg-slate-100 text-gray-600 font-semibold px-2 py-0.5 rounded'>{product.salesCount} Sold</p>
                  </div>
                </div>
              </div>

            </div>

            {/*======================== Prices ======================== */}
            <div className='px-4 py-2 bg-red-50 border border-red-300 rounded-lg flex flex-col'>
              {product.discountPrice ? (
                <div className='flex flex-col items-start gap-4'>
                  <div className='flex gap-5'>
                    <p
                      className='text-2xl md:3xl font-Zalando font-medium text-red-500 '
                      whileHover={{ scale: 1.1 }}
                    >
                      $ {Number(product.discountPrice).toFixed(2)}
                    </p>

                    <p className='text-xl md:xl font-Zalando text-gray-600 line-through'>
                      $ {Number(product.price).toFixed(2)}
                    </p>
                  </div>

                  <p className='text-white text-sm md:text-base bg-green-500 px-2 py-0.5 rounded'>{discountPercent}% OFF</p>

                </div>
              ) : (
                <p className='text-2xl md:text-3xl font-Zalando font-medium text-red-500'>${product.price}</p>
              )}
            </div>




            <div className='grid grid-cols-2 gap-4'>
              {Object.entries(product.specs).map(([key, spec]) => (
                <div className='text-sm flex flex-col lg:flex-row lg:gap-2 p-2 bg-white border rounded-lg border-gray-200 border-l-3 shadow-md border-l-red-500'>
                  <p className='font-bold'>{key.toUpperCase()} : </p>
                  <p>{spec}</p>
                </div>
              ))}
            </div>


            <div className='py-4 grid gap-2 text-xs sm:text-sm md:text-base'>
              <div className='rounded-lg px-4 py-2 flex items-center gap-2 shadow-md border border-gray-200'>
                <MdVerified size={36} className='text-green-500' />

                <p className='flex flex-col '>
                  <span className='font-bold text-gray-500'> Warranty :</span>
                  14 Day Easy Returns & Size Exchanges.Return & Exchange Policy
                </p>
              </div>

              <div className='rounded-lg px-4 py-2 flex items-center gap-2 shadow-md border border-gray-200'>
                <TbTruckDelivery size={36} className='text-green-500' />
                <p className='flex flex-col'>
                  <span className='font-bold text-gray-500'> Delivery : </span>
                  Estimated 1-3 Working Days within Colombo & Suburbs. 3-5 Working Days Outstation.
                </p>

              </div>
            </div>

            {/** ================= Sizes ============================ */}
            <div className='flex flex-col items-start gap-4'>
              <div className='flex items-center justify-between w-full md:w-fit gap-4 py-4 h-10 '>
                <h3 className='text-xl font-medium text-gray-600 font-Zalando'>CHOOSE SIZE</h3>

                {selectedSize &&
                  <button
                    className='text-xs md:text-sm px-2 py-0.5 flex items-center rounded border border-red-500 hover:bg-red-200 active:bg-red-500 active:text-white cursor-pointer'
                    onClick={() => setSelectedSize(null)}
                  >
                    <IoMdClose size={18} />
                    Clear
                  </button>
                }

              </div>
              <div className=''>
                {product.inventory.map((item, index) => (
                  item.stock > 0 ? (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(item.size)}
                      className={`px-3 py-1 md:px-4 md:py-2 font-bold text-lg border-2  mx-1 rounded cursor-pointer transition-all duration-200
                                      ${selectedSize === item.size
                          ? 'border-red-500 text-white bg-red-500'
                          : 'border-red-500 hover:bg-red-200 '}
                                      `}
                    >
                      {item.size}
                    </button>
                  ) : (
                    <button
                      disabled
                      key={index}
                      className='px-3 py-1 md:px-4 md:py-2 relative font-bold text-lg border-2 border-gray-400 mx-1 rounded'
                    >
                      <CgUnavailable size={48} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 ' />
                      {item.size}
                    </button>
                  )
                ))}
              </div>
            </div>

            <div className='text-green-500 font-bold'>
              {selectedSize && <p>{availableStock} Items In stock</p>}

            </div>


            {/*======================= Quantity Selection ================= */}
            <div className='py-4'>
              <div className='flex items-center border border-gray-300 rounded shadow-md w-fit px-3 py-2'>
                <button
                  disabled={!selectedSize}
                  onClick={() => decreaseQtt()}
                  className={`p-3 rounded shadow transition-colors 
                              ${!selectedSize ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer hover:bg-gray-400 active:bg-red-500 active:text-white '} `}
                >
                  <FaMinus size={16} />
                </button>

                <div className={`px-4 min-w-16 py-1 text-xl md:text-2xl flex items-center justify-center ${!selectedSize ? 'text-gray-300' : 'text-gray-700'} `}>
                  <span>{qunatity}</span>
                </div>

                <button
                  disabled={!selectedSize}
                  onClick={() => increaseQtt()}
                  className={`p-3 rounded shadow transition-colors 
                    ${!selectedSize ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer hover:bg-gray-400 active:bg-red-500 active:text-white '} `}
                >
                  <FaPlus size={16} />
                </button>
              </div>
            </div>

            <div className='h-8'>
              {selectedSize ? (
                <div className='flex items-center text-sm font-medium justify-center gap-2 px-4 py-1 text-center text-green-600 bg-green-100 border border-green-400 rounded-md animate-pulse'>
                  <div className='flex items-center gap-0.5'>
                    <MdDone size={18} />
                    <p>Size {selectedSize}</p>
                  </div>

                  <div className='flex items-center gap-0.5'>
                    <GoDotFill /> <p>{qunatity} item(s)</p>
                  </div>
                </div>
              ) : (
                <div className='border flex items-center justify-center gap-2 border-amber-500 rounded bg-amber-100 text-sm px-4 py-1 animate-pulse '>
                  <IoIosWarning size={18} className='text-amber-600' />
                  <p>Please select a size to continue</p>
                </div>
              )
              }
            </div>

            <div className='flex gap-2'>
              <button
                disabled={!selectedSize}
                className={`px-8 py-3 w-full text-white shadow-md font-bold rounded-md  transition-colors 
                          ${!selectedSize ? 'bg-gray-300 cursor-not-allowed ' : 'bg-red-500 hover:bg-red-600 cursor-pointer'}`}
                onClick={() => {
                  addToCart(product, qunatity, selectedSize); console.log(selectedSize);
                }}
              >
                Add to Cart
              </button>

              <button
                disabled={!selectedSize}
                className={`px-8 py-3 w-full text-white shadow-md font-bold rounded-md  transition-colors 
                        ${!selectedSize ? 'bg-gray-300 cursor-not-allowed ' : 'bg-gray-700 hover:bg-gray-900 cursor-pointer'}`}
              >
                Checkout
              </button>
            </div>

          </div>

        </div>

        {/*================ REVIEWS SECTION ==================== */}
        <ReviewsSection />

      </div>

      {/* =============== RELATED PRODUCTS ==================== */}
      <ProductSection
        title={'You May Also Like'}
        subtitle={'Explore styles crafted with the same attention to detail'}
        products={relatedProducts}
        maxItems={5}
      />
    </>

  )
}

export default ProductDetails
