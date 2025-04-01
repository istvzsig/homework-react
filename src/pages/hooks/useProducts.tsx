import { useState, useEffect, useCallback } from "react";
import { Product, ProductCatergory } from "@/pages/models/product";

// TODO: Extract global config to .env or secret file.
const PRODUCTS_API_URL = "/api/products";
const TIMEOUT_DELAY_SEC = 5000;

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

  const moveToCategory = (item: Product) => {
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
      setTimeoutStarted(true); // Only start the timeout once
      console.log("Timeout started for moving items back after 5 seconds");
      setTimeout(() => moveAllBackToList(), TIMEOUT_DELAY_SEC * 1000);
    }
  };

  const moveBackToList = (item: Product) => {
    // Ensure we don't add the same item again if it's already in the products list
    if (!products.some((product) => product.id === item.id)) {
      console.log(`Moving ${item.name} back to the products list`);

      setProducts((prev) => [...prev, item]);

      setCategorized((prev) => {
        const updatedCategory = prev[item.type]?.filter(
          (product) => product.id !== item.id
        );
        console.log(`Removed ${item.name} from category ${item.type}`);
        return { ...prev, [item.type]: updatedCategory || [] };
      });
    }
  };

  const moveAllBackToList = useCallback(() => {
    console.log("Timeout triggered - Moving items back to the list");

    const itemsToMoveBack = Object.values(categorized).flat();
    console.log("Items to move back:", itemsToMoveBack);

    itemsToMoveBack.forEach((item, index) => {
      if (item) {
        // Add a 1-second delay for each item before moving it
        setTimeout(() => {
          console.log(`Moving item ${item.name} back to list`);
          if (!products.includes(item)) {
            moveBackToList(item);
          }
        }, index * 1000); // 1 second delay per item
      }
    });

    setCategorized({});
  }, [categorized, products]);

  const moveAllBackToListOnTimeout = useCallback(() => {
    // Trigger this only if the timeout has been reached
    if (
      Date.now() - lastInteractionTime >= TIMEOUT_DELAY_SEC &&
      timeoutStarted
    ) {
      moveAllBackToList();
    }
  }, [lastInteractionTime, timeoutStarted, categorized]);

  useEffect(() => {
    const interval = setInterval(moveAllBackToListOnTimeout, 1000); // Check every second

    return () => clearInterval(interval);
  }, [moveAllBackToListOnTimeout]);

  const handleCategoryClick = (item: Product) => {
    // Reset the timer when a categorized item is clicked
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
