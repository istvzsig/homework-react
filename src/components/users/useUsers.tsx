import { useState, useEffect } from "react";

import {
  User,
  UsersByDepartment,
  GroupedUsersByDepartment,
  Department,
  UserCount,
} from "@/models/user.model";

import useError from "@/hooks/useError";
import { USERS_API_URL } from "@/constants";

import {
  mapGenderCount,
  mapHairColorCount,
  mapAddressesToPostalCodeReducer,
  mapAgeRange,
} from "@/mapping/users.mapping";

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
    }, {} as UsersByDepartment);
  };

  const getUsersGroupedTraits = (
    users: UsersByDepartment
  ): GroupedUsersByDepartment => {
    return Object.keys(users).reduce(
      (acc: GroupedUsersByDepartment, department) => {
        const groupedUsers = users[department];
        acc[department] = {
          ...mapGenderCount(groupedUsers),
          ageRange: mapAgeRange(groupedUsers),
          hair: mapHairColorCount(groupedUsers),
          addressUser: mapAddressesToPostalCodeReducer(groupedUsers),
        };
        return acc;
      },
      {} as GroupedUsersByDepartment
    );
  };

  const getTotalUsersCountByDepartment = (
    values: GroupedUsersByDepartment[Department]
  ): UserCount => {
    return values.male + values.female;
  };

  return {
    users,
    error,
    getUsersByDepartment,
    getUsersGroupedTraits,
    getTotalUsersCountByDepartment,
  };
};

export default useUsers;
