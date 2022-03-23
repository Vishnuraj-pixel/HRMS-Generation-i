import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private helper: HelpersService) { }

  ngOnInit(): void {
  }

  addProject() {
    this.helper.createProject(true);
  }

  updateProject() {

  }
}
