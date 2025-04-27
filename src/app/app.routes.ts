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
import { loginGuard } from './core/guards/loginguard.guard';
import { SendResetPasswordComponent } from './features/components/send-reset-password/send-reset-password.component';
import { ConfirmResetPasswordComponent } from './features/components/confirm-reset-password/confirm-reset-password.component';
import { ResetPasswordComponent } from './features/components/reset-password/reset-password.component';
import { resetPasswordGuard } from './core/guards/reset-password.guard';
import { InstructorComponent } from './features/components/instructor/instructor.component';
import { InstructorCoursesComponent } from './features/components/instructor-courses/instructor-courses.component';
import { InstructorContactComponent } from './features/components/instructor-contact/instructor-contact.component';
import { WorkSpaceComponent } from './features/components/work-space/work-space.component';
import { AddCourseComponent } from './features/components/add-course/add-course.component';
import { instructorGuard } from './core/guards/instructor.guard';
import { EditCourseComponent } from './features/components/edit-course/edit-course.component';
import { AccountSettingsComponent } from './features/components/account-settings/account-settings.component';
import { isloggedGuard } from './core/guards/islogged.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  {
    path: 'courses',
    title: 'Courses',
    children: [
      { path: '', component: CourseComponent },
      { path: ':id', component: CourseDetailComponent },
    ],
  },
  {
    path: 'instructors',
    title: 'Instructors',
    children: [
      { path: '', component: InstructorComponent, title: 'Instructor courses' },
      {
        path: 'courses/:id',
        component: InstructorCoursesComponent,
        title: 'Instructor courses',
      },
      {
        path: 'contact/:id',
        component: InstructorContactComponent,
        title: 'Instructor contact',
      },
    ],
  },
  {
    path: 'workSpace',
    component: WorkSpaceComponent,
    title: 'work space',
    canActivate: [instructorGuard],
  },
  {
    path: 'addCourse',
    component: AddCourseComponent,
    title: 'Add Course',
    canActivate: [instructorGuard],
  },
  {
    path: 'editCourse/:id',
    component: EditCourseComponent,
    title: 'Edit Course',
    canActivate: [instructorGuard],
  },
  {
    path: 'login',
    component: LogInComponent,
    title: 'Log In',
    canActivate: [loginGuard],
  },
  {
    path: 'register/:role',
    component: SignUpComponent,
    title: 'Sign Up',
    canActivate: [loginGuard],
  },
  {
    path: 'chooseRole',
    component: ChooseRoleComponent,
    title: 'choose Role',
    canActivate: [loginGuard],
  },
  {
    path: 'SendResetPassword',
    component: SendResetPasswordComponent,
    title: 'reset password',
    canActivate: [loginGuard],
  },
  {
    path: 'confirmResetPassword',
    component: ConfirmResetPasswordComponent,
    title: 'reset password',
    canActivate: [loginGuard, resetPasswordGuard],
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    title: 'reset password',
    canActivate: [loginGuard, resetPasswordGuard],
  },
  {
    path: 'accountSettings',
    component: AccountSettingsComponent,
    title: 'Account Settings',
    canActivate: [isloggedGuard],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
