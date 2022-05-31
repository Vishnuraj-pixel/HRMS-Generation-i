import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIURL } from 'src/app/core/config/api-urls';
import { ApiService } from 'src/app/core/services/api.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { DatePipe } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-add-project-contribution',
  templateUrl: './add-project-contribution.component.html',
  styleUrls: ['./add-project-contribution.component.css'],
  animations: [
    // animation triggers
    // state(
    //   'open',
    //   style({
    //     height: '200px',
    //     opacity: 1,
    //     backgroundColor: 'yellow',
    //   })
    // ),
    // transition(
    //   'open => closed', [
    //     animate('1s')
    //   ]
    // )
  ],
})
export class AddProjectContributionComponent implements OnInit {
  openPopups: boolean = false;
  step: number = 0;
  panelOpenState = false;
  isChecked = false;
  employeeData: any[] = [];
  startEndDate: boolean = false;
  employeeId: any = null;
  projectId: any = null;
  contributionId: any = null;
  employeesContribution: any = FormGroup;
  employeeContributionData: any = [];
  returnValue: boolean = false;
  setStartDate: any = '';
  setEndDate: any = '';
  addContribution: boolean = false;
  updateContribution: boolean = false;

  constructor(
    private helper: HelpersService,
    private api: ApiService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.helper.addEmployeeContribution.subscribe((open: boolean) => {
      this.openPopups = open;
      if (this.openPopups == true) {
        this.listAllEmployeesWithContribution();
      }
      this.createForm();
    });
  }

  listAllEmployeesWithContribution() {
    this.helper.projectId.subscribe((id: number) => {
      this.projectId = id;
      if (id) {
        this.api
          .getRequest(APIURL.findAllWithContribution + this.projectId)
          .subscribe((data) => {
            console.log(data, 'EmployeesWithContribution');
            this.employeeData = data;
          });
      }
    });
  }

  createForm() {
    this.employeesContribution = this.fb.group({
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
    });
  }

  returnTrueOrFalse(id?: number) {
    var returnValue = false;
    if (
      (this.openPopups == true &&
        this.employeeContributionData.length > 0 &&
        id !== null) ||
      undefined
    ) {
      for (let i = 0; i < this.employeeContributionData.length; i++) {
        if (this.employeeContributionData[i].employeeId == id) {
          returnValue = true;
        }
      }
      return returnValue;
    }
    return this.returnValue;
  }

  addStartEndDate(id: number) {
    this.addContribution = true;
    this.updateContribution = false;
    this.employeesContribution.controls['start_date'].setValue('');
    this.employeesContribution.controls['end_date'].setValue('');
    this.employeesContribution.controls['start_date'].setErrors(null);
    this.employeesContribution.controls['end_date'].setErrors(null);
    this.startEndDate = true;
    this.employeeId = id;
  }

  updateStartEndDate(data: any) {
    this.employeeId = data[0].employeeId;
    this.contributionId = data[0].id
    this.updateContribution = true;
    this.addContribution = false;
    this.startEndDate = true;
    const formatStartDate = this.datePipe.transform(
      data[0].start_date,
      'yyyy-MM-dd'
    );
    const formatEndDate = this.datePipe.transform(
      data[0].end_date,
      'yyyy-MM-dd'
    );
    this.setStartDate = formatStartDate;
    this.setEndDate = formatEndDate;
    this.employeesContribution.controls['start_date'].setValue(formatStartDate);
    this.employeesContribution.controls['end_date'].setValue(formatEndDate);
    this.employeesContribution.controls['start_date'].setErrors(null);
    this.employeesContribution.controls['end_date'].setErrors(null);
  }

  closePopUp() {
    this.helper.addContribution(false);
  }

  employeeContributions() {
    if (this.addContribution === true && this.updateContribution === false) {
      this.helper.projectId.subscribe((id: number) => {
        this.projectId = id;

        if (id) {
          const formData = new FormData();
          formData.append('projectId', this.projectId);
          formData.append('employeeId', this.employeeId);
          formData.append(
            'start_date',
            this.employeesContribution.get('start_date').value
          );
          formData.append(
            'end_date',
            this.employeesContribution.get('end_date').value
          );

          this.api
            .postRequest(APIURL.createEmployeeContribution, formData)
            .subscribe((data) => {
              console.log(data);
              this.listAllEmployeesWithContribution();
            });
        }
      });
    }
    if (this.updateContribution === true && this.addContribution === false) {
      this.helper.projectId.subscribe((id: number) => {
        this.projectId = id;
        if (id) {
          const formData = new FormData();
          formData.append('start_date', this.employeesContribution.get('start_date').value)
          formData.append('end_date', this.employeesContribution.get('end_date').value)
          this.api.putRequest(APIURL.updateEmployeeContribution + this.contributionId, formData).subscribe((res)=> {
            console.log(res.message)
          })
        }
      });
    }
  }
}
