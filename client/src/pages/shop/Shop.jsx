/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import ProductCard from '../../components/shop/ProductCard'
import { useSearchParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight, FaTimes, FaFilter } from 'react-icons/fa'
import { IoIosArrowDown } from "react-icons/io";
import { productServices } from '../../services/productServices'
import Spinner from '../../components/common/Spinner'

const Shop = () => {
    // ==================== CONTEXT & ROUTING ====================
    const { searchQuery } = useAppContext();
    const [searchParams, setSearchParams] = useSearchParams();

    // ==================== STATE ====================
    const [displayProducts, setDisplayProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Dynamic Filters State (Structure matches Backend Response)
    const [filtersData, setFiltersData] = useState({
        gender: [],
        category: [],
        subCategory: [],
        brand: [],
        color: []
    });

    // Controls which sections are open (Default all open)
    const [expandedFilters, setExpandedFilters] = useState({
        gender: true,
        category: true,
        subCategory: false,
        brand: false,
        color: true
    });

    const [sortType, setSortType] = useState('newest');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // ==================== DERIVED STATE FROM URL ====================
    const activeGender = searchParams.get('gender')?.split(',') || [];
    const activeCategory = searchParams.get('category')?.split(',') || [];
    const activeSubCategory = searchParams.get('type')?.split(',') || []; // URL uses 'type'
    const activeBrand = searchParams.get('brand')?.split(',') || [];
    const activeColor = searchParams.get('color')?.split(',') || [];
    const currentPage = parseInt(searchParams.get('page')) || 1;

    const totalActiveFilters = activeGender.length + activeCategory.length + activeSubCategory.length + activeBrand.length + activeColor.length;

    // ==================== 1. FETCH FILTER OPTIONS (ON MOUNT) ====================
    useEffect(() => {
        const loadFilters = async () => {
            try {
                const data = await productServices.getFilters();
                if (data.success) {
                    setFiltersData(data.filters);
                }
            } catch (error) {
                console.error("Failed to load filters", error);
            }
        }
        loadFilters();
    }, []);

    // ==================== 2. FETCH PRODUCTS (ON FILTER CHANGE) ====================
    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Map URL params to Backend Query params
            const filters = {
                page: currentPage,
                limit: 12,
                sort: sortType,
                search: searchQuery || searchParams.get('search') || '',
                gender: searchParams.get('gender') || '',
                category: searchParams.get('category') || '',
                subCategory: searchParams.get('type') || '', // Backend expects 'subCategory', Controller maps it? 
                // NOTE: If your controller expects 'subCategory', ensure you pass it here. 
                // Based on your previous controller code, it looked for 'subCategory' in req.query.
                brand: searchParams.get('brand') || '',
                color: searchParams.get('color') || ''
            }

            const data = await productServices.getShopProducts(filters)

            if (data.success) {
                setDisplayProducts(data.products)
                setTotalPages(data.pagination.pages)
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch when any filter/sort changes
    useEffect(() => {
        fetchProducts();
        setMobileFiltersOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [searchParams, sortType, searchQuery]);


    // ==================== HANDLERS ====================
    const handlePageChange = (newPage) => {
        setSearchParams(prev => {
            const p = new URLSearchParams(prev);
            p.set('page', newPage);
            return p;
        });
    };

    const toggleFilter = (value, key) => {
        // Map internal state key to URL param key
        // We use 'subCategory' in state, but 'type' in URL
        const paramKey = key === 'subCategory' ? 'type' : key;
        const lowerValue = typeof value === 'string' ? value : value.toString();

        setSearchParams(prev => {
            const p = new URLSearchParams(prev);
            const current = p.get(paramKey)?.split(',') || [];

            let updated;
            if (current.includes(lowerValue)) {
                updated = current.filter(v => v !== lowerValue);
            } else {
                updated = [...current, lowerValue];
            }

            if (updated.length > 0) p.set(paramKey, updated.join(','));
            else p.delete(paramKey);

            p.set('page', 1); // Reset to page 1 on filter change
            return p;
        });
    };

    const resetFilters = () => {
        setSearchParams({});
        setSortType('newest');
        setMobileFiltersOpen(false);
    };

    const toggleExpand = (key) => {
        setExpandedFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // ==================== FILTER SIDEBAR COMPONENT ====================
    const FilterSidebar = ({ closeAction }) => {

        // Structure defining how to render the dynamic data
        const filterSections = [
            { key: 'gender', label: 'Gender', options: filtersData.gender },
            { key: 'category', label: 'Category', options: filtersData.category },
            { key: 'subCategory', label: 'Type', options: filtersData.subCategory },
            { key: 'brand', label: 'Brand', options: filtersData.brand },
            { key: 'color', label: 'Color', options: filtersData.color }
        ];

        return (
            <>
                {/* Header */}
                <div className='flex flex-col items-end justify-between py-4 lg:py-2 mb-4 lg:mb-0 sticky top-0 bg-white z-50'>
                    {closeAction && (
                        <button onClick={closeAction} className='lg:hidden hover:bg-gray-100 rounded mb-4'>
                            <FaTimes size={20} />
                        </button>
                    )}
                    <div className='flex items-center justify-between w-full'>
                        <span className='font-bold text-lg lg:text-base text-red-500'>FILTERS</span>
                        {totalActiveFilters > 0 &&
                            <button onClick={resetFilters} className='text-sm font-bold text-red-500 border px-2 rounded cursor-pointer'>
                                Clear
                            </button>
                        }
                    </div>
                </div>

                {/* Dynamic Sections */}
                {filterSections.map((section) => (
                    // Only render section if it has options
                    section.options && section.options.length > 0 && (
                        <div key={section.key} className='border-l-2 border-red-500 px-4 py-3 mt-4 rounded-lg shadow-sm bg-white'>
                            <button
                                onClick={() => toggleExpand(section.key)}
                                className='w-full flex justify-between items-center text-sm font-semibold uppercase text-gray-800 hover:text-red-500 transition-colors'
                            >
                                {section.label}
                                <span className={`transform transition-transform duration-300 ${expandedFilters[section.key] ? 'rotate-180' : ''}`}>
                                    <IoIosArrowDown size={18} />
                                </span>
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ${expandedFilters[section.key] ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>

                                {/* Special Render for Colors */}
                                {section.key === 'color' ? (
                                    <div className='flex flex-wrap gap-3 p-2'>
                                        {section.options.map(opt => {
                                            const isActive = activeColor.includes(opt.name);
                                            return (
                                                <button
                                                    key={opt.name}
                                                    onClick={() => toggleFilter(opt.name, 'color')}
                                                    className={`w-6 h-6 rounded-full border-2 transition-all ${isActive ? 'ring-2 ring-red-500 scale-110' : 'border-gray-300 hover:scale-105'}`}
                                                    style={{ backgroundColor: opt.hex }}
                                                    title={opt.name}
                                                />
                                            )
                                        })}
                                    </div>
                                ) : (
                                    /* Standard Checkbox List */
                                    <div className='flex flex-col gap-2.5 py-2'>
                                        {section.options.map(opt => {
                                            // Determine which active array to check against
                                            let isActive = false;
                                            if (section.key === 'gender') isActive = activeGender.includes(opt);
                                            if (section.key === 'category') isActive = activeCategory.includes(opt);
                                            if (section.key === 'subCategory') isActive = activeSubCategory.includes(opt);
                                            if (section.key === 'brand') isActive = activeBrand.includes(opt);

                                            return (
                                                <label key={opt} className='flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors text-sm'>
                                                    <input
                                                        type="checkbox"
                                                        checked={isActive}
                                                        onChange={() => toggleFilter(opt, section.key)}
                                                        className='w-4 h-4 accent-red-500 cursor-pointer'
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                ))}
            </>
        );
    }

    // ==================== MAIN RENDER ====================
    return (
        <div className='px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-56 pt-25 md:pt-25 lg:pt-32 xl:pt-42 pb-10 min-h-screen bg-gray-50'>

            {/* Mobile Filter Button */}
            <div className='lg:hidden flex justify-between items-center mb-6 gap-2'>
                <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className='flex items-center gap-2 px-4 py-2.5 border border-red-300 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors'
                >
                    <FaFilter className='text-red-500' size={16} />
                    Filters {totalActiveFilters > 0 && <span className='bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold'>{totalActiveFilters}</span>}
                </button>
            </div>

            <div className='flex flex-col lg:flex-row gap-8'>

                {/* Desktop Sidebar */}
                <div className='hidden lg:block w-60 xl:w-72'>
                    <div className='border border-gray-200 rounded-lg shadow-md px-4 py-3 h-fit sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide bg-white'>
                        <FilterSidebar />
                    </div>
                </div>

                {/* Mobile Sidebar Modal */}
                {mobileFiltersOpen && (
                    <>
                        <div className='fixed inset-0 bg-black/50 z-30 lg:hidden' onClick={() => setMobileFiltersOpen(false)} />
                        <div className='fixed inset-0 z-40 lg:hidden overflow-hidden flex items-end sm:items-center justify-center'>
                            <div className='w-full sm:w-96 max-h-[90vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-y-auto scrollbar-hide animate-in slide-in-from-bottom duration-300'>
                                <div className='p-6 sm:p-8'>
                                    <FilterSidebar closeAction={() => setMobileFiltersOpen(false)} />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Products Area */}
                <div className='flex-1 w-full'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
                        <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 uppercase'>
                            {activeGender.length > 0 ? `${activeGender[0]} Collection` : 'All Products'}
                        </h3>
                        <select
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value)}
                            className='w-full sm:w-auto border-2 border-gray-300 text-sm px-3 py-2.5 rounded-lg cursor-pointer outline-none bg-white hover:border-red-500 transition-colors font-medium'
                        >
                            <option value="newest">Sort: Newest</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 gap-y-6'>
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className='h-64 bg-gray-200 animate-pulse rounded-lg' />
                            ))}
                        </div>
                    ) : displayProducts.length > 0 ? (
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 gap-y-6 mb-8'>
                            {displayProducts.map((product) => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                        </div>
                    ) : (
                        <div className='col-span-full flex flex-col items-center justify-center py-20 text-gray-500'>
                            <p className='text-lg font-semibold mb-2'>No Products Found</p>
                            <button onClick={resetFilters} className='text-red-500 hover:underline'>Reset Filters</button>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className='flex justify-center items-center gap-2 sm:gap-4 mt-10'>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className='p-2.5 rounded border hover:bg-gray-100 disabled:opacity-50'
                            >
                                <FaChevronLeft />
                            </button>

                            <div className='flex gap-1.5 sm:gap-2 overflow-x-auto max-w-xs sm:max-w-none scrollbar-hide'>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 shrink-0 flex items-center justify-center rounded border font-bold text-sm transition-all ${currentPage === page
                                            ? 'bg-red-500 text-white border-red-500 shadow-md'
                                            : 'hover:bg-gray-100 hover:border-gray-400 border-gray-300'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className='p-2.5 rounded border hover:bg-gray-100 disabled:opacity-50'
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;