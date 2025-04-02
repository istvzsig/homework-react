import { useState, useEffect } from "react";
import { Product } from "@/models/product";
import useCache from "./useCache";
import { PRODUCTS_API_URL } from "@/constants";

const useShouldFetch = (initialValue: boolean = false) => {
  const [shouldFetch, setShouldFetch] = useState(initialValue);
  return { shouldFetch, setShouldFetch };
};

const useFetchProducts = (url: string = PRODUCTS_API_URL) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { shouldFetch, setShouldFetch } = useShouldFetch(false);
  const { cacheData, setLocalStorage } = useCache(url);

  useEffect(() => {
    if (cacheData === null) {
      return;
    }

    if (cacheData.length) {
      setProducts(cacheData);
      console.log("Loaded from local storage");
    } else {
      setShouldFetch(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheData]);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchProducts = async () => {
      console.log("Fetching from API...");
      const response = await fetch(url);
      const data = await response.json();

      const processedData = data.map((product: Product) => ({
        id: (Math.random() * 10000) | 0,
        ...product,
      }));

      setLocalStorage(processedData);
      setProducts(processedData);
      setShouldFetch(false);
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetch]);

  return { products, setProducts };
};

export { useShouldFetch, useFetchProducts };
