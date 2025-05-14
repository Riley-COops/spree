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
    const response = await axiosInstance.get('/service/products-list/');
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
 * Create a new delivery address.
 * @param {Object} deliveryData - Data for the new delivery.
 * @returns {Promise<Object>} - The created delivery data.
 */
export async function createDelivery(deliveryData) {
  try {
    const response = await axiosInstance.post('/service/deliveries/create/', deliveryData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create delivery: ${error.response?.statusText || error.message}`);
  }
};



// export async function fetchDeliveryDetails() {
//   try {
//     const response = await axiosInstance.get('/service/delivery-data/');
//     return response.data;  // This will contain the saved delivery information
//   } catch (error) {
//     throw new Error(`Failed to fetch delivery data: ${error.response?.statusText || error.message}`);
//   }
// }




/**
 * Fetch all deliveries.
 * @returns {Promise<Object[]>} List of deliveries.
 */
export async function fetchDeliveryDetails() {
  try {
    const response = await axiosInstance.get('/service/delivery-data/');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch deliveries: ${error.response?.statusText || error.message}`);
  }
}

export async function createOrder(orderData) {
  try{
    const response = await axiosInstance.post('/service/orders/', orderData);
    return response.data;
  } catch (error){
    throw new Error(`Failed to create order: ${error.response?.statusText || error.message}`);
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