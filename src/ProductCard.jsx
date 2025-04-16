import React, { useState, useEffect } from 'react';

const ProductCard = ({ product, addToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Handle proper image display - account for both formats of image data
  const productImages = Array.isArray(product.images) ? product.images : 
    (product.image ? [product.image] : ['/api/placeholder/500/500']);
  
  // Get seller info with fallbacks for both object and string formats
  const sellerName = typeof product.seller === 'object' ? product.seller.username : 
    (product.seller || product.sellerName || 'Unknown Seller');
    
  const sellerAvatar = typeof product.seller === 'object' ? product.seller.avatar : 
    (product.sellerAvatar || '/api/placeholder/40/40');
  
  // Modal escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Image swipe functionality
  const nextImage = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prevIndex) => 
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  // Touch swipe handling for images
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) >= minSwipeDistance;
    
    if (isSwipe) {
      // left swipe (negative distance) means next, right swipe means previous
      if (distance > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  // Handler to open modal only when card is clicked (not buttons)
  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    setIsModalOpen(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get category and subcategory display
  const displayCategory = product.subcategory || product.category || "";

  // Calculate any discounts
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  // Estimate delivery date (5-7 days from now)
  const getEstimatedDelivery = () => {
    const today = new Date();
    const minDelivery = new Date(today);
    minDelivery.setDate(today.getDate() + 5);
    
    const maxDelivery = new Date(today);
    maxDelivery.setDate(today.getDate() + 7);
    
    const options = { month: 'short', day: 'numeric' };
    return `${minDelivery.toLocaleDateString(undefined, options)} - ${maxDelivery.toLocaleDateString(undefined, options)}`;
  };

  // Product specifications - extract from product or use placeholders
  const getProductSpecifications = () => {
    const specs = product.specifications || {};
    
    // Default specs if not provided
    return {
      condition: specs.condition || product.condition || "New",
      warranty: specs.warranty || product.warranty || "No warranty",
      material: specs.material || product.material || "Not specified",
      brand: specs.brand || product.brand || "Unbranded",
      modelNumber: specs.modelNumber || product.modelNumber || "Not available",
      dimensions: specs.dimensions || product.dimensions || "Not specified",
      weight: specs.weight || product.weight || "Not specified",
      color: specs.color || product.color || "Not specified"
    };
  };

  const specifications = getProductSpecifications();
  
  // Handle quantity change
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      {/* Product Card */}
      <div
        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer transform hover:-translate-y-1"
        onClick={handleCardClick}
      >
        {/* Card Image with Navigation */}
        <div 
          className="relative h-56 overflow-hidden bg-gray-100"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Image */}
          {productImages[activeImageIndex] ? (
            <img 
              src={productImages[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discountPercentage}% OFF
            </div>
          )}
          
          {/* Image Navigation - only show if multiple images */}
          {productImages.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 shadow-md text-gray-800 hover:bg-opacity-100 transition-all z-10"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 shadow-md text-gray-800 hover:bg-opacity-100 transition-all z-10"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full ${activeImageIndex === index ? 'bg-indigo-600' : 'bg-white bg-opacity-50'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Category Badge */}
          {displayCategory && (
            <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-full">
              {displayCategory}
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Product Title */}
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-1">
            {product.name}
          </h2>
          
          {/* Price */}
          <div className="flex items-end gap-2 mb-3">
            <p className="text-xl font-bold text-gray-900">₹{product.price?.toLocaleString() || 0}</p>
            {hasDiscount && (
              <p className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</p>
            )}
          </div>
          
          {/* Short Description */}
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
            {product.description || 'No description available.'}
          </p>
          
          {/* Seller Info */}
          <div className="flex items-center gap-2 mb-3 mt-auto">
            <img 
              src={sellerAvatar} 
              alt={sellerName} 
              className="w-6 h-6 rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 font-medium">{sellerName}</span>
              {product.createdAt && (
                <span className="text-xs text-gray-400">{formatDate(product.createdAt)}</span>
              )}
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm"
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ ...product, quantity: 1 });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Enhanced Product Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden my-6">
            <div className="flex flex-col md:flex-row max-h-[90vh]">
              {/* Left side - Image Gallery */}
              <div className="w-full md:w-2/5 bg-gray-50 relative">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-gray-900"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Main Image with Navigation */}
                <div 
                  className="h-80 md:h-96 flex items-center justify-center p-6 bg-white relative"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <img
                    src={productImages[activeImageIndex]}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                  
                  {productImages.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 bg-white rounded-full p-2 shadow-md text-gray-800 hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 bg-white rounded-full p-2 shadow-md text-gray-800 hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Strip */}
                {productImages.length > 1 && (
                  <div className="flex overflow-x-auto p-3 gap-2 bg-gray-100 h-24">
                    {productImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-all ${
                          idx === activeImageIndex ? 'border-indigo-600' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${idx}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Right side - Product Details */}
              <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto">
                {/* Category badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {displayCategory && (
                    <div className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                      {displayCategory}
                    </div>
                  )}
                  {specifications.condition && (
                    <div className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                      {specifications.condition}
                    </div>
                  )}
                  {hasDiscount && (
                    <div className="inline-block bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                      {discountPercentage}% OFF
                    </div>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h2>
                
                {/* Price section */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price?.toLocaleString() || 0}</span>
                  {hasDiscount && (
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                {/* Seller info with larger avatar */}
                <div className="flex items-center mb-5 bg-gray-50 p-3 rounded-lg">
                  <img 
                    src={sellerAvatar} 
                    alt={sellerName} 
                    className="w-12 h-12 rounded-full object-cover border border-gray-200 mr-3" 
                  />
                  <div>
                    <span className="font-medium text-gray-800">{sellerName}</span>
                    {product.createdAt && (
                      <p className="text-sm text-gray-500">
                        Listed on {formatDate(product.createdAt)}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Key Info Cards - NEW ADDITION */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {/* Delivery Info */}
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <h3 className="font-medium text-gray-800">Delivery</h3>
                    </div>
                    <p className="text-sm text-gray-600">Estimated: {getEstimatedDelivery()}</p>
                  </div>
                  
                  {/* Warranty Info */}
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <h3 className="font-medium text-gray-800">Warranty</h3>
                    </div>
                    <p className="text-sm text-gray-600">{specifications.warranty}</p>
                  </div>
                  
                  {/* Return Policy */}
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                      </svg>
                      <h3 className="font-medium text-gray-800">Returns</h3>
                    </div>
                    <p className="text-sm text-gray-600">7-day easy returns</p>
                  </div>
                  
                  {/* Payment Info */}
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                    <div className="flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <h3 className="font-medium text-gray-800">Payment</h3>
                    </div>
                    <p className="text-sm text-gray-600">Secure payment options</p>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {product.description || 'No description available.'}
                  </p>
                </div>
                
                {/* Specifications */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Specifications</h3>
                  <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 divide-y divide-gray-200">
                      {Object.entries(specifications).filter(([key]) => key !== 'condition' && key !== 'warranty').map(([key, value]) => (
                        <div key={key} className="grid grid-cols-3 p-3">
                          <span className="text-sm font-medium text-gray-600 capitalize">{key}</span>
                          <span className="text-sm text-gray-800 col-span-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Quantity and Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-32">
                    <button 
                      onClick={decrementQuantity}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    >−</button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-2 text-center focus:outline-none"
                    />
                    <button 
                      onClick={incrementQuantity}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    >+</button>
                  </div>
                  
                  <button 
                    className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ ...product, quantity });
                      setIsModalOpen(false);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;