// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Function to send SMS
export const sendMessage = (messageData) => {
  return axios.post(`${API_URL}/send-message`, messageData);
};

// Function to initiate a call
export const makeCall = (callData) => {
  return axios.post(`${API_URL}/make-call`, callData);
};
