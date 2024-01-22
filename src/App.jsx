import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setData(response?.data?.products || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const visibleData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className='grid grid-cols-3 gap-4 p-4'>
        {visibleData.map((item) => (
          <div key={item.id} className='w-full bg-white rounded overflow-hidden shadow-md'>
            <img className='w-full h-48 object-cover' src={item.thumbnail} alt="Product" />
            <div className='p-4'>
              <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
              <p className='text-gray-700'>{item.description}</p>
              <p className='text-gray-800 mt-2'>$ {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center gap-2 mb-2'>
        <span
          className='px-4 py-2 bg-blue-600 rounded text-white cursor-pointer'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          prev
        </span>

        {[...Array(totalPages)].map((_, i) => (
          <span
            key={i}
            className={`px-4 py-2 bg-blue-600 rounded text-white cursor-pointer ${
              currentPage === i + 1 ? 'bg-yellow-500' : ''
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </span>
        ))}

        <span
          className='px-4 py-2 bg-blue-600 rounded text-white cursor-pointer'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          next
        </span>
      </div>
    </div>
  );
};

export default App;
