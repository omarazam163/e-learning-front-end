import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseComponent } from './components/course/course.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ChatComponent } from './components/chat/chat.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import path from 'path';
import { MylearningComponent } from './components/mylearning/mylearning.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo:"home",pathMatch:"full" },
  {path:"home",title:"Home",component:HomeComponent},
  {
    path: 'mylearning',
    component: MylearningComponent,
    children: [
      { path: '', redirectTo: 'course', pathMatch: 'full' },
      { path: 'course', component: CourseComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'course/:id', component: CourseDetailComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '**', redirectTo: 'course', pathMatch: 'full' },
    ],
  },
  {path:"**" ,redirectTo:"home",pathMatch:"full"}
];
