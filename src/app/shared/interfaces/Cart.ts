import { Course } from "./course";

export interface Cart
{
    CartId:string;
    courses: Course[];
}