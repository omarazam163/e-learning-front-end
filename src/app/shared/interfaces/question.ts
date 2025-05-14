import { Choice } from "./choice";
export interface Question {
  text: string;
  choices: Choice[];
}