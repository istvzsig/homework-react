import React from "react";

import useProducts from "@/components/products/useProducts";

import { Product, ProductCategory } from "@/models/product.model";
import useCategorized from "@/hooks/useCategorized";

const ProductsOrganizer: React.FC = () => {
  const { products, setProducts } = useProducts();
  const { categorized, moveToCategory, moveBackToList } = useCategorized(
    products,
    setProducts
  );

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
        {Object.values(ProductCategory).map((category) => (
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
