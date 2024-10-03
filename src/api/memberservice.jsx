// src/api/memberservice.js

const API_URL = 'http://localhost:8080/mail';

export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    return await response.json(); // Return successful response data
  } catch (error) {
    console.error('Error during signup:', error);
    throw error; // Propagate the error for handling in the component
  }
};
