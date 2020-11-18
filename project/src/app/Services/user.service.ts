import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = "http://localhost:59587/api/User";
  currentUser: User;

  constructor(private http: HttpClient) { 
  
  }

  getUserById(id:string): Observable<User> {
    return this.http.get<User>(this.URL + "/GetUserById/" + id);
  }
  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.URL + "/GetAllUsers");
  }
  addUser(user:User): Observable<string> {
    debugger
    console.log("user service")
    return this.http.post<string>(this.URL+"/AddUser",user);
  }

  // sendEmail(contactAddress:string,subject:string,body:string): Observable<string> {
  //   debugger
  //   return this.http.get<string>(this.URL+"/SendEmail&contactAddress="+contactAddress+"&subject="+subject+"&body="+body);
  // }

  sendEmail(sender:string, contactAddress:string,subject:string,body:string): Observable<string> {
    debugger
    return this.http.get<string>(this.URL+"/SendEmail?sender="+sender+"&contactAddress="+contactAddress+"&subject="+subject+"&body="+body);
  }
}
