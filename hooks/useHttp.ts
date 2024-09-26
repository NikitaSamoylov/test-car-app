import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const useHttp = <T>(url: string, params?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(true);

  const handleUpdate = () => {
    setUpdate((update) => !update);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse<T> = await axios.get(url, params);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return { data, error, loading, handleUpdate };
};

export default useHttp;
