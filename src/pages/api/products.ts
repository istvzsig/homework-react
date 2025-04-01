// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product, ProductCatergory } from "@/pages/models/product";
import type { NextApiRequest, NextApiResponse } from "next";

const products: Product[] = [
  { type: ProductCatergory.FRUIT, name: "Apple" },
  { type: ProductCatergory.VEGETABLE, name: "Broccoli" },
  { type: ProductCatergory.VEGETABLE, name: "Mushroom" },
  { type: ProductCatergory.FRUIT, name: "Banana" },
  { type: ProductCatergory.VEGETABLE, name: "Tomato" },
  { type: ProductCatergory.FRUIT, name: "Orange" },
  { type: ProductCatergory.FRUIT, name: "Mango" },
  { type: ProductCatergory.FRUIT, name: "Pineapple" },
  { type: ProductCatergory.VEGETABLE, name: "Cucumber" },
  { type: ProductCatergory.FRUIT, name: "Watermelon" },
  { type: ProductCatergory.VEGETABLE, name: "Carrot" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  console.log(req, res);
  res.status(200).json(products);
}
