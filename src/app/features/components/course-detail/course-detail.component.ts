import { video } from './../../../shared/interfaces/video';
import { EnrollmentService } from './../../../core/services/enrollment.service';
import { CartService } from './../../../core/services/cart.service';
import { QuizService } from './../../../core/services/quiz.service';
import { CoursesService } from './../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseModulesService } from '../../../core/services/course-modules.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { InstructorsService } from '../../../core/services/instructors.service';
import { Course } from '../../../shared/interfaces/course';
import { Module } from '../../../shared/interfaces/module';
import { MatTabsModule } from '@angular/material/tabs';
import { User } from '../../../shared/interfaces/user.';
import { role } from '../../../shared/types/role';
import { Router } from '@angular/router';
import { ReviewComponent } from '../review/review.component';
import { VideoService } from '../../../core/services/video.service';

@Component({
  selector: 'app-course-detail',
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    ReviewComponent,
    ReviewComponent,
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
  courseId!: number;
  activeCourseLink: string = 'Overview';
  handleActiveLink(active: string) {
    this.activeCourseLink = active;
  }
  modules: Module[] = [];
  courseDetails!: Course;
  videoUrl: string = '';
  videoTitle: string = '';
  poped: boolean = false;
  showPopUpSignal = signal<boolean>(false);
  selectedVideo = signal<video>({} as video);
  _EnrollmentService = inject(EnrollmentService);
  _Router = inject(Router);
  _videoService = inject(VideoService);
  constructor(
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
    public courseModulesService: CourseModulesService,
    private CoursesService: CoursesService,
    public instructorsService: InstructorsService,
    public authService: AuthService,
    private _ModuleService: CourseModulesService,
    public _QuizService: QuizService,
    public _CartService: CartService
  ) {}

  inCart = signal<boolean>(false);
  User: User = {} as User;
  islogin: role = 'noLogin';
  isEnrolled = signal<boolean>(false);
  ngOnInit(): void {
    this.authService.islogin.subscribe((val) => {
      this.islogin = val;
      this.authService.UserData.subscribe((user: User) => {
        this.User = user;
      });
    });

    this.courseId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('id') as string
    );
    this._ModuleService.getCourseModules(this.courseId).subscribe({
      next: (res: Module[]) => {
        console.log(res);
        this.modules = res;
      },
    });
    this.CoursesService.getCourseById(this.courseId).subscribe(
      (res: Course) => {
        this.courseDetails = res;
        if (this.User.role == 'Student') {
          this._EnrollmentService
            .checkInrollment(this.User.roleId, this.courseId)
            .subscribe({
              next: () => {
                this.isEnrolled.set(true);
                console.log(this.isEnrolled());
              },
              error: () => {
                this.isEnrolled.set(false);
                console.log(this.isEnrolled());
              },
            });
        } else {
          if (this.courseDetails.instructor.id == this.User.roleId) {
            this.isEnrolled.set(true);
          } else this.isEnrolled.set(false);
        }
      }
    );

    this._CartService._cartItems.subscribe((items) => {
      items.forEach((item) => {
        if (item.id == this.courseId) {
          this.inCart.set(true);
        }
      });
    });
  }

  handleActiveVideo(vu: video) {
    this.selectedVideo.set(vu);
    this.showPopup();
  }

  showPopup() {
    if (!this.isEnrolled() && !this.poped) {
      this.poped = true;
      this.showPopUpSignal.set(true);
    }
  }

  calcluteDuration(videos: video[]) {
    let totalDuration = 0;
    videos.forEach((video) => {
      let hours = video.duration.split(':')[0];
      let minutes = video.duration.split(':')[1];
      totalDuration += parseInt(hours) * 60 + parseInt(minutes);
    });
    return totalDuration;
  }

  addtoCart() {
    this._CartService
      .addToCart(this.authService.UserData.getValue().roleId, this.courseId)
      .subscribe({
        next: (res) => {
          this.inCart.set(true);
          this._CartService._cartItems.next(res.courses);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  closePopUp() {
    this.showPopUpSignal.set(false);
  }

  hanldeQuizNav(quizId: number) {
    if (this.isEnrolled() && this.User.role == 'Student') {
      this._Router.navigate(['/quizRoom', quizId]);
    } else if (this.isEnrolled() && this.User.role == 'Instructor') {
      this._Router.navigate(['/editQuiz', quizId]);
    } else {
      this.showPopUpSignal.set(true);
    }
  }


  markVideoAsDone(video: video) {
    this._videoService.markVideoAsDone(this.User.roleId, video.id).subscribe((res) => {
      video.isWatched = true
    });
  }
}
