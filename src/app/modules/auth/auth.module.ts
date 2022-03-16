import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service'
import { MaterialModule } from '../meterial/meterial.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    ApiService,
  ]
})
export class AuthModule {}
