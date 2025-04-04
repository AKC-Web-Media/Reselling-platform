import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import logo from "./assets/logo.png";

const categories = {
  "Vehicles": ["Cars", "Bikes", "Motorcycles", "Scooters", "Spare Parts", "Bicycles"],
  "Properties": ["For Sale: Houses & Apartments", "For Rent: Houses & Apartments", "Lands & Plots", "For Rent: Shops & Offices", "For Sale: Shops & Offices", "PG & Guest Houses"],
  "Electronics & Appliances": ["TVs, Video - Audio", "Kitchen & Other Appliances", "Computers & Laptops", "Cameras & Lenses", "Games & Entertainment", "Fridges", "Computer Accessories", "Hard Disks, Printers & Monitors", "ACs", "Washing Machines"],
};

const Navbar = ({ cartItems, toggleCart, setSearchQuery, setCategoryFilter, addProduct }) => {
  const [search, setSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [sellFormOpen, setSellFormOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Electronics"); // Default category
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProductImage(file);
    }
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();
    
    // Create new product object
    const newProduct = {
      name: productName,
      price: Number(productPrice),
      description: productDescription,
      category: productCategory,
      // Use the image preview if available, otherwise use placeholder
      image: imagePreview || "https://via.placeholder.com/150"
    };
    
    // Add the new product to the products array
    addProduct(newProduct);
    
    // Alert for confirmation
    alert(`Product Added: \nName: ${productName}\nPrice: ${productPrice}\nDescription: ${productDescription}`);
    
    // Reset form and close it
    setSellFormOpen(false);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductImage(null);
    setImagePreview(null);
  };

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between px-4 md:px-6 py-3 bg-white shadow-md w-full">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-lg font-bold text-gray-700">Home</a>
          <img className="h-12" src={logo} alt="Logo" />
        </div>

        <div className="flex items-center border rounded-md overflow-hidden w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            className="px-4 py-2 outline-none w-full"
            onChange={handleSearch}
          />
          <button className="px-5 py-3 bg-gray-200">
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setCategoryOpen(true)}
          >
            All Categories
          </button>

          <button
            className="flex items-center space-x-1 px-4 py-2 bg-green-400 text-white rounded-full shadow-md"
            onClick={() => setSellFormOpen(true)}
          >
            <IoMdAdd className="text-xl" />
            <span>SELL</span>
          </button>

          <button onClick={toggleCart} className="relative">
            🛒 <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">{cartItems.length}</span>
          </button>
        </div>
      </nav>

      {/* Sell Form Modal */}
      {sellFormOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 max-h-screen overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Sell Your Product</h2>
            <form onSubmit={handleSellSubmit}>
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border p-2 rounded mb-3"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full border p-2 rounded mb-3"
                required
              />
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full border p-2 rounded mb-3"
                required
              >
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full border p-2 rounded mb-3"
                required
              />
              
              {/* Image Upload Section */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-7">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-24 h-24 object-cover mb-1"
                        />
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Upload image
                          </p>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      className="opacity-0" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {imagePreview && (
                  <button 
                    type="button"
                    onClick={() => {
                      setProductImage(null);
                      setImagePreview(null);
                    }}
                    className="mt-1 text-xs text-red-500 hover:text-red-700"
                  >
                    Remove image
                  </button>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => {
                    setSellFormOpen(false);
                    setProductImage(null);
                    setImagePreview(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Dropdown */}
      {categoryOpen && (
        <div 
          className="fixed inset-0 bg-white z-50 flex flex-col items-center p-6 overflow-y-auto"
          onClick={() => setCategoryOpen(false)}
        >
          <h2 className="text-2xl font-bold mb-4">All Categories</h2>

          {!selectedCategory ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.keys(categories).map((category, index) => (
                <div 
                  key={index} 
                  className="text-gray-700 p-2 cursor-pointer hover:underline font-semibold"
                  onClick={(e) => { 
                    e.stopPropagation();
                    setSelectedCategory(category);
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          ) : (
            <>
              <button 
                className="mb-4 px-4 py-2 bg-gray-300 rounded" 
                onClick={() => setSelectedCategory(null)}
              >
                ← Back
              </button>
              <h3 className="text-xl font-bold mb-2">{selectedCategory}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories[selectedCategory].map((sub, idx) => (
                  <div 
                    key={idx} 
                    className="text-gray-700 p-2 cursor-pointer hover:underline"
                    onClick={() => {
                      setCategoryFilter(sub);
                      setCategoryOpen(false);
                    }}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            </>
          )}

          <button 
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded"
            onClick={() => setCategoryOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;