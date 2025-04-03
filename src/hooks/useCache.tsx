import { useState, useEffect } from "react";
import { Product } from "@/models/product.model";

const useCache = (url: string) => {
  const [cacheData, setCacheData] = useState<Product[] | null>(null);

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem(url);
    setCacheData(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    loadFromLocalStorage();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === url) {
        loadFromLocalStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [url]);

  const setLocalStorage = (data: []) => {
    localStorage.setItem(url, JSON.stringify(data));
    setCacheData(data);
  };

  return {
    cacheData,
    setLocalStorage,
  };
};

export default useCache;
