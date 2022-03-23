import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HelpersService } from 'src/app/core/services/helpers.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  createProject: any = FormGroup;
  openPopups: boolean = false;
  step: number = 1;

  matcher = new MyErrorStateMatcher();

  constructor(private helper: HelpersService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.helper.createProjectPopUp.subscribe((open: boolean) => {
      this.openPopups = open
    })
    this.createForm()
  }

  createForm() {
    this.createProject = this.fb.group({
      project_name: [null, [Validators.required]],
      project_framework: [null, [Validators.required]],
      project_details: [null, [Validators.required]],
      project_description: [null, [Validators.required]],
      project_start_date: [null, [Validators.required]],
      project_end_date: [null, [Validators.required]],
      project_url: [null, [Validators.required]]
    })
  }

  createProjects() {
    console.log(this.createProject)
    const formData: any = new FormData;
    formData.append('project_name', this.createProject.get('project_name').value);
    formData.append('project_framework', this.createProject.get('project_framework').value);
    formData.append('project_details', this.createProject.get('project_details').value);
    formData.append('project_description', this.createProject.get('project_description').value);
    formData.append('project_start_date', this.createProject.get('project_start_date').value);
    formData.append('project_end_date', this.createProject.get('project_end_date').value);
    formData.append('project_completed', true);
    formData.append('project_url', this.createProject.get('project_url').value);

  }  

  toNextPage() {
    this.step = 2;
  }

  toPreviousPage() {
    this.step = 1;
  }

  closePopUp() {
    this.helper.createProject(false)
  }
  
}
