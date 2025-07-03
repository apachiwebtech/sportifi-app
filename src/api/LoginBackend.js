// src/api/LoginBackend.js
import axios from 'axios';
import { Main_URL } from '../Base_url';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(Main_URL, {
      action: 'login',     
      email: email,
      password: password
    });
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};
