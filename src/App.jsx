import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPage = (changedPage) => {
    if (
      changedPage >= 1 &&
      changedPage <= Math.ceil(products.length / 10) &&
      changedPage !== page
    )
      setPage(changedPage)
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  }

  const filteredProducts = products.filter(product =>
    searchQuery.split(' ').some(word =>
      product.title.toLowerCase().includes(word.toLowerCase())
    )
  );

  return (
    <div className='bg-zinc-800 h-[100%] w-full p-10'>
      <div className='search-container bg-gray-200 rounded-xl mx-[10%] w-[80%] p-2'>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className='flex justify-center items-center gap-10 flex-wrap p-20'>
        {filteredProducts.slice(page * 10 - 10, page * 10).map((product, index) => (
          <div key={index} className='rounded-lg cursor-pointer hover:translate-y-1 overflow-hidden shadow-md bg-white w-64 h-64'>
            <div className='h-3/5'>
              <img src={product.thumbnail} alt={`Thumbnail ${index}`} className='w-full h-full object-cover' />
            </div>
            <div className='p-4'>
              <p className='text-lg font-bold'>{product.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='pagination bg-red-700 h-20 w-full flex justify-center items-center'>
        <span
          className={`cursor-pointer p-2 ${page !== 1 ? "" : "hidden"}`}
          onClick={() => selectedPage(page - 1)}
        >◀️
        </span>
        {[...Array(Math.ceil(filteredProducts.length / 10))].map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer p-2 ${page === index + 1 && "text-white font-bold"}`}
            onClick={() => selectedPage(index + 1)}
          >{index + 1}</span>
        ))}
        <span
          className={`cursor-pointer p-2 ${page !== Math.ceil(filteredProducts.length / 10) ? "" : "hidden"}`}
          onClick={() => selectedPage(page + 1)}
        >▶️
        </span>
      </div>
      
    </div>
  );
}

export default App;
