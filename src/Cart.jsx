const Cart = ({ cartItems, toggleCart }) => {
    return (
      <div className="absolute top-16 right-4 bg-white p-4 shadow-lg rounded w-64">
        <h2 className="text-lg font-bold mb-2">Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No items in cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))
        )}
        <button className="bg-red-500 text-white w-full mt-2 py-1 rounded" onClick={toggleCart}>
          Close
        </button>
      </div>
    );
  };
  
  export default Cart;
  
  