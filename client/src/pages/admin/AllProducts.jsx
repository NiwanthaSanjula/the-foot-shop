/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FaSearch, FaTrash, FaChevronLeft, FaChevronRight, FaEllipsisV } from 'react-icons/fa'
import { productServices } from '../../services/productServices'
import Spinner from '../../components/common/Spinner'
import toast from 'react-hot-toast'
import { FormHeader, FormSection } from '../../components/admin/FormComponents'

const CATEGORIES = ["All", "Formal", "Casual", "Sports", "Outdoor", "Sandals & Slippers", "Archived"]

const AllProducts = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    // Filters
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    const [categoryOptions, setCategoryOptions] = useState(["All"])

    // Pagination State
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [openMenu, setOpenMenu] = useState(null) // Track open menu
    const limit = 10

    const fetchFilters = async () => {
        try {
            const data = await productServices.getFilters()
            if (data.success) {
                const categoryNames = data.filters.category || []
                setCategoryOptions(['All', ...categoryNames, 'Archived'])
            }

        } catch (error) {
            console.error(error)
        }
    }

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const data = await productServices.getAllProducts({
                search,
                category,
                page,
                limit
            })

            if (data.success) {
                setProducts(data.products)
                setTotalPages(data.pagination.pages)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    // Reset Page on Filter Change
    useEffect(() => {
        setPage(1)
    }, [category, search])

    // Fetch on Page/Filter Change
    useEffect(() => {
        fetchProducts()
    }, [page, category])

    useEffect(() => {
        fetchFilters()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        setPage(1)
        fetchProducts()
    }

    const handleToggleStatus = async (id) => {
        try {
            // Optimistic Update (Immediate UI feedback)
            setProducts(prev => prev.map(p =>
                p._id === id ? { ...p, isActive: !p.isActive } : p
            ))

            const response = await productServices.toggleStatus(id)
            if (response.success) {
                toast.success(response.message)
                setOpenMenu(null)
            } else {
                fetchProducts()
            }
        } catch (error) {
            toast.error(error.message)
            fetchProducts()
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Move this product to Archive?")) return
        try {
            const response = await productServices.deleteProduct(id)
            if (response.success) {
                toast.success(response.message)
                fetchProducts()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='max-w-7xl mx-auto pb-10'>
            <FormHeader title="All Products" subtitle="Manage your inventory" />

            <div className='flex flex-col gap-4'>
                {/* === FILTERS BAR === */}
                <FormSection>
                    <div className='flex flex-col lg:flex-row gap-2 lg:gap-0 items-center  lg:justify-between'>
                        {/* Search Input */}
                        <form onSubmit={handleSearch} className='relative w-full md:w-96'>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className='w-full bg-gray-700 text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-600 focus:ring-red-500 focus:border-red-500 outline-none transition-all'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        </form>

                        {/* Category Dropdown */}
                        <div className='w-full md:w-auto'>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full md:w-auto bg-gray-700 text-white px-4 py-2.5 rounded-lg border border-gray-600 outline-none cursor-pointer hover:bg-gray-600 transition-colors'
                            >
                                {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>
                </FormSection>

                {/* === PRODUCT LIST === */}
                <FormSection>

                    {loading ? (
                        <div className='flex-1 flex flex-col justify-center items-center gap-2'>
                            <Spinner />
                            <p className='text-gray-400 text-sm animate-pulse'>Loading Inventory...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className='flex-1 flex flex-col justify-center items-center text-gray-400'>
                            <div className='text-5xl mb-4'>📦</div>
                            <p>No products found.</p>
                            <button onClick={() => { setSearch(''); setCategory('All') }} className='mt-2 text-red-400 hover:underline text-sm'>Clear Filters</button>
                        </div>
                    ) : (
                        <>
                            {/* ===== DESKTOP TABLE VIEW ===== */}
                            <div className='hidden lg:block overflow-x-auto w-full'>
                                <table className='w-full text-left border-collapse'>
                                    <thead className='bg-gray-750 text-gray-300 uppercase text-xs tracking-wider border-b border-gray-700'>
                                        <tr>
                                            <th className='p-4 font-semibold'>Product</th>
                                            <th className='p-4 font-semibold'>Category</th>
                                            <th className='p-4 font-semibold'>Price</th>
                                            <th className='p-4 text-center font-semibold'>Availability</th>
                                            <th className='p-4 text-right font-semibold'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-sm text-gray-200 divide-y divide-gray-700 '>
                                        {products.map((product) => (
                                            <tr key={product._id} className='hover:bg-gray-700/50 transition-colors duration-150'>

                                                {/* Product Info */}
                                                <td className='p-4'>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-12 h-12 rounded-lg bg-gray-700 overflow-hidden shrink-0 border border-gray-600'>
                                                            <img src={product.images[0]} alt={product.name} className='w-full h-full object-cover' />
                                                        </div>
                                                        <div>
                                                            <div className='font-medium text-white line-clamp-1'>{product.name}</div>
                                                            <div className='text-xs text-gray-500 font-mono mt-0.5'>{product.sku}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Category */}
                                                <td className='p-4'>
                                                    <div className='inline-flex flex-col'>
                                                        <span className='px-2 py-0.5 rounded text-xs bg-gray-700 border border-gray-600 w-fit'>
                                                            {product.category}
                                                        </span>
                                                        {product.subCategory && (
                                                            <span className='text-xs text-gray-500 mt-1 pl-1'>↳ {product.subCategory}</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Price */}
                                                <td className='p-4 font-medium font-mono'>
                                                    ${product.price}
                                                </td>

                                                {/* Status Toggle Switch */}
                                                <td className='p-4 text-center'>
                                                    <button
                                                        onClick={() => handleToggleStatus(product._id)}
                                                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${product.isActive ? 'bg-green-500' : 'bg-gray-600'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${product.isActive ? 'translate-x-5' : 'translate-x-0'
                                                                }`}
                                                        />
                                                    </button>
                                                    <div className='text-[10px] text-gray-500 mt-1'>
                                                        {product.isActive ? 'Visible' : 'Hidden'}
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className='p-4 text-right'>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className='p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors group relative'
                                                    >
                                                        <FaTrash size={16} />
                                                        <span className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap'>Archive</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* ===== MOBILE CARD VIEW ===== */}
                            <div className='lg:hidden flex flex-col divide-y divide-gray-700 p-4'>
                                {products.map((product) => (
                                    <div key={product._id} className='py-4 first:pt-0 last:pb-0'>

                                        {/* Product Header */}
                                        <div className='flex items-start justify-between gap-3 mb-3'>
                                            <div className='flex items-center gap-3 flex-1'>
                                                <div className='w-12 h-12 rounded-lg bg-gray-700 overflow-hidden shrink-0 border border-gray-600'>
                                                    <img src={product.images[0]} alt={product.name} className='w-full h-full object-cover' />
                                                </div>
                                                <div className='flex-1 min-w-0'>
                                                    <div className='font-medium text-white line-clamp-1'>{product.name}</div>
                                                    <div className='text-xs text-gray-500 font-mono mt-1'>{product.sku}</div>
                                                </div>
                                            </div>

                                            {/* Menu Button */}
                                            <div className='relative'>
                                                <button
                                                    onClick={() => setOpenMenu(openMenu === product._id ? null : product._id)}
                                                    className='p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white'
                                                >
                                                    <FaEllipsisV size={16} />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {openMenu === product._id && (
                                                    <div className='absolute right-0 top-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 min-w-48'>

                                                        {/* Toggle Status */}
                                                        <button
                                                            onClick={() => handleToggleStatus(product._id)}
                                                            className='w-full text-left px-4 py-3 text-sm hover:bg-gray-600 transition-colors text-gray-200 border-b border-gray-600 flex items-center justify-between'
                                                        >
                                                            <span>{product.isActive ? 'Hide Product' : 'Show Product'}</span>
                                                            <div className={`relative w-8 h-5 rounded-full transition-colors ${product.isActive ? 'bg-green-500' : 'bg-gray-600'
                                                                }`}>
                                                                <span
                                                                    className={`absolute left-0.5 top-1 bg-white w-3 h-3 rounded-full transition-transform ${product.isActive ? 'translate-x-3' : 'translate-x-0'
                                                                        }`}
                                                                />
                                                            </div>
                                                        </button>

                                                        {/* Delete/Archive */}
                                                        {category !== 'Archived' && (
                                                            <button
                                                                onClick={() => {
                                                                    handleDelete(product._id)
                                                                    setOpenMenu(null)
                                                                }}
                                                                className='w-full text-left px-4 py-3 text-sm hover:bg-gray-600 transition-colors text-red-400 flex items-center gap-2'
                                                            >
                                                                <FaTrash size={14} />
                                                                Archive Product
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className='grid grid-cols-2 gap-3 text-sm'>
                                            <div>
                                                <span className='text-gray-500 text-xs'>Category</span>
                                                <div className='text-white font-medium'>{product.category}</div>
                                                {product.subCategory && (
                                                    <div className='text-xs text-gray-400 mt-0.5'>↳ {product.subCategory}</div>
                                                )}
                                            </div>
                                            <div>
                                                <span className='text-gray-500 text-xs'>Price</span>
                                                <div className='text-white font-mono font-medium'>${product.price}</div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>

                            {/* === PAGINATION FOOTER === */}
                            <div className='mt-auto p-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-800/50'>
                                <span className='text-sm text-gray-400'>
                                    Showing Page <span className='text-white font-medium'>{page}</span> of <span className='text-white font-medium'>{totalPages}</span>
                                </span>

                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                        disabled={page === 1}
                                        className='px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm font-medium'
                                    >
                                        <FaChevronLeft size={12} /> Previous
                                    </button>
                                    <button
                                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={page === totalPages}
                                        className='px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm font-medium'
                                    >
                                        Next <FaChevronRight size={12} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </FormSection>
            </div>
        </div>
    )
}

export default AllProducts