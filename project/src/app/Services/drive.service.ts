import { Injectable } from '@angular/core';
import { Drive } from '../Classes/drive';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  URL: string = "http://localhost:59587/api/Drive";
  // id:string;
  // name:string;
  listDrive:Array<Drive>=[]
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

  getDriveById(id: number): Observable<Drive> {
    return this.http.get<Drive>(this.URL + "/GetDriveById/" + id);
  }
  
  getDrives(): Observable<Array<Drive>> {
    debugger
    return this.http.get<Array<Drive>>(this.URL + "/GetAllDrives");
  }

  GetSpesificDrives():Observable<Array<Drive>> {
    debugger
    return this.http.get<Array<Drive>>(this.URL + "/GetSpesificDrives");
  }

  addDrive(drive:Drive): Observable<string> {
    debugger
    console.log(drive);
    return this.http.post<string>(this.URL + "/AddDrive",drive);
  }
}
