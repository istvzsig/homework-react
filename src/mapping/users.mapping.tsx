import { User } from "@/models/user.model";

const mapGenderCount = (users: User[]) => {
  return {
    male: users.filter((u) => u.gender === "male").length,
    female: users.filter((u) => u.gender === "female").length,
  };
};

const mapHairColorCount = (users: User[]) => {
  return users.reduce((acc, user) => {
    const hairColor = user.hair.color;
    acc[hairColor] = (acc[hairColor] || 0) + 1;
    // ref.current.style.color = "red";
    return acc;
  }, {} as Record<User["hair"]["color"], number>);
};

const mapAgeRange = (users: User[]) => {
  const ages = users.map((u) => u.age);
  return ages.length > 1
    ? `${Math.min(...ages)}-${Math.max(...ages)}`
    : ages[0].toString();
};

const mapAddressesToPostalCodeReducer = (users: User[]) => {
  return users.reduce((addrAcc, u) => {
    addrAcc[u.firstName + u.lastName] = u.address.postalCode;
    return addrAcc;
  }, {} as Record<string, User["address"]["postalCode"]>);
};

export {
  mapGenderCount,
  mapHairColorCount,
  mapAddressesToPostalCodeReducer,
  mapAgeRange,
};
