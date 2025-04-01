import { renderHook, act, waitFor } from "@testing-library/react";

import useProducts from "../pages/hooks/useProducts";

import { ProductCatergory, Product } from "../pages/models/product";

describe("useProducts Hook", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "Apple", type: ProductCatergory.FRUIT },
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
      type: ProductCatergory.VEGETABLE,
    };

    act(() => {
      result.current.moveToCategory(testProduct);
    });

    expect(result.current.products).toHaveLength(0);
    expect(result.current.categorized[ProductCatergory.VEGETABLE]).toHaveLength(
      1
    );
  });

  it("moves a product back to the list", () => {
    const { result } = renderHook(() => useProducts());

    const testProduct: Product = {
      id: 3,
      name: "Banana",
      type: ProductCatergory.FRUIT,
    };

    act(() => {
      result.current.moveToCategory(testProduct);
      result.current.moveBackToList(testProduct);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.categorized[ProductCatergory.FRUIT]).toHaveLength(0);
  });

  it("triggers timeout and moves products back", async () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useProducts());

    const testProduct: Product = {
      id: 4,
      name: "Tomato",
      type: ProductCatergory.VEGETABLE,
    };

    act(() => {
      result.current.moveToCategory(testProduct);
    });

    expect(result.current.categorized[ProductCatergory.VEGETABLE]).toHaveLength(
      1
    );

    act(() => {
      jest.advanceTimersByTime(5000); // Simulate timeout
    });

    await waitFor(() => expect(result.current.products).toHaveLength(1));
    expect(result.current.categorized[ProductCatergory.VEGETABLE]).toHaveLength(
      0
    );

    jest.useRealTimers();
  });
});
