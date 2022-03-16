import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { APIURL } from 'src/app/core/config/api-urls';
import { ApiService } from 'src/app/core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  isDisabledDropFile: boolean = false;
  isExpandableDropFile: boolean = false;
  files: File[] = [];
  createEmployee: any = FormGroup;
  createLoginUser: any = FormGroup;
  prescriptionFile: any;
  prescriptionFileName: string = '';
  errorLabel: string = '';
  employeeId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  createForm() {
    this.createEmployee = this.fb.group({
      first_name: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z]+$/)],
      ],
      last_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      employee_code: ['', Validators.required],
      occupation: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      address: ['', Validators.required],
      work_experience: ['', Validators.required],
      education: ['', Validators.required],
    });
    this.createLoginUser = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  resetFile() {
    this.prescriptionFile = null;
    this.prescriptionFileName = '';
  }

  processFile(event: any) {
    if (event.target.files.length > 0) {
      const file: any = event.target.files[0];
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg'
      ) {
        this.prescriptionFile = file;
        this.prescriptionFileName = file.name;
      } else {
        this.prescriptionFile = null;
        this.prescriptionFileName = '';
        this.errorLabel = 'Only png, jpeg, & jpg allowed';
        setTimeout(() => {
          this.errorLabel = '';
        }, 5000);
      }
    } else {
      this.prescriptionFile = null;
      this.prescriptionFileName = '';
    }
  }

  ngOnInit(): void {}

  createEmployees() {
    console.log(this.createEmployee);
    var formData: any = new FormData();
    formData.append('first_name', this.createEmployee.get('first_name').value);
    formData.append('last_name', this.createEmployee.get('last_name').value);
    formData.append(
      'employee_code',
      this.createEmployee.get('employee_code').value
    );
    formData.append('occupation', this.createEmployee.get('occupation').value);
    formData.append('phone', this.createEmployee.get('phone').value);
    formData.append('gender', this.createEmployee.get('gender').value);
    formData.append(
      'date_of_birth',
      this.createEmployee.get('date_of_birth').value
    );
    formData.append('email', this.createEmployee.get('email').value);
    formData.append('age', this.createEmployee.get('age').value);
    formData.append('address', this.createEmployee.get('address').value);
    formData.append(
      'work_experience',
      this.createEmployee.get('work_experience').value
    );
    formData.append('education', this.createEmployee.get('education').value);
    formData.append('profile_pic', this.prescriptionFile);
    formData.append('user_type', 2);
    formData.append('is_employee', true);

    console.log(formData);
    this.api
      .postRequest(APIURL.createEmployee, formData)
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          this._snackBar.open('Employee Created!', 'Close', {
            duration: 5000,
          });
        }
      });
  }

  createLoginUsers() {
    // console.log(this.createLoginUser.value);
    // this.createLoginUser.value.user_type = 2;
    // const params = this.createLoginUser;
    // this.api.postRequest(
    //   (APIURL.createEmpUrmePass, params).subscribe((res: any) => {
    //     if (res) {
    //       this._snackBar.open(
    //         'Employee username & password created!',
    //         'Close',
    //         {
    //           duration: 5000,
    //         }
    //       );
    //     }
    //   })
    // );
  }
}
