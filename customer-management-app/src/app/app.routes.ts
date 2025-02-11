import { Routes } from '@angular/router';
import { LoginComponent } from './login/LoginComponent';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
 

    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'add-customer',
        component:CustomerFormComponent,
      canActivate: [AuthGuard]
    },
    {
        path:'**',redirectTo:'login'
    }
];
