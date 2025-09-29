import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

export const createOrder = async (payload, token) => {
  const res = await axios.post(
    `${API_URL}/orders/create`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // { paypalOrderId, ... }
};

export const captureOrder = async (paypalOrderId, token) => {
  const res = await axios.post(
    `${API_URL}/orders/capture`,
    null,
    { params: { paypalOrderId }, headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
