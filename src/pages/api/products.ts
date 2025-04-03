import type { NextApiRequest, NextApiResponse } from "next";

import { Product, ProductCategory } from "@/models/product.model";

const products: Product[] = [
  { type: ProductCategory.FRUIT, name: "Apple" },
  { type: ProductCategory.VEGETABLE, name: "Broccoli" },
  { type: ProductCategory.VEGETABLE, name: "Mushroom" },
  { type: ProductCategory.FRUIT, name: "Banana" },
  { type: ProductCategory.VEGETABLE, name: "Tomato" },
  { type: ProductCategory.FRUIT, name: "Orange" },
  { type: ProductCategory.FRUIT, name: "Mango" },
  { type: ProductCategory.FRUIT, name: "Pineapple" },
  { type: ProductCategory.VEGETABLE, name: "Cucumber" },
  { type: ProductCategory.FRUIT, name: "Watermelon" },
  { type: ProductCategory.VEGETABLE, name: "Carrot" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(products);
}
