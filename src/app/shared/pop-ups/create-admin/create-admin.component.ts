import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { FileValidator } from 'ngx-material-file-input';
import { ApiService } from 'src/app/core/services/api.service';
import { APIURL } from 'src/app/core/config/api-urls';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
})
export class CreateAdminComponent implements OnInit {
  createAdminPopUp: boolean = false;
  createAdmin: any = FormGroup;
  step: number = 1;
  readonly maxSize = 5000000;
  createAdminUsername: any = FormGroup;
  textOrPassword: string = 'password';
  userData: any;

  constructor(
    private helper: HelpersService,
    private fb: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.helper.openPopUp.subscribe((open: boolean) => {
      console.log('helper', open);
      this.createAdminPopUp = open;
    });
    this.createForm();
  }

  moveToOtherDetails() {
    if (this.step === 1) {
      this.step = 2;
    }
  }
  moveBackToBasicDetails() {
    if (this.step === 2) {
      this.step = 1;
    }
  }

  createForm() {
    this.createAdmin = this.fb.group({
      employee_code: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      occupation: [null, Validators.required],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      gender: [null, Validators.required],
      profile_pic: [
        null,
        [Validators.required, FileValidator.maxContentSize(this.maxSize)],
      ],
      date_of_birth: [null, Validators.required],
      age: [null, Validators.required],
      address: [null, Validators.required],
      work_experience: [null, Validators.required],
      education: [null, Validators.required],
    });
    this.createAdminUsername = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  closePopUp() {
    this.helper.toggleAdminSignUpModal(false);
  }

  createAdminSignUp() {
    const formData: any = new FormData();
    formData.append(
      'employee_code',
      this.createAdmin.get('employee_code').value
    );
    formData.append('first_name', this.createAdmin.get('first_name').value);
    formData.append('last_name', this.createAdmin.get('last_name').value);
    formData.append('occupation', this.createAdmin.get('occupation').value);
    formData.append('user_type', 2);
    formData.append('phone', this.createAdmin.get('phone').value);
    formData.append('email', this.createAdmin.get('email').value);
    formData.append('gender', this.createAdmin.get('gender').value);
    formData.append(
      'profile_pic',
      this.createAdmin.get('profile_pic').value.files[0]
    );
    formData.append(
      'date_of_birth',
      this.createAdmin.get('date_of_birth').value
    );
    formData.append('age', this.createAdmin.get('age').value);
    formData.append('address', this.createAdmin.get('address').value);
    formData.append(
      'work_experience',
      this.createAdmin.get('work_experience').value
    );
    formData.append('education', this.createAdmin.get('education').value);
    formData.append('is_employee', true);
    this.api
      .postRequest(APIURL.createEmployee, formData)
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.userData = res;
          this.step = 3;
        }
      });
  }

  visibilityModeOn(visibility: boolean) {
    if (visibility === true) {
      this.textOrPassword = 'text';
    } else if (visibility === false) {
      this.textOrPassword = 'password';
    }
  }

  createAdminUsernameSignUp() {
    const formData: any = new FormData();
    formData.append('id', this.userData.id);
    formData.append('user_type', this.userData.user_type);
    formData.append('username', this.createAdminUsername.get('username').value);
    formData.append('password', this.createAdminUsername.get('password').value);
    formData.append('employeeProfile_pic', this.userData.profile_pic);

    this.api
      .postRequest(APIURL.createEmpUrmePass, formData)
      .subscribe((res) => {
        console.log(res);
        this.helper.toggleAdminSignUpModal(false);
        this._snackBar.open('Successfully registered!', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 10,
        });
      });
  }
}
