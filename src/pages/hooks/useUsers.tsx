// src/hooks/useUsers.ts
import { useState, useEffect } from "react";

import { User, UsersByDepartment } from "../models/user";

const USERS_API_URL = "https://dummyjson.com/users";
const ERROR_MSG = "Failed to fetch users";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    const response = await fetch(USERS_API_URL);
    if (!response.ok) {
      setError(ERROR_MSG);
      throw new Error(ERROR_MSG);
    }
    const data = await response.json();
    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getUserByDepartment = (): UsersByDepartment => {
    return users.reduce((acc: UsersByDepartment, user: User) => {
      if (!acc[user.company.department]) {
        acc[user.company.department] = [];
      }
      acc[user.company.department].push(user);
      return acc;
    }, {});
  };

  return {
    users,
    error,
    getUserByDepartment,
  };
};

export default useUsers;
