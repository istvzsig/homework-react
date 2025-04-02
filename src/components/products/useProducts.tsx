import useInteractionTime from "../../hooks/userInteractionTime";
import { useFetchProducts } from "../../hooks/useFetch";
import { PRODUCTS_API_URL } from "@/constants";

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
