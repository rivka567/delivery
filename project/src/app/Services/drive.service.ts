import { Injectable } from '@angular/core';
import { Drive } from '../Classes/drive';
import { Package } from '../Classes/package';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  URL: string = "http://localhost:59587/api/Drive";
  listDrive:Array<Drive>=[];
  from:Address;
  to:Address;
  fromDate:Date;
  toDate:Date;
  allDrives: Array<Drive>;
  date=new Date();
  constructor(private http: HttpClient) { }
  //URL1:string="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location="
  URL1:string="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=35.21371,31.768319"

  //????????????
  // getIdFromUser(id:string):Observable<User>{
  //   return this.;
  // }

aa:any;
  getDrivesList()
  {
    return this.listDrive;
  }

  get123():Observable<any>
  {
    debugger
  return this.http.get<any>(this.URL1)
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


  getAllDrives(): Observable<Array<Drive>> {
    return this.http.get<Array<Drive>>(this.URL + "/GetAllDrives");
  }

  addDrive(drive:Drive): Observable<string> {
    console.log(drive);
      return this.http.post<string>(this.URL + "/AddDrive",drive);
  }
}
