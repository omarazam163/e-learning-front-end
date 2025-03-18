import { Injectable } from '@angular/core';
import { Details } from './../interfaces/details';
import { Notification } from '../interfaces/notifications';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  details : Details = {
    imagePath: "https://th.bing.com/th/id/OIP.YIre5HGHiqBa7DCmrF4KwwHaJQ?rs=1&pid=ImgDetMain",
    name: "Mohamed Ali",
    email: "mohamedAli@gmail.com",
    address: "127 , ElSalaam , cairo , Egypt",
    city: "ElSalaam , cairo",
    state: "ElSalaam , cairo",
    zipCode: "3200",
    country: "Egypt",
  };

  notifications : Notification[] = [
    { message:'You have a new message from the instructor.' , time: '2m ago' },
    { message:'Your course progress has been updated.' , time: '1h ago' },
    { message:'New lesson added to your enrolled course.' , time: '1d ago' },
  ]

  saveChanges(values : any) {
    this.details = {
      imagePath: values.imagePath,
      name: values.name,
      email: values.email,
      address: values.address,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      country: values.country
    }
  }

  constructor() {  }

}
