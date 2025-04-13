import { Routes } from '@angular/router';
import { DashboardComponent } from './features/components/dashboard/dashboard.component';
import { CourseComponent } from './features/components/course/course.component';
import { ResourcesComponent } from './features/components/resources/resources.component';
import { ChatComponent } from './features/components/chat/chat.component';
import { ScheduleComponent } from './features/components/schedule/schedule.component';
import { SettingsComponent } from './features/components/settings/settings.component';
import { PortfolioComponent } from './features/components/portfolio/portfolio.component';
import { CourseDetailComponent } from './features/components/course-detail/course-detail.component';
import { MylearningComponent } from './features/components/mylearning/mylearning.component';
import { HomeComponent } from './features/components/home/home.component';
import { LogInComponent } from './features/components/log-in/log-in.component';
import { SignUpComponent } from './features/components/sign-up/sign-up.component';
import { loginguardGuard } from './core/guards/loginguard.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  // // Will we hide mylearning ?????
  // {
  //   path: 'mylearning',
  //   component: MylearningComponent,
  //   children: [
  //     { path: '', redirectTo: 'course', pathMatch: 'full' },
  //     { path: 'course', component: CourseComponent },
  //     { path: 'dashboard', component: DashboardComponent },
  //     { path: 'course/:id', component: CourseDetailComponent },
  //     { path: 'resources', component: ResourcesComponent },
  //     { path: 'chat', component: ChatComponent },
  //     { path: 'schedule', component: ScheduleComponent },
  //     { path: 'portfolio', component: PortfolioComponent },
  //     { path: 'settings', component: SettingsComponent },
  //     { path: '**', redirectTo: 'course', pathMatch: 'full' },
  //   ],
  // },
  { path: 'courses', component: CourseComponent, title: 'Courses' },
  {
    path: 'login',
    component: LogInComponent,
    title: 'Log In',
    canActivate: [loginguardGuard],
  },
  { path: 'register',
    component: SignUpComponent,
    title: 'Sign Up',
    canActivate:[loginguardGuard]
   },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
