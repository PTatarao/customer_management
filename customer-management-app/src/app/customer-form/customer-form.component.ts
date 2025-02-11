import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

interface Customer {
  CustomerNumber: string;
  CustomerName: string;
  dob: string;
  Gender: string;
  id?: number; 
}

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {
  currentView: string = "list";
  userAccess: boolean = true;
  http = inject(HttpClient);
  customerForm!: FormGroup;
  customers: Customer[] = [];
  userRole: string = 'RELATIONSHIP MANAGER';
  editMode: boolean = false;
  selectedCustomer: Customer | null = null;
  public constructor(private customerService: CustomerService, private router: Router) { }
  ngOnInit(): void {
    this.editMode=this.checkuserHasEditAccess();
    this.loadCustomers();
    this.initForm();
  }
  checkuserHasEditAccess() {
    if (localStorage.getItem('Role') == this.userRole) {
      return this.userAccess=true;
    }
    else {
      return this.userAccess=false;
    }
  }
  initForm() {
    this.customerForm = new FormGroup({
      CustomerName: new FormControl("", [Validators.required, Validators.minLength(3)]),
      dob: new FormControl("", Validators.required),
      Gender: new FormControl("", Validators.required),
      id: new FormControl(null) // Include ID in the form
    });
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(
      (customer) => {
        this.customers = (customer as Customer[]).map((c: any) => ({
          CustomerNumber: c.id,
          CustomerName: c.customerName,
          dob: c.dob,
          Gender: c.gender,
          id: c.id
        }));
        this.currentView = 'list';
      },
      (error) => {
        console.error("Error loading customers from API:", error);
      }
    );
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const customer = this.customerForm.value as Customer;

      if (this.editMode) {

        this.customerService.updateCustomer(customer).subscribe(() => {
          this.loadCustomers(); 
          this.resetForm();
          this.editMode = false;
          this.currentView = 'list'; 
        });
      } else {
        var customer1 = customer
        console.log(customer1);
        this.customerService.addCustomer(customer1).subscribe(() => {
        //for adding new customer if data nit prresent
          this.loadCustomers(); 
          this.resetForm();
          this.currentView = 'list'; 
        });
      }
    }
  }

  editCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    this.editMode = true;
    this.currentView = 'form';
    this.customerForm.patchValue(customer); 
  }

  deleteCustomer(customer: Customer) {
    if (confirm("Are you sure you want to delete this customer?")) {
      this.customerService.deleteCustomer(customer).subscribe(() => {
        this.loadCustomers();
      });
    }
  }

  addCustomer() {
    this.currentView = 'form';
    this.editMode = false;
    this.resetForm(); // Clear the form for adding
  }

  resetForm() {
    this.customerForm.reset();
  }

  cancelEdit() {
    this.editMode = false;
    this.currentView = 'list';
    this.resetForm();
  }
  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
} 
