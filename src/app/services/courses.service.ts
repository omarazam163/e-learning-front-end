import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses: Course[] = [
    {
      courseId: 1,
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
      title: 'Data Science Fundamentals',
      admin: 'Dr. Ahmed Ali',
      adminImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      NumberOfLessons: '25',
      NumberOfHours: '40',
      percentage: 100
    },
    {
      courseId: 2,
      icon: 'https://cdn-icons-png.flaticon.com/512/2721/2721265.png',
      title: 'Full Stack Web Development',
      admin: 'Eng. Sara Hassan',
      adminImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      NumberOfLessons: '30',
      NumberOfHours: '50',
      percentage: 100
    },
    {
      courseId: 3,
      icon: 'https://cdn-icons-png.flaticon.com/512/747/747614.png',
      title: 'Mobile App Development',
      admin: 'Dr. Mohamed Farouk',
      adminImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      NumberOfLessons: '20',
      NumberOfHours: '35',
      percentage: 80
    },
    {
      courseId: 4,
      icon: 'https://cdn-icons-png.flaticon.com/512/4144/4144749.png',
      title: 'Cloud Computing',
      admin: 'Eng. Layla Samir',
      adminImage: 'https://randomuser.me/api/portraits/women/4.jpg',
      NumberOfLessons: '18',
      NumberOfHours: '30',
      percentage: 50
    },
    {
      courseId: 5,
      icon: 'https://cdn-icons-png.flaticon.com/512/2285/2285569.png',
      title: 'UI/UX Design',
      admin: 'Prof. Khaled Youssef',
      adminImage: 'https://randomuser.me/api/portraits/men/5.jpg',
      NumberOfLessons: '22',
      NumberOfHours: '28',
      percentage: 90
    },
    {
      courseId: 6,
      icon: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
      title: 'Artificial Intelligence',
      admin: 'Dr. Amr Adel',
      adminImage: 'https://randomuser.me/api/portraits/men/6.jpg',
      NumberOfLessons: '26',
      NumberOfHours: '45',
      percentage: 30
    },
    {
      courseId: 7,
      icon: 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
      title: 'Cyber Security',
      admin: 'Eng. Nourhan Gamal',
      adminImage: 'https://randomuser.me/api/portraits/women/7.jpg',
      NumberOfLessons: '24',
      NumberOfHours: '38',
      percentage: 100
    },
    {
      courseId: 8,
      icon: 'https://cdn-icons-png.flaticon.com/512/2490/2490415.png',
      title: 'Networking Basics',
      admin: 'Dr. Tarek Hussein',
      adminImage: 'https://randomuser.me/api/portraits/men/8.jpg',
      NumberOfLessons: '19',
      NumberOfHours: '32',
      percentage: 65
    },
    {
      courseId: 9,
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
      title: 'SEO & Digital Marketing',
      admin: 'Eng. Reem Sobhy',
      adminImage: 'https://randomuser.me/api/portraits/women/9.jpg',
      NumberOfLessons: '16',
      NumberOfHours: '25',
      percentage: 85
    },
    {
      courseId: 10,
      icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620976.png',
      title: 'DevOps & Automation',
      admin: 'Dr. Hisham Said',
      adminImage: 'https://randomuser.me/api/portraits/men/10.jpg',
      NumberOfLessons: '27',
      NumberOfHours: '44',
      percentage: 40
    },
    {
      courseId: 11,
      icon: 'https://cdn-icons-png.flaticon.com/512/2910/2910347.png',
      title: 'Technical Writing',
      admin: 'Eng. Dina Fouad',
      adminImage: 'https://randomuser.me/api/portraits/women/11.jpg',
      NumberOfLessons: '14',
      NumberOfHours: '20',
      percentage: 95
    },
    {
      courseId: 12,
      icon: 'https://cdn-icons-png.flaticon.com/512/2250/2250201.png',
      title: 'Software Testing & QA',
      admin: 'Prof. Hassan Omar',
      adminImage: 'https://randomuser.me/api/portraits/men/12.jpg',
      NumberOfLessons: '21',
      NumberOfHours: '33',
      percentage: 78
    }
  ];

  constructor() { }
}
