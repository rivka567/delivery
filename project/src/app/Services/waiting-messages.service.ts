import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Drive } from '../Classes/drive';
import { Package } from '../Classes/package';

@Injectable({
  providedIn: 'root'
})
export class WaitingMessagesService {

  URL: string = "http://localhost:59587/api/WaitingMessage";

  constructor(private http: HttpClient) { }
  deleteWaitingMessageFromCustomer(p:Package,d:Drive):Observable<any>
{
  debugger
  const array={
    'package':p,
     'drive':d
   };
  return this.http.post<any>(this.URL+"/DeleteWaitingMessageFromCustomer",array);
}

deleteWaitingMessageFromDelivery(d:Drive,p:Package):Observable<any>
{
  debugger
  const array={
    'package':p,
     'drive':d
   };
  return this.http.post<any>(this.URL+"/DeleteWaitingMessageFromDelivery",array);
}
// deleteAllWaitingMessage(p:Package,confirmDrive:Drive,listToDelete:Drive[]):Observable<any>
// {
//   const array={
//     'package':p,
//      'confirmDrive':confirmDrive,
//      'listToDelete':listToDelete
//    };
//   debugger
//   return this.http.post<any>(this.URL+"/deleteAllWaitingMessage",array);
// }
changeStatus(status:boolean)
{
  return this.http.post<string>(this.URL+"/ChangeStatus",status);
}

}