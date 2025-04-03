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

export interface HairTypeCount {
  [color: string]: number;
}

export type UserCount = number;
export type Department = string;
export type UserNameKey = `${User["firstName"]}${User["lastName"]}`;
export type UsersByDepartment = Record<Department, User[]>;

export type GroupedUsersByDepartment = Record<
  Department,
  {
    male: number;
    female: number;
    ageRange: string;
    hair: HairTypeCount;
    addressUser: {
      [key: UserNameKey]: User["address"]["postalCode"];
    };
  }
>;
