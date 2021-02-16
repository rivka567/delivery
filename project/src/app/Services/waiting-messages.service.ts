import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

changeStatus(status:boolean)
{
  return this.http.post<string>(this.URL+"/ChangeStatus",status);
}

}
