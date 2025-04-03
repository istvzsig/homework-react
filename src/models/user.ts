export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  hair: { color: string };
  address: { postalCode: string };
  company: { department: string };
}

export type UsersByDepartment = Record<string, User[]>;

enum HairColors {
  BLACK = "Black",
  BLOND = "Blond",
  CHESTNUT = "Chestnut",
  BROWN = "Brown",
}

interface HairTypeCount {
  [HairColors.BLACK]: number;
  [HairColors.BLOND]: number;
  [HairColors.CHESTNUT]: number;
  [HairColors.BROWN]: number;
}

type Department = string;
type UserNameKey = `${User["firstName"]}${User["lastName"]}`;

export interface AddressUser {
  [key: UserNameKey]: User["address"]["postalCode"];
}

export type GroupedUsersByDepartment = Record<
  Department,
  {
    male: number;
    female: number;
    ageRange: string;
    hair: HairTypeCount | null;
    addressUser: AddressUser;
  }
>;
