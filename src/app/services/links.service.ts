import { Injectable } from '@angular/core';
import { Link } from '../interfaces/link';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  links : Link[] = [
    { title: 'Dashboard' , to: '/' , icon: 'fa-solid fa-house' },
    { title: 'Course' ,    to: '/course'    , icon: 'fa-regular fa-file-lines' },
    { title: 'Resources' , to: '/resources' , icon: 'fa-regular fa-bookmark' },
    { title: 'Chat' ,      to: '/chat'      , icon: 'fa-regular fa-comment-dots' },
    { title: 'Schedule' ,  to: '/schedule'  , icon: 'fa-regular fa-calendar-days' },
    { title: 'Portfolio' , to: '/portfolio' , icon: 'fa-regular fa-user' },
    { title: 'Settings' ,  to: '/settings'  , icon: 'fa-solid fa-gear' },
  ]

  constructor() { }
}
