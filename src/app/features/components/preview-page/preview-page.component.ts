import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { coursePreview } from '../../../shared/interfaces/privewCourse';

@Component({
  selector: 'app-preview-page',
  imports: [],
  templateUrl: './preview-page.component.html',
  styleUrl: './preview-page.component.scss',
})
export class PreviewPageComponent {
  @Input({ required: true }) course!: coursePreview;
  @Output() publish = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
}
