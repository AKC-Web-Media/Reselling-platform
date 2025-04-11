import React, { useState, useEffect } from 'react';

const ProductCard = ({ product, addToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    setIsModalOpen(true);
  };

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

  // Seller information with fallback values
  const sellerName = product.sellerName || 'Unknown Seller';
  const sellerAvatar = product.sellerAvatar || '/api/placeholder/40/40';
  const sellerRating = product.sellerRating || 4.5;
  const sellerSales = product.sellerSales || '100+';
  
  // Product images (main + additional)
  const productImages = product.images || [product.image || '/api/placeholder/500/500'];
  if (productImages.length === 1 && product.image && !product.images) {
    // Add some variation if only one image exists
    productImages.push(product.image);
  }

  return (
    <>
      {/* Product Card */}
      <div
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        onClick={handleCardClick}
      >
        {/* Card Header - Image */}
        <div className="relative h-56 overflow-hidden bg-gray-100">
          <img 
            src={product.image || '/api/placeholder/300/200'}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
          />
          
          {/* Badges */}
          <div className="absolute top-0 left-0 right-0 p-3 flex justify-between">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>
          
          {/* Category Badge */}
          {product.category && (
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-full">
              {product.category}
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button 
              className="bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Wishlist function
              }}
              aria-label="Add to wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Card Body - Content */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Product Title */}
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-1 hover:text-indigo-600 transition-colors">
            {product.name}
          </h2>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 text-sm">
              {'★'.repeat(Math.floor(product.rating || 4))}
              {!Number.isInteger(product.rating || 4) && '½'}
              {'☆'.repeat(5 - Math.ceil(product.rating || 4))}
            </div>
            <span className="ml-1 text-xs text-gray-500">
              ({product.reviewCount || 42})
            </span>
          </div>
          
          {/* Short Description */}
          <p className="text-gray-500 text-xs mb-3 line-clamp-2">
            {product.description || 'No description available.'}
          </p>
          
          {/* Pricing */}
          <div className="mt-auto">
            <div className="flex items-end gap-2 mb-3">
              <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              {product.originalPrice && (
                <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
              )}
            </div>
            
            {/* Seller Info */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
              <img 
                src={sellerAvatar} 
                alt={sellerName} 
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs text-gray-600 truncate">{sellerName}</span>
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
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row max-h-[90vh]">
              {/* Left side - Image Gallery */}
              <div className="w-full md:w-5/12 bg-gray-50 relative">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-gray-900"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close Modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Main Image */}
                <div className="h-72 md:h-96 flex items-center justify-center p-6 bg-white">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                {/* Thumbnails */}
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {productImages.map((img, index) => (
                    <button 
                      key={index}
                      className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                        selectedImage === index ? 'border-indigo-500' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                
                {/* Seller Information */}
                <div className="p-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">Seller Information</h3>
                  <div className="flex items-center">
                    <img 
                      src={sellerAvatar} 
                      alt={sellerName}
                      className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-medium">{sellerName}</h4>
                      <div className="flex items-center text-yellow-400 text-xs mb-1">
                        {'★'.repeat(Math.floor(sellerRating))}
                        {!Number.isInteger(sellerRating) && '½'}
                        {'☆'.repeat(5 - Math.ceil(sellerRating))}
                        <span className="text-gray-600 ml-1">{sellerRating.toFixed(1)}</span>
                      </div>
                      <p className="text-gray-500 text-xs">{sellerSales} products sold</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Product Details */}
              <div className="w-full md:w-7/12 p-6 overflow-y-auto max-h-[90vh] border-t md:border-t-0 md:border-l border-gray-200">
                <div className="space-y-6">
                  {/* Badge and Title */}
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {product.isNew && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
                          New Arrival
                        </span>
                      )}
                      {product.category && (
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
                          {product.category}
                        </span>
                      )}
                      {(product.stock <= 5 && product.stock > 0) && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
                          Low Stock
                        </span>
                      )}
                    </div>
                    
                    <h2 id="product-modal-title" className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h2>
                  </div>
                  
                  {/* Price and Rating */}
                  <div className="flex flex-wrap items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl md:text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      {product.discount > 0 && (
                        <span className="text-sm text-green-600 font-medium">
                          You save: ${(product.originalPrice - product.price).toFixed(2)} ({product.discount}%)
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(product.rating || 4.5))}
                        {!Number.isInteger(product.rating || 4.5) && '½'}
                        {'☆'.repeat(5 - Math.ceil(product.rating || 4.5))}
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        {product.reviewCount || 120} reviews
                      </span>
                    </div>
                  </div>
                  
                  {/* Availability */}
                  <div className="flex items-center text-sm">
                    <span className="mr-2 font-medium">Availability:</span>
                    {product.stock > 0 ? (
                      <span className="text-green-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        In Stock ({product.stock} available)
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Out of Stock
                      </span>
                    )}
                  </div>
                  
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.longDescription || product.description || 
                       'This premium product brings top-notch features and reliable quality. Ideal for those who demand style, performance, and value all in one.'}
                    </p>
                  </div>
                  
                  {/* Features List */}
                  {product.features && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {(product.features || ['Premium quality', 'Durable design', 'Versatile use']).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Specifications */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-600 text-sm">Brand</span>
                        <span className="font-medium text-gray-900 text-sm">{product.brand || 'Generic'}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-600 text-sm">Category</span>
                        <span className="font-medium text-gray-900 text-sm">{product.category || 'General'}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-600 text-sm">Color</span>
                        <span className="font-medium text-gray-900 text-sm">{product.color || 'Various'}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-600 text-sm">Material</span>
                        <span className="font-medium text-gray-900 text-sm">{product.material || 'Mixed'}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-600 text-sm">Dimensions</span>
                        <span className="font-medium text-gray-900 text-sm">{product.dimensions || 'Standard'}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-600 text-sm">Weight</span>
                        <span className="font-medium text-gray-900 text-sm">{product.weight || '0.5 kg'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button 
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                      onClick={() => {
                        addToCart({ ...product, quantity: 1 });
                        setIsModalOpen(false);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                    <button 
                      className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                      onClick={() => {}}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Add to Wishlist
                    </button>
                  </div>
                  
                  {/* Shipping & Returns */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-base font-semibold mb-2">Shipping & Returns</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Free shipping on orders over $50</span>
                      </div>
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Delivery within 3-5 business days</span>
                      </div>
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>30-day returns policy</span>
                      </div>
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Secure checkout process</span>
                      </div>
                    </div>
                  </div>
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