import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Classes/user';
import { Observable } from 'rxjs';
import { Package } from '../Classes/package';
import { Drive } from '../Classes/drive';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = "http://localhost:59587/api/User";
  currentUser: User;
  delivery:User;
  currentComponent:Component;
  myDriver:User;
  myCustomer:User;
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
  updateUser(user:User): Observable<User>
  {
    debugger
    return this.http.post<User>(this.URL+"/UpdateUser",user);
  }
  sendPackageByEmail(idD:number,contactAddress:string,subject:string,body:Package): Observable<string> {
   debugger
    const array={
      'idDrive':idD,
      'contactAddress':contactAddress,
      'subject':subject,
      'body':body
    };
    return this.http.post<string>(this.URL+"/SendPackageByEmail",array);
  }
  

  sendDriveByEmail(idP:number,contactAddress:string,subject:string,body:Drive): Observable<string> {
    debugger
     const array={
      'idPackage':idP,
       'contactAddress':contactAddress,
       'subject':subject,
       'body':body
     };
     return this.http.post<string>(this.URL+"/SendDriveByEmail",array);
   }

   sendCodeByEmail(mail:string):Observable<string>
   {
     debugger
     return this.http.get<string>(this.URL+"/SendCodeByEmail?mail="+mail);
   }
  // sendEmail(sender:string, contactAddress:string,subject:string,body:string): Observable<string> {
  //   debugger
  //   return this.http.get<string>(this.URL+"/SendEmail?sender="+sender+"&contactAddress="+contactAddress+"&subject="+subject+"&body="+body);
  // }
}
