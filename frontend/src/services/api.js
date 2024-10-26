import axios from 'axios';

const API_BASE_URL = "https://roxiler-systems-cmvx.onrender.com/api";

export const fetchTransactions = async (month, search, page, perPage) =>
  axios.get(`${API_BASE_URL}/transactions`, { params: { month, search, page, perPage } });

export const fetchStatistics = async (month) =>
  axios.get(`${API_BASE_URL}/statistics`, { params: { month } });

export const fetchPriceRangeData = async (month) =>
  axios.get(`${API_BASE_URL}/price-range`, { params: { month } });

export const fetchCategoryDistribution = async (month) =>
  axios.get(`${API_BASE_URL}/category-distribution`, { params: { month } });

export const fetchAllData = async (month) =>
  axios.get(`${API_BASE_URL}/combined`, { params: { month } });
