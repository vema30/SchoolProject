import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-14 bg-yellow-200 px-6 shadow-md'>
      {/* Left Section */}
      <div className='flex items-center space-x-4'>
        <Link to='/index' className='text-blue-800 font-bold text-lg hover:text-blue-600 transition'>
          Blue bells
        </Link>
      </div>

      {/* Center Section */}
      <div className='flex flex-1 justify-center'>
        <p className='text-gray-700 font-semibold text-lg'>Student management</p>
      </div>

      {/* Right Section */}
      <div className='flex items-center space-x-5'>
        <Link to="/login" className='flex items-center justify-center text-gray-700 hover:text-gray-900 transition'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </Link>
        <div className='text-gray-700 font-medium'>Name</div>
      </div>
    </div>
  );
};

export default Navbar;
