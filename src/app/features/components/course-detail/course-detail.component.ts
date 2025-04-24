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

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
  courseId: any;
  activeCourseLink: string = 'Overview';
  handleActiveLink(active: string) {
    this.activeCourseLink = active;
  }
  modules: any[] = [];
  courseDetails!: Course;
  videoUrl: string = '';
  videoTitle: string = '';

  constructor(
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
    public courseModulesService: CourseModulesService,
    private CoursesService: CoursesService,
    public instructorsService: InstructorsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
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
}
