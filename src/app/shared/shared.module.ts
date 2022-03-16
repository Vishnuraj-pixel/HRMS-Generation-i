import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
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

@NgModule({
  imports: [CommonModule, MatSidenavModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [HeaderComponent, FooterComponent, SideBarComponent, CreateEmployeeComponent, CreateAdminComponent, ChangeEmployeeDetailsComponent, AddProjectsComponent, SignUpComponent, AlertPopUpComponent],
  exports: [HeaderComponent, FooterComponent, SideBarComponent, SignUpComponent, CreateAdminComponent],
})
export class SharedModule {}
