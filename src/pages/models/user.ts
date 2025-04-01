export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  hair: { color: string };
  postalCode: string;
  company: { department: string };
}

export type UsersByDepartment = Record<string, User[]>;
