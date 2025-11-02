import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function loginUser(username, password) {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, {
        username,
        password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Authentication failed');
  }
}
