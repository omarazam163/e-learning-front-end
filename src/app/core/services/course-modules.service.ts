import { Injectable } from '@angular/core';
import { CourseModule } from '../../shared/interfaces/course-module';

@Injectable({
  providedIn: 'root',
})
export class CourseModulesService {
  modules: CourseModule[] = [
    {
      title: 'Module 1',
      lectures: 21,
      duration: 54,
      open: false,
      lessons: [
        {
          title: 'Getting started lessons',
          duration: '20 min',
          completed: true,
        },
        {
          title: 'Overview about basic tools',
          duration: '30 min',
          completed: false,
        },
        {
          title: 'Visual design using tools',
          duration: '40 min',
          completed: false,
        },
      ],
    },
    {
      title: 'Module 2',
      lectures: 21,
      duration: 54,
      open: false,
      lessons: [
        {
          title: 'Getting started lessons',
          duration: '20 min',
          completed: true,
        },
        {
          title: 'Overview about basic tools',
          duration: '30 min',
          completed: false,
        },
        {
          title: 'Visual design using tools',
          duration: '40 min',
          completed: false,
        },
      ],
    },
    {
      title: 'Module 3',
      lectures: 21,
      duration: 54,
      open: false,
      lessons: [
        {
          title: 'Getting started lessons',
          duration: '20 min',
          completed: true,
        },
        {
          title: 'Overview about basic tools',
          duration: '30 min',
          completed: false,
        },
        {
          title: 'Visual design using tools',
          duration: '40 min',
          completed: false,
        },
      ],
    },
    {
      title: 'Module 4',
      lectures: 21,
      duration: 54,
      open: false,
      lessons: [
        {
          title: 'Getting started lessons',
          duration: '20 min',
          completed: true,
        },
        {
          title: 'Overview about basic tools',
          duration: '30 min',
          completed: false,
        },
        {
          title: 'Visual design using tools',
          duration: '40 min',
          completed: false,
        },
      ],
    },
    {
      title: 'Module 5',
      lectures: 25,
      duration: 71,
      open: false,
      lessons: [
        {
          title: 'Getting started lessons',
          duration: '20 min',
          completed: true,
        },
        {
          title: 'Overview about basic tools',
          duration: '30 min',
          completed: false,
        },
        {
          title: 'Visual design using tools',
          duration: '40 min',
          completed: false,
        },
      ],
    },
    {
      title: 'Module 6',
      lectures: 12,
      duration: 54,
      open: false,
      lessons: [
        {
          title: 'Getting started lessons',
          duration: '20 min',
          completed: true,
        },
        {
          title: 'Overview about basic tools',
          duration: '30 min',
          completed: false,
        },
        {
          title: 'Visual design using tools',
          duration: '40 min',
          completed: false,
        },
      ],
    },
    {
      title: 'Module 7',
      lectures: 14,
      duration: 76,
      open: false,
      lessons: [
        {
          title: 'Getting started lessons',
          duration: '20 min',
          completed: true,
        },
        {
          title: 'Overview about basic tools',
          duration: '30 min',
          completed: false,
        },
        {
          title: 'Visual design using tools',
          duration: '40 min',
          completed: false,
        },
      ],
    },
  ];

  constructor() {}
}
