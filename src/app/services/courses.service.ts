import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses: Course[] = [
    {
      courseId: 1,
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
      title: "Data Science Fundamentals #1",
      admin: "Dr. Ahmed Ali",
      adminImage: "https://randomuser.me/api/portraits/men/1.jpg",
      NumberOfLessons: "25",
      NumberOfHours: "40",
      percentage: 100,
      category: "dataScience"
    },
    {
      courseId: 2,
      icon: "https://cdn-icons-png.flaticon.com/512/2721/2721265.png",
      title: "Full Stack Web Development #2",
      admin: "Eng. Sara Hassan",
      adminImage: "https://randomuser.me/api/portraits/women/2.jpg",
      NumberOfLessons: "30",
      NumberOfHours: "50",
      percentage: 100,
      category: "web"
    },
    {
      courseId: 3,
      icon: "https://cdn-icons-png.flaticon.com/512/747/747614.png",
      title: "Mobile App Development #3",
      admin: "Dr. Mohamed Farouk",
      adminImage: "https://randomuser.me/api/portraits/men/3.jpg",
      NumberOfLessons: "20",
      NumberOfHours: "35",
      percentage: 80,
      category: "it"
    },
    {
      courseId: 4,
      icon: "https://cdn-icons-png.flaticon.com/512/4144/4144749.png",
      title: "Cloud Computing #4",
      admin: "Eng. Layla Samir",
      adminImage: "https://randomuser.me/api/portraits/women/4.jpg",
      NumberOfLessons: "18",
      NumberOfHours: "30",
      percentage: 50,
      category: "it"
    },
    {
      courseId: 5,
      icon: "https://cdn-icons-png.flaticon.com/512/2285/2285569.png",
      title: "UI/UX Design #5",
      admin: "Prof. Khaled Youssef",
      adminImage: "https://randomuser.me/api/portraits/men/5.jpg",
      NumberOfLessons: "22",
      NumberOfHours: "28",
      percentage: 90,
      category: "business"
    },
    {
      courseId: 6,
      icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
      title: "Artificial Intelligence #6",
      admin: "Dr. Amr Adel",
      adminImage: "https://randomuser.me/api/portraits/men/6.jpg",
      NumberOfLessons: "26",
      NumberOfHours: "45",
      percentage: 30,
      category: "dataScience"
    },
    {
      courseId: 7,
      icon: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
      title: "Cyber Security #7",
      admin: "Eng. Nourhan Gamal",
      adminImage: "https://randomuser.me/api/portraits/women/7.jpg",
      NumberOfLessons: "24",
      NumberOfHours: "38",
      percentage: 100,
      category: "it"
    },
    {
      courseId: 8,
      icon: "https://cdn-icons-png.flaticon.com/512/2490/2490415.png",
      title: "Networking Basics #8",
      admin: "Dr. Tarek Hussein",
      adminImage: "https://randomuser.me/api/portraits/men/8.jpg",
      NumberOfLessons: "19",
      NumberOfHours: "32",
      percentage: 65,
      category: "it"
    },
    {
      courseId: 9,
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      title: "SEO & Digital Marketing #9",
      admin: "Eng. Reem Sobhy",
      adminImage: "https://randomuser.me/api/portraits/women/9.jpg",
      NumberOfLessons: "16",
      NumberOfHours: "25",
      percentage: 85,
      category: "business"
    },
    {
      courseId: 10,
      icon: "https://cdn-icons-png.flaticon.com/512/2620/2620976.png",
      title: "DevOps & Automation #10",
      admin: "Dr. Hisham Said",
      adminImage: "https://randomuser.me/api/portraits/men/10.jpg",
      NumberOfLessons: "27",
      NumberOfHours: "44",
      percentage: 40,
      category: "web"
    },
    {
      courseId: 11,
      icon: "https://cdn-icons-png.flaticon.com/512/3181/3181782.png",
      title: "Data Science Advanced #11",
      admin: "Dr. Samira Ali",
      adminImage: "https://randomuser.me/api/portraits/women/11.jpg",
      NumberOfLessons: "28",
      NumberOfHours: "50",
      percentage: 75,
      category: "dataScience"
    },
    {
      courseId: 12,
      icon: "https://cdn-icons-png.flaticon.com/512/1173/1173716.png",
      title: "React JS Development #12",
      admin: "Eng. Omar Ahmed",
      adminImage: "https://randomuser.me/api/portraits/men/12.jpg",
      NumberOfLessons: "22",
      NumberOfHours: "40",
      percentage: 95,
      category: "web"
    },
    {
      courseId: 13,
      icon: "https://cdn-icons-png.flaticon.com/512/3992/3992642.png",
      title: "Python for Data Science #13",
      admin: "Dr. Khaled Mostafa",
      adminImage: "https://randomuser.me/api/portraits/men/13.jpg",
      NumberOfLessons: "30",
      NumberOfHours: "50",
      percentage: 60,
      category: "dataScience"
    },
    {
      courseId: 14,
      icon: "https://cdn-icons-png.flaticon.com/512/1071/1071268.png",
      title: "Digital Transformation #14",
      admin: "Prof. Hana Mostafa",
      adminImage: "https://randomuser.me/api/portraits/women/14.jpg",
      NumberOfLessons: "18",
      NumberOfHours: "35",
      percentage: 85,
      category: "business"
    },
    {
      courseId: 15,
      icon: "https://cdn-icons-png.flaticon.com/512/2043/2043841.png",
      title: "Mobile Development with Flutter #15",
      admin: "Dr. Mohamed Hassan",
      adminImage: "https://randomuser.me/api/portraits/men/15.jpg",
      NumberOfLessons: "25",
      NumberOfHours: "40",
      percentage: 70,
      category: "it"
    },
    {
      courseId: 16,
      icon: "https://cdn-icons-png.flaticon.com/512/2294/2294850.png",
      title: "Blockchain Development #16",
      admin: "Eng. Rania Ahmed",
      adminImage: "https://randomuser.me/api/portraits/women/16.jpg",
      NumberOfLessons: "20",
      NumberOfHours: "30",
      percentage: 50,
      category: "dataScience"
    },
    {
      courseId: 17,
      icon: "https://cdn-icons-png.flaticon.com/512/1803/1803749.png",
      title: "AI for Business #17",
      admin: "Dr. Rami Yasser",
      adminImage: "https://randomuser.me/api/portraits/men/17.jpg",
      NumberOfLessons: "15",
      NumberOfHours: "25",
      percentage: 90,
      category: "business"
    },
    {
      courseId: 18,
      icon: "https://cdn-icons-png.flaticon.com/512/2051/2051557.png",
      title: "Java Programming #18",
      admin: "Eng. Tamer Salah",
      adminImage: "https://randomuser.me/api/portraits/men/18.jpg",
      NumberOfLessons: "28",
      NumberOfHours: "45",
      percentage: 80,
      category: "it"
    },
    {
      courseId: 19,
      icon: "https://cdn-icons-png.flaticon.com/512/1716/1716359.png",
      title: "Data Visualization #19",
      admin: "Dr. Nour El-Din",
      adminImage: "https://randomuser.me/api/portraits/men/19.jpg",
      NumberOfLessons: "22",
      NumberOfHours: "38",
      percentage: 65,
      category: "dataScience"
    },
    {
      courseId: 20,
      icon: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
      title: "Machine Learning #20",
      admin: "Prof. Reem Shaker",
      adminImage: "https://randomuser.me/api/portraits/women/20.jpg",
      NumberOfLessons: "30",
      NumberOfHours: "55",
      percentage: 40,
      category: "dataScience"
    },
    {
      courseId: 21,
      icon: "https://cdn-icons-png.flaticon.com/512/3155/3155489.png",
      title: "Leadership Development #21",
      admin: "Dr. Laila Gamal",
      adminImage: "https://randomuser.me/api/portraits/women/21.jpg",
      NumberOfLessons: "24",
      NumberOfHours: "40",
      percentage: 90,
      category: "leaderShip"
    },
    {
      courseId: 22,
      icon: "https://cdn-icons-png.flaticon.com/512/1415/1415384.png",
      title: "Public Speaking & Presentation #22",
      admin: "Prof. Ahmed Saleh",
      adminImage: "https://randomuser.me/api/portraits/men/22.jpg",
      NumberOfLessons: "28",
      NumberOfHours: "50",
      percentage: 75,
      category: "communication"
    },
    {
      courseId: 23,
      icon: "https://cdn-icons-png.flaticon.com/512/1056/1056127.png",
      title: "Conflict Resolution Skills #23",
      admin: "Dr. Sarah Khaled",
      adminImage: "https://randomuser.me/api/portraits/women/23.jpg",
      NumberOfLessons: "26",
      NumberOfHours: "45",
      percentage: 85,
      category: "communication"
    },
    {
      courseId: 24,
      icon: "https://cdn-icons-png.flaticon.com/512/3461/3461050.png",
      title: "Corporate Leadership #24",
      admin: "Eng. Tamer Nour",
      adminImage: "https://randomuser.me/api/portraits/men/24.jpg",
      NumberOfLessons: "22",
      NumberOfHours: "38",
      percentage: 70,
      category: "leaderShip"
    },
    {
      courseId: 25,
      icon: "https://cdn-icons-png.flaticon.com/512/1603/1603970.png",
      title: "Effective Negotiation Skills #25",
      admin: "Dr. Hany Fathy",
      adminImage: "https://randomuser.me/api/portraits/men/25.jpg",
      NumberOfLessons: "30",
      NumberOfHours: "55",
      percentage: 95,
      category: "communication"
    },
    {
      courseId: 26,
      icon: "https://cdn-icons-png.flaticon.com/512/1802/1802332.png",
      title: "Organizational Leadership #26",
      admin: "Prof. Dina Mohamed",
      adminImage: "https://randomuser.me/api/portraits/women/26.jpg",
      NumberOfLessons: "28",
      NumberOfHours: "48",
      percentage: 80,
      category: "leaderShip"
    },
    {
      courseId: 27,
      icon: "https://cdn-icons-png.flaticon.com/512/1441/1441137.png",
      title: "Team Collaboration & Communication #27",
      admin: "Eng. Mohamed El-Sayed",
      adminImage: "https://randomuser.me/api/portraits/men/27.jpg",
      NumberOfLessons: "25",
      NumberOfHours: "40",
      percentage: 65,
      category: "communication"
    },
    {
      courseId: 28,
      icon: "https://cdn-icons-png.flaticon.com/512/1633/1633722.png",
      title: "Change Management & Communication #28",
      admin: "Dr. Amira Zaki",
      adminImage: "https://randomuser.me/api/portraits/women/28.jpg",
      NumberOfLessons: "20",
      NumberOfHours: "35",
      percentage: 60,
      category: "leaderShip"
    },
    {
      courseId: 29,
      icon: "https://cdn-icons-png.flaticon.com/512/1082/1082595.png",
      title: "Interpersonal Communication #29",
      admin: "Prof. Rania Youssef",
      adminImage: "https://randomuser.me/api/portraits/women/29.jpg",
      NumberOfLessons: "22",
      NumberOfHours: "38",
      percentage: 90,
      category: "communication"
    },
    {
      courseId: 30,
      icon: "https://cdn-icons-png.flaticon.com/512/3155/3155899.png",
      title: "Inspirational Leadership #30",
      admin: "Eng. Khaled Samir",
      adminImage: "https://randomuser.me/api/portraits/men/30.jpg",
      NumberOfLessons: "24",
      NumberOfHours: "42",
      percentage: 80,
      category: "leaderShip"
    }
  ]

  constructor() { }
}
