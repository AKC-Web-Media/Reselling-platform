import { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import logo from "./assets/logo.png";

const categories = {
  "Vehicles": ["Cars", "Bikes", "Motorcycles", "Scooters", "Spare Parts", "Bicycles"],
  "Properties": ["For Sale: Houses & Apartments", "For Rent: Houses & Apartments", "Lands & Plots", "For Rent: Shops & Offices", "For Sale: Shops & Offices", "PG & Guest Houses"],
  "Electronics & Appliances": ["TVs, Video - Audio", "Kitchen & Other Appliances", "Computers & Laptops", "Cameras & Lenses", "Games & Entertainment", "Fridges", "Computer Accessories", "Hard Disks, Printers & Monitors", "ACs", "Washing Machines"],
  "Mobiles": ["Mobile Phones", "Accessories", "Tablets"],
  "Jobs": ["Data Entry & Back Office", "Sales & Marketing", "BPO & Telecaller", "Driver", "Office Assistant", "Delivery & Collection", "Teacher", "Cook", "Receptionist & Front Office", "Operator & Technician", "IT Engineer & Developer", "Hotel & Travel Executive", "Accountant", "Designer", "Other Jobs"],
  "Furniture": ["Sofa & Dining", "Beds & Wardrobes", "Home Decor & Garden", "Kids Furniture", "Other Household Items"],
  "Fashion": ["Men", "Women", "Kids"],
  "Pets": ["Fishes & Aquarium", "Pet Food & Accessories", "Dogs", "Other Pets"],
  "Books, Sports & Hobbies": ["Books", "Gym & Fitness", "Musical Instruments", "Sports Equipment", "Other Hobbies"],
  "Services": ["Education & Classes", "Tours & Travel", "Electronics Repair & Services", "Health & Beauty", "Home Renovation & Repair", "Cleaning & Pest Control", "Legal & Documentation Services", "Packers & Movers", "Others"]
};

const Navbar = ({ cartItems, toggleCart, setSearchQuery, setCategoryFilter }) => {
  const [search, setSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setSearchQuery(value);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-4 md:px-6 py-3 bg-white shadow-md w-full">
      {/* Left Section - Home & Logo */}
      <div className="flex items-center space-x-4">
        <a href="/" className="text-lg font-bold text-gray-700">Home</a>
        <img className="h-12" src={logo} alt="Logo" />
      </div>

      {/* Search Bar */}
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

      {/* Filter & All Categories */}
      <div className="flex items-center space-x-4">
        {/* Filter Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setCategoryOpen(true)}
        >
          All Categories
        </button>

        {/* Cart & Sell */}
        <button className="flex items-center space-x-1 px-4 py-2 bg-green-400 text-white rounded-full shadow-md">
          <IoMdAdd className="text-xl" />
          <span>SELL</span>
        </button>
        <button onClick={toggleCart} className="relative">
          🛒 <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">{cartItems.length}</span>
        </button>
      </div>

      {/* Full-Screen Category Dropdown */}
      {categoryOpen && (
        <div 
          className="fixed inset-0 bg-white z-50 flex flex-col items-center p-6 overflow-y-auto"
          onClick={() => setCategoryOpen(false)}
        >
          <h2 className="text-2xl font-bold mb-4">All Categories</h2>

          {/* Show main categories */}
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
    </nav>
  );
};

export default Navbar;
