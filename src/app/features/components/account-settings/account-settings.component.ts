import { Student } from './../../../shared/interfaces/student';
import { Component, inject } from '@angular/core';
import { InstructorsService } from '../../../core/services/instructors.service';
import { Instructor } from '../../../shared/interfaces/Instructor';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { StudentService } from '../../../core/services/student.service';
import { role } from '../../../shared/types/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent {
  //services
  _instructorService = inject(InstructorsService);
  _studentService = inject(StudentService);
  _PID = inject(PLATFORM_ID);
  _auth = inject(AuthService);
  _router = inject(Router);
  role: role = this._auth.UserData.getValue().role;
  
  //variables
  userInfo: Instructor | Student = {} as Instructor;
  certificateFiles: File[] = [];
  maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

  editForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    bio: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl(''),
    position: new FormControl('', [Validators.required]),
    certificates: new FormArray([])
  });

  get certificatesArray() {
    return this.editForm.get('certificates') as FormArray;
  }

  ngOnInit() {
    if (isPlatformBrowser(this._PID)) {
      if (this.role == 'Instructor') {
        this.loadInstructorData();
      } else if (this.role == 'Student') {
        this.loadStudentData();
      }
    }
  }

  intialValues() {
    this.editForm.get('userName')?.setValue(this.userInfo.name);
    if (this.role == 'Instructor') {
      const instructor = this.userInfo as Instructor;
      this.editForm.get('bio')?.setValue(instructor.bio);
      this.editForm.get('position')?.setValue(instructor.position);
      
      // Clear existing certificates
      while (this.certificatesArray.length) {
        this.certificatesArray.removeAt(0);
      }
      this.certificateFiles = [];
      
      // Add existing certificates
      if (instructor.certificates && instructor.certificates.length) {
        instructor.certificates.forEach(cert => {
          this.certificatesArray.push(new FormControl(""));
          // If the certificate is a URL, we'll need to fetch it and convert to File
          if (typeof cert === 'string' && cert.startsWith('http')) {
            this.fetchCertificateFile(cert).then(file => {
              this.certificateFiles.push(file);
              this.certificatesArray.at(this.certificatesArray.length - 1)?.setValue(file);
            });
          }
        });
      }
    } else {
      // Remove instructor-specific controls for students
      (this.editForm as FormGroup).removeControl('bio');
      (this.editForm as FormGroup).removeControl('position');
      (this.editForm as FormGroup).removeControl('certificates');
    }
  }

  async fetchCertificateFile(url: string): Promise<File> {
    try {
      console.log(url);
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.split('/').pop() || 'certificate';
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error('Error fetching certificate:', error);
      return new File([], 'error-loading-certificate');
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  handleCertificateChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > this.maxFileSize) {
        alert('File size exceeds 10MB limit');
        return;
      }
      this.certificateFiles[index] = file;
      this.editForm.get('certificates')?.get(index.toString())?.setValue(file);
    }
  }

  addCertificate() {
    this.certificatesArray.push(new FormControl(''));
    this.certificateFiles.push(null as any);
  }

  removeCertificate(index: number) {
    this.certificatesArray.removeAt(index);
    this.certificateFiles.splice(index, 1);
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > this.maxFileSize) {
        alert('File size exceeds 10MB limit');
        return;
      }
      this.userInfo.image = URL.createObjectURL(file);
      this.editForm.patchValue({
        image: file,
      });
    }
  }

  submitFormInstructor() {
    if (this.editForm.valid) {
      const formData = new FormData();
      console.log(this.editForm.value);
      formData.append('Name', this.editForm.get('userName')?.value as string);
      formData.append('Bio', this.editForm.get('bio')?.value as string);
      formData.append('Position', this.editForm.get('position')?.value as string);
      formData.append(
        'Image',
        this.editForm.get('image')?.value as unknown as File
      );
      formData.append('Id', this._auth.UserData.getValue().roleId.toString());
      formData.append('Email', this._auth.UserData.getValue().Email as string);
      
      // Append certificates
      this.certificateFiles.forEach((file, index) => {
        if (file) {
          formData.append('Certificates', file);
        }
      });

      this._instructorService.updateInstructor(formData).subscribe({
        next: () => {
          this._router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error updating instructor:', error);
          alert('Failed to update profile. Please try again.');
        }
      });
    }
  }

  submitFormStudent() {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('Name', this.editForm.get('userName')?.value as string);
      formData.append(
        'Image',
        this.editForm.get('image')?.value as unknown as File
      );
      formData.append('Email', this._auth.UserData.getValue().Email as string);
      this._studentService
        .updateStudent(this._auth.UserData.getValue().roleId, formData)
        .subscribe(() => {
          this._router.navigate(['/home']);
        });
    }
  }

  loadInstructorData() {
    this._instructorService
      .getSpecificInstructor(this._auth.UserData.getValue().roleId.toString())
      .subscribe({
        next: (res: Instructor) => {
          this.userInfo = res;
          this.intialValues();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  loadStudentData() {
    this._studentService
      .getStudentData(this._auth.UserData.getValue().roleId)
      .subscribe({
        next: (res: Student) => {
          this.userInfo = res;
          this.intialValues();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  removeImage() {
    this.userInfo.image = '';
    this.editForm.get('image')?.setValue('');
  }
}
