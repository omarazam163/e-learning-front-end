import { Instructor } from "./Instructor";

export interface Course {
  id: number,
  title: string,
  image: string,
  description: string,
  instructor: Instructor,
  price: number,
  hours: number,
  categoryId: number,
}
