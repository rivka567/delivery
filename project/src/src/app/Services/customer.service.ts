import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../Classes/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  URL: string = "http://localhost:59587/api/Customer";

  constructor(private http:HttpClient) { }

  getDeliveryById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.URL + "/GetCustomerById/" + id);
  }

  addCustomer(customer:Customer): Observable<string> {
    return this.http.post<string>(this.URL + "/AddCustomer",customer);
  }
}
