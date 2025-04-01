import { useEffect } from "react";

import { Product } from "@/pages/models/product";

const PRODUCTS_API_URL = "/api/products";

const useFetchProducts = (setProducts: (products: Product[]) => void) => {
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(PRODUCTS_API_URL);
      const data = await response.json();
      setProducts(
        data.map((product: Product) => ({
          id: (Math.random() * 10000) | 0,
          ...product,
        }))
      );
    };

    fetchProducts();
  }, [setProducts]);
};

export default useFetchProducts;
