import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CreateEmployeeComponent } from './pop-ups/create-employee/create-employee.component';
import { CreateAdminComponent } from './pop-ups/create-admin/create-admin.component';
import { ChangeEmployeeDetailsComponent } from './pop-ups/change-employee-details/change-employee-details.component';
import { AddProjectsComponent } from './pop-ups/add-projects/add-projects.component';
import { SignUpComponent } from './pop-ups/sign-up/sign-up.component';
import { MaterialModule } from '../modules/meterial/meterial.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertPopUpComponent } from './pop-ups/alert-pop-up/alert-pop-up.component';
import { AddFrameworkComponent } from './pop-ups/add-framework/add-framework.component';
import { AddProjectComponent } from './pop-ups/add-project/add-project.component';
import { UpdateProjectComponent } from './pop-ups/update-project/update-project.component';
import { AddProjectContributionComponent } from './pop-ups/add-project-contribution/add-project-contribution.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    CreateEmployeeComponent,
    CreateAdminComponent,
    ChangeEmployeeDetailsComponent,
    AddProjectsComponent,
    SignUpComponent,
    AlertPopUpComponent,
    AddFrameworkComponent,
    AddProjectComponent,
    UpdateProjectComponent,
    AddProjectContributionComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    SignUpComponent,
    CreateAdminComponent,
    AddFrameworkComponent,
    AddProjectComponent,
    AddProjectContributionComponent,
  ],
  providers: [DatePipe],
})
export class SharedModule {}
