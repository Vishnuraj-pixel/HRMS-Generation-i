import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminComponent } from './admin.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { CalenderComponent } from './components/calender/calender.component';
import { DailyTasksComponent } from './components/daily-tasks/daily-tasks.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RegisterEmployeesComponent } from './components/register-employees/register-employees.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { UpdatesComponent } from './components/updates/updates.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', canActivate: [AuthGuard], component: DashboardComponent },
      {
        path: 'attendance',
        canActivate: [AuthGuard],
        component: AttendanceComponent,
      },
      {
        path: 'projects',
        canActivate: [AuthGuard],
        component: ProjectsComponent,
      },
      {
        path: 'projects-list/:id',
        canActivate: [AuthGuard],
        component: ProjectListComponent,
      },
      {
        path: 'employees',
        canActivate: [AuthGuard],
        component: EmployeesComponent,
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        component: SettingsComponent,
      },
      {
        path: 'updates',
        canActivate: [AuthGuard],
        component: UpdatesComponent,
      },
      {
        path: 'register-employees',
        canActivate: [AuthGuard],
        component: RegisterEmployeesComponent,
      },
      {
        path: 'calender',
        canActivate: [AuthGuard],
        component: CalenderComponent,
      },
      {
        path: 'tutorials',
        canActivate: [AuthGuard],
        component: TutorialsComponent,
      },
      {
        path: 'daily-tasks',
        canActivate: [AuthGuard],
        component: DailyTasksComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AdminRoutingModule {}
