import { Component, inject } from '@angular/core';
import { InstructorsService } from '../../../core/services/instructors.service';
import { Instructor } from '../../../shared/interfaces/Instructor';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-account-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent {
  //services
  _instructorService = inject(InstructorsService);
  _PID = inject(PLATFORM_ID);
  _auth = inject(AuthService);
  //variables
  instructorData: Instructor = {} as Instructor;
  editForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    bio: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl(''),
  });
  ngOnInit() {
    if (isPlatformBrowser(this._PID)) {
      this.loadInstructorData();
    }
  }

  intialValues()
  {
    this.editForm.get('userName')?.setValue(this.instructorData.name);
    this.editForm.get('bio')?.setValue(this.instructorData.bio);
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.instructorData.image = URL.createObjectURL(file);
      this.editForm.patchValue({
        image: file,
      });
    }
  }

  submitForm() {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('Name', this.editForm.get('userName')?.value as string);
      formData.append('Bio', this.editForm.get('bio')?.value as string);
      formData.append(
        'Image',
        this.editForm.get('image')?.value as unknown as File
      );
      formData.append('Id', this._auth.UserData.getValue().roleId as string);
      formData.append('Email', this._auth.UserData.getValue().Email as string);
      this._instructorService.updateInstructor(formData).subscribe(() => {
        console.log('done');
      });
    }
  }

  loadInstructorData() {
    this._instructorService
      .getSpecificInstructor(this._auth.UserData.getValue().roleId)
      .subscribe({
        next: (res: Instructor) => {
          this.instructorData = res;
          this.intialValues();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  removeImage() {
    this.instructorData.image = '';
    this.editForm.get('image')?.setValue('');
  }
}
