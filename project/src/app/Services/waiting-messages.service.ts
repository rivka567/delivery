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
deleteMessage(idP:number,idD:number,type:string):Observable<string>
{
  debugger
  return this.http.delete<string>(this.URL+"/DeleteWaitingMessage/"+idP+"/"+idD+"/"+type);
}
deleteAllWaitingMessage(idP:number,idD:number,listToDelete:Drive[]):Observable<any>
{
  debugger
  return this.http.post<any>(this.URL+"/deleteAllWaitingMessage/"+idP+"/"+idD,listToDelete);
}
changeStatus(status:boolean)
{
  return this.http.post<string>(this.URL+"/ChangeStatus",status);
}

}
