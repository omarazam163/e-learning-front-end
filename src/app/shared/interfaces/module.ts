import { video } from './video';
export interface Module {
  id: number;
  title: string;
  courseId: number;
  videos: video[];
  quizzes: QuizzName[];
}

interface QuizzName {
  id: number;
  title: string;
  numberOfQuestions: number;
  score: number;
}