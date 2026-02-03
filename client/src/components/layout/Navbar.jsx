import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaUserCircle, FaHeart, FaShoppingCart, FaWindowClose, FaChevronDown, FaTachometerAlt } from "react-icons/fa";
import { AiOutlineMenuFold } from "react-icons/ai";
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';

// Navigation Data
const navlinks = [
    { name: 'Home', path: '/' },
    {
        name: 'Men',
        path: '/shop?gender=Men',
        type: 'mega',
        subCategories: [
            { name: 'Casual-Shoes', path: '/shop?gender=Men&category=Casual' },
            { name: 'Formal-Shoes', path: '/shop?gender=Men&category=Formal' },
            { name: 'Sports & Running', path: '/shop?gender=Men&category=Sports' },
            { name: 'Sandals & Flip Flops', path: '/shop?gender=Men&SubCategory=Sandal & Slippers' },
        ]
    },
    {
        name: 'Women',
        path: '/shop?gender=Women',
        type: 'mega',
        subCategories: [
            { name: 'Heels', path: '/shop?gender=Women&type=Heels' },
            { name: 'Flats', path: '/shop?gender=Women&type=Sandals' },
            { name: 'Sports & Running', path: '/shop?gender=Women&category=Sports' },
            { name: 'Casual', path: '/shop?gender=Women&category=Casual' },
        ]
    },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact-Us', path: '/contact-us' },
]

const Navbar = () => {

    const { navigate, user, searchQuery, setSearchQuery, getCartCount } = useAppContext()

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState(null)
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    // Helper: Check if Admin
    const isAdmin = user && user.role === 'admin';

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
    const toggleExpandedMenu = (name) => setExpandedMenu(expandedMenu === name ? null : name)

    // Smart Scroll Logic
    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > 200) {
                if (window.scrollY > lastScrollY) {
                    setShowNavbar(false)
                } else {
                    setShowNavbar(true)
                }
            } else {
                setShowNavbar(true)
            }
            setLastScrollY(window.scrollY)
        }

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar)
    }, [lastScrollY])

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-40 bg-white shadow-sm transition-transform duration-300 ease-in-out ${showNavbar ? 'translate-y-0' : '-translate-y-full'} `}>

                {/** ========================================================= */}
                {/** TOP HEADER                          */}
                {/** ========================================================= */}
                <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-56 py-3 flex items-center justify-between gap-4'>

                    {/** LOGO */}
                    <div className='w-20 md:w-24 shrink-0'>
                        <NavLink to='/' className='cursor-pointer'>
                            <img src={assets.logo} alt="LOGO" className='w-full' />
                        </NavLink>
                    </div>

                    {/** SEARCH BAR (Hidden on small screens) */}
                    <div className='hidden md:flex w-full max-w-xs xl:max-w-md border border-gray-500 rounded-full items-center px-4 hover:border-red-400 transition-colors'>
                        <input
                            type="text"
                            placeholder='Search products...'
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                if (window.location.pathname !== '/shop') navigate('/shop')
                            }}
                            className=' px-2 py-2 w-full rounded-full outline-none bg-transparent text-sm '
                        />
                        <CiSearch size={28} className='text-gray-500' />
                    </div>

                    {/** ACTION BUTTONS (Right Side) */}
                    <div className='flex items-center gap-2 sm:gap-4'>

                        {/* CASE 1: ADMIN USER */}
                        {isAdmin ? (
                            <button
                                onClick={() => navigate('/admin')}
                                className='flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold hover:bg-gray-800 transition-all shadow-md'
                            >
                                <FaTachometerAlt />
                                <span className='text-xs md:text-base'>Dashboard</span>
                            </button>
                        ) : (
                            /* CASE 2: NORMAL USER or GUEST */
                            <>
                                {/* Heart Icon (Only for Logged in Users) */}
                                {user && (
                                    <button className='hidden lg:flex text-rose-500 bg-rose-100 hover:bg-rose-200 p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110'>
                                        <FaHeart />
                                    </button>
                                )}

                                {/* Profile Icon (Only for Logged in Users) */}
                                {user ? (
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className='rounded-full text-red-500 cursor-pointer hover:scale-105 transition-transform'
                                    >
                                        <FaUserCircle size={28} />
                                    </button>
                                ) : (
                                    /* Login Button (Only for GUESTS) */
                                    <button
                                        onClick={() => navigate('/login')}
                                        className='hidden sm:flex bg-red-500 text-white px-4 py-2 rounded-full font-bold cursor-pointer items-center gap-2 hover:bg-red-600 transition-colors shadow-md'
                                    >
                                        <FaUserCircle size={20} />
                                        Login
                                    </button>
                                )}

                                {/* Cart Icon (Always Visible for Non-Admins) */}
                                <div
                                    className='relative cursor-pointer hover:scale-105 transition-transform'
                                    onClick={() => navigate('/cart')}
                                >
                                    <div className='absolute w-5 h-5 md:w-6 md:h-6 bg-red-500 -top-3 -right-4 text-white flex items-center justify-center font-medium rounded-full text-xs shadow-sm'>
                                        <span>{getCartCount()}</span>
                                    </div>
                                    <FaShoppingCart size={28} className='text-gray-600' />
                                </div>
                            </>
                        )}

                        {/* MOBILE MENU TOGGLE */}
                        <button
                            onClick={toggleMobileMenu}
                            className='xl:hidden ml-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors'
                        >
                            {mobileMenuOpen ? <FaWindowClose size={26} className='text-red-500' /> : <AiOutlineMenuFold size={26} className='text-gray-600' />}
                        </button>
                    </div>
                </div>

                {/** ========================================================= */}
                {/** DESKTOP NAVBAR                         */}
                {/** ========================================================= */}
                <nav className='hidden xl:block bg-red-500 shadow-md'>
                    <div className=' px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-56 py-3'>
                        <div className='flex items-center gap-8'>
                            {navlinks.map((link, index) => (
                                <div key={index} className='relative group'>
                                    <NavLink
                                        to={link.path}
                                        className='uppercase text-white font-RobotoCondensed font-semibold py-2 flex items-center gap-1 hover:text-gray-200 transition-colors duration-300 tracking-wide text-sm'
                                    >
                                        {link.name}
                                        {link.subCategories && <FaChevronDown size={12} className='group-hover:rotate-180 transition-transform duration-300' />}
                                    </NavLink>

                                    {/* DESKTOP SUBMENU */}
                                    {link.subCategories && (
                                        <div className='absolute left-0 mt-0 w-56 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top group-hover:translate-y-0 translate-y-2 z-50 overflow-hidden border border-gray-100'>
                                            <div className='py-2'>
                                                {link.subCategories.map((sub, idx) => (
                                                    <NavLink
                                                        key={idx}
                                                        to={sub.path}
                                                        className={'block px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:pl-6 transition-all duration-200 border-l-4 border-transparent hover:border-red-500 font-medium text-sm'}
                                                    >
                                                        {sub.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>


            {/* ========================================================= */}
            {/* MOBILE SIDEBAR                         */}
            {/* ========================================================= */}

            {/* Backdrop */}
            <div
                onClick={toggleMobileMenu}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Sidebar Panel */}
            <div className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-linear-to-b from-neutral-800 to-neutral-900 border-r border-r-neutral-700 shadow-2xl overflow-y-auto z-50 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} `}>

                {/* Header */}
                <div className='p-4 border-b border-neutral-700 flex justify-between items-center bg-neutral-800'>
                    <h3 className='text-white font-bold text-lg tracking-wider'>MENU</h3>
                    <button onClick={toggleMobileMenu} className='text-gray-400 hover:text-white transition-colors'>
                        <FaWindowClose size={24} />
                    </button>
                </div>

                {/* Logo Area */}
                <div className='w-full flex items-center justify-center py-8 border-b border-neutral-700/50'>
                    <div className='w-32 opacity-90'>
                        <img src={assets.footer_logo} alt="Logo" />
                    </div>
                </div>

                {/* Links */}
                <div className='p-4 flex flex-col gap-2'>

                    {/* Admin Dashboard Link (Mobile) */}
                    {isAdmin && (
                        <button
                            onClick={() => { navigate('/admin'); toggleMobileMenu(); }}
                            className='flex items-center gap-3 w-full p-3 rounded-md bg-red-600 text-white font-bold mb-4 shadow-lg active:scale-95 transition-transform'
                        >
                            <FaTachometerAlt /> Admin Dashboard
                        </button>
                    )}

                    {navlinks.map((link, index) => (
                        <div key={index}>
                            <div
                                onClick={() => link.subCategories && toggleExpandedMenu(link.name)}
                                className='flex items-center justify-between p-3 rounded-md text-gray-200 font-medium hover:bg-white/10 cursor-pointer transition-colors'
                            >
                                {/* Main Link logic */}
                                {link.subCategories ? (
                                    <span className='flex-1'>{link.name}</span>
                                ) : (
                                    <NavLink
                                        to={link.path}
                                        className='flex-1'
                                        onClick={toggleMobileMenu}
                                    >
                                        {link.name}
                                    </NavLink>
                                )}

                                {/* Chevron */}
                                {link.subCategories && (
                                    <FaChevronDown
                                        size={14}
                                        className={`transition-transform duration-300 ${expandedMenu === link.name ? 'rotate-180 text-red-500' : 'text-gray-500'}`}
                                    />
                                )}
                            </div>

                            {/* Submenu */}
                            {link.subCategories && expandedMenu === link.name && (
                                <div className='ml-4 mt-1 border-l-2 border-red-500/50 pl-2 space-y-1 animate-in slide-in-from-top-2 duration-200'>
                                    {link.subCategories.map((sub, idx) => (
                                        <NavLink
                                            key={idx}
                                            to={sub.path}
                                            onClick={toggleMobileMenu}
                                            className='block px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md text-sm transition-colors'
                                        >
                                            {sub.name}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Mobile Auth Actions */}
                    <div className='mt-8 pt-6 border-t border-neutral-700'>
                        {user ? (
                            <div className='flex flex-col gap-3'>
                                {!isAdmin && (
                                    <div className='flex flex-col gap-3'>
                                        <NavLink to={'/my-orders'} onClick={toggleMobileMenu} className='p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center gap-3'>
                                            My Orders
                                        </NavLink>
                                        <NavLink to={'/profile'} onClick={toggleMobileMenu} className='p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center gap-3'>
                                            My Profile
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => { navigate('/login'); toggleMobileMenu() }}
                                className='flex items-center justify-center w-full bg-white text-black px-4 py-3 rounded-md font-bold hover:bg-gray-200 transition-colors'
                            >
                                <FaUserCircle size={20} className='mr-2' />
                                Login / Register
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar