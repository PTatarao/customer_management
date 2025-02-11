import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { CustomerContext} from '../customer.context';


@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    username: string = '';
  password: string = '';
  customerContext: CustomerContext[] = [];

    loginForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
    });

  public constructor(private authservice: AuthService, private router: Router) { }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.authservice.login(username, password).subscribe((userdetail) => {
      console.log(userdetail);
      if (userdetail) {
        const user: CustomerContext = {
          Id: userdetail.Id,
          Name: userdetail.Name,
          Role: userdetail.Role
        };
        this.customerContext.push(user);
        localStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['/add-customer']);
      }

    },
    (error: any) => {
      console.error("Invalid user:", error);
    })
        
    }

}
