import { renderHook, act, waitFor } from "@testing-library/react";
import { ProductCategory, Product } from "../models/product";
import useProducts from "@/components/products/useProducts";
import useCategorized from "@/hooks/useCategorized";

describe("useProducts Hook", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and sets products on mount", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() =>
      expect(result.current.products.length).toBeGreaterThanOrEqual(0)
    );

    expect(global.fetch).toHaveBeenCalledWith("/api/products");
    expect(result.current.products).toHaveLength(0);
  });

  it("moves a product to category", async () => {
    const { result } = renderHook(() => useProducts());
    const { result: categorizedResult } = renderHook(() =>
      useCategorized(result.current.products, result.current.setProducts)
    );

    const testProduct: Product = {
      id: 2,
      name: "Carrot",
      type: ProductCategory.VEGETABLE,
    };

    act(() => {
      categorizedResult.current.moveToCategory(testProduct);
    });

    await waitFor(() =>
      expect(
        categorizedResult.current.categorized[ProductCategory.VEGETABLE]
      ).toHaveLength(1)
    );

    expect(result.current.products).toHaveLength(0);
  });

  it("moves a product back to the list", async () => {
    const { result } = renderHook(() => useProducts());
    const { result: categorizedResult } = renderHook(() =>
      useCategorized(result.current.products, result.current.setProducts)
    );

    const testProduct: Product = {
      id: 3,
      name: "Banana",
      type: ProductCategory.FRUIT,
    };

    act(() => {
      categorizedResult.current.moveToCategory(testProduct);
    });

    await waitFor(() =>
      expect(
        categorizedResult.current.categorized[ProductCategory.FRUIT]
      ).toHaveLength(1)
    );

    act(() => {
      categorizedResult.current.moveBackToList(testProduct);
    });

    await waitFor(() => expect(result.current.products).toHaveLength(1));

    expect(
      categorizedResult.current.categorized[ProductCategory.FRUIT]
    ).toHaveLength(0);
  });

  it("triggers timeout and moves products back", async () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useProducts());
    const { result: categorizedResult } = renderHook(() =>
      useCategorized(result.current.products, result.current.setProducts)
    );

    const testProduct: Product = {
      id: 4,
      name: "Tomato",
      type: ProductCategory.VEGETABLE,
    };

    act(() => {
      categorizedResult.current.moveToCategory(testProduct);
    });

    await waitFor(() =>
      expect(
        categorizedResult.current.categorized[ProductCategory.VEGETABLE]
      ).toHaveLength(1)
    );

    act(() => {
      jest.advanceTimersByTime(5000); // Simulate timeout
    });

    await waitFor(() => expect(result.current.products).toHaveLength(1));

    expect(
      categorizedResult.current.categorized[ProductCategory.VEGETABLE]
    ).toHaveLength(0);

    jest.useRealTimers();
  });
});
