import logo from './logo.png'
import footer_logo from './footer_logo.png'
import HeroBanner1 from './HeroBanner1.jpg'
import HeroBanner2 from './HeroBanner2.jpg'
import HeroBanner3 from './HeroBanner3.jpg'
import HeroBanner4 from './HeroBanner4.jpg'
import Star_icon from './star.png'
import Fast_Delivery_icon from './delivery_van.png'
import return_icon from './return.png'
import COD_icon from './cash_on_delivery.png'
import credit_card_icon from './credit_card.png'
import MensFormalCollectionBg from './mens-formal-collection-banner.jpg'
import MensSportCollectionBg from './mens-sport-collection-banner.jpg'
import WomensCasualCollectionBg from './womens-casual-collection-banner.jpg'
import WomensSportCollectionBg from './womens-sport-collection-banner.jpg'
import heelsBanner from './heelsBanner.jpg'
import flipFlopBanner from './flip-flop-promo-banner.jpg'
import valentineBanner from './valentine-promo-banner.jpg'
import fromalShoesbanner from './formal-shoes-sm-banner.jpg'
import seasonalSaleBanner from './sale-sm-banner.jpg'
import upCommingShoesBanner from './upcoming-shoes-sm-banner.jpg'
import reviweFormImage from './red-white-shoes.png'
import MensSportCategory from './MensSportCategory.png'
import MensFormalCategory from './MensFormalCategory.png'
import WomensSportCategory from './WomensSportCategory.png'
import HeelCategory from './HeelCategory.png'
import WomensHeelsBg from './WomensHeelsBg.jpg'
import PaymentMethods from './payment-methods.png'
import facebook_icon_white from './facebook_icon_white.png'
import instagram_icon_white from './instagram_icon_white.png'
import tiktok_icon_white from './tiktok_icon_white.png'
import facebook_icon_red from './facebook_icon_red.png'
import instagram_icon_red from './instagram_icon_red.png'
import tiktok_icon_red from './tiktok_icon_red.png'
import delivery_icon_red from './delivery-icon-red.png'
import login_cover from './login-cover.png'
import my_profile_bg from './my_profile_bg.jpg'
import heelsBannerFloating from './heelsBannerFloating.png'
import StripeLogo from './STRIPE-LOGO.png'




export const assets = {
    logo,
    footer_logo,
    HeroBanner1,
    HeroBanner2,
    HeroBanner3,
    HeroBanner4,
    Star_icon,
    Fast_Delivery_icon,
    return_icon,
    COD_icon,
    credit_card_icon,
    MensFormalCollectionBg,
    MensSportCollectionBg,
    WomensCasualCollectionBg,
    WomensSportCollectionBg,
    heelsBanner,
    flipFlopBanner,
    valentineBanner,
    fromalShoesbanner,
    seasonalSaleBanner,
    upCommingShoesBanner,
    reviweFormImage,
    MensSportCategory,
    MensFormalCategory,
    WomensSportCategory,
    HeelCategory,
    WomensHeelsBg,
    PaymentMethods,
    facebook_icon_white,
    instagram_icon_white,
    tiktok_icon_white,
    facebook_icon_red,
    instagram_icon_red,
    tiktok_icon_red,
    delivery_icon_red,
    login_cover,
    my_profile_bg,
    heelsBannerFloating
}

// ===========================MOCK REVIEW DATA===========================

export const reviews = [
  {
    _id: "r1",
    productId: "p1",
    productName: "Elegant Black Heels",
    userName: "Nimali Perera",
    rating: 5,
    comment: "Absolutely love these heels! Very comfortable and stylish.",
    status: "approved",
    featured: true,
    createdAt: "2025-01-12"
  },
  {
    _id: "r2",
    productId: "p2",
    productName: "Red Party Heels",
    userName: "Sahan Jay",
    rating: 4,
    comment: "Looks premium and stylish. Perfect for parties.",
    status: "approved",
    featured: true,
    createdAt: "2025-01-13"
  },
  {
    _id: "r3",
    productId: "p3",
    productName: "Classic Nude Heels",
    userName: "Kavindi Silva",
    rating: 3,
    comment: "Design is good but delivery was slow.",
    status: "approved",
    featured: false,
    createdAt: "2025-01-12"
  },
  {
    _id: "r4",
    productId: "p1",
    productName: "Elegant Red Heels",
    userName: "Anonymous",
    rating: 5,
    comment: "Got so many compliments wearing this!",
    status: "pending",
    featured: true,
    createdAt: "2025-01-5"
  },
  {
    _id: "r5",
    productId: "p5",
    productName: "Red Party Heels Heels",
    userName: "Anonymous",
    rating: 5,
    comment: "Got so many compliments wearing this!",
    status: "approved",
    featured: true,
    createdAt: "2025-01-01"
  },
  {
    _id: "r6",
    productId: "p7",
    productName: "Elegant Black Heels",
    userName: "Anonymous",
    rating: 5,
    comment: "Got so many compliments wearing this!",
    status: "approved",
    featured: true,
    createdAt: "2025-01-11"
  }
];


//--------------------------------PRODUCTS------------------------------------------------

export const productsData = [
    {
      _id: "65a1b2c3d4e5f6a7b8c9d001",
      name: "Oxford Classic Brown",
      slug: "oxford-classic-brown",
      sku: "EST-OXF-BRN-001", // NEW: Unique ID for admin/warehouse
      price: 109.99,
      discountPrice: 89.99,
      currency: "USD",
      
      // IMPROVED CATEGORIZATION
      gender: "Men",
      category: "Formal",
      subCategory: "Oxford", // Great for advanced filters
      brand: "ElegantStep",
      
      images: [
        "/productImages/mens-formal-shoes/mens-formal-shoes1-001.jpg",
        "/productImages/mens-formal-shoes/mens-formal-shoes1-002.jpg"
      ],
      
      inventory: [
        { size: 7, stock: 5 },
        { size: 8, stock: 0 },
        { size: 9, stock: 12 }
      ],
      
      color: { name: "Brown", hex: "#5D4037" }, // Simplified object
      
      rating: 4.6,
      reviewsCount: 128,
      salesCount: 450, // NEW: Use this to sort "Best Sellers"
      tags: ["featured", "top-selling"],
      
      specs: {
        material: "Genuine Leather",
        sole: "Rubber",
        closure: "Slip-on",
        weight: "1.2kg" // Added weight for shipping calc future-proofing
      },
      
      description: "Polished brown Oxford shoes with elegant stitching and a timeless design.",
      createdAt: "2026-01-15T10:00:00Z", // NEW: For "Newest" sort
      isNew: false
    },
    {
      _id: "65a1b2c3d4e5f6a7b8c9d002",
      name: "Midnight Executive Derby",
      slug: "midnight-executive-derby",
      sku: "EST-DRB-BLK-002",
      price: 115.00,
      discountPrice: 95.00,
      currency: "USD",
      
      gender: "Men",
      category: "Formal",
      subCategory: "Derby",
      brand: "ElegantStep",
      
      images: [
        "/productImages/mens-formal-shoes/mens-formal-shoes2-003.jpg",
        "/productImages/mens-formal-shoes/mens-formal-shoes2-007.jpg"
      ],
      
      inventory: [
        { size: 8, stock: 4 },
        { size: 10, stock: 8 }
      ],
      
      color: { name: "Black", hex: "#000000" },
      
      rating: 4.8,
      reviewsCount: 45,
      salesCount: 120,
      tags: ["new"],
      
      specs: {
        material: "Patent Leather",
        sole: "Leather",
        closure: "Lace-up",
        weight: "1.1kg"
      },
      
      description: "Sleek black derby shoes perfect for formal evening events and boardrooms.",
      createdAt: "2026-10-01T10:00:00Z", // Very recent date
      isNew: true
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d003",
      name: "Elite Pointed Loafer",
      slug: "elite-pointed-loafer",
      sku: "EST-LOA-JBLK-003",
      price: 99.99,
      discountPrice: 79.99,
      currency: "USD",
      
      gender: "Men",
      category: "Formal",
      subCategory: "Loafer",
      brand: "ElegantStep",
      
      images: [
        "/productImages/mens-formal-shoes/mens-formal-shoes-004.jpg",
      ],
      
      inventory: [
        { size: 7, stock: 15 },
        { size: 9, stock: 0 }
      ],
      
      color: { name: "Jet Black", hex: "#1A1A1A" },
      
      rating: 4.4,
      reviewsCount: 89,
      salesCount: 890,
      tags: ["top-selling"],
      
      specs: {
        material: "Synthetic Leather",
        sole: "Synthetic",
        closure: "Slip-on",
        weight: "0.9kg"
      },
      
      description: "A modern take on the classic loafer featuring a sharper toe profile.",
      createdAt: "2026-06-15T10:00:00Z",
      isNew: false
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d004",
      name: "Heritage Cap-Toe Oxford",
      slug: "heritage-cap-toe-oxford",
      sku: "EST-OXF-BLK-004",
      price: 125.00,
      discountPrice: 110.00,
      currency: "USD",
      
      gender: "Men",
      category: "Formal",
      subCategory: "Oxford",
      brand: "ElegantStep",
      
      images: [
        "/productImages/mens-formal-shoes/mens-formal-shoes-005.jpg"
      ],
      
      inventory: [
        { size: 8, stock: 20 },
        { size: 11, stock: 5 }
      ],
      
      color: { name: "Black", hex: "#000000" },
      
      rating: 4.9,
      reviewsCount: 210,
      salesCount: 1500, // Very high sales
      tags: ["featured", "top-selling"],
      
      specs: {
        material: "Full Grain Leather",
        sole: "Rubber",
        closure: "Lace-up",
        weight: "1.3kg"
      },
      
      description: "Traditional cap-toe design offering maximum durability and comfort.",
      createdAt: "2026-02-20T10:00:00Z",
      isNew: false
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d005",
      name: "Urban Navy Slip-on",
      slug: "urban-navy-slip-on",
      sku: "EST-SLP-NVY-005",
      price: 85.00,
      discountPrice: 65.00,
      currency: "USD",
      
      gender: "Men",
      category: "Formal",
      subCategory: "Slip-on",
      brand: "ElegantStep",
      
      images: [
        "/productImages/mens-formal-shoes/mens-formal-shoes-006.jpg"
      ],
      
      inventory: [
        { size: 7, stock: 10 },
        { size: 10, stock: 15 }
      ],
      
      color: { name: "Navy Blue", hex: "#1C2E4A" },
      
      rating: 4.2,
      reviewsCount: 34,
      salesCount: 80,
      tags: ["new"],
      
      specs: {
        material: "Suede Leather",
        sole: "TPR",
        closure: "Suede Leather",
        weight: "0.8kg"
      },
      
      description: "Versatile navy formal shoes that transition perfectly from office to social gatherings.",
      createdAt: "2026-09-25T10:00:00Z",
      isNew: true
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d006",
      name: "Tan Prestige Brogue",
      slug: "tan-prestige-brogue",
      sku: "EST-BRG-TAN-006",
      price: 130.00,
      discountPrice: 115.00,
      currency: "USD",
      
      gender: "Men",
      category: "Formal",
      subCategory: "Brogue",
      brand: "ElegantStep",
      
      images: [
        "/productImages/mens-formal-shoes/mens-formal-shoes-008.jpg"
      ],
      
      inventory: [
        { size: 9, stock: 3 },
        { size: 10, stock: 6 }
      ],
      
      color: { name: "Tan", hex: "#B66A3D" },
      
      rating: 4.7,
      reviewsCount: 56,
      salesCount: 230,
      tags: ["featured"],
      
      specs: {
        material: "Burnished Leather",
        sole: "Wood/Rubber Hybrid",
        closure: "Lace-up",
        weight: "1.25kg"
      },
      
      description: "Rich tan leather with intricate brogue detailing for the distinguished gentleman.",
      createdAt: "2025-06-10T10:00:00Z",
      isNew: false
    },
  
    {
      _id: "65a1b2c3d4e5f6a7b8c9d007", // Changed to Mongo ID
      name: "Urban White Casual Sneaker",
      slug: "urban-white-casual-sneaker",
      sku: "STR-SNK-WHT-001",
      price: 79.99,
      discountPrice: 69.99,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "Sneaker",
      brand: "StreetFlex",
      
      images: ["/productImages/mens-casual-shoes/mens-casual-shoes-001.png"],
      
      inventory: [
        { size: 7, stock: 15 },
        { size: 8, stock: 20 },
        { size: 9, stock: 10 }
      ],
      
      color: { name: "White", hex: "#FFFFFF" },
      
      rating: 4.5,
      reviewsCount: 98,
      salesCount: 650,
      tags: ["new", "featured"],
      
      specs: {
        material: "Synthetic Leather",
        sole: "Rubber",
        closure: "Lace-up",
        weight: "0.85kg"
      },
      
      description: "Clean white casual sneakers designed for everyday comfort and street-style looks.",
      createdAt: "2025-12-30T10:00:00Z",
      isNew: true
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d008", // Mongo ID
      name: "Navy Sport Casual Shoe",
      slug: "navy-sport-casual-shoe",
      sku: "STR-SPT-NVY-002",
      price: 84.99,
      discountPrice: 74.99,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "Sport",
      brand: "StreetFlex",
      
      images: ["/productImages/mens-casual-shoes/mens-casual-shoes-002.jpg"],
      
      inventory: [
        { size: 8, stock: 18 },
        { size: 9, stock: 12 },
        { size: 10, stock: 8 }
      ],
      
      color: { name: "Navy Blue", hex: "#1C2A44" },
      
      rating: 4.6,
      reviewsCount: 134,
      salesCount: 820,
      tags: ["top-selling"],
      
      specs: {
        material: "Mesh & Synthetic",
        sole: "EVA Rubber",
        closure: "Lace-up",
        weight: "0.75kg"
      },
      
      description: "Lightweight navy casual shoes built for daily wear with breathable comfort.",
      createdAt: "2025-08-15T10:00:00Z",
      isNew: false
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d009", // Mongo ID
      name: "Classic Navy Canvas Sneaker",
      slug: "classic-navy-canvas-sneaker",
      sku: "URB-CNV-NVY-003",
      price: 74.99,
      discountPrice: null,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "Canvas",
      brand: "UrbanWalk",
      
      images: ["/productImages/mens-casual-shoes/mens-casual-shoes-003.jpg"],
      
      inventory: [
        { size: 7, stock: 10 },
        { size: 8, stock: 14 },
        { size: 9, stock: 6 }
      ],
      
      color: { name: "Navy", hex: "#2B3A67" },
      
      rating: 4.4,
      reviewsCount: 76,
      salesCount: 410,
      tags: ["casual"],
      
      specs: {
        material: "Canvas",
        sole: "Rubber",
        closure: "Lace-up",
        weight: "0.65kg"
      },
      
      description: "Minimal navy canvas sneakers perfect for casual outfits and everyday use.",
      createdAt: "2025-06-20T10:00:00Z",
      isNew: false
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d00a", // Mongo ID (009 -> 00a)
      name: "Black High-Top Casual Shoe",
      slug: "black-high-top-casual-shoe",
      sku: "URB-HIT-BLK-004",
      price: 89.99,
      discountPrice: 79.99,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "High-Top",
      brand: "UrbanWalk",
      
      images: ["/productImages/mens-casual-shoes/mens-casual-shoes-004.jpg"],
      
      inventory: [
        { size: 8, stock: 9 },
        { size: 9, stock: 11 },
        { size: 10, stock: 7 }
      ],
      
      color: { name: "Black", hex: "#000000" },
      
      rating: 4.7,
      reviewsCount: 152,
      salesCount: 950,
      tags: ["featured", "top-selling"],
      
      specs: {
        material: "Synthetic Leather",
        sole: "Rubber",
        closure: "Lace-up",
        weight: "0.95kg"
      },
      
      description: "Stylish black high-top casual shoes offering ankle support and modern street appeal.",
      createdAt: "2025-09-05T10:00:00Z",
      isNew: false
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d00b", // Mongo ID
      name: "Classic Yellow Flip Flop",
      slug: "classic-yellow-flip-flop",
      sku: "URB-FLP-YEL-001",
      price: 14.99,
      discountPrice: 11.99,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "Flip Flop",
      brand: "UrbanWalk",
      
      images: ["/productImages/mens-flip-flop/mens-flip-flop-001.jpg"],
      
      inventory: [
        { size: 7, stock: 25 },
        { size: 8, stock: 30 },
        { size: 9, stock: 20 }
      ],
      
      color: { name: "Yellow", hex: "#F4D03F" },
      
      rating: 4.3,
      reviewsCount: 64,
      salesCount: 1200,
      tags: ["new"],
      
      specs: {
        material: "Rubber",
        sole: "EVA Foam",
        closure: "Slip-on",
        weight: "0.3kg"
      },
      
      description: "Lightweight yellow flip flops designed for everyday comfort and casual wear.",
      createdAt: "2025-11-01T10:00:00Z",
      isNew: true
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d00c", // Mongo ID
      name: "All Black Comfort Flip Flop",
      slug: "all-black-comfort-flip-flop",
      sku: "URB-FLP-BLK-002",
      price: 16.99,
      discountPrice: null,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "Flip Flop",
      brand: "UrbanWalk",
      
      images: ["/productImages/mens-flip-flop/mens-flip-flop-002.jpg"],
      
      inventory: [
        { size: 8, stock: 22 },
        { size: 9, stock: 18 },
        { size: 10, stock: 12 }
      ],
      
      color: { name: "Black", hex: "#000000" },
      
      rating: 4.5,
      reviewsCount: 91,
      salesCount: 1500,
      tags: ["top-selling"],
      
      specs: {
        material: "Textured Rubber",
        sole: "Rubber",
        closure: "Slip-on",
        weight: "0.35kg"
      },
      
      description: "Durable black flip flops with textured footbed for improved grip and comfort.",
      createdAt: "2025-05-20T10:00:00Z",
      isNew: false
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d00d", // Mongo ID
      name: "Red Accent Casual Flip Flop",
      slug: "red-accent-casual-flip-flop",
      sku: "STR-FLP-RED-003",
      price: 17.99,
      discountPrice: 14.99,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "Flip Flop",
      brand: "StreetFlex",
      
      images: ["/productImages/mens-flip-flop/mens-flip-flop-003.jpg"],
      
      inventory: [
        { size: 7, stock: 14 },
        { size: 8, stock: 19 },
        { size: 9, stock: 16 }
      ],
      
      color: { name: "Black & Red", hex: "#C0392B" },
      
      rating: 4.4,
      reviewsCount: 73,
      salesCount: 560,
      tags: ["featured"],
      
      specs: {
        material: "Synthetic Rubber",
        sole: "EVA Rubber",
        closure: "Slip-on",
        weight: "0.32kg"
      },
      
      description: "Sporty black flip flops with red accents, ideal for beach and casual outings.",
      createdAt: "2025-07-15T10:00:00Z",
      isNew: false
    },
    
    {
      _id: "65a1b2c3d4e5f6a7b8c9d00e", // Mongo ID
      name: "Classic Black Comfort Sandal",
      slug: "classic-black-comfort-sandal",
      sku: "URB-SND-BLK-001",
      price: 29.99,
      discountPrice: 24.99,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "Sandal",
      brand: "UrbanWalk",
      
      images: ["/productImages/mens-sandals/mens-sandals-001.jpg"],
      
      inventory: [
        { size: 7, stock: 18 },
        { size: 8, stock: 22 },
        { size: 9, stock: 15 }
      ],
      
      color: { name: "Black", hex: "#000000" },
      
      rating: 4.4,
      reviewsCount: 86,
      salesCount: 780,
      tags: ["casual", "comfort"],
      
      specs: {
        material: "Synthetic Leather",
        sole: "Rubber",
        closure: "Slip-on",
        weight: "0.5kg"
      },
      
      description: "Lightweight black sandals designed for daily comfort and relaxed casual wear.",
      createdAt: "2025-04-10T10:00:00Z",
      isNew: false
    },
    {
      _id: "6766782f9c3e1b2a4d5e1002", // Mongo ID
      name: "Navy Dual-Strap Casual Sandal",
      slug: "navy-dual-strap-casual-sandal",
      sku: "STR-SND-NVY-002",
      price: 34.99,
      discountPrice: 29.99,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "Sandal",
      brand: "StreetFlex",
      
      images: ["/productImages/mens-sandals/mens-sandals-002.jpg"],
      
      inventory: [
        { size: 8, stock: 20 },
        { size: 9, stock: 17 },
        { size: 10, stock: 12 }
      ],
      
      color: { name: "Navy Blue", hex: "#1C2A44" },
      
      rating: 4.6,
      reviewsCount: 124,
      salesCount: 850,
      tags: ["featured", "top-selling"],
      
      specs: {
        material: "Synthetic Upper",
        sole: "EVA Rubber",
        closure: "Velcro Strap",
        weight: "0.55kg"
      },
      
      description: "Stylish navy sandals with dual adjustable straps for secure and comfortable wear.",
      createdAt: "2025-10-15T10:00:00Z",
      isNew: false
    },
  
    {
      _id: "6766782f9c3e1b2a4d5e1003", // Mongo ID
      name: "Brown Leather Casual Sandal",
      slug: "brown-leather-casual-sandal",
      sku: "ELG-SND-BRN-003",
      price: 39.99,
      discountPrice: 34.99,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "Sandal",
      brand: "ElegantStep",
      
      images: ["/productImages/mens-sandals/mens-sandals-003.jpg"],
      
      inventory: [
        { size: 7, stock: 10 },
        { size: 8, stock: 14 },
        { size: 9, stock: 9 }
      ],
      
      color: { name: "Brown", hex: "#6D4C41" },
      
      rating: 4.7,
      reviewsCount: 102,
      salesCount: 620,
      tags: ["premium", "casual"],
      
      specs: {
        material: "Genuine Leather",
        sole: "Rubber",
        closure: "Slip-on",
        weight: "0.60kg"
      },
      
      description: "Premium brown leather sandals offering durability, comfort, and timeless style.",
      createdAt: "2025-09-20T10:00:00Z",
      isNew: false
    },
  
    {
      _id: "6766782f9c3e1b2a4d5e1004", // Mongo ID
      name: "Sporty Blue Strap Sandal",
      slug: "sporty-blue-strap-sandal",
      sku: "STR-SND-BLU-004",
      price: 36.99,
      discountPrice: 31.99,
      currency: "USD",
      
      gender: "Men",
      category: "Casual",
      subCategory: "Sandal",
      brand: "StreetFlex",
      
      images: ["/productImages/mens-sandals/mens-sandals-004.jpg"],
      
      inventory: [
        { size: 8, stock: 16 },
        { size: 9, stock: 18 },
        { size: 10, stock: 13 }
      ],
      
      color: { name: "Dark Blue", hex: "#1A5276" },
      
      rating: 4.5,
      reviewsCount: 95,
      salesCount: 480,
      tags: ["featured", "summer"],
      
      specs: {
        material: "Synthetic Fabric",
        sole: "EVA Foam",
        closure: "Velcro Strap",
        weight: "0.45kg"
      },
      
      description: "Sport-inspired blue sandals designed for outdoor comfort and everyday summer wear.",
      createdAt: "2026-01-05T10:00:00Z",
      isNew: true
    },
  
    {
      _id: "6766782f9c3e1b2a4d5e2001", // Mongo ID
      name: "Nike Black Grey Orange Sport Shoe",
      slug: "nike-black-grey-orange-sport-shoe",
      sku: "NIK-SPT-BLK-001",
      price: 119.99,
      discountPrice: 99.99,
      currency: "USD",
      
      gender: "Men",
      category: "Sport",
      subCategory: "Running",
      brand: "Nike",
      
      images: ["/productImages/mens-sport-shoes/mens-sport-shoes-001.png"],
      
      inventory: [
        { size: 8, stock: 20 },
        { size: 9, stock: 15 },
        { size: 10, stock: 10 }
      ],
      
      color: { name: "Black / Orange", hex: "#2C2C2C" },
      
      rating: 4.7,
      reviewsCount: 168,
      salesCount: 1250,
      tags: ["featured", "sport"],
      
      specs: {
        material: "Mesh & Synthetic",
        sole: "Rubber",
        closure: "Lace-up",
        weight: "0.70kg"
      },
      
      description: "High-performance Nike sport shoes with breathable mesh and bold orange accents for active lifestyles.",
      createdAt: "2026-01-05T10:00:00Z",
      isNew: false
    },
  
    {
      _id: "6766782f9c3e1b2a4d5e2002", // Mongo ID
      name: "Nike Red Running Shoe",
      slug: "nike-red-running-shoe",
      sku: "NIK-RUN-RED-002",
      price: 114.99,
      discountPrice: 94.99,
      currency: "USD",
      
      gender: "Men",
      category: "Sport",
      subCategory: "Running",
      brand: "Nike",
      
      images: ["/productImages/mens-sport-shoes/mens-sport-shoes-002.png"],
      
      inventory: [
        { size: 7, stock: 14 },
        { size: 8, stock: 18 },
        { size: 9, stock: 12 }
      ],
      
      color: { name: "Red", hex: "#C0392B" },
      
      rating: 4.6,
      reviewsCount: 142,
      salesCount: 980,
      tags: ["running", "top-selling"],
      
      specs: {
        material: "Breathable Mesh",
        sole: "EVA Rubber",
        closure: "Lace-up",
        weight: "0.65kg"
      },
      
      description: "Lightweight red Nike running shoes designed for speed, comfort, and daily training.",
      createdAt: "2025-08-12T10:00:00Z",
      isNew: false
    },
  
    {
      _id: "6766782soc3w1b2c4d7e2003", // Mongo ID
      name: "Nike Black Training Shoe",
      slug: "nike-black-training-shoe",
      sku: "NIK-TRN-BLK-003",
      price: 109.99,
      discountPrice: null,
      currency: "USD",
      
      gender: "Men",
      category: "Sport",
      subCategory: "Training",
      brand: "Nike",
      
      images: ["/productImages/mens-sport-shoes/mens-sport-shoes-003.png"],
      
      inventory: [
        { size: 8, stock: 16 },
        { size: 9, stock: 20 },
        { size: 10, stock: 14 }
      ],
      
      color: { name: "Black", hex: "#000000" },
      
      rating: 4.5,
      reviewsCount: 121,
      salesCount: 890,
      tags: ["training", "gym"],
      
      specs: {
        material: "Synthetic & Mesh",
        sole: "Rubber",
        closure: "Lace-up",
        weight: "0.75kg"
      },
      
      description: "Durable black Nike training shoes built for gym workouts and intense training sessions.",
      createdAt: "2026-01-05T10:00:00Z",
      isNew: false
    },
  
    {
      _id: "6766782f9c3e1b2a4d5e2004", // Mongo ID
      name: "Nike Blue Performance Sport Shoe",
      slug: "nike-blue-performance-sport-shoe",
      sku: "NIK-PRF-BLU-004",
      price: 122.99,
      discountPrice: 104.99,
      currency: "USD",
      
      gender: "Men",
      category: "Sport",
      subCategory: "Running",
      brand: "Nike",
      
      images: ["/productImages/mens-sport-shoes/mens-sport-shoes-004.png"],
      
      inventory: [
        { size: 8, stock: 13 },
        { size: 9, stock: 17 },
        { size: 10, stock: 11 }
      ],
      
      color: { name: "Blue", hex: "#1F618D" },
      
      rating: 4.8,
      reviewsCount: 189,
      salesCount: 1400,
      tags: ["featured", "performance"],
      
      specs: {
        material: "Engineered Mesh",
        sole: "React Foam",
        closure: "Lace-up",
        weight: "0.68kg"
      },
      
      description: "Premium blue Nike sport shoes engineered for performance, comfort, and long-distance training.",
      createdAt: "2025-11-01T10:00:00Z",
      isNew: true
    },
  
    {
      _id: "6766782f9c3e1b2a4d5e3001", // Mongo ID
      name: "Women Beige Casual Sneaker",
      slug: "women-beige-casual-sneaker",
      sku: "URB-CAS-BGE-001",
      price: 69.99,
      discountPrice: 59.99,
      currency: "USD",
      
      gender: "Women",
      category: "Casual",
      subCategory: "Sneaker",
      brand: "UrbanWalk",
      
      images: ["/productImages/womens-casual-shoes/womens-casual-shoe-001.jpg"],
      
      inventory: [
        { size: 6, stock: 14 },
        { size: 7, stock: 18 },
        { size: 8, stock: 12 }
      ],
      
      color: { name: "Beige", hex: "#D7CCC8" },
      
      rating: 4.6,
      reviewsCount: 92,
      salesCount: 540,
      tags: ["casual", "featured"],
      
      specs: {
        material: "Synthetic Leather",
        sole: "Rubber",
        closure: "Lace-up",
        weight: "0.60kg"
      },
      
      description: "Stylish beige casual sneakers designed for everyday comfort and modern street fashion.",
      createdAt: "2026-01-11T10:00:00Z",
      isNew: true
    },
  
    {
      _id: "6766782f9c3e1b2a4d5e3002", // Mongo ID
      name: "Women White Minimal Casual Shoe",
      slug: "women-white-minimal-casual-shoe",
      sku: "ELG-CAS-WHT-002",
      price: 74.99,
      discountPrice: null,
      currency: "USD",
      
      gender: "Women",
      category: "Casual",
      subCategory: "Sneaker",
      brand: "ElegantStep",
      
      images: ["/productImages/womens-casual-shoes/womens-casual-shoe-002.jpg"],
      
      inventory: [
        { size: 6, stock: 16 },
        { size: 7, stock: 20 },
        { size: 8, stock: 15 }
      ],
      
      color: { name: "White", hex: "#FFFFFF" },
      
      rating: 4.7,
      reviewsCount: 118,
      salesCount: 710,
      tags: ["new", "top-selling"],
      
      specs: {
        material: "Canvas & Synthetic",
        sole: "EVA Rubber",
        closure: "Slip-on",
        weight: "0.55kg"
      },
      
      description: "Clean white women’s casual shoes with a minimal design, perfect for daily wear and comfort.",
      createdAt: "2026-01-01T10:00:00Z",
      isNew: true
    },
  
    {
      _id: "6766782f9c3e1b2a4d5e4001", // Mongo ID
      name: "Women Black Closed Comfort Shoe",
      slug: "women-black-closed-comfort-shoe",
      sku: "ELG-FRM-BLK-001",
      price: 79.99,
      discountPrice: 69.99,
      currency: "USD",
      
      gender: "Women",
      category: "Formal",
      subCategory: "Closed Shoe",
      brand: "ElegantStep",
      
      images: ["/productImages/womens-closed-shoes/womens-closed-shoes-001.jpg"],
      
      inventory: [
        { size: 6, stock: 15 },
        { size: 7, stock: 18 },
        { size: 8, stock: 12 }
      ],
      
      color: { name: "Black", hex: "#000000" },
      
      rating: 4.6,
      reviewsCount: 104,
      salesCount: 630,
      tags: ["formal", "comfort"],
      
      specs: {
        material: "Synthetic Leather",
        sole: "Rubber",
        closure: "Slip-on",
        weight: "0.58kg"
      },
      
      description: "Elegant black closed shoes designed for all-day comfort, suitable for office and formal wear.",
      createdAt: "2025-09-15T10:00:00Z",
      isNew: false
    },
  
      /*-----------------------------*/
      {
        _id: "6766782f9c3e1b2a4d5e4002", // Mongo ID
        name: "Women Brown Closed Casual Shoe",
        slug: "women-brown-closed-casual-shoe",
        sku: "URB-CLS-BRN-002",
        price: 84.99,
        discountPrice: null,
        currency: "USD",
        
        gender: "Women",
        category: "Formal",
        subCategory: "Closed Shoe",
        brand: "UrbanWalk",
        
        images: ["/productImages/womens-closed-shoes/womens-closed-shoes-002.jpg"],
        
        inventory: [
          { size: 6, stock: 14 },
          { size: 7, stock: 16 },
          { size: 8, stock: 13 }
        ],
        
        color: { name: "Brown", hex: "#6D4C41" },
        
        rating: 4.7,
        reviewsCount: 129,
        salesCount: 680,
        tags: ["casual", "top-selling"],
        
        specs: {
          material: "Genuine Leather",
          sole: "EVA Rubber",
          closure: "Lace-up",
          weight: "0.60kg"
        },
        
        description: "Stylish brown women’s closed shoes combining durability, comfort, and everyday casual elegance.",
        createdAt: "2025-08-05T10:00:00Z",
        isNew: false
      },
    
      {
        _id: "6766782f9c3e1b2a4d5e5001", // Mongo ID
        name: "Women Pink Casual Flip Flop",
        slug: "women-pink-casual-flip-flop",
        sku: "URB-FLP-PNK-001",
        price: 14.99,
        discountPrice: 11.99,
        currency: "USD",
        
        gender: "Women",
        category: "Casual",
        subCategory: "Flip Flop",
        brand: "UrbanWalk",
        
        images: ["/productImages/womens-flip-flop/womens-flip-flop-001.jpg"],
        
        inventory: [
          { size: 6, stock: 20 },
          { size: 7, stock: 24 },
          { size: 8, stock: 18 }
        ],
        
        color: { name: "Pink", hex: "#F8BBD0" },
        
        rating: 4.4,
        reviewsCount: 87,
        salesCount: 450,
        tags: ["casual", "summer"],
        
        specs: {
          material: "EVA Foam",
          sole: "Rubber",
          closure: "Slip-on",
          weight: "0.25kg"
        },
        
        description: "Lightweight pink flip flops designed for everyday comfort and relaxed summer wear.",
        createdAt: "2025-11-12T10:00:00Z",
        isNew: true
      },
    
      {
        _id: "6766782f9c3e1b2a4d5e5002", // Mongo ID
        name: "Women Black Comfort Flip Flop",
        slug: "women-black-comfort-flip-flop",
        sku: "ELG-FLP-BLK-002",
        price: 16.99,
        discountPrice: null,
        currency: "USD",
        
        gender: "Women",
        category: "Casual",
        subCategory: "Flip Flop",
        brand: "ElegantStep",
        
        images: ["/productImages/womens-flip-flop/womens-flip-flop-002.jpg"],
        
        inventory: [
          { size: 6, stock: 18 },
          { size: 7, stock: 22 },
          { size: 8, stock: 16 }
        ],
        
        color: { name: "Black", hex: "#000000" },
        
        rating: 4.6,
        reviewsCount: 113,
        salesCount: 920,
        tags: ["top-selling", "comfort"],
        
        specs: {
          material: "Textured Rubber",
          sole: "EVA Rubber",
          closure: "Slip-on",
          weight: "0.28kg"
        },
        
        description: "Classic black women’s flip flops offering durable comfort for daily casual use.",
        createdAt: "2025-07-20T10:00:00Z",
        isNew: false
      },
    
      {
        _id: "6766782ffc3e1b2a4d5e6001", // Mongo ID
        name: "Women Nude Classic Heel",
        slug: "women-nude-classic-heel",
        sku: "ELG-HEL-NUD-001",
        price: 89.99,
        discountPrice: 79.99,
        currency: "USD",
        
        gender: "Women",
        category: "Formal",
        subCategory: "Heel",
        brand: "ElegantStep",
        
        images: ["/productImages/womens-heel/womens-heel-001.jpg"],
        
        inventory: [
          { size: 6, stock: 12 },
          { size: 7, stock: 15 },
          { size: 8, stock: 10 }
        ],
        
        color: { name: "Nude", hex: "#E0BFAE" },
        
        rating: 4.7,
        reviewsCount: 136,
        salesCount: 740,
        tags: ["formal", "featured"],
        
        specs: {
          material: "Synthetic Leather",
          sole: "Rubber",
          closure: "Slip-on",
          weight: "0.45kg"
        },
        
        description: "Elegant nude heels designed for formal occasions, offering a perfect balance of style and comfort.",
        createdAt: "2025-10-05T10:00:00Z",
        isNew: false
      },
    
      {
        _id: "6766782f9c31jb2ahd5e61h1", // Mongo ID
        name: "Women Nude Classic Heel V2", // Slight name adjustment for uniqueness
        slug: "women-nude-classic-heel-v2",
        sku: "ELG-HEL-NUD-002",
        price: 89.99,
        discountPrice: 79.99,
        currency: "USD",
        
        gender: "Women",
        category: "Formal",
        subCategory: "Heel",
        brand: "ElegantStep",
        
        images: ["/productImages/womens-heel/womens-heel-002.jpg"],
        
        inventory: [
          { size: 6, stock: 12 },
          { size: 7, stock: 15 },
          { size: 8, stock: 10 }
        ],
        
        color: { name: "Nude", hex: "#E0BFAE" },
        
        rating: 4.7,
        reviewsCount: 136,
        salesCount: 320,
        tags: ["formal", "featured"],
        
        specs: {
          material: "Synthetic Leather",
          sole: "Rubber",
          closure: "Slip-on",
          weight: "0.45kg"
        },
        
        description: "Elegant nude heels designed for formal occasions, offering a perfect balance of style and comfort.",
        createdAt: "2025-11-01T10:00:00Z",
        isNew: true
      },
    
      {
        _id: "6766782f9c3e1c264d5e6002", // Mongo ID
        name: "Women Black Party Heel",
        slug: "women-black-party-heel",
        sku: "URB-HEL-BLK-003",
        price: 94.99,
        discountPrice: null,
        currency: "USD",
        
        gender: "Women",
        category: "Party",
        subCategory: "Heel",
        brand: "UrbanWalk",
        
        images: ["/productImages/womens-heel/womens-heel-003.jpg"],
        
        inventory: [
          { size: 6, stock: 14 },
          { size: 7, stock: 18 },
          { size: 8, stock: 13 }
        ],
        
        color: { name: "Black", hex: "#000000" },
        
        rating: 4.8,
        reviewsCount: 158,
        salesCount: 890,
        tags: ["party", "top-selling"],
        
        specs: {
          material: "Glossy Synthetic",
          sole: "Rubber",
          closure: "Buckle Strap",
          weight: "0.50kg"
        },
        
        description: "Stylish black party heels crafted to elevate evening looks with confidence and elegance.",
        createdAt: "2025-09-10T10:00:00Z",
        isNew: false
      },
    
      {
        _id: "6766782f9c3e1b2a9x5e65i2", // Mongo ID
        name: "Women Black Party Heel V2", // Slight name adjustment for uniqueness
        slug: "women-black-party-heel-v2",
        sku: "URB-HEL-BLK-004",
        price: 94.99,
        discountPrice: null,
        currency: "USD",
        
        gender: "Women",
        category: "Party",
        subCategory: "Heel",
        brand: "UrbanWalk",
        
        images: ["/productImages/womens-heel/womens-heel-004.jpg"],
        
        inventory: [
          { size: 6, stock: 14 },
          { size: 7, stock: 18 },
          { size: 8, stock: 13 }
        ],
        
        color: { name: "Black", hex: "#000000" },
        
        rating: 4.8,
        reviewsCount: 158,
        salesCount: 410,
        tags: ["party", "top-selling"],
        
        specs: {
          material: "Glossy Synthetic",
          sole: "Rubber",
          closure: "Buckle Strap",
          weight: "0.50kg"
        },
        
        description: "Stylish black party heels crafted to elevate evening looks with confidence and elegance.",
        createdAt: "2025-11-15T10:00:00Z",
        isNew: true
      },
      {
        _id: "6766782f9c3e1b2a4d53r1t2", // Mongo ID
        name: "Women Black Party Heel",
        slug: "women-black-party-heel",
        sku: "URB-HEL-BLK-005",
        price: 94.99,
        discountPrice: null,
        currency: "USD",
        
        gender: "Women",
        category: "Party",
        subCategory: "Heel",
        brand: "UrbanWalk",
        
        images: ["/productImages/womens-heel/womens-heel-015.jpg"],
        
        inventory: [
          { size: 6, stock: 14 },
          { size: 7, stock: 18 },
          { size: 8, stock: 13 }
        ],
        
        color: { name: "Black", hex: "#000000" },
        
        rating: 4.8,
        reviewsCount: 158,
        salesCount: 650,
        tags: ["party", "top-selling"],
        
        specs: {
          material: "Glossy Synthetic",
          sole: "Rubber",
          closure: "Buckle Strap",
          weight: "0.48kg"
        },
        
        description: "Stylish black party heels crafted to elevate evening looks with confidence and elegance.",
        createdAt: "2025-10-10T10:00:00Z",
        isNew: false
      },
    
      {
        _id: "6766782f9c3e1b2a4d5e6161", // Mongo ID
        name: "Women Nude Classic Sandal",
        slug: "women-nude-classic-sandal", // Corrected slug to match name
        sku: "ELG-SND-NUD-001",
        price: 89.99,
        discountPrice: 79.99,
        currency: "USD",
        
        gender: "Women",
        category: "Formal",
        subCategory: "Sandal",
        brand: "ElegantStep",
        
        images: ["/productImages/womens-sandals/womens-sandals-001.jpg"],
        
        inventory: [
          { size: 6, stock: 12 },
          { size: 7, stock: 15 },
          { size: 8, stock: 10 }
        ],
        
        color: { name: "Nude", hex: "#E0BFAE" },
        
        rating: 4.7,
        reviewsCount: 136,
        salesCount: 420,
        tags: ["formal", "featured"],
        
        specs: {
          material: "Synthetic Leather",
          sole: "Rubber",
          closure: "Slip-on",
          weight: "0.42kg"
        },
        
        description: "Elegant nude sandals designed for formal occasions, offering a perfect balance of style and comfort.",
        createdAt: "2025-09-05T10:00:00Z",
        isNew: false
      },
    

      //STOPPEN HERE
      {
        _id: "6766782f9c3e1b2a4d5e6272", // Mongo ID
        name: "Women Black Sandals V2", // Clarified name
        slug: "women-black-sandals-v2", // Unique slug
        sku: "URB-SND-BLK-002",
        price: 94.99,
        discountPrice: null,
        currency: "USD",
        
        gender: "Women",
        category: "Party",
        subCategory: "Sandal",
        brand: "UrbanWalk",
        
        images: ["/productImages/womens-sandals/womens-sandals-002.jpg"],
        
        inventory: [
          { size: 6, stock: 14 },
          { size: 7, stock: 18 },
          { size: 8, stock: 13 }
        ],
        
        color: { name: "Black", hex: "#000000" },
        
        rating: 4.8,
        reviewsCount: 158,
        salesCount: 580,
        tags: ["party", "top-selling"],
        
        specs: {
          material: "Glossy Synthetic",
          sole: "Rubber",
          closure: "Buckle Strap",
          weight: "0.45kg"
        },
        
        description: "Stylish black party sandals crafted to elevate evening looks with confidence and elegance.",
        createdAt: "2025-11-20T10:00:00Z",
        isNew: true
      },
    
      {
        _id: "6766782f9c3e1b2a4d5e2332", // Mongo ID
        name: "Nike Red Running Shoe",
        slug: "nike-red-running-shoe",
        sku: "NIK-RUN-RED-003",
        price: 114.99,
        discountPrice: 94.99,
        currency: "USD",
        
        gender: "Women",
        category: "Sport",
        subCategory: "Running",
        brand: "Nike",
        
        images: ["/productImages/womens-sport-shoes/womens-sport-shoes-001.jpg"],
        
        inventory: [
          { size: 7, stock: 14 },
          { size: 8, stock: 0 }, // Out of stock size
          { size: 9, stock: 12 }
        ],
        
        color: { name: "Red", hex: "#C0392B" },
        
        rating: 4.6,
        reviewsCount: 142,
        salesCount: 1100,
        tags: ["running", "top-selling"],
        
        specs: {
          material: "Breathable Mesh",
          sole: "EVA Rubber",
          closure: "Lace-up",
          weight: "0.55kg"
        },
        
        description: "Lightweight red Nike running shoes designed for speed, comfort, and daily training.",
        createdAt: "2025-08-15T10:00:00Z",
        isNew: false
      },
    
      {
        _id: "6766782f9c3e1b2a4d5e2003", // Mongo ID
        name: "Nike Black Training Shoe",
        slug: "nike-black-training-shoe",
        sku: "NIK-TRN-BLK-004",
        price: 109.99,
        discountPrice: null,
        currency: "USD",
        
        gender: "Women",
        category: "Sport",
        subCategory: "Training",
        brand: "Nike",
        
        images: ["/productImages/womens-sport-shoes/womens-sport-shoes-002.jpg"],
        
        inventory: [
          { size: 8, stock: 16 },
          { size: 9, stock: 20 },
          { size: 10, stock: 14 }
        ],
        
        color: { name: "Black", hex: "#000000" },
        
        rating: 4.5,
        reviewsCount: 121,
        salesCount: 940,
        tags: ["training", "gym"],
        
        specs: {
          material: "Synthetic & Mesh",
          sole: "Rubber",
          closure: "Lace-up",
          weight: "0.60kg"
        },
        
        description: "Durable black Nike training shoes built for gym workouts and intense training sessions.",
        createdAt: "2025-09-25T10:00:00Z",
        isNew: false
      }
  ];