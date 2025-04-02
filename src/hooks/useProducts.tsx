import { PRODUCTS_API_URL } from "@/constants";

import useInteractionTime from "./userInteractionTime";
import { useFetchProducts } from "./useFetch";

const useProducts = () => {
  const { products, setProducts } = useFetchProducts(PRODUCTS_API_URL);
  const { setLastInteractionTime } = useInteractionTime();

  const handleCategoryClick = () => {
    setLastInteractionTime(Date.now());
  };

  return {
    products,
    setProducts,
    handleCategoryClick,
  };
};

export default useProducts;
