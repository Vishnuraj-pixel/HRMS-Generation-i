import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIURL } from 'src/app/core/config/api-urls';
import { ApiService } from 'src/app/core/services/api.service';
import { HelpersService } from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUp: boolean = false;
  createUser: any = FormGroup;
  signUpFormElement: any = [];
  userData: any = [];
  textOrPassword: string = 'password';
  useEmailAsPassword: string = ''
  constructor(
    private fb: FormBuilder,
    private helper: HelpersService,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.helper.openPopUp.subscribe((open: boolean) => {
      this.signUp = open;
      if (open === true) {
        this.helper.userData.subscribe((userId: number) => {
          const empId = userId;
          if (empId) {
            this.api
              .getRequest(APIURL.employee + empId)
              .subscribe((res: any) => {
                this.userData = res;
                this.helper.useEmailAsUserName.subscribe(
                  (useEmail: boolean) => {
                    if (useEmail === true) {
                      /* Validation need to be reset */
                      this.useEmailAsPassword = this.userData.email;
                      this.createUser.controls['username'].value =
                        this.userData.email;
                      this.createUser.controls['username'].setErrors(null);
                    } else if(useEmail === false) {
                      this.useEmailAsPassword = '';
                      this.createUser.controls['username'].value = null;
                    }
                  }
                );
              });
          }
        });
      }
    });
  }

  createForm() {
    this.createUser = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  visibilityModeOn(visibility: boolean) {
    if (visibility === true) {
      this.textOrPassword = 'text';
    } else if (visibility === false) {
      this.textOrPassword = 'password';
    }
  }

  createUsrPass() {
    const formData: any = new FormData();
    formData.append('id', this.userData.id);
    formData.append('user_type', this.userData.user_type);
    formData.append('username', this.createUser.get('username').value);
    formData.append('password', this.createUser.get('password').value);
    formData.append('employeeProfile_pic', this.userData.profile_pic);
    this.api
      .postRequest(APIURL.createEmpUrmePass, formData)
      .subscribe((res) => {
        this._snackBar.open('Successfully registered!', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 10,
        });
        this.helper.toggleSignUpModal(false); 
      });
  }
  closePopUp() {
    this.helper.toggleSignUpModal(false);
  }
}
