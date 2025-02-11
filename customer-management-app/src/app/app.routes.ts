import { Routes } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
 

    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'customer',
        component:CustomerFormComponent,
      canActivate: [AuthGuard]
    },
    {
        path:'**',redirectTo:'login'
    }
];
