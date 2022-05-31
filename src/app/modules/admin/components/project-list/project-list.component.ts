import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIURL } from 'src/app/core/config/api-urls';
import { ApiService } from 'src/app/core/services/api.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  frameworkId: any;
  projectData: any[] = [];
  employeeData: any[] = [];
  employeeListInProjectContribution: any[] = [];
  baseUrl = environment.baseApiUrl

  constructor(
    private helper: HelpersService,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.frameworkId = this.route.snapshot.paramMap.get('id');
    this.getProjectData();
    this.helper.createProjectPopUp.subscribe((created: boolean) => {
      if (created == true) {
        this.getProjectData();
      }
    });
    this.helper.addEmployeeContribution.subscribe((created: boolean) => {
      if (created == true) {
        this.getProjectData();
      }
    });
  }

  getProjectData() {
    if (this.frameworkId) {
      this.api
        .getRequest(APIURL.listProjectByFramework + this.frameworkId)
        .subscribe((res) => {
          this.projectData = res;
          console.log(this.projectData, 'wdufhipsadfi');
        });
    }
  }

  addProject() {
    console.log('project-list', this.frameworkId);
    this.helper.createProject(true, this.frameworkId);
  }

  showInCompletedProjects() {}

  updateProject() {}

  goToGitUrl(url: string) {
    location.href = url;
  }

  addFramework(projectId: number) {
    this.helper.addContribution(true, projectId);
  }
}
