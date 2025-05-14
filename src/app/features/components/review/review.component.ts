import { Component, inject, Input, signal } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';
import { StarRatingConfigService } from 'angular-star-rating';
import { ReviewsService } from '../../../core/services/reviews.service';
import { Review } from '../../../shared/interfaces/review';
import { StudentService } from '../../../core/services/student.service';
import { AuthService } from '../../../core/services/auth.service';
import { Student } from '../../../shared/interfaces/student';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewPost } from '../../../shared/interfaces/reviewPost';
@Component({
  selector: 'app-review',
  imports: [StarRatingModule, ReactiveFormsModule],
  providers: [StarRatingConfigService],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  @Input({ required: true }) CourseId!: any;
  _ReviewService = inject(ReviewsService);
  _studentService = inject(StudentService);
  _authService = inject(AuthService);
  Reviews = signal<Review[]>([]);
  userData = signal<Student>({} as Student);
  addNewReview = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.required]),
  });
  reviewForm = new FormGroup({
    rating: new FormControl(3, [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this._ReviewService.getreviewsByCourseId(this.CourseId).subscribe((res) => {
      this.Reviews.set(res);
    });

    this._studentService
      .getStudentData(this._authService.UserData.getValue().roleId)
      .subscribe((res) => {
        this.userData.set(res);
      });
  }
  getDate(date: string) {
    const diffInMs = new Date(date).getTime() - new Date().getTime(); // milliseconds
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // convert to days
    return Math.floor(diffInDays);
  }

  refresh() {
    this._ReviewService.getreviewsByCourseId(this.CourseId).subscribe((res) => {
      this.Reviews.set(res);
    });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      let reviewPost: ReviewPost = {
        comment: this.reviewForm.value.comment as string,
        courseId: this.CourseId,
        rating: this.reviewForm.value.rating as number,
        studentId: this._authService.UserData.getValue().roleId,
      };
      this._ReviewService.postReview(reviewPost).subscribe((res) => {
        this.reviewForm.reset();
        this.refresh();
      });
    }
  }
}
