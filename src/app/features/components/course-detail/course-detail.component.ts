import { CartService } from './../../../core/services/cart.service';
import { QuizService } from './../../../core/services/quiz.service';
import { CoursesService } from './../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseModulesService } from '../../../core/services/course-modules.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { InstructorsService } from '../../../core/services/instructors.service';
import { Course } from '../../../shared/interfaces/course';
import { Module } from '../../../shared/interfaces/module';
import { MatTabsModule } from '@angular/material/tabs';
import { video } from '../../../shared/interfaces/video';
import { Quiz } from '../../../shared/interfaces/quiz';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterModule, MatTabsModule],
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
  constructor(
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
    public courseModulesService: CourseModulesService,
    private CoursesService: CoursesService,
    public instructorsService: InstructorsService,
    public authService: AuthService,
    private _ModuleService: CourseModulesService,
    public _QuizService: QuizService,
    public _CartService: CartService,
  ) {}

  inCart = signal<boolean>(false);

  ngOnInit(): void {
    this.courseId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') as string);
    this._ModuleService.getCourseModules(this.courseId).subscribe({
      next: (res: Module[]) => {
        this.modules = res;
      },
    });
    this.CoursesService.getCourseById(this.courseId).subscribe(
      (res: Course) => {
        this.courseDetails = res;
      }
    );
    this._CartService._cartItems.subscribe((items) => {
      items.forEach((item) => {
        if (item.id == this.courseId) {
          this.inCart.set(true);
        }
      })
    })
  }

  handleActiveVideo(vu: string, vt: string) {
    this.videoUrl = vu;
    this.videoTitle = vt;
  }

  calcluteDuration(videos: video[]) {
    let totalDuration = 0;
    videos.forEach((video) => {
      let hours = video.duration.split(':')[0];
      let minutes = video.duration.split(':')[1];
      totalDuration +=
        parseInt(hours) * 60 + parseInt(minutes) ;
    });
    return totalDuration;
  }

  addtoCart() {
    this._CartService.addToCart(this.authService.UserData.getValue().roleId, this.courseId).subscribe({
      next: (res) => {
        this.inCart.set(true);
        this._CartService._cartItems.next(res.courses);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
