import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, CustomerContext],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  customerContext: CustomerContext;
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  public constructor(private authservice: AuthService, private router: Router) { }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    if (username === 'admin' && password === 'password') {
      this.authservice.login().subscribe(
        (customers) => {
          this.customers = customers;
        },
        (error) => {
          console.error("Error loading customers from API:", error);

        }
      );
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/add-customer']);
    } else {
      alert('Invalid login credentials');
    }
  }

}
