import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileValidator } from 'ngx-material-file-input';
import { APIURL } from 'src/app/core/config/api-urls';
import { ApiService } from 'src/app/core/services/api.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { Employee } from 'src/app/core/models/employees';
import {Sort} from '@angular/material/sort';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-employees',
  templateUrl: './register-employees.component.html',
  styleUrls: ['./register-employees.component.css']
})
export class RegisterEmployeesComponent implements OnInit {
  createEmployee: any = FormGroup ;
  matcher = new MyErrorStateMatcher();
  readonly maxSize = 5000000
  dataSource: any;
  ddisplayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  employeeData: any = [];
  sortedData: Employee[] | any
  constructor(private fb: FormBuilder, private api: ApiService, private helper: HelpersService) { }

  ngOnInit(): void {
    this.sortedData = this.employeeData.slice()
    this.createTable();
    this.createForm();
  }

  sortData(sort: Sort | any) {
    const data = this.employeeData.slice();
    if(!sort.active || sort.direction === '') {
      this.sortData = data;
      return;
    }

    this.sortedData = data.sort((a: any, b: any): any => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'first_name':
          return compare(a.first_name, b.first_name, isAsc);
        case 'occupation':
          return compare(a.occupation, b.occupation, isAsc)
        case 'email':
          return compare(a.email, b.email, isAsc)
        case 'createdAt':
          return compare(a.createdAt, b.createdAt, isAsc);
        default:
          return 0;
      }
    })
    console.log(this.sortedData)
  }



  createForm() {
    this.createEmployee = this.fb.group({
      employee_code: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      occupation: [null, Validators.required],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      gender: [null, Validators.required],
      profile_pic: [null, [Validators.required, FileValidator.maxContentSize(this.maxSize)]],
      date_of_birth: [null, Validators.required],
      age: [null, Validators.required],
      address: [null, Validators.required],
      work_experience: [null, Validators.required],
      education: [null, Validators.required],
      emailToggle: false
    }); 
  }

  createEmployees() {
    const formData: any = new FormData();
    formData.append('employee_code', this.createEmployee.get('employee_code').value);
    formData.append('first_name', this.createEmployee.get('first_name').value);
    formData.append('last_name', this.createEmployee.get('last_name').value);
    formData.append('occupation', this.createEmployee.get('occupation').value);
    formData.append('user_type', 1)
    formData.append('phone', this.createEmployee.get('phone').value);
    formData.append('email', this.createEmployee.get('email').value);
    formData.append('gender', this.createEmployee.get('gender').value);
    formData.append('profile_pic', this.createEmployee.get('profile_pic').value.files[0]);
    formData.append('date_of_birth', this.createEmployee.get('date_of_birth').value);
    formData.append('age', this.createEmployee.get('age').value);
    formData.append('address', this.createEmployee.get('address').value);
    formData.append('work_experience', this.createEmployee.get('work_experience').value);
    formData.append('education', this.createEmployee.get('education').value);
    formData.append('is_employee', true)

    this.api.postRequest(APIURL.createEmployee, formData).subscribe((res: any) => {
      if(res) {
        const useEmailAsPassword =this.createEmployee.get('emailToggle').value;
        // console.log(useEmailAsPassword);
        this.helper.toggleSignUpModal(true, res.id, useEmailAsPassword)
      }
    });
  };

  createTable() {
    this.api.getRequest(APIURL.findAllEmployeeByuserType + 1).subscribe((res: any) => {
      console.log(res);
      this.employeeData = res
    })
  }

};

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}