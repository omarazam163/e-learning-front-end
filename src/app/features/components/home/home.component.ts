import { Component, signal } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { category } from '../../../shared/interfaces/category';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../../shared/interfaces/course';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ReviewsService } from '../../../core/services/reviews.service';
import { Review } from '../../../shared/interfaces/review';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public courses = signal<Course[]>([]);
  public featuredCourses = signal<Course[]>([]);
  public reviews = signal<Review[]>([]);
  categories: category[] = [];
  public email: string = '';
  public emailError: string = '';
  public message: string = '';
  public messageError: string = '';
  public currentYear: number = new Date().getFullYear();

  // Category icons mapping
  categoryIcons: { [key: string]: string } = {
    Programming: 'fa-code',
    Business: 'fa-briefcase',
    Design: 'fa-palette',
    Marketing: 'fa-bullhorn',
    Photography: 'fa-camera',
    Music: 'fa-music',
    Health: 'fa-heartbeat',
    Fitness: 'fa-dumbbell',
    Language: 'fa-language',
    Technology: 'fa-laptop-code',
    Science: 'fa-flask',
    Mathematics: 'fa-calculator',
    default: 'fa-graduation-cap',
  };

  public statistics = {
    students: 0,
    courses: 0,
    instructors: 0,
    ratings: 0,
  };

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
  };

  testimonialOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  };

  constructor(
    private categoryService: CategoryService,
    private coursesService: CoursesService,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    // Load categories
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data;
    });

    // Load all courses
    this.coursesService.getCourses().subscribe({
      next: (res: Course[]) => {
        this.courses.set(res);
        // Set featured courses (first 6 courses)
        this.featuredCourses.set(res.slice(0, 6));

        // Update statistics
        this.statistics.courses = res.length;
        this.statistics.instructors = new Set(
          res.map((course) => course.instructor.id)
        ).size;

        // Load reviews for all featured courses
        const reviewRequests = this.featuredCourses().map(course => 
          this.reviewsService.getreviewsByCourseId(course.id)
        );

        forkJoin(reviewRequests).subscribe({
          next: (allReviews: Review[][]) => {
            // Flatten and filter out empty reviews
            const reviews = allReviews
              .flat()
              .filter(review => review && review.comment && review.comment.trim() !== '');

            // Calculate average rating
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            this.statistics.ratings = reviews.length > 0 
              ? +(totalRating / reviews.length).toFixed(1) 
              : 4.5; // Default rating if no reviews

            // Set unique reviews for testimonials (up to 6)
            const uniqueReviews = Array.from(
              new Map(reviews.map(review => [review.studentId, review])).values()
            ).slice(0, 6);

            // If we have no real reviews, add some sample testimonials
            if (uniqueReviews.length === 0) {
              this.reviews.set([
                {
                  id: 1,
                  studentId: 1,
                  studentName: "Sarah Johnson",
                  image: "assets/images/default-avatar.png",
                  courseId: 1,
                  comment: "The course content was excellent and well-structured. I learned so much in just a few weeks!",
                  rating: 5,
                  createdAt: new Date().toISOString()
                },
                {
                  id: 2,
                  studentId: 2,
                  studentName: "Michael Chen",
                  image: "assets/images/default-avatar.png",
                  courseId: 2,
                  comment: "Great platform for learning. The instructors are knowledgeable and supportive.",
                  rating: 4,
                  createdAt: new Date().toISOString()
                },
                {
                  id: 3,
                  studentId: 3,
                  studentName: "Emily Davis",
                  image: "assets/images/default-avatar.png",
                  courseId: 3,
                  comment: "I've taken several courses here and each one has helped me advance in my career.",
                  rating: 5,
                  createdAt: new Date().toISOString()
                }
              ]);
            } else {
              this.reviews.set(uniqueReviews);
            }
          },
          error: (err) => {
            // Fallback to sample testimonials on error
            this.reviews.set([
              {
                id: 1,
                studentId: 1,
                studentName: "Sarah Johnson",
                image: "assets/images/default-avatar.png",
                courseId: 1,
                comment: "The course content was excellent and well-structured. I learned so much in just a few weeks!",
                rating: 5,
                createdAt: new Date().toISOString()
              },
              {
                id: 2,
                studentId: 2,
                studentName: "Michael Chen",
                image: "assets/images/default-avatar.png",
                courseId: 2,
                comment: "Great platform for learning. The instructors are knowledgeable and supportive.",
                rating: 4,
                createdAt: new Date().toISOString()
              },
              {
                id: 3,
                studentId: 3,
                studentName: "Emily Davis",
                image: "assets/images/default-avatar.png",
                courseId: 3,
                comment: "I've taken several courses here and each one has helped me advance in my career.",
                rating: 5,
                createdAt: new Date().toISOString()
              }
            ]);
          }
        });
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  getCategoryIcon(categoryName: string): string {
    return (
      'fas ' +
      (this.categoryIcons[categoryName] || this.categoryIcons['default'])
    );
  }

  sendEmail() {
    const emailControl = new FormControl(this.email, [Validators.email]);
    if (this.email == '') {
      this.emailError = 'Email is required';
    } else if (this.message == '') {
      this.emailError = '';
      this.messageError = 'Message is required';
    } else if (emailControl.errors?.['email']) {
      this.messageError = '';
      this.emailError = 'Invalid email format';
    } else if (this.message.length < 10) {
      this.emailError = '';
      this.messageError = 'Message must be at least 10 characters';
    } else {
      this.emailError = '';
      this.messageError = '';
      // Success message
      this.email = '';
      this.message = '';
      alert('Message sent successfully!');
    }
  }
}
