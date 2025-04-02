import { useState, useEffect } from "react";

import { User, UsersByDepartment } from "@/models/user";
import useError from "@/hooks/useError";
import { USERS_API_URL } from "@/constants";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { error, setError } = useError();

  const fetchUsers = async () => {
    const response = await fetch(USERS_API_URL);

    if (!response.ok) {
      setError({
        status: response.status,
        message: `[ERR ${response.status}]:Failed to fetch users from ${USERS_API_URL}`,
      });
      return;
    }
    const data = await response.json();
    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getUsersByDepartment = (): UsersByDepartment => {
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
    getUsersByDepartment,
  };
};

export default useUsers;
