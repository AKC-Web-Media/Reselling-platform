const Cart = ({ cartItems, toggleCart, theme }) => {
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 h-full bg-white shadow-lg w-80 z-50 transform transition-transform duration-300">
      <div className="p-4 bg-indigo-500 text-white flex justify-between items-center">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button 
          className="text-white hover:text-gray-200 transition-colors"
          onClick={toggleCart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="p-4 max-h-[calc(100vh-180px)] overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500">Your cart is empty</p>
            <p className="text-gray-400 text-sm mt-1">Add items to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex border-b border-gray-100 py-3">
                <div className="w-16 h-16 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-indigo-600 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <button className="text-xs text-red-500 hover:text-red-600">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-lg font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>
        <button 
          className={`w-full py-2 rounded font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
        <button 
          className="w-full mt-2 py-2 rounded font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors"
          onClick={toggleCart}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;