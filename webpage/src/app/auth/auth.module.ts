import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RegistersuccessComponent } from './registersuccess/registersuccess.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, 
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegistersuccessComponent
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]

})
export class AuthModule {}
