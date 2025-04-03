import { useState, useEffect } from "react";

import {
  User,
  UsersByDepartment,
  GroupedUsersByDepartment,
} from "@/models/user.model";

import useError from "@/hooks/useError";
import { USERS_API_URL } from "@/constants";

import {
  genderCountReducer,
  hairColorsCountReducer,
  mapAddressesToPostalCodeReducer,
  getAgeRangeReducer,
} from "@/reducers/users.reducer";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const result = Object.keys(usersByDepartment).reduce(
      (acc: GroupedUsersByDepartment, department) => {
        const users = usersByDepartment[department];
        acc[department] = {
          ...genderCountReducer(users),
          ageRange: getAgeRangeReducer(users),
          hair: hairColorsCountReducer(users),
          addressUser: mapAddressesToPostalCodeReducer(users),
        };
        return acc;
      },
      {} as GroupedUsersByDepartment
    );
    console.log(result);
    return result;
  };

  return {
    users,
    error,
    getUsersByDepartment,
    updateUsersByDepartment,
  };
};

export default useUsers;
