import { useState, useRef } from "react";
import { FaSearch, FaChevronLeft, FaImages } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { RiShoppingCart2Line } from "react-icons/ri";
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
  
  // Seller info states
  const [sellerUsername, setSellerUsername] = useState("");
  const [sellerAvatar, setSellerAvatar] = useState(null);
  
  // Ref for image input
  const imageInputRef = useRef(null);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit to maximum 4 images total
    const availableSlots = 4 - imagePreviews.length;
    const newFiles = files.slice(0, availableSlots);
    
    if (newFiles.length === 0) return;
    
    const previews = [...imagePreviews];
    const newImages = [...productImages];

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result);
        newImages.push(file);
        
        if (previews.length === imagePreviews.length + newFiles.length) {
          setImagePreviews(previews);
          setProductImages(newImages);
        }
      };
      reader.readAsDataURL(file);
    });
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
  
  // Trigger file input click
  const triggerImageUpload = (e) => {
    e.stopPropagation();
    imageInputRef.current.click();
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
      images: imagePreviews.length > 0 ? imagePreviews : ["/api/placeholder/400/200"],
      seller: sellerUsername,
      sellerAvatar: sellerAvatar || "/api/placeholder/40/40",
      createdAt: new Date().toISOString()
    };

    // Add the new product to the list
    addProduct(newProduct);

    // Success message
    alert(`Product successfully listed: ${productName}`);

    // Reset form fields but keep seller info
    setSellFormOpen(false);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductCategory("Electronics & Appliances");
    setProductSubCategory("");
    setProductImages([]);
    setImagePreviews([]);
  };

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between px-4 md:px-6 py-3 bg-white shadow-md w-full sticky top-0 z-20">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-lg font-bold flex items-center">
            <img className="h-10 mr-2" src={logo} alt="Logo" />
            <span className="hidden md:inline text-gray-800">Marketplace</span>
          </a>
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full md:w-96 focus-within:ring-2 focus-within:ring-blue-400 transition-all mx-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            className="px-4 py-2 outline-none w-full"
            onChange={handleSearch}
          />
          <button className="px-5 py-3 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg transition-all border border-purple-700 hover:shadow-lg hover:from-purple-600 hover:to-indigo-700 flex items-center space-x-1 font-medium"
            onClick={() => setCategoryOpen(true)}
          >
            <span>All Categories</span>
          </button>

          <button
            className="flex items-center space-x-1 px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-md transition-all hover:shadow-lg hover:from-yellow-500 hover:to-orange-600 border border-orange-600 font-medium"
            onClick={() => setSellFormOpen(true)}
          >
            <IoMdAdd className="text-xl" />
            <span>SELL</span>
          </button>

          <button onClick={toggleCart} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <RiShoppingCart2Line className="text-2xl text-gray-700" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {sellFormOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
              <IoMdAdd className="text-orange-500 mr-2" /> Sell Your Product
            </h2>
            <form onSubmit={handleSellSubmit}>
              {/* Seller information section */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-md font-medium mb-3 text-gray-700">Seller Information</h3>
                
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-shrink-0">
                    {sellerAvatar ? (
                      <img
                        src={sellerAvatar}
                        alt="Seller Avatar"
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-400">
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
                      className="w-full border p-2 rounded mb-2 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      required
                    />
                    
                    <label className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer inline-block">
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    placeholder="What are you selling?"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="Enter whole number amount"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={productCategory}
                    onChange={(e) => {
                      setProductCategory(e.target.value);
                      setProductSubCategory("");
                    }}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    required
                  >
                    {Object.keys(categories).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {productCategory && categories[productCategory] && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                    <select
                      value={productSubCategory}
                      onChange={(e) => setProductSubCategory(e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      required
                    >
                      <option value="" disabled>Select Subcategory</option>
                      {categories[productCategory].map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Describe your product (condition, features, etc.)"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-300 focus:border-transparent h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images ({imagePreviews.length}/4)
                  </label>
                  
                  {/* Hidden file input */}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={imageInputRef}
                  />
                  
                  {/* Image grid with add button */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Image previews */}
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
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
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    
                    {/* Add image button - only show if less than 4 images */}
                    {imagePreviews.length < 4 && (
                      <button
                        type="button"
                        onClick={triggerImageUpload}
                        className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-4 hover:bg-gray-50 aspect-square transition-colors"
                      >
                        <FaImages className="text-2xl text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Add Images</span>
                      </button>
                    )}
                  </div>
                  
                  {/* Help text */}
                  <p className="text-xs text-gray-500 mt-2">
                    {imagePreviews.length === 0 
                      ? "Upload up to 4 images of your product" 
                      : `${4 - imagePreviews.length} more image${4 - imagePreviews.length !== 1 ? 's' : ''} can be added`}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors"
                  onClick={() => {
                    setSellFormOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-medium rounded transition-colors shadow-md"
                >
                  List For Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {categoryOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-start overflow-y-auto pt-10 pb-10 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">All Categories</h2>
              <button
                className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
                onClick={() => setCategoryOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {!selectedCategory ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(categories).map((category, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-purple-50 hover:border-purple-200 transition-colors group"
                      onClick={() => {
                        setSelectedCategory(category);
                      }}
                    >
                      <div className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                        {category}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{categories[category].length} subcategories</div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <button
                    className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center transition-colors text-gray-700"
                    onClick={() => {
                      setSelectedCategory(null);
                    }}
                  >
                    <FaChevronLeft className="mr-2" /> Back to Categories
                  </button>
                  
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{selectedCategory}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {categories[selectedCategory].map((sub, idx) => (
                      <div
                        key={idx}
                        className="border rounded-lg p-3 hover:bg-yellow-50 hover:border-yellow-200 cursor-pointer transition-colors"
                        onClick={() => {
                          setCategoryFilter(sub);
                          setCategoryOpen(false);
                        }}
                      >
                        <span className="text-gray-800">{sub}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;