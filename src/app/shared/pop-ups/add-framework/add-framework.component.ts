import { Component, createPlatform, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileValidator } from 'ngx-material-file-input';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-framework',
  templateUrl: './add-framework.component.html',
  styleUrls: ['./add-framework.component.css']
})
export class AddFrameworkComponent implements OnInit {
  closePopups: boolean = false;
  createFramework: any = FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(private helper: HelpersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.helper.openPopUpAddFramework.subscribe((open: boolean) =>  {
      this.closePopups = open;
      console.log(this.closePopups + "ClosePopups")
    })
    this.createForm()
  }

  closePopUp() {
    this.helper.toggleAddFrameworkModal(false)
  }

  createForm() {
    this.createFramework = this.fb.group({
      framework: [null, Validators.required],
      framework_image: [null, [Validators.required,]],
      completed: [null, Validators.required]
    })
  }



}
