import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormElement, FormInfo } from './form.model';

@Component({
  selector: 'lib-ng-form-builder',
  templateUrl: './ng-form-builder.component.html',
  styles: [],
})
export class NgFormBuilderComponent implements OnInit {
  @Input() formElements: any = [];
  @Input() formInfo: FormInfo;
  @Output() completeSubmission = new EventEmitter<any>();

  generalForm: any;
  submitted: boolean = false;

  constructor() {
    this.formInfo = {
      isReset: false,
      submitBtnLabel: 'Submit',
      submitBtnClass: 'blue-btn',
      errorClass: 'form-error',
      wrapperClass: '',
    };
  }

  ngOnInit(): void {
    const allFormElements: any = [];
    this.formElements.forEach((i: FormElement) => {
      allFormElements.push(i);
    });
    // this.generalForm =
  }
}
