import { Component, EventEmitter, inject, Input, input, Output, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { category } from '../../../shared/interfaces/category';
@Component({
  selector: 'app-add-course-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.scss',
})
export class AddCourseFormComponent {
  @Input() addCourseForm!: FormGroup;
  @Output() next = new EventEmitter<void>();
  _categoryService = inject(CategoryService);
  categories = signal<category[]>([]);
  onFileChange(event: any) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // Manually set the file in the form control
      this.addCourseForm.patchValue({
        courseImage: file,
        courseImageUrl: URL.createObjectURL(file),
      });
    }
  }

  ngOnInit() {
    this._categoryService.getAllCategories().subscribe((res: any) => {
      this.categories.set(res.data);
    });
  }
}
