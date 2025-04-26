import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'; // Replace with your backend base URL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Fetch all categories.
 * @returns {Promise<Object[]>} List of categories.
 */
export async function fetchCategories() {
  try {
    const response = await axiosInstance.get('/service/categories/');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.response?.statusText || error.message}`);
  }
}

/**
 * Fetch all products.
 * @returns {Promise<Object[]>} List of products.
 */
export async function fetchProducts() {
  try {
    const response = await axiosInstance.get('/service/products/');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.response?.statusText || error.message}`);
  }
}

/**
 * Fetch a single product by ID.
 * @param {number} productId - The ID of the product to fetch.
 * @returns {Promise<Object>} Product details.
 */
export async function fetchProductById(productId) {
  try {
    const response = await axiosInstance.get(`/service/products/${productId}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product: ${error.response?.status} - ${error.response?.data}`);
    throw new Error(`Failed to fetch product: ${error.response?.statusText || error.message}`);
  }
}

/**
 * Fetch all cart items.
 * @returns {Promise<Object[]>} List of cart items.
 */
export async function fetchCart() {
  try {
    const response = await axiosInstance.get('/service/cart/');
    const data = response.data.map((item) => ({
      ...item,
      product: {
        ...item.product,
        price: typeof item.product?.price === 'number' ? item.product.price : 0, // Ensure price is a number
      },
    }));
    return data;
  } catch (error) {
    console.error('Error fetching cart:', error.response?.data || error.message);
    throw new Error('Failed to fetch cart');
  }
}

/**
 * Add a product to the cart.
 * @param {number} product - The ID of the product to add to the cart.
 * @param {number} [quantity=1] - The quantity of the product to add to the cart.
 * @returns {Promise<void>}
 */
export async function addToCart(product, quantity = 1) {
  try {
    const response = await axiosInstance.post('/service/cart/', {
      product: product, // Use the correct key
      quantity: quantity,
    });
    console.log('Product added to cart successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to add product to cart: ${error.response?.status} - ${error.response?.data}`
    );
    throw new Error(
      `Failed to add product to cart: ${error.response?.statusText || error.message}`
    );
  }
}

/**
 * Fetch all deliveries.
 * @returns {Promise<Object[]>} List of deliveries.
 */
export async function fetchDeliveries() {
  try {
    const response = await axiosInstance.get('/service/deliveries/');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch deliveries: ${error.response?.statusText || error.message}`);
  }
}

/**
 * Fetch all orders.
 * @returns {Promise<Object[]>} List of orders.
 */
export async function fetchOrders() {
  try {
    const response = await axiosInstance.get('/service/orders/');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.response?.statusText || error.message}`);
  }
}

/**
 * Fetch a single order by ID.
 * @param {number} orderId - The ID of the order to fetch.
 * @returns {Promise<Object>} Order details.
 */
export async function fetchOrderById(orderId) {
  try {
    const response = await axiosInstance.get(`/service/orders/${orderId}/`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch order: ${error.response?.statusText || error.message}`);
  }
}