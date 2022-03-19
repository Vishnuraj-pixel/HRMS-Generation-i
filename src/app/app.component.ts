import { Component } from '@angular/core';
import { HelpersService } from './core/services/helpers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'generation-i';
  constructor(private helper:HelpersService) {}

  ngOnInit(): void {
    const authData: any = localStorage.getItem('auth_data');
    if(authData) {
      const entype = this.helper.decrypt(authData)
      this.helper.saveUser(JSON.parse(entype));
    }
  }
}



