import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Delivery } from '../Classes/delivery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryServiceService {
  URL: string = "http://localhost:59587/api/Delivery";

  constructor(private http: HttpClient) { }

  getDeliveryById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(this.URL + "/GetDeliveryById/" + id);
  }
  getDeliveries(): Observable<Array<Delivery>> {
    return this.http.get<Array<Delivery>>(this.URL + "/GetAllDeliveries");
  }
  addDelivery(delivery:Delivery): Observable<string> {
    return this.http.post<string>(this.URL + "/AddDelivery",delivery);
  }
}
