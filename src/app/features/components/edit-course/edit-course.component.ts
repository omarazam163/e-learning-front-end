import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Course } from './../../../shared/interfaces/course';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { CourseModulesService } from '../../../core/services/course-modules.service';
import { Module } from '../../../shared/interfaces/module';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../../core/services/video.service';
import { HttpEventType } from '@angular/common/http';
import { VideoPlayerComponent } from '../../helpers/video-player/video-player.component';
import { QuizService } from '../../../core/services/quiz.service';

@Component({
  selector: 'app-edit-course',
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    MatProgressBarModule,
    VideoPlayerComponent,
  ],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss',
})
export class EditCourseComponent {
  @ViewChild('newModuleForm') newModuleForm!: ElementRef;
  @ViewChild('newModuleInput') newModuleInput!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;



  //services
  _activeRoute = inject(ActivatedRoute);
  _ModuleService = inject(CourseModulesService);
  _videoService = inject(VideoService);
  _QuizService = inject(QuizService);




  //variables
  Id: number = this._activeRoute.snapshot.params['id'];
  courseService = inject(CoursesService);
  CourseData: Course = {} as Course;
  Modueles = signal<Module[]>([]);
  SelectedModule = signal<Module>({} as Module);
  newModuleTitle = signal<string>('');
  selectedVideoFile: File | undefined;
  selectedVideoTitle = signal<string>('');
  errorMessage = signal<string>('');
  progressBarValue = signal<number>(0);
  fileUploading = signal<boolean>(false);
  isVideoPlayerOpen = signal<boolean>(false);
  source = signal<string>('');


  // host listner
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (
      this.videoPlayer &&
      !this.videoPlayer.nativeElement.contains(event.target)
    ) {
      this.isVideoPlayerOpen.set(false);
    }
  }


  ngOnInit(): void {
    this.courseService.getCourseById(this.Id).subscribe((res: Course) => {
      this.CourseData = res;
      this._ModuleService
        .getCourseModules(this.CourseData.id)
        .subscribe((res: Module[]) => {
          this.Modueles.set(res);
          if (this.Modueles().length > 0) {
            this.SelectedModule.set(this.Modueles()[0]);

          }
        });
    });
  }

  addnewModule() {
    this._ModuleService
      .addModuleToCourse(this.CourseData.id, this.newModuleTitle())
      .subscribe((res: any) => {
        this.refreshModules();
      });
  }

  refreshModules() {
    this._ModuleService
      .getCourseModules(this.CourseData.id)
      .subscribe((res: Module[]) => {
        this.Modueles.set(res);
        if(this.Modueles().length ==1) this.SelectedModule.set(this.Modueles()[0]);
        this.SelectedModule.set(
          this.Modueles().find((m) => m.id == this.SelectedModule().id) as Module
        );
      });
  }

  addNewModulePressed() {
    this.newModuleForm.nativeElement.classList.remove('hidden');
    this.newModuleInput.nativeElement.focus();
  }

  submitNewModule() {
    if (this.newModuleTitle().length > 3) {
      this.addnewModule();
    }
    this.newModuleForm.nativeElement.classList.add('hidden');
    this.newModuleTitle.set('');
  }

  selectModule(module: Module) {
    this.SelectedModule.set(module);
  }

  addVideotoModule() {
    if (this.selectedVideoTitle().length > 3 && this.selectedVideoFile) {
      this.errorMessage.set('');
      const Data: FormData = new FormData();
      Data.append('ModuleId', this.SelectedModule().id.toString());
      Data.append('Title', this.selectedVideoTitle());
      Data.append('VideoFile', this.selectedVideoFile);
      this.fileUploading.set(true);
      this.progressBar.nativeElement.classList.remove('hidden');
      this._videoService.addVideotoModule(Data).subscribe((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              console.log('here');
              this.progressBarValue.set(
                Math.round((100 * event.loaded) / event.total)
              );
            }
            break;
          case HttpEventType.Response:
            this.progressBarValue.set(0);
            this.fileUploading.set(false);
            this.refreshModules();
            this.selectedVideoFile = undefined;
            this.selectedVideoTitle.set('');
            this.progressBar.nativeElement.classList.add('hidden');
            break;
          default:
            break;
        }
      });
    } else {
      this.errorMessage.set('Please enter a title and select a video');
    }
  }

  onFileChange(event: any) {
    if (event.target.files[0].type.includes('video')) {
      this.selectedVideoFile = event.target.files[0];
    }
  }

  removeSelectedFile() {
    this.selectedVideoFile = undefined;
  }

  selectVideo(video: string) {
    this.source.set(video);
    this.isVideoPlayerOpen.set(true);
  }

  closeVideoPlayer() {
    this.isVideoPlayerOpen.set(false);
    this.source.set('');
  }

  removeVideoFromModule(videoId: number) {
    this._ModuleService.deleteVideoFromModule(videoId).subscribe((res) => {
      this.refreshModules();
      this.isVideoPlayerOpen.set(false);
      this.source.set('');
    });
  }

  removeModule(moduleId: number) {
    // this._ModuleService.deleteModule(moduleId).subscribe((res) => {
    //   this.refreshModules();
    //   this.isVideoPlayerOpen.set(false);
    //   this.source.set('');
    // });
    console.log("here");
  }

  deleteQuiz(quizId: number) {
    this._QuizService.deleteQuiz(quizId).subscribe((res) => {
      this.refreshModules();
    });
  }
}
