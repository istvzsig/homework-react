import { useState } from "react";

import { ProductCatergory, Product } from "../models/product";

const useCategorizedProducts = () => {
  const [categorized, setCategorized] = useState<
    Record<ProductCatergory, Product[]>
  >({
    [ProductCatergory.FRUIT]: [],
    [ProductCatergory.VEGETABLE]: [],
  });

  const moveToCategory = (item: Product) => {
    setCategorized((prev) => ({
      ...prev,
      [item.type]: [...prev[item.type], item],
    }));
  };

  const moveBackToProductsList = (item: Product) => {
    setCategorized((prev) => ({
      ...prev,
      [item.type]: prev[item.type].filter((p) => p.id !== item.id),
    }));
  };

  return { categorized, moveToCategory, moveBackToProductsList };
};

export default useCategorizedProducts;
