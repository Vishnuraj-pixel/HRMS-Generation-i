import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIURL } from 'src/app/core/config/api-urls';
import { ApiService } from 'src/app/core/services/api.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  framework: any = [];
  baseApiUrl: string = environment.baseApiUrl;
  constructor(
    private helper: HelpersService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listFramework();
    this.helper.createdFramework.subscribe((created: boolean) => {
      if (created === true) {
        this.listFramework();
      }
    });
  }

  listFramework() {
    this.api.getRequest(APIURL.listAllProjectFramework).subscribe((res) => {
      this.framework = res;
    });
  }

  addFramework() {
    this.helper.toggleAddFrameworkModal(true);
  }

  navigateToProjectList(id: number) {
    this.router.navigate(['/admin/projects-list/' + id]);
  }
}
