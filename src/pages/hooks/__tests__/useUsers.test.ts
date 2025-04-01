import { renderHook, waitFor } from "@testing-library/react";
import useUsers from "../useUsers";

describe("useUsers Hook", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            users: [
              {
                id: 1,
                firstName: "John Doe",
                company: { department: "Sales" },
              },
              {
                id: 2,
                firstName: "Jane Smith",
                company: { department: "Marketing" },
              },
            ],
          }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches and sets users on mount", async () => {
    const { result } = renderHook(() => useUsers());

    await waitFor(() => expect(result.current.users.length).toBeGreaterThan(0));

    expect(global.fetch).toHaveBeenCalledWith("https://dummyjson.com/users");
    expect(result.current.users[0].firstName).toBe("John Doe");
  });

  it("sets error message on fetch failure", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const { result } = renderHook(() => useUsers());

    await waitFor(() =>
      expect(result.current.error).toBe("Failed to fetch users")
    );
  });

  it("groups users by department", async () => {
    const { result } = renderHook(() => useUsers());

    await waitFor(() => expect(result.current.users.length).toBeGreaterThan(0));

    const usersByDepartment = result.current.getUserByDepartment();

    expect(usersByDepartment).toEqual({
      Sales: [
        { id: 1, firstName: "John Doe", company: { department: "Sales" } },
      ],
      Marketing: [
        {
          id: 2,
          firstName: "Jane Smith",
          company: { department: "Marketing" },
        },
      ],
    });
  });
});
