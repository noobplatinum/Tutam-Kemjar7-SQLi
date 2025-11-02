import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function validateFlags(user_id, flag) {
  try {
    const response = await axios.post(`${apiUrl}/flags/validate`, {
      user_id,
      flag
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to validate flags');
  }
}