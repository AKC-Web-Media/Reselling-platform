import { useState } from "react";
import { FaSearch, FaHeart, FaBars } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import logo from './assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-1 bg-white shadow-md">  
      <img className="h-20 " src={logo} alt="Logo" />
      {/* <div className="text-2xl font-bold text-gray-800">DEALUP</div> */}
      <div className="hidden md:flex items-center border rounded-md overflow-hidden">
        <select className="px-4 py-2 border-r outline-none bg-white">
          <option>Banglore</option>
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Kolkata</option>
          <option>Chennai</option>
          <option>Hyderabad</option>
        </select>
        <input 
          type="text" 
          placeholder="Search" 
          className="px-4 py-2 outline-none w-40 md:w-60 lg:w-80"
        />
        <button className="px-5 py-4 bg-gray-200">
          <FaSearch />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <FaHeart className="text-red-500 cursor-pointer hidden md:block" />
        <button className="flex items-center space-x-1 px-4 py-2 bg-green-400 text-white rounded-full shadow-md">
          <IoMdAdd className="text-xl" />
          <span>SELL</span>
        </button>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">
          <FaBars />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
          
          <FaHeart className="text-red-500 cursor-pointer" />
          <div className="flex items-center border rounded-md overflow-hidden w-3/4">
            <select className="px-4 py-2 border-r outline-none bg-white">
            <option>Banglore</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            <option>Chennai</option>
            <option>Hyderabad</option>
            </select>
            <input 
              type="text" 
              placeholder="Search" 
              className="px-4 py-2 outline-none w-full"
            />
            <button className="px-5 py-4 bg-gray-200">
              <FaSearch />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
