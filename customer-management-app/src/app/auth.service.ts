import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerContext } from './customer.context';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7059/api/customer/Login';

  constructor(private http: HttpClient) { }

  login(username: any, password: any): Observable<any> {
    const loginDetails = { UserName: username, Password: password };
    return this.http.post<any>(this.apiUrl, loginDetails);
  }
  logout(id: number): Observable<CustomerContext> {
    return this.http.get<CustomerContext>(`${this.apiUrl}/${id}`);
  }
}
