/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Hero from '../../components/shop/Hero'
import StoreFeatures from '../../components/shop/StoreFeatures'
import TopCategories from '../../components/shop/TopCategories'
import ProductSection from '../../components/shop/ProductSection'
import { productsData, reviews } from '../../assets/assets'
import { isNew } from '../../utils/ProductUtils'
import HeelsBanner from '../../components/shop/HeelsBanner'
import Testimonial from '../../components/shop/Testimonial'
import SmBanners from '../../components/shop/SmBanners'
import { useAppContext } from '../../context/AppContext'
import { productServices } from '../../services/productServices'

const Home = () => {

  const { globalLoading, setGlobalLoading } = useAppContext()

  const [newArrivals, setNewArrivals] = useState([])
  const [topSelling, setTopSelling] = useState([])
  const [heels, setHeels] = useState([])

  useEffect(() => {
    const fetchHomeData = async () => {

      setGlobalLoading(true)
      try {
        const newArrivalsData = productServices.getShopProducts({ limit: 8, sort: 'newest' })
        const topSellingData = productServices.getShopProducts({ limit: 8, tags: 'top-selling' })
        const heelsData = productServices.getShopProducts({ limit: 4, gender: 'Women', subCategory: 'Heels' })

        // Run all requests at once for speed
        const [newRes, topRes, heelRes] = await Promise.all([newArrivalsData, topSellingData, heelsData])

        if (newRes.success) setNewArrivals(newRes.products)
        if (topRes.success) setTopSelling(topRes.products)
        if (heelRes.success) setHeels(heelRes.products)

      } catch (error) {
        console.error("Failed to load home data", error)
      } finally {
        setGlobalLoading(false)
      }
    }
    fetchHomeData()
  }, [])

  return (
    <div className=''>
      <Hero />
      <StoreFeatures />
      <TopCategories />
      <ProductSection
        title={'New Arrivals'}
        subtitle={'Discover our most popular styles, loved by customers for their comfort and design.'}
        products={newArrivals}
      />
      <ProductSection
        title={'Top Selling'}
        subtitle={'Discover our most popular styles, loved by customers for their comfort and design.'}
        products={topSelling}
      />
      <HeelsBanner />
      <ProductSection
        title={''}
        subtitle={''}
        products={heels}
      />
      <Testimonial reviews={reviews} />
      <SmBanners />
    </div>
  )
}

export default Home
