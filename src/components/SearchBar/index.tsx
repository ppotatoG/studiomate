import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex items-center justify-end h-18 sticky top-0 p-4 right-0 bg-white bg-opacity-75 transition-opacity inset-0">
      <div className={`${showSearch ? 'w-full max-w-lg' : 'w-0'}`}>
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
        )}
      </div>
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="p-2 ml-2 h-full"
      >
        {showSearch ? (
          <GrClose className="w-6 h-6" />
        ) : (
          <FaSearch className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default SearchBar;
