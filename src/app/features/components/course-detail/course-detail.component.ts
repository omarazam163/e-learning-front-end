import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseModulesService } from '../../../core/services/course-modules.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { InstructorsService } from '../../../core/services/instructors.service';

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
  instructors : any[] = [];
  modules : any[] = [];
  courseDetails : any;
  videoUrl : string = "";
  videoTitle : string = "";

  constructor(
    public http : HttpClient,
    public activatedRoute: ActivatedRoute,
    public courseModulesService: CourseModulesService,
    public instructorsService: InstructorsService,
    public authService : AuthService
  ) {}

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.GetModules().subscribe( (res) => this.modules = res )
    this.GetCourseDetails().subscribe( (res) => this.courseDetails = res )
    this.instructorsService.getInstructors().subscribe( (res) => this.instructors = res )
  }

  GetModules () : Observable<any[]> {
    return this.http.get<any>(`https://localhost:7180/api/Modules/Course/${this.courseId}`).pipe(
      map(res => {
        return res.data;
      })
    );
  }

  GetCourseDetails () : Observable<any[]> {
    return this.http.get<any>(`https://localhost:7180/api/Courses/${this.courseId}`).pipe(
      map(res => {
        return res.data;
      })
    );
  }

  getInstructorData(iId : any){
    return this.instructors.find( i => i.id == iId)
  }

  handleActiveVideo (vu : string, vt : string) { 
    this.videoUrl = vu;
    this.videoTitle = vt;
  } 

}
