import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import "./Appshell.css";

const initialProducts = [
  { id: 1, name: "Car", category: "Vehicles", price: 2000, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Bike", category: "Vehicles", price: 1500, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Laptop", category: "Electronics", price: 500, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Phone", category: "Electronics", price: 300, image: "https://via.placeholder.com/150" },
  { id: 5, name: "Watch", category: "Accessories", price: 150, image: "https://via.placeholder.com/150" },
  { id: 6, name: "Shoes", category: "Fashion", price: 100, image: "https://via.placeholder.com/150" },
  { id: 7, name: "T-Shirt", category: "Clothing", price: 50, image: "https://via.placeholder.com/150" },
  { id: 8, name: "Headphones", category: "Electronics", price: 200, image: "https://via.placeholder.com/150" },
  { id: 9, name: "Backpack", category: "Accessories", price: 80, image: "https://via.placeholder.com/150" },
  { id: 10, name: "Sunglasses", category: "Fashion", price: 120, image: "https://via.placeholder.com/150" },
  { id: 11, name: "Tablet", category: "Electronics", price: 400, image: "https://via.placeholder.com/150" },
  { id: 12, name: "Chair", category: "Furniture", price: 250, image: "https://via.placeholder.com/150" },
];

function Appshell() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [products, setProducts] = useState(initialProducts);

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

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [
      { 
        id: prevProducts.length + 1, 
        ...newProduct 
      }, 
      ...prevProducts
    ]);
  };

  const filteredProducts = products.filter(
    (p) =>
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter === "" || p.category === categoryFilter || 
       (p.subcategory && p.subcategory === categoryFilter))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        cartItems={cartItems} 
        toggleCart={() => setCartOpen(!cartOpen)} 
        setSearchQuery={setSearchQuery} 
        setCategoryFilter={setCategoryFilter}
        addProduct={addProduct} 
      />
      
      {cartOpen && <Cart cartItems={cartItems} toggleCart={() => setCartOpen(!cartOpen)} />}

      <main className="flex-grow container mx-auto mt-6 px-4">
        <h1 className="text-2xl font-bold text-center mb-4">Our Products</h1>
        {categoryFilter && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Category: {categoryFilter}</h2>
            <button 
              onClick={() => setCategoryFilter("")}
              className="px-3 py-1 bg-gray-200 rounded-md text-sm"
            >
              Clear Filter
            </button>
          </div>
        )}
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

      <Footer />
    </div>
  );
}

export default Appshell;