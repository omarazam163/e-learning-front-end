import { CoursesService } from './../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseModulesService } from '../../../core/services/course-modules.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, pipe } from 'rxjs';
import { InstructorsService } from '../../../core/services/instructors.service';
import { Instructor } from '../../../shared/interfaces/Instructor';
import { Course } from '../../../shared/interfaces/course';
import { FormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterModule , FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
  courseId: number = 0;
  activeCourseLink: string = 'Overview';
  handleActiveLink(active: string) {
    this.activeCourseLink = active;
  }
  modules: any[] = [];
  courseDetails!: Course;
  videoUrl: string = '';
  videoTitle: string = '';
  reviewMessage : string = "";
  reviewRating : number = 0;
  errorReviewMessage : boolean = false;
  errorReviewRating : boolean = false;
  studentId : number = 0 ;

  constructor(
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
    public courseModulesService: CourseModulesService,
    private CoursesService: CoursesService,
    public instructorsService: InstructorsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.GetModules().subscribe((res) => (this.modules = res));
    this.CoursesService.getCourseById(this.courseId).subscribe(
      (res: Course) => {
        this.courseDetails = res;
      }
    );
  }

  GetModules(): Observable<any[]> {
    return this.http
      .get<any>(`https://localhost:7180/api/Modules/Course/${this.courseId}`)
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  handleActiveVideo(vu: string, vt: string) {
    this.videoUrl = vu;
    this.videoTitle = vt;
  }

  SendReview() {
    if (this.reviewMessage.length < 10)
    {
      this.errorReviewMessage = true;
    }
    else if (this.reviewRating == 0)
    {
      this.errorReviewMessage = false;
      this.errorReviewRating = true;
    }
    else
    {
      this.errorReviewMessage = false;
      this.errorReviewRating = false;
      this.authService.islogin.subscribe((val) => {
          this.authService.UserData.subscribe((user: User) => {
            this.studentId = Number(user.Id);
          });
      });
      this.http.put("https://localhost:7180/api/Reviews" , {
        "studentId": this.studentId,
        "courseId": this.courseId,
        "comment": this.reviewMessage,
        "rating": this.reviewRating
      });
      console.log({
        "studentId": this.studentId,
        "courseId": this.courseId,
        "comment": this.reviewMessage,
        "rating": this.reviewRating
      });
      this.reviewMessage = '';
      this.reviewRating = 0;
    }
  }

}
