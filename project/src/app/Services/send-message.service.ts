import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drive } from '../Classes/drive';
import { Package } from '../Classes/package';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  URL: string = "http://localhost:59587/api/SendMessage";

  constructor(private http:HttpClient) { }

  sendMessageFromCustomer(p:Package,d:Drive,body:string):Observable<any>
  {
    debugger
    const array={
      'package':p,
      'drive':d,
      'body':body
    };
   return this.http.post<any>(this.URL+"/SendMessageFromCustomerToDelivery",array);
  }
  sendMessageFromDelivery(d:Drive,p:Package,body:string):Observable<any>
  {
    debugger
    const array={
      'package':p,
      'drive':d,
      'body':body
    };
   return this.http.post<any>(this.URL+"/SendMessageFromDeliveryToCustomer",array);
  }
}
