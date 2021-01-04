import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../Classes/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  URL: string = "http://localhost:59587/api/Package";

  constructor(private http: HttpClient) { }
  currentPackage:Package;

  getAllPackages(): Observable<Array<Package>> {
    return this.http.get<Array<Package>>(this.URL + "/GetAllPackages");
  }
  getPackageById(id:number): Observable<Package> {
    return this.http.get<Package>(this.URL + "/GetPackageById/" + id);
  }
  getPackages(): Observable<Array<Package>> {
    return this.http.get<Array<Package>>(this.URL + "/GetAllPackages");
  }
  getPackagesByUserId(id:string): Observable<Array<Package>> 
  {
    return this.http.get<Array<Package>>(this.URL + "/GetPackagesByUserId/"+id);
  }
  addPackage(myPackage:Package): Observable<string> {
    debugger
    console.log("from service:",myPackage);
    return this.http.post<string>(this.URL + "/AddPackage",myPackage);
  }


}