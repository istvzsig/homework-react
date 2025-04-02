import { useCallback, useEffect, useState } from "react";
import { ProductCategory, Product } from "@/models/product";
import { TIMEOUT_DELAY_MS } from "@/constants";

import useInteractionTime from "./userInteractionTime";
import useTimeout from "./useTimeout";

const useCategorized = (
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  const { timeoutStarted, setTimeoutStarted } = useTimeout(false);
  const { lastInteractionTime } = useInteractionTime();

  const [categorized, setCategorized] = useState<
    Record<ProductCategory, Product[]>
  >({
    [ProductCategory.FRUIT]: [],
    [ProductCategory.VEGETABLE]: [],
  });

  const moveToCategory = (item: Product) => {
    setProducts((prev) => prev.filter((product) => product.id !== item.id));

    setCategorized((prev) => {
      const updatedCategory = [...(prev[item.type] || []), item];
      return { ...prev, [item.type]: updatedCategory };
    });

    if (!timeoutStarted) {
      setTimeoutStarted(true);
      setTimeout(() => moveAllBackToList(), TIMEOUT_DELAY_MS * 1000);
    }
  };

  const moveBackToList = (item: Product): void => {
    if (!item || !item.type) return;

    setProducts((prev: Product[]) => {
      if (prev.some((product) => product.id === item.id)) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorized]);

  const moveAllBackToListOnTimeout = useCallback(() => {
    if (
      Date.now() - lastInteractionTime >= TIMEOUT_DELAY_MS &&
      timeoutStarted
    ) {
      moveAllBackToList();
    }
  }, [lastInteractionTime, timeoutStarted, moveAllBackToList]);

  useEffect(() => {
    const interval = setInterval(moveAllBackToListOnTimeout, TIMEOUT_DELAY_MS);
    return () => clearInterval(interval);
  }, [moveAllBackToListOnTimeout]);

  return {
    categorized,
    setCategorized,
    moveToCategory,
    moveBackToList,
    moveAllBackToListOnTimeout,
  };
};

export default useCategorized;
