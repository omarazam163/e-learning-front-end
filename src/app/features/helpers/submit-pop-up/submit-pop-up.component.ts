import { Component, input, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-submit-pop-up',
  imports: [RouterLink],
  templateUrl: './submit-pop-up.component.html',
  styleUrl: './submit-pop-up.component.scss',
})
export class SubmitPopUpComponent {
  @Input({ required: true }) score!: number;
  @Input({ required: true }) totalScore!: number;
  @Input({ required: true }) CourseName!: string;
  @Input({ required: true }) CourseId!: number;
}
