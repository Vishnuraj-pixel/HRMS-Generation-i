import { Component, createPlatform, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileValidator } from 'ngx-material-file-input';
import { ApiService } from 'src/app/core/services/api.service';
import { APIURL } from 'src/app/core/config/api-urls';


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
  readonly maxSize = 5000000;
  createFramework: any = FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(private helper: HelpersService, private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.helper.openPopUpAddFramework.subscribe((open: boolean) =>  {
      this.closePopups = open;
    })
    this.createForm()
  }

  closePopUp() {
    this.helper.toggleAddFrameworkModal(false)
  }

  createForm() {
    this.createFramework = this.fb.group({
      framework: [null, Validators.required],
      framework_image: [null, [Validators.required,FileValidator.maxContentSize(this.maxSize)]]
    })
  }

  createFrameworks() {
    const formData: any = new FormData();
    formData.append('framework', this.createFramework.get('framework').value);
    formData.append('framework_image', this.createFramework.get('framework_image').value.files[0]);
    formData.append('completed', true);

    this.api.postRequest(APIURL.CreateProjectFramework, formData).subscribe((res) => {
      console.log(res)
      this.createFramework.get('framework').setValue("")
      this.createFramework.get('framework_image').setValue("")
      this.helper.toggleAddFrameworkModal(false)
      this.helper.createFramework(true)
    })
  }


}
