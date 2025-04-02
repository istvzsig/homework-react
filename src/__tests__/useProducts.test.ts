import { renderHook, act, waitFor } from "@testing-library/react";

import useProducts from "../hooks/useProducts";

import { ProductCategory, Product } from "../models/product";

describe("useProducts Hook", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "Apple", type: ProductCategory.FRUIT },
          ]),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches and sets products on mount", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() =>
      expect(result.current.products.length).toBeGreaterThan(0)
    );

    expect(global.fetch).toHaveBeenCalledWith("/api/products");
    expect(result.current.products[0].name).toBe("Apple");
  });

  it("moves a product to category", () => {
    const { result } = renderHook(() => useProducts());

    const testProduct: Product = {
      id: 2,
      name: "Carrot",
      type: ProductCategory.VEGETABLE,
    };

    act(() => {
      result.current.moveToCategory(testProduct);
    });

    expect(result.current.products).toHaveLength(0);
    expect(result.current.categorized[ProductCategory.VEGETABLE]).toHaveLength(
      1
    );
  });

  it("moves a product back to the list", () => {
    const { result } = renderHook(() => useProducts());

    const testProduct: Product = {
      id: 3,
      name: "Banana",
      type: ProductCategory.FRUIT,
    };

    act(() => {
      result.current.moveToCategory(testProduct);
      result.current.moveBackToList(testProduct);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.categorized[ProductCategory.FRUIT]).toHaveLength(0);
  });

  it("triggers timeout and moves products back", async () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useProducts());

    const testProduct: Product = {
      id: 4,
      name: "Tomato",
      type: ProductCategory.VEGETABLE,
    };

    act(() => {
      result.current.moveToCategory(testProduct);
    });

    expect(result.current.categorized[ProductCategory.VEGETABLE]).toHaveLength(
      1
    );

    act(() => {
      jest.advanceTimersByTime(5000); // Simulate timeout
    });

    await waitFor(() => expect(result.current.products).toHaveLength(1));
    expect(result.current.categorized[ProductCategory.VEGETABLE]).toHaveLength(
      0
    );

    jest.useRealTimers();
  });
});
