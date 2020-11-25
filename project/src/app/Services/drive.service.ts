import { Injectable } from '@angular/core';
import { Drive } from '../Classes/drive';
import { Package } from '../Classes/package';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  URL: string = "http://localhost:59587/api/Drive";
  // id:string;
  // name:string;
  listDrive:Array<Drive>=[];
  id=12;
  //משתנה שלפיו תוצג רשימה המתאימה לשליח ולמקום ממנו הוא נוסע ממילא:
  fromPlace:string
  toPlace:string
  constructor(private http: HttpClient) { }

  //????????????
  // getIdFromUser(id:string):Observable<User>{
  //   return this.;
  // }


  getDrivesList()
  {
    return this.listDrive;
  }


//   //אמור לקבל משתמש ולהוסיף אותו לרשימת השליחים 
// addDriveToList(user)
// {
//   for (var i=0; i<this.listDrive.length; i++)
//     {
//       if (this.listDrive[i].id == user.code)
//       {
//         this.listDrive[i].push(user).
//       }
//     }
// }

  getDriveById(): Observable<Drive> {
    debugger
    return this.http.get<Drive>(this.URL + "/GetDriveById/" + this.id);
  }

  getDrives(): Observable<Array<Drive>> {
    debugger
    return this.http.get<Array<Drive>>(this.URL + "/GetAllDrives");
  }
//הפונקציה הזאת 
  getSpesificDrives(myPackage:Package):Observable<Array<Drive>> {
    debugger
    console.log( "from drive service"+myPackage);
    return this.http.post<Array<Drive>>(this.URL + "/GetSpesificDrives",myPackage);
  }

  addDrive(drive:Drive): Observable<string> {
    debugger
    console.log(drive);
    return this.http.post<string>(this.URL + "/AddDrive",drive);
  }
}
