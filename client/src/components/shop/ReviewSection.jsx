import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

// FAKE REVIEWS DATA - Replace with real data later
const fakeReviews = [
  {
    _id: '1',
    author: 'John Doe',
    rating: 5,
    comment: 'These shoes are absolutely amazing. The comfort level is outstanding and the material quality is top-notch. Highly recommend to anyone looking for formal shoes.',
    date: '2024-01-10'
  },
  {
    _id: '2',
    author: 'Sarah Smith',
    rating: 4,
    comment: 'Good quality shoes with excellent comfort. They fit perfectly and look elegant. Only minor issue with the sole which could be slightly better.',
    date: '2024-01-08'
  },
  {
    _id: '3',
    author: 'Michael Johnson',
    rating: 5,
    comment: 'I have been using these shoes for 2 months now and they still look brand new. The leather quality is premium and they are very durable.',
    date: '2024-01-05'
  },
  {
    _id: '4',
    author: 'Emma Wilson',
    rating: 4,
    comment: 'Perfect for office wear. The design is modern and elegant. Delivery was fast and packaging was excellent.',
    date: '2024-01-02'
  },
  {
    _id: '5',
    author: 'David Brown',
    rating: 3,
    comment: 'The shoes are decent quality but a bit tight initially. After wearing for a week they became comfortable. Overall satisfied with the purchase.',
    date: '2023-12-28'
  }
]

const ReviewsSection = ({ productId }) => {
  const navigate = useNavigate()
  const [reviews, setReviews] = useState(fakeReviews)
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    rating: 5,
    comment: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    
    if (!formData.author || !formData.email || !formData.comment) {
      alert('Please fill in all fields')
      return
    }

    const newReview = {
      _id: Date.now().toString(),
      author: formData.author,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString().split('T')[0]
    }

    setReviews([newReview, ...reviews])
    setFormData({
      author: '',
      email: '',
      rating: 5,
      comment: ''
    })
  }

  const renderStars = (rating) => {
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

  const ratingDistribution = [
    { stars: 5, count: reviews.filter(r => r.rating === 5).length },
    { stars: 4, count: reviews.filter(r => r.rating === 4).length },
    { stars: 3, count: reviews.filter(r => r.rating === 3).length },
    { stars: 2, count: reviews.filter(r => r.rating === 2).length },
    { stars: 1, count: reviews.filter(r => r.rating === 1).length }
  ]

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className='mx-auto mt-20 pt-20 mb-8 border-t max-w-7xl border-gray-200'>
      
      {/* REVIEWS HEADER */}
      <div className='mb-12'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-Zalando font-medium text-center text-gray-700 mb-2'>What Customers Are Saying</h2>
        <p className='text-gray-600 text-center'>See what customers think about this product</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>

        {/* LEFT SIDE - RATING OVERVIEW */}
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200 sticky top-24'>
            
            {/* AVERAGE RATING */}
            <div className='mb-8 text-center'>
              <p className='text-4xl font-bold font-Zalando text-gray-700 mb-2'>{averageRating}</p>
              <div className='flex justify-center gap-1 mb-2'>
                {renderStars(parseFloat(averageRating))}
              </div>
              <p className='text-gray-600'>Based on {reviews.length} reviews</p>
            </div>

            {/* RATING DISTRIBUTION */}
            <div className='space-y-4'>
              <p className='font-bold text-gray-900 mb-4'>Rating Breakdown</p>
              {ratingDistribution.reverse().map((item) => (
                <div key={item.stars} className='flex items-center gap-3'>
                  <div className='flex gap-1 w-12'>
                    {[...Array(item.stars)].map((_, i) => (
                      <FaStar key={i} className='text-yellow-400 text-sm' />
                    ))}
                  </div>
                  <div className='flex-1 bg-gray-200 h-2 rounded-full overflow-hidden'>
                    <div 
                      className='bg-yellow-400 h-full rounded-full'
                      style={{ width: `${(item.count / reviews.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className='text-gray-600 text-sm w-6 text-right'>{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM & REVIEWS */}
        <div className='lg:col-span-2'>

          {/* REVIEW FORM */}
          <div className='bg-white rounded-2xl p-4 shadow-lg border border-gray-200 mb-12'>
            <h3 className='text-2xl font-Zalando text-gray-900 mb-6'>Share Your Review</h3>
            
            <form onSubmit={handleSubmitReview} className='space-y-4'>
              
              {/* NAME & EMAIL */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input
                  type='text'
                  name='author'
                  placeholder='Your Name'
                  value={formData.author}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                  required
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Your Email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                  required
                />
              </div>

              {/* RATING SELECTOR */}
              <div>
                <label className='block text-gray-700 font-semibold mb-3'>Rating</label>
                <div className='flex gap-2'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type='button'
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className='transition transform hover:scale-125'
                    >
                      {formData.rating >= star ? (
                        <FaStar size={32} className='text-yellow-400' />
                      ) : (
                        <FaRegStar size={32} className='text-gray-300' />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* COMMENT */}
              <textarea
                name='comment'
                placeholder='Share your experience with this product...'
                value={formData.comment}
                onChange={handleInputChange}
                rows='5'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none'
                required
              ></textarea>

              {/* SUBMIT BUTTON */}
              <button
                type='submit'
                className='w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition duration-200 active:scale-95'
              >
                Submit Review
              </button>

              {/* VIEW ALL REVIEWS BUTTON */}
              <button
                type='button'
                onClick={() => navigate(`/reviews/${productId}`)}
                className='w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition duration-200 active:scale-95'
              >
                View All Reviews →
              </button>
            </form>
          </div>

          {/* REVIEWS LIST */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl md:text-2xl font-Zalando text-gray-900'>Latest Reviews</h3>
              <button
                onClick={() => navigate(`/reviews/${productId}`)}
                className='text-red-500 font-semibold hover:text-red-600 transition'
              >
                View All →
              </button>
            </div>
            
            {reviews.length === 0 ? (
              <p className='text-gray-500 text-center py-8'>No reviews yet. Be the first to review!</p>
            ) : (
              reviews.slice(0, 5).map((review) => (
                <div key={review._id} className='bg-white rounded-2xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition'>
                  
                  {/* REVIEW HEADER */}
                  <div className='flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3 mb-3 border-b pb-3 border-gray-400'>
                    <p className='font-bold text-gray-900'>{review.author}</p>
                    <div className='flex gap-1'>
                      {renderStars(review.rating)}
                    </div>
                    <span className='text-sm text-gray-500'>{new Date(review.date).toLocaleDateString()}</span>
                  </div>

                  {/* REVIEW CONTENT */}
                  <p className='text-gray-700 leading-relaxed'>{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewsSection