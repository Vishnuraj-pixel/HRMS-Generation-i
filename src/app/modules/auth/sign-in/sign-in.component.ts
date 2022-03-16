import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { APIURL } from 'src/app/core/config/api-urls';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { ApiService } from 'src/app/core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  popUp: boolean = false;
  loginForm: any = FormGroup;
  textOrPassword: string = 'password';
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private helper: HelpersService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  visibilityModeOn(visibility: boolean) {
    if (visibility === true) {
      this.textOrPassword = 'text';
    } else if (visibility === false) {
      this.textOrPassword = 'p  assword';
    }
  }

  adminSignIn() {
    this.step = 2;
  }

  employeeSignIn() {
    this.step = 1;
  }

  loginUser(type: String) {
    const formData: any = new FormData();
    if (type === 'em') {
      formData.append('user_type', 1);
      formData.append('username', this.loginForm.get('username').value);
      formData.append('password', this.loginForm.get('password').value);
    } else if (type === 'ad') {
      formData.append('user_type', 2);
      formData.append('username', this.loginForm.get('username').value);
      formData.append('password', this.loginForm.get('password').value);
    }

    this.api.postRequest(APIURL.loginUrl, formData).subscribe((res: any) => {
      console.log('signed-in....');
      localStorage.setItem('accessToken', this.helper.encrypt(res.accessToken));
      localStorage.setItem('auth_data', this.helper.encrypt(JSON.stringify(res)))
      console.log(localStorage.getItem('auth_data'));
      localStorage.setItem('refreshToken', res.refreshToken);
      if (res.accessToken) {
        this.helper.saveUser(localStorage.getItem('auth_data'));
        this.router.navigate(['/admin']);
        if (res.user_type == 1) {
          localStorage.setItem('userEmployee', res.user_type);
        } else if (res.user_type == 2) {
          localStorage.setItem('userAdmin', res.user_type);
        }
      }
    }),
      (error: any) => {
        console.log(error);
      };
  }
}
