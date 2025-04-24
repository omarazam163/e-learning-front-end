import { role } from "../types/role";

export interface User {
  UserName: string;
  Email: string;
  Id: string;
  role: role;
  instructorId?:string;
}