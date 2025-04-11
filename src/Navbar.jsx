import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import logo from "./assets/logo.png";

const categories = {
  Vehicles: ["Cars", "Bikes", "Motorcycles", "Scooters", "Spare Parts", "Bicycles"],
  Properties: [
    "For Sale: Houses & Apartments",
    "For Rent: Houses & Apartments",
    "Lands & Plots",
    "For Rent: Shops & Offices",
    "For Sale: Shops & Offices",
    "PG & Guest Houses",
  ],
  "Electronics & Appliances": [
    "TVs, Video - Audio",
    "Kitchen & Other Appliances",
    "Computers & Laptops",
    "Cameras & Lenses",
    "Games & Entertainment",
    "Fridges",
    "Computer Accessories",
    "Hard Disks, Printers & Monitors",
    "ACs",
    "Washing Machines",
  ],
};

const Navbar = ({ cartItems, toggleCart, setSearchQuery, setCategoryFilter, addProduct }) => {
  const [search, setSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [sellFormOpen, setSellFormOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Electronics & Appliances");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  // Added seller info states
  const [sellerUsername, setSellerUsername] = useState("");
  const [sellerAvatar, setSellerAvatar] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const previews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });

    setProductImages(files);
  };

  // Handle avatar image change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSellerAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();

    if (!sellerUsername.trim()) {
      alert("Please enter a seller username.");
      return;
    }

    const priceValue = Number(productPrice);

    // Validate price: must be positive whole number
    if (!Number.isInteger(priceValue) || priceValue <= 0) {
      alert("Please enter a valid whole number greater than 0 for the price.");
      return;
    }

    const newProduct = {
      name: productName,
      price: priceValue,
      description: productDescription,
      category: productCategory,
      subcategory: productSubCategory,
      images: imagePreviews.length > 0 ? imagePreviews : ["https://via.placeholder.com/150"],
      seller: sellerUsername,
      sellerAvatar: sellerAvatar,
    };

    addProduct(newProduct);

    alert(`Product Added:
Name: ${productName}
Price: ${productPrice}
Category: ${productCategory}
Subcategory: ${productSubCategory}
Description: ${productDescription}
Seller: ${sellerUsername}`);

    setSellFormOpen(false);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductCategory("Electronics & Appliances");
    setProductSubCategory("");
    setProductImages([]);
    setImagePreviews([]);
    // Don't reset seller info
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

      {sellFormOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 max-h-screen overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Sell Your Product</h2>
            <form onSubmit={handleSellSubmit}>
              {/* Seller information section */}
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <h3 className="text-md font-medium mb-2">Seller Information</h3>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0">
                    {sellerAvatar ? (
                      <img
                        src={sellerAvatar}
                        alt="Seller Avatar"
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        👤
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder="Your Username"
                      value={sellerUsername}
                      onChange={(e) => setSellerUsername(e.target.value)}
                      className="w-full border p-2 rounded mb-1"
                      required
                    />
                    
                    <label className="text-xs text-blue-500 cursor-pointer inline-block">
                      Upload profile picture
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Product information */}
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
                onChange={(e) => {
                  setProductCategory(e.target.value);
                  setProductSubCategory("");
                }}
                className="w-full border p-2 rounded mb-3"
                required
              >
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {productCategory && categories[productCategory] && (
                <select
                  value={productSubCategory}
                  onChange={(e) => setProductSubCategory(e.target.value)}
                  className="w-full border p-2 rounded mb-3"
                  required
                >
                  <option value="" disabled>Select Subcategory</option>
                  {categories[productCategory].map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              )}

              <textarea
                placeholder="Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full border p-2 rounded mb-3"
                required
              />

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images (max 4)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-2"
                />
                <div className="flex gap-2 flex-wrap">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newPreviews = [...imagePreviews];
                          const newFiles = [...productImages];
                          newPreviews.splice(index, 1);
                          newFiles.splice(index, 1);
                          setImagePreviews(newPreviews);
                          setProductImages(newFiles);
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => {
                    setSellFormOpen(false);
                    setProductImages([]);
                    setImagePreviews([]);
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