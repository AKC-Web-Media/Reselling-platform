const ProductCard = ({ product, addToCart, theme }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
          {product.category}
        </div>
      </div>
      
      <div className="flex-1 p-4 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-1">{product.name}</h2>
        <p className="text-gray-500 text-xs mb-2">{product.description || `High-quality ${product.name} available now.`}</p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <button 
            className="bg-indigo-500 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-indigo-600 transition-colors"
            onClick={() => addToCart({ ...product, quantity: product.quantity || 1 })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;