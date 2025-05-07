import { ChooseRoleComponent } from './features/components/choose-role/choose-role.component';
import { Routes } from '@angular/router';
import { CourseComponent } from './features/components/course/course.component';
import { CourseDetailComponent } from './features/components/course-detail/course-detail.component';
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
import { CartComponent } from './features/components/cart/cart.component';
import { AddQuizComponent } from './features/components/add-quiz/add-quiz.component';
import { EditQuizComponent } from './features/components/edit-quiz/edit-quiz.component';
import { QuizRoomComponent } from './features/components/quiz-room/quiz-room.component';


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
    path:"addQuiz",
    component: AddQuizComponent,
    title: "Add Quiz",
    canActivate: [instructorGuard],
  },
  {
    path: "editQuiz/:quizId",
    component: EditQuizComponent,
    title: "Edit Quiz",
    canActivate: [instructorGuard],
  },
  {
    path: "quizRoom/:quizId",
    component: QuizRoomComponent,
    title: "Quiz Room",
    canActivate: [isloggedGuard],
  },
  {
    path: "cart",
    component: CartComponent,
    title: "cart",
    canActivate: [isloggedGuard],
  },
  {
    path: 'accountSettings',
    component: AccountSettingsComponent,
    title: 'Account Settings',
    canActivate: [isloggedGuard],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
