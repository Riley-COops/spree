const baseUrl = 'http://localhost:8000'; // Replace with your actual backend base URL

/**
 * Function to create a new user by sending a POST request to the Django backend API.
 * @param {Object} userData - The user data to be sent to the backend. Should include: email, first_name, last_name, password.
 * @returns {Promise<Object>} - The response from the backend.
 */
export async function createUser(userData) {
    const apiUrl = `${baseUrl}/api/auth/register/`; // Use baseUrl for the endpoint
  
    // Ensure only required fields are sent
    const formattedData = {
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      password: userData.password,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }
  

/**
 * Function to log in a user by sending a POST request to the Django backend API.
 * @param {Object} loginData - The login credentials (username and password).
 * @returns {Promise<Object>} - The response from the backend.
 */
export async function loginUser(loginData) {
    const apiUrl = `${baseUrl}/api/auth/login/`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      const contentType = response.headers.get('content-type');
  
      if (!response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(`Error: ${response.status} - ${JSON.stringify(errorData)}`);
        } else {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
      }
  
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        return result;
      } else {
        const text = await response.text();
        throw new Error(`Expected JSON but received: ${text}`);
      }
    } catch (error) {
      console.error('Failed to log in:', error);
      throw error;
    }
  }
  