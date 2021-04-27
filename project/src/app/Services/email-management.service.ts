import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Drive } from '../Classes/drive';
import { Package } from '../Classes/package';

@Injectable({
  providedIn: 'root'
})
export class EmailManagementService {

  URL: string = "http://localhost:59587/api/EmailManagement";

  constructor(private http:HttpClient ) {}
  
  sendPackageByEmail(drive:Drive,contactAddress:string,subject:string,body:Package,totalPrice): Observable<string> {
    debugger
     const array={
       'drive':drive,
       'contactAddress':contactAddress,
       'subject':subject,
       'body':body,
       'totalPrice':totalPrice
     };
     console.log("array from service=",array);
     return this.http.post<string>(this.URL+"/SendPackageByEmail",array);
   }
   
   sendEmailToMatchDrives(matchDrives:Drive[],p:Package,url:string)
   {
     const array={
       'matchDrives':matchDrives,
       'package':p,
       'url':url
     }
     return this.http.post<string>(this.URL+"/SendEmailToMatchDrivers",array);
   }
 
   sendDriveByEmail(p:Package,contactAddress:string,subject:string,body:Drive): Observable<string> {
     debugger
      const array={
       'package':p,
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
