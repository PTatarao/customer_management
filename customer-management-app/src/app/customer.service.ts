import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Customer {
  CustomerNumber: string;
  CustomerName: string;
  dob: string;
  Gender: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7059/api/Customer';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  addCustomer(customer: Customer): Observable<any> {
    const customer1 = { CustomerName: customer.CustomerName, Gender: customer.Gender, dob: customer.dob};
    return this.http.post<any>(this.apiUrl, customer1);
  }

  updateCustomer(customer: Customer): Observable<any> {
    const customer1 = { CustomerName: customer.CustomerName, Gender: customer.Gender, dob: customer.dob, id: customer.id };
    return this.http.put<any>(`${this.apiUrl}/${customer.id}`, customer1);
  }

  deleteCustomer(customer: Customer): Observable<void> {
    let id = customer.id;
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
