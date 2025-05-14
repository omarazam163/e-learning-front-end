import { Injectable } from '@angular/core';
import { Link } from '../../shared/interfaces/link';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  links: Link[] = [
    {
      title: 'Dashboard',
      to: '/mylearning/dashboard',
      icon: 'fa-solid fa-house',
    },
    {
      title: 'Course',
      to: '/mylearning/course',
      icon: 'fa-regular fa-file-lines',
    },
    {
      title: 'Resources',
      to: '/mylearning/resources',
      icon: 'fa-regular fa-bookmark',
    },
    {
      title: 'Chat',
      to: '/mylearning/chat',
      icon: 'fa-regular fa-comment-dots',
    },
    {
      title: 'Schedule',
      to: '/mylearning/schedule',
      icon: 'fa-regular fa-calendar-days',
    },
    {
      title: 'Portfolio',
      to: '/mylearning/portfolio',
      icon: 'fa-regular fa-user',
    },
    { title: 'Settings', to: '/mylearning/settings', icon: 'fa-solid fa-gear' },
  ];

  constructor() {}
}
