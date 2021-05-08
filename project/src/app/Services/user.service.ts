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
  addUser(user:User): Observable<any> {
    debugger
    console.log("user service")
    let u= this.http.post<any>(this.URL+"/AddUser",user);
    console.log("after server",u);
    return u;
  }
  
  updateUser(user:User): Observable<User>
  {
    debugger
    return this.http.post<User>(this.URL+"/UpdateUser",user);
  }

 
}
