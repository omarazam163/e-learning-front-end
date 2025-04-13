import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseModulesService } from '../../../core/services/course-modules.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule,RouterModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
  courseId: any;
  activeCourseLink: string = 'Overview';
  handleActiveLink(active: string) {
    this.activeCourseLink = active;
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    public courseModulesService: CourseModulesService,
    public authService : AuthService
  ) {}

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
