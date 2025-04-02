import { useState } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import Footer from "./Footer";
import "./App.css";

const products = [
  { id: 1, name: "Car", category: "Vehicles", price: 2000, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Bike", category: "Vehicles", price: 1500, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Laptop", category: "Electronics & Appliances", price: 500, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Fridge", category: "Electronics & Appliances", price: 300, image: "https://via.placeholder.com/150" },
  { id: 5, name: "Table", category: "Furniture", price: 100, image: "https://via.placeholder.com/150" },
  { id: 6, name: "Sofa", category: "Furniture", price: 400, image: "https://via.placeholder.com/150" },
  { id: 7, name: "Dog", category: "Pets", price: 250, image: "https://via.placeholder.com/150" },
  { id: 8, name: "Cat Food", category: "Pets", price: 30, image: "https://via.placeholder.com/150" },
  { id: 9, name: "Watch", category: "Fashion", price: 80, image: "https://via.placeholder.com/150" },
  { id: 10, name: "T-Shirt", category: "Fashion", price: 25, image: "https://via.placeholder.com/150" },
  { id: 11, name: "Cookware Set", category: "Home & Kitchen", price: 120, image: "https://via.placeholder.com/150" },
  { id: 12, name: "Microwave", category: "Home & Kitchen", price: 180, image: "https://via.placeholder.com/150" },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Section */}
      <header>
        <Navbar cartItems={cartItems} toggleCart={() => setCartOpen(!cartOpen)} setSearchQuery={setSearchQuery} />
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto mt-6 px-4">
        {cartOpen && <Cart cartItems={cartItems} toggleCart={() => setCartOpen(!cartOpen)} />}

        <h1 className="text-2xl font-bold text-center mb-4">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">No products found</p>
          )}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
