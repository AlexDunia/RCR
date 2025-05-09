// src/lib/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Change this to your backend API URL when in production
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  // You can add Authorization here if needed later
})

export default instance
