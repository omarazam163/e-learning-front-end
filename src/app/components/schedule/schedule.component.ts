import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-schedule',
  imports: [CommonModule , FullCalendarModule ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

  selectedDate : Date = new Date();
  dayNames : string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  monthNames : string[] = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  hours: number[] = Array.from({length : 25} , (_,i) => i)

  constructor () {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin , interactionPlugin],
    selectable : true,
    height: '350px',
    dateClick: (info) => {
      this.selectedDate = info.date;
    }

  };

}
