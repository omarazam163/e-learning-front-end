import { role } from './shared/types/role';
import { ChooseRoleComponent } from './features/components/choose-role/choose-role.component';
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
import { SendResetPasswordComponent } from './features/components/send-reset-password/send-reset-password.component';
import { ConfirmResetPasswordComponent } from './features/components/confirm-reset-password/confirm-reset-password.component';
import { ResetPasswordComponent } from './features/components/reset-password/reset-password.component';
import { resetPasswordGuard } from './core/guards/reset-password.guard';
import { InstructorComponent } from './features/components/instructor/instructor.component';
export const routes: Routes = [
  {  path: '', redirectTo: 'home', pathMatch: 'full' },
  {  path: 'home', title: 'Home', component: HomeComponent },
  {  path: 'courses', component: CourseComponent, title: 'Courses' },
  {  path: 'instructors', component: InstructorComponent, title: 'Instructors' },
  {  path: 'course/:id', component: CourseDetailComponent },
  {  path: 'login',  component: LogInComponent,  title: 'Log In',  canActivate: [loginguardGuard],  },
  {  path: 'register/:role',  component: SignUpComponent,  title: 'Sign Up',  canActivate: [loginguardGuard],  },
  {  path: 'chooseRole',  component: ChooseRoleComponent,  title: 'choose Role',  canActivate: [loginguardGuard],  },
  {  path: 'SendResetPassword',  component: SendResetPasswordComponent,  title: 'reset password',  canActivate: [loginguardGuard],  },
  {  path: 'confirmResetPassword',  component: ConfirmResetPasswordComponent,  title: 'reset password',  canActivate: [loginguardGuard, resetPasswordGuard],  },
  {  path: 'resetPassword',  component: ResetPasswordComponent,  title: 'reset password',  canActivate: [loginguardGuard, resetPasswordGuard],  },
  {  path: '**', redirectTo: 'home', pathMatch: 'full' },
];
