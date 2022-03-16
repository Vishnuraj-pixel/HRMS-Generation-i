import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFormBuilderModule } from 'projects/ng-form-builder/src/projects';
import { MaterialModule } from '../meterial/meterial.module'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UpdatesComponent } from './components/updates/updates.component';
import { RegisterEmployeesComponent } from './components/register-employees/register-employees.component';
import { CalenderComponent } from './components/calender/calender.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { DailyTasksComponent } from './components/daily-tasks/daily-tasks.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AttendanceComponent,
    EmployeesComponent,
    ProjectsComponent,
    SettingsComponent,
    UpdatesComponent,
    RegisterEmployeesComponent,
    CalenderComponent,
    TutorialsComponent,
    DailyTasksComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    NgFormBuilderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
