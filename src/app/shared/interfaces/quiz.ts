import { Question } from './question';
export interface Quiz {
  title: string;
  courseId: number;
  moduleId: number;
  questions: Question[];
}