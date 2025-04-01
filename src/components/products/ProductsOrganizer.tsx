import React from "react";

import useProducts from "@/hooks/useProducts";

import { Product, ProductCatergory } from "@/models/product";

const ProductsOrganizer: React.FC = () => {
  const { products, moveToCategory, categorized, moveBackToList } =
    useProducts();

  const allCategories = Object.values(ProductCatergory);

  return (
    <div className="products-manager">
      <div className="products-list">
        {products.map((product: Product) => (
          <button
            className="product-button"
            key={product.id}
            onClick={() => moveToCategory(product)}
          >
            {product.name}
          </button>
        ))}
      </div>
      <div className="product-catergories">
        {allCategories.map((category) => (
          <div className="product-category" key={category}>
            <h2 className="category-heading">{`${category}s: ${
              categorized[category]?.length > 0
                ? categorized[category]?.length
                : 0
            }`}</h2>
            {categorized[category]?.map((product) => (
              <button
                className="product-button"
                key={product.id}
                onClick={() => moveBackToList(product)}
              >
                {product.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOrganizer;
