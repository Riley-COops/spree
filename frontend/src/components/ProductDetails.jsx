import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchProducts, addToCart } from '../endpoints/Services';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);

        // Fetch related products
        const allProducts = await fetchProducts();
        const filteredProducts = allProducts.filter(
          (p) => p.category.name === data.category.name && p.id !== data.id
        );
        setRelatedProducts(filteredProducts);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id); // Call the addToCart function
      alert('Product added to cart successfully!');
    } catch (err) {
      alert('Failed to add product to cart. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-10 text-gray-500">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
          <img
            src={product.image || 'https://via.placeholder.com/500'}
            alt={product.name}
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>

        {/* Product Information */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category.name}</p>
          <p className="text-gray-800 font-bold text-xl mb-4">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">
            {product.details?.description || 'No description available.'}
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={handleAddToCart} // Add onClick handler
              className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
            <p className="text-gray-600">Available: {product.available ? 'Yes' : 'No'}</p>
          </div>

          {/* Extra Content */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Weight: {product.details?.weight || 'N/A'}</li>
              <li>
                Dimensions:{' '}
                {product.details?.dimension
                  ? `${product.details.dimension.length} x ${product.details.dimension.width} x ${product.details.dimension.height}`
                  : 'N/A'}
              </li>
              <li>Quantity Available: {product.details?.quantity || 'N/A'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 min-w-[250px] max-w-[250px]"
              >
                <Link to={`/products/${relatedProduct.id}`} className="block">
                  <img
                    src={relatedProduct.image || 'https://via.placeholder.com/150'}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-contain bg-gray-100"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/products/${relatedProduct.id}`} className="block">
                    <h3 className="text-lg font-semibold mb-2">{relatedProduct.name}</h3>
                  </Link>
                  <p className="text-gray-600 mb-2">{relatedProduct.category.name}</p>
                  <p className="text-gray-800 font-bold mb-4">
                    ${Number(relatedProduct.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;