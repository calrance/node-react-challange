import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'http://localhost:2000';

export const axiosPublic: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
