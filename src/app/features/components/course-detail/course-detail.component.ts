import { CoursesService } from './../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseModulesService } from '../../../core/services/course-modules.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { InstructorsService } from '../../../core/services/instructors.service';
import { Course } from '../../../shared/interfaces/course';
import Module from 'node:module';

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
  ) {}

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this._ModuleService.getCourseModules(this.courseId).subscribe(
      
    );
    this.CoursesService.getCourseById(this.courseId).subscribe(
      (res: Course) => {
        this.courseDetails = res;
      }
    );
  }

  handleActiveVideo(vu: string, vt: string) {
    this.videoUrl = vu;
    this.videoTitle = vt;
  }
}
