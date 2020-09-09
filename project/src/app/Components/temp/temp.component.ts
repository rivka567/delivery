import { Component, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
declare var  google:any;

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss']
})
export class TempComponent implements OnInit {
  overlays: any[];
  options: any;
  map:any;
  googleMap: any;

  constructor() { }
 
  ngOnInit(): void {
    this.options = {
      //  center: { lat: 31.771959,
      //  lng: 35.217018},
        zoom: 15 };
  }
    
 onMapReady(map)
 {
   this.map=map["map"];
 } 

 public handleAddressChange(address: Address) {
  var m=address.geometry.location;
  
  this.options.center.lat=address.geometry.location.lat();
  this.options.center.lng=address.geometry.location.lng();
  this.googleMap.options=this.options;
 }

}
