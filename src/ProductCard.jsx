const ProductCard = ({ product, addToCart }) => {
    return (
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200">
        <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
        <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
        <p className="text-gray-500">${product.price}</p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-600"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    );
  };
  
  export default ProductCard;
  