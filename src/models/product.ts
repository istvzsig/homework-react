export interface Product {
  id?: number;
  name: string;
  type: ProductCategory;
}

export enum ProductCategory {
  FRUIT = "Fruit",
  VEGETABLE = "Vegetable",
}
