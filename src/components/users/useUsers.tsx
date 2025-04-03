import { useState, useEffect, use } from "react";

import {
  User,
  // UsersByDepartment,
  GroupedUsersByDepartment,
  UsersByDepartment,
} from "@/models/user";
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
      const department = user.company.department;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(user);
      return acc;
    }, {});
  };

  const updateUsersByDepartment = (usersByDepartment: UsersByDepartment) => {
    const result = Object.keys(usersByDepartment).map((department) => {
      const users = usersByDepartment[department];
      return users.reduce((acc) => {
        acc[department] = {
          male: users.filter((u) => u.gender === "male").length,
          female: users.filter((u) => u.gender === "female").length,
          ageRange: 0,
          hair: {
            Black: users.filter((u) => u.hair.color === "Black").length,
            Blond: users.filter((u) => u.hair.color === "Blond").length,
            Chestnut: users.filter((u) => u.hair.color === "Chestnut").length,
            Brown: users.filter((u) => u.hair.color === "Brown").length,
          },
          addressUser: users.reduce((acc: GroupedUsersByDepartment, u) => {
            acc[u.firstName + u.lastName] = u.address.postalCode;

            return acc;
          }, {}),
        };
        return acc;
      }, {});
    });

    console.log(result);
  };

  return {
    users,
    error,
    getUsersByDepartment,
    updateUsersByDepartment,
  };
};

export default useUsers;
