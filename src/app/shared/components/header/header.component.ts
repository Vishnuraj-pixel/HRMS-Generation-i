import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sideNav:boolean = false;
  isOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleButton() {
    this.sideNav = !this.sideNav;
    this.isOpen = !this.isOpen;
  }
}
