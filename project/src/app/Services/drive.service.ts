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

getDriveById(id:number)
{
  return this.http.get<Drive>(this.URL+"/getDriveById/"+id);
}
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

  updateDrive(updateDrive:Drive,listWaiting:Package[]): Observable<string> {
    debugger
    const array={
      'listWaiting':listWaiting,
      'updateDrive':updateDrive
    }
    console.log("from service:",updateDrive);
    return this.http.post<string>(this.URL + "/UpdateDrive",array);
  }

  deleteDrive(drive:Drive,listWaiting:Package[]): Observable<Array<Drive>> 
  {
    debugger
    const array={
      'drive':drive,
    'listWaiting':listWaiting,
    'url':'http://localhost:4200/add-happiness/'+drive.driverCode 
    }
    console.log(array)
    return this.http.post<Array<Drive>>(this.URL + "/DeleteDrive",array);
  }
  changeStatusToClose(id:number, status:boolean):Observable<any>
  {
    alert("service")
     return this.http.get<any>(this.URL+"/ChangeStatusToClose/"+id);
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

  addDrive(drive:Drive): Observable<Drive> {
    console.log(drive);
      return this.http.post<Drive>(this.URL + "/AddDrive",drive);
  }

confirmDrive(p:Package,confirmDrive:Drive,listToDelete:Drive[]):Observable<any>
{
  const array={
    'package':p,
     'confirmDrive':confirmDrive,
     'listToDelete':listToDelete
   };
  debugger
  return this.http.post<any>(this.URL+"/ConfirmDrive",array);
}
}
