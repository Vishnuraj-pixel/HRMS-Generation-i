import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ApiService } from 'src/app/core/services/api.service';
import { APIURL } from 'src/app/core/config/api-urls';
import { environment } from 'src/environments/environment';
import { HelpersService } from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav: MatSidenav | any;
  darkTheme:boolean = false;
  usersData: any
  baseApiUrl: string = environment.baseApiUrl;
  employeeData: any = [];

  constructor(private observer: BreakpointObserver, private api: ApiService, private helper: HelpersService) {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if(this.sidenav){
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }
    });
  }

  ngOnInit(): void {
    this.findemployee();
    this.listEmployeesAndAdmin();
  }

  changeTheme(theme: string) {
    localStorage.setItem('setTheme', theme)
    // console.log(localStorage.getItem('setTheme'))
    if(localStorage.getItem('setTheme') === 'darkMode') {
      this.darkTheme = true;
    } else if(localStorage.getItem('setTheme') === 'lightMode') {
      this.darkTheme = false;
    }
  }

  listEmployeesAndAdmin() {
    this.api.getRequest(APIURL.employee).subscribe((res) => {
      // console.log(res)
      this.usersData = res
    })
  }

  findemployee() {
    this.helper.userId.subscribe((res: number) => {
      this.api.getRequest(APIURL.employee + res).subscribe((data) => {
        this.employeeData = data
      })
    })
  }

  logout() {
    this.helper.logout()
    
  }
}
