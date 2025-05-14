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
  

/**
 * Fetch the current user's profile from the backend.
 * @returns {Promise<Object>} - The user's profile data.
 */
export async function fetchUserProfile() {
  const accessToken = localStorage.getItem('accessToken');  // Retrieve the token from storage (adjust if necessary)
  
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const apiUrl = `${baseUrl}/api/auth/profile/`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      credentials: 'include', // Important to send cookies/session
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use the token in the Authorization header
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
}

/**
 * Update the user's profile with new data.
 * @param {Object} profileData - New profile details (telephone and location).
 * @returns {Promise<Object>} - The updated profile data.
 */
export async function updateUserProfile(profileData) {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const apiUrl = `${baseUrl}/api/auth/profile/`;

  // Only pick telephone and location
  const { telephone, location } = profileData;

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telephone, location }), // Only send necessary fields
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
}

