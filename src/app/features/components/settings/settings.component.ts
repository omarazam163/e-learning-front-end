import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  activeSetting : string = "notification";
  handleActiveSettings(str : string) {
    this.activeSetting = str;
  }

  nots : { title : string , active : boolean }[] = [
    { title : 'Promotion, course recommendations' , active : true },
    { title : 'Don\'t send any propotional emails' , active : false },
    { title : 'Anouncment from instructors whose course' , active : true },
    { title : 'Examination notice' , active : true },
  ]

}
