export interface Product {
  id?: number;
  name: string;
  type: ProductCatergory;
}

export enum ProductCatergory {
  FRUIT = "Fruit",
  VEGETABLE = "Vegetable",
}
