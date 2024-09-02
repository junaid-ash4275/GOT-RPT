// useApi.js
import { useState, useCallback } from "react";
import { get, post, put, del } from "api/apiService"; // Adjust the import path as necessary

const useApi = (apiCall) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiCall(...args);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  return { data, loading, error, fetchData };
};

export const useGet = (endpoint) => useApi((params) => get(endpoint, params));
export const usePost = (endpoint) => useApi((data) => post(endpoint, data));
export const usePut = (endpoint) => useApi((data) => put(endpoint, data));
export const useDelete = (endpoint) => useApi((params) => del(endpoint, params));
