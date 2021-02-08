import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Happiness } from '../Classes/happiness';

@Injectable({
  providedIn: 'root'
})
export class HappinessService {

  constructor(private http:HttpClient) { }

  URL: string = "http://localhost:59587/api/Happiness";

  addHappiness(happiness:Happiness):Observable<any>
  {
    debugger
    return this.http.post<any>(this.URL+"/AddHappiness",happiness);
  }
 
  getHappinessByDeliveryId(id:string):Observable<Happiness[]>
  {
    return this.http.get<Happiness[]>(this.URL+"/getHappinessByDeliveryId/"+id);
  }

  GetAllHappiness():Observable<Happiness[]>
  {
    return this.http.get<Happiness[]>(this.URL+"/GetAllHappiness");
  }
}
