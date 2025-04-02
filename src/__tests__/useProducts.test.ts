import { renderHook, act, waitFor } from "@testing-library/react";
import { ProductCategory, Product } from "../models/product";
import useProducts from "@/components/products/useProducts";
import useCategorized from "@/hooks/useCategorized";

describe("useProducts Hook", () => {
  let productsHook: ReturnType<typeof useProducts>;
  let categorizedHook: ReturnType<typeof useCategorized>;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([{ type: ProductCategory.FRUIT, name: "Apple" }]),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useProducts());
    productsHook = result.current;

    const { result: categorizedResult } = renderHook(() =>
      useCategorized(productsHook.products, productsHook.setProducts)
    );
    categorizedHook = categorizedResult.current;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and sets products on mount", async () => {
    await waitFor(() =>
      expect(productsHook.products.length).toBeGreaterThanOrEqual(1)
    );

    expect(global.fetch).toHaveBeenCalledWith("/api/products");
    expect(productsHook.products).toHaveLength(1);
  });

  it("moves a product to category", async () => {
    const testProduct: Product = {
      id: 2,
      name: "Carrot",
      type: ProductCategory.VEGETABLE,
    };

    act(() => {
      categorizedHook.moveToCategory(testProduct);
    });

    await waitFor(() =>
      expect(
        categorizedHook.categorized[ProductCategory.VEGETABLE]
      ).toHaveLength(1)
    );

    expect(productsHook.products).toHaveLength(0);
  });

  it("moves a product back to the list", async () => {
    const testProduct: Product = {
      id: 3,
      name: "Banana",
      type: ProductCategory.FRUIT,
    };

    act(() => {
      categorizedHook.moveToCategory(testProduct);
    });

    await waitFor(() =>
      expect(categorizedHook.categorized[ProductCategory.FRUIT]).toHaveLength(1)
    );

    act(() => {
      categorizedHook.moveBackToList(testProduct);
    });

    await waitFor(() => expect(productsHook.products).toHaveLength(1));

    expect(categorizedHook.categorized[ProductCategory.FRUIT]).toHaveLength(0);
  });

  it("triggers timeout and moves products back", async () => {
    jest.useFakeTimers();

    const testProduct: Product = {
      id: 4,
      name: "Tomato",
      type: ProductCategory.VEGETABLE,
    };

    act(() => {
      categorizedHook.moveToCategory(testProduct);
    });

    await waitFor(() =>
      expect(
        categorizedHook.categorized[ProductCategory.VEGETABLE]
      ).toHaveLength(1)
    );

    act(() => {
      jest.advanceTimersByTime(5000); // Simulate timeout
    });

    await waitFor(() => expect(productsHook.products).toHaveLength(1));

    expect(categorizedHook.categorized[ProductCategory.VEGETABLE]).toHaveLength(
      0
    );

    jest.useRealTimers();
  });
});
