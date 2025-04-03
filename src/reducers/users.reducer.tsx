import { User } from "@/models/user.model";

const genderCountReducer = (users: User[]) => {
  return {
    male: users.filter((u) => u.gender === "male").length,
    female: users.filter((u) => u.gender === "female").length,
  };
};

const hairColorsCountReducer = (users: User[]) => {
  return users.reduce((acc, user) => {
    acc[user.hair.color] = (acc[user.hair.color] || 0) + 1;
    return acc;
  }, {} as Record<User["hair"]["color"], number>);
};

const mapAddressesToPostalCodeReducer = (users: User[]) => {
  return users.reduce((addrAcc, u) => {
    addrAcc[u.firstName + u.lastName] = u.address.postalCode;
    return addrAcc;
  }, {} as Record<string, User["address"]["postalCode"]>);
};

const getAgeRangeReducer = (users: User[]) => {
  const ages = users.map((u) => u.age);
  return `${Math.min(...ages)}-${Math.max(...ages)}`;
};

export {
  genderCountReducer,
  hairColorsCountReducer,
  mapAddressesToPostalCodeReducer,
  getAgeRangeReducer,
};
