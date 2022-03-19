import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private helper: HelpersService) { }

  ngOnInit(): void {
  }

  addFramework() {
    this.helper.toggleAddFrameworkModal(true);
  }
}
