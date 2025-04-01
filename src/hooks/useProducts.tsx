import { useState, useEffect, useCallback } from "react";
import { Product, ProductCatergory } from "../models/product";

const PRODUCTS_API_URL = "/api/products";
const TIMEOUT_DELAY_SEC = 2000;

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categorized, setCategorized] = useState<
    Record<ProductCatergory, Product[]>
  >({
    [ProductCatergory.FRUIT]: [],
    [ProductCatergory.VEGETABLE]: [],
  });

  const [lastInteractionTime, setLastInteractionTime] = useState<number>(
    Date.now()
  );
  const [timeoutStarted, setTimeoutStarted] = useState<boolean>(false);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const moveToCategory = (item: Product): void => {
    console.log(`Moving product to category: ${item.name}`);

    // Remove the item from products
    setProducts((prev) => prev.filter((product) => product.id !== item.id));

    // Add the item to the categorized list
    setCategorized((prev) => {
      const updatedCategory = [...(prev[item.type] || []), item];
      console.log(`Added ${item.name} to category ${item.type}`);
      return { ...prev, [item.type]: updatedCategory };
    });

    // Reset the timeout
    setLastInteractionTime(Date.now());
    if (!timeoutStarted) {
      setTimeoutStarted(true);
      console.log("Timeout started for moving items back after 5 seconds");
      setTimeout(() => moveAllBackToList(), TIMEOUT_DELAY_SEC * 1000);
    }
  };

  const moveBackToList = (item: Product): void => {
    if (!item || !item.type) return;

    // Prevent adding duplicates
    setProducts((prev) => {
      if (prev.some((product) => product.id === item.id)) {
        console.log(`Item ${item.name} already in the list. Not adding again.`);
        return prev;
      }

      return [...prev, item];
    });

    setCategorized((prev) => {
      const updatedCategory = prev[item.type]?.filter(
        (product) => product.id !== item.id
      );
      return { ...prev, [item.type]: updatedCategory || [] };
    });
  };

  const moveAllBackToList = useCallback(() => {
    console.log("Timeout triggered - Moving items back to the list");

    const itemsToMoveBack = Object.values(categorized).flat();
    console.log("Items to move back:", itemsToMoveBack);

    itemsToMoveBack.forEach((item, index) => {
      if (item) {
        setTimeout(() => {
          console.log(`Moving item ${item.name} back to list`);
          if (!products.includes(item)) {
            moveBackToList(item);
          }
        }, index * 1000);
      }
    });
  }, [categorized, products]);

  const moveAllBackToListOnTimeout = useCallback(() => {
    if (
      Date.now() - lastInteractionTime >= TIMEOUT_DELAY_SEC &&
      timeoutStarted
    ) {
      moveAllBackToList();
    }
  }, [lastInteractionTime, timeoutStarted, moveAllBackToList]);

  useEffect(() => {
    const interval = setInterval(moveAllBackToListOnTimeout, 1000);

    return () => clearInterval(interval);
  }, [moveAllBackToListOnTimeout]);

  const handleCategoryClick = () => {
    setLastInteractionTime(Date.now());
  };

  return {
    products,
    categorized,
    moveToCategory,
    moveBackToList,
    handleCategoryClick,
  };
};

export default useProducts;
