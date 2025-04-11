import { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
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
  // Basic state variables
  const [search, setSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [username, setUsername] = useState("User123");
  const [avatar, setAvatar] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  
  // Sell form state
  const [sellFormOpen, setSellFormOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Electronics & Appliances",
    subcategory: "",
  });
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle file reads for both avatar and product images
  const readFile = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  // Avatar image handler
  const handleAvatarChange = (e) => {
    if (e.target.files[0]) readFile(e.target.files[0], setAvatar);
  };

  // Product images handler
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const previews = [];
    
    files.forEach(file => {
      readFile(file, result => {
        previews.push(result);
        if (previews.length === files.length) setImagePreviews(previews);
      });
    });
    
    setProductImages(files);
  };

  // Form input handler
  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Sell form submission
  const handleSellSubmit = (e) => {
    e.preventDefault();

    const priceValue = Number(productData.price);
    if (!Number.isInteger(priceValue) || priceValue <= 0) {
      alert("Please enter a valid whole number greater than 0 for the price.");
      return;
    }

    const newProduct = {
      ...productData,
      price: priceValue,
      images: imagePreviews.length > 0 ? imagePreviews : ["https://via.placeholder.com/150"],
      seller: username,
    };

    addProduct(newProduct);

    // Reset form
    setSellFormOpen(false);
    setProductData({
      name: "",
      price: "",
      description: "",
      category: "Electronics & Appliances",
      subcategory: "",
    });
    setProductImages([]);
    setImagePreviews([]);
  };

  // User avatar component for reuse
  const UserAvatar = ({ size = 10 }) => (
    avatar ? (
      <img
        src={avatar}
        alt="User Avatar"
        className={`w-${size} h-${size} rounded-full object-cover border-2 border-gray-300`}
      />
    ) : (
      <div className={`w-${size} h-${size} rounded-full bg-gray-200 flex items-center justify-center`}>
        <FaUser className="text-gray-500" />
      </div>
    )
  );

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
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
              setSearchQuery(e.target.value.toLowerCase());
            }}
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
            <span>{username} | SELL</span>
          </button>

          <button onClick={toggleCart} className="relative">
            🛒 <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">{cartItems.length}</span>
          </button>

          {/* User avatar dropdown */}
          <div className="relative">
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
              <UserAvatar />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-10">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">Signed in as</p>
                  <p className="text-sm font-bold">{username}</p>
                </div>
                
                <div className="px-4 py-2">
                  <p className="text-sm font-medium mb-2">Profile Picture</p>
                  <div className="flex items-center space-x-2">
                    <UserAvatar />
                    <label className="cursor-pointer text-blue-500 text-sm">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="px-4 py-2">
                  <p className="text-sm font-medium mb-2">Username</p>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>

                <div className="px-4 py-2 border-t">
                  <button 
                    className="text-sm text-red-500 font-medium" 
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sell form modal */}
      {sellFormOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 max-h-screen overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Sell Your Product</h2>
            <form onSubmit={handleSellSubmit}>
              <div className="flex items-center mb-3 gap-2">
                <UserAvatar size="8" />
                <p className="font-medium">{username}</p>
              </div>

              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={productData.name}
                onChange={handleProductInput}
                className="w-full border p-2 rounded mb-3"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={productData.price}
                onChange={handleProductInput}
                className="w-full border p-2 rounded mb-3"
                required
              />
              <select
                name="category"
                value={productData.category}
                onChange={(e) => {
                  handleProductInput(e);
                  setProductData(prev => ({...prev, subcategory: ""}));
                }}
                className="w-full border p-2 rounded mb-3"
                required
              >
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {productData.category && categories[productData.category] && (
                <select
                  name="subcategory"
                  value={productData.subcategory}
                  onChange={handleProductInput}
                  className="w-full border p-2 rounded mb-3"
                  required
                >
                  <option value="" disabled>Select Subcategory</option>
                  {categories[productData.category].map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              )}

              <textarea
                name="description"
                placeholder="Description"
                value={productData.description}
                onChange={handleProductInput}
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
                          setImagePreviews(prev => prev.filter((_, i) => i !== index));
                          setProductImages(prev => prev.filter((_, i) => i !== index));
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

      {/* Categories modal */}
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