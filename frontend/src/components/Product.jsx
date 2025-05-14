import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../endpoints/Services';
import {useCartStore} from '../utils/cartUtils';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart); 

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const categoryName = product.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Our Products</h1>
      {Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
        <div key={categoryName} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{categoryName}</h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {categoryProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 min-w-[250px] max-w-[250px]"
              >
                <Link to={`/products/${product.id}`} className="block">
                  <img
                    src={product.image || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="w-full h-48 object-contain bg-gray-100"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 mb-2">{product.category.name}</p>
                  <p className="text-gray-800 font-bold mb-4">
                    ${Number(product.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(product)} // Zustand-based cart update
                    className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
