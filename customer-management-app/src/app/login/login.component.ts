import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { CustomerContext } from '../customer.context';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  public constructor(private authservice: AuthService, private router: Router) { }

  onSubmit() {
    localStorage.setItem('isAuthenticated', 'false');
    const { username, password } = this.loginForm.value;
    this.authservice.login(username, password).subscribe((response) => {
      console.log("User logged in successfully:", response.token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', response.token);
        this.authservice.getUserDetails(response.token).subscribe((userdetail) => {
          localStorage.setItem('Role', userdetail.role)
          this.router.navigate(['/customer']);
        })
    },
      (error: any) => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('Role');


        console.error("Invalid user:", error);
      })

  }

}
