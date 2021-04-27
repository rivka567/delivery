import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../Classes/package';
import { Drive } from '../Classes/drive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  URL: string = "http://localhost:59587/api/Package";

  constructor(private http: HttpClient) { }
  currentPackage:Package;
  listPackagesByUserId:Array<Package>;
  allPackages: Array<Package>;
  from:Address;
  to:Address;

  getAllPackages(): Observable<Array<Package>> {
    debugger
    return this.http.get<Array<Package>>(this.URL + "/GetAllPackages");
  }
  getPackageById(id:number): Observable<Package> {
    return this.http.get<Package>(this.URL + "/GetPackageById/" + id);
  }

  getPackagesByUserId(id:string): Observable<Array<Package>> 
  {
    return this.http.get<Array<Package>>(this.URL + "/GetPackagesByUserId/"+id);
  }

  deletePackage(id:number,listWaiting:Drive[]): Observable<Array<Package>> 
  {
    debugger
    return this.http.post<Array<Package>>(this.URL + "/DeletePackage/"+id,listWaiting);
  }
  addPackage(myPackage:Package): Observable<Package> {
    debugger
    console.log("from service:",myPackage);
    return this.http.post<Package>(this.URL + "/AddPackage",myPackage);
  }

  updatePackage(updatePackage:Package,listWaiting:Drive[]): Observable<string> {
    debugger
    console.log("from service:",updatePackage);
    const array={
      'updatePackage':updatePackage,
       'listWaiting':listWaiting,
       
     };
    return this.http.post<string>(this.URL + "/UpdatePackage",array);
  }

}