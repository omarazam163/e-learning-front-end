import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseComponent } from './components/course/course.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ChatComponent } from './components/chat/chat.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

export const routes: Routes = [
  { path : '' , component: DashboardComponent },
  { path : 'course' , component: CourseComponent },
  { path : 'course/:id' , component: CourseDetailComponent },
  { path : 'resources' , component: ResourcesComponent },
  { path : 'chat' , component: ChatComponent },
  { path : 'schedule' , component: ScheduleComponent },
  { path : 'portfolio' , component: PortfolioComponent },
  { path : 'settings' , component: SettingsComponent },
];
