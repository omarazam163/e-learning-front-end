import { Component, signal } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { category } from '../../../shared/interfaces/category';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule , OwlOptions } from 'ngx-owl-carousel-o';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../../shared/interfaces/course';
import { FormControl, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ CarouselModule , CommonModule , RouterModule , FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public courses = signal<Course[]>([]);
  categories : category[] = [];
  public email: string = '';
  public emailError: string = '';
  public message: string = '';
  public messageError: string = '';
  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed:400,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 400,
    navText: ['<', '>'],
    margin:20,
    // autoplay:true,
    responsive: {
      0: {
        items: 1.5,
      },
      400: {
        items: 3.5,
      },
      740: {
        items: 4.5,
      },
      940: {
        items: 6.5,
      },
    },
    nav: true,
  };

  constructor( private categoryService : CategoryService , private coursesService : CoursesService ) {  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
    this.coursesService.getCourses().subscribe((res: Course[]) => {
      this.courses.set(res);
    });
  }

  sendEmail() {
      const emailControl = new FormControl(this.email, [Validators.email]);
      if (this.email == '') {
        this.emailError = 'email is required';
      } else if (this.message == '') {
        this.emailError = '';
        this.messageError = 'message is required';
      } else if (emailControl.errors?.['email']) {
        this.messageError = '';
        this.emailError = 'Wrong email';
      } else if (this.message.length < 10) {
        this.emailError = '';
        this.messageError = 'Min length 10';
      } else {
        // Waiting Backend ...
        this.emailError = '';
        this.messageError = '';
        this.email = 'Message Sent';
        this.message = 'Message Sent';
        setTimeout(() => {
          this.email = '';
          this.message = '';
        }, 1000);
      }
    }

}
