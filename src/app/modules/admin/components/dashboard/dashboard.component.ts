import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { APIURL } from 'src/app/core/config/api-urls';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employeeData: any = []
  imageBaseUrl: any = environment.baseApiUrl
  constructor(private api: ApiService, private helper: HelpersService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.helper.userId.subscribe((id: any) => {
      this.api
        .getRequest(APIURL.findAllEmployeeByuserType + id)
        .subscribe((res) => {
          console.log(res);
          this.employeeData = res
        });
    });
  }
}
