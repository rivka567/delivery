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
  currentDrive:Drive;
  listDrivesByUserId:Array<Drive>;
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

  getDrivesByUserId(id:string):Observable<Drive[]>
  {
    return this.http.get<Array<Drive>>(this.URL + "/GetDrivesByUserId/"+id);
  }

  updateDrive(updateDrive:Drive): Observable<string> {
    debugger
    console.log("from service:",updateDrive);
    return this.http.post<string>(this.URL + "/UpdateDrive",updateDrive);
  }

  deleteDrive(id:number,listWaiting:Package[]): Observable<Array<Drive>> 
  {
    debugger
    return this.http.post<Array<Drive>>(this.URL + "/DeleteDrive/"+id,listWaiting);
  }
  changeStatusToClose(id:number, status:boolean):Observable<any>
  {
     return this.http.post<any>(this.URL+"/ChangeStatusToClose/"+id,status);
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
    debugger
    return this.http.get<Array<Drive>>(this.URL + "/GetAllDrives");
  }

  addDrive(drive:Drive): Observable<string> {
    console.log(drive);
      return this.http.post<string>(this.URL + "/AddDrive",drive);
  }
}
