import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-alert-pop-up',
  templateUrl: './alert-pop-up.component.html',
  styleUrls: ['./alert-pop-up.component.css']
})
export class AlertPopUpComponent implements OnInit {

  constructor(private waiter: HelpersService) { }

  ngOnInit(): void {
  }
}
