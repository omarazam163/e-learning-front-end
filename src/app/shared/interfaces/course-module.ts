export interface CourseModule {
  title: string,
  lectures: number,
  duration: number,
  open: boolean,
  lessons: ({title : string ; duration : string ; completed : boolean;})[]
}
