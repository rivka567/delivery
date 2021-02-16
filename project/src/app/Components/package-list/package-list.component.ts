import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Package } from 'src/app/Classes/package';
import { User } from 'src/app/Classes/user';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';
import { PackageComponent } from '../package/package.component';
import { ExistUserComponent } from '../exist-user/exist-user.component';
import { MyPackagesComponent } from '../my-packages/my-packages.component';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MyDrivesComponent } from '../my-drives/my-drives.component';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {

  len:number;
  myUser:User;
  minDate:Date;
  packagesToSearch: Package[];
  packagesFound: Package[] = new Array();
  from="";
  fromLat=0;
  fromLng=0;
  to="";
  toLat=0;
  toLng=0;
  date:'dd-MM-yyyy';
  hideme=[];
  panelOpenState = false;
  time1:any;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  constructor( private packageSer: PackageService,private userSer:UserService,
    private dialog:MatDialog,private router:Router,private dateAdapter: DateAdapter<Date>) { }

    ngOnInit(): void {
      this.minDate=new Date();
      this.getAllPackages();
     }
   
   dateClass = (d: Date): MatCalendarCellCssClasses => {
     const date = d.getDate();
     // Highlight the 1st and 20th day of each month.
     return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
   }
   
getAllPackages() {

      this.packageSer.getAllPackages().subscribe(
      myData => {
        this.packagesFound=myData;
        //תמיד נשאר כאן כל הנסיעות
        this.packageSer.allPackages=myData;
        this.len=this.packagesFound.length;

      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
}

getUserById(p:Package)
 { 
    console.log(p);
    this.userSer.getUserById(p.userCustomerCode).subscribe(
      myData => {
        //הלקוח שאני מעוניין בחבילה שלו
        this.userSer.myCustomer = myData;
        console.log(this.userSer.currentUser);
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });

  }
  
sendEmail(p:Package)
{
  if(this.userSer.currentUser&&p.userCustomerCode==this.userSer.currentUser.userCode)
  alert("זוהי החבילה שלך")
  else{
  if(this.userSer.currentUser==undefined)
    {
    const dialogRef = this.dialog.open(ExistUserComponent,{ disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(this.userSer.currentUser&&p.userCustomerCode!=this.userSer.currentUser.userCode)
      {
      //מחפשת את הלקוח שהחבילה שייכת אליו, כדי למצוא את  המייל של הלקוח
      this.getUserById(p);
      console.log("!!",p);
      //החבילה שהשליח בחר בה
      this.packageSer.currentPackage=p;
      const dialogRef = this.dialog.open(MyDrivesComponent,{ disableClose: true ,data:p.packageCode })
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    });

    }
    if(this.userSer.currentUser)
    {
  this.getUserById(p)
  this.packageSer.currentPackage=p;
  const dialogRef = this.dialog.open(MyDrivesComponent,{ disableClose: true,data:p.packageCode })
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  })
}
}
}

filterPackages(fromDate:string,toDate:string,from:Address,to:Address,time:string,size:number) {
    debugger
    this.packagesFound=this.packageSer.allPackages;
    if(fromDate)
      this.packagesFound=this.packagesFound.filter(d=>new Date(d.travelDate)>= new Date(fromDate));

    if(toDate)
      this.packagesFound=this.packagesFound.filter(d=>new Date(d.travelDate)<=new Date(toDate));
  
    if(from)
    {
      this.packageSer.from=from;
      this.packagesFound=  this.packagesFound.filter(f=> 4000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f.fromLocationLat, f.fromLocationLng), new google.maps.LatLng(this.fromLat, this.fromLng)))
    }
    if(to)
    { 
    // this.packageSer.get123().subscribe(mydate=>{this.packageSer.aa=mydate
    //   console.log(this.packageSer.aa);
    //   })
      this.packageSer.to=to;
      this.packagesFound=  this.packagesFound.filter(f=> 4000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f. toLocationLat, f.toLocationLng), new google.maps.LatLng(this.toLat,this.toLng)))
  
    }
  if(time)
  {
    // let t=new timeStamp("10:30")
    // alert(t);
    let h=time.substring(0,2)
    let m=time.substring(3,5)
  let t=new Date(1,1,2020,parseInt(h),parseInt(m),0,0)
    debugger
    this.packagesFound=  this.packagesFound.filter
    (f=>  (     
            new Date(f.timeInDate).getHours() == t.getHours()||
            (new Date(f.timeInDate).getHours() == t.getHours()-1 &&new Date(f.timeInDate).getMinutes()>=t.getMinutes())||
            (new Date(f.timeInDate).getHours() == t.getHours()+1 &&new Date(f.timeInDate).getMinutes()<=t.getMinutes())  
          )
    )
    // (new Date(f.timeInDate).getHours()>t.getHours()-1||
    // (new Date(f.timeInDate).getHours() == t.getHours()-1 &&new Date(f.timeInDate).getMinutes()>=t.getMinutes())||
    
    // &&
    // ( (new Date(f.timeInDate).getHours()< t.getHours()+1||
    // (new Date(f.timeInDate).getHours() == t.getHours()&& new Date(f.timeInDate).getMinutes()>=t.getMinutes()))||
  
  }
  if(size)
  {
    debugger
    if(size==0)
    {
      return this.packagesFound;
    }
    else
    this.packagesFound=  this.packagesFound.filter(f=>(f.packageSizeCode==size) )
  }
  debugger
  this.len=this.packagesFound.length;
  }
    

  public handleAddressFromChange(address: Address) {
    debugger
    //console.log(address);
    
    this.from=address.formatted_address;
      this.fromLat=address.geometry.location.lat();
      this.fromLng=address.geometry.location.lng();
      console.log(address.formatted_address +" "+address.geometry.location.lat()+ " "+address.geometry.location.lng())
      // Do some stuff
    }
    public handleAddressToChange(address: Address) {
      debugger
      console.log(address)
    this.to=address.formatted_address;
    this.toLat=address.geometry.location.lat();
    this.toLng=address.geometry.location.lng();
    console.log(address.formatted_address +" "+address.geometry.location.lat()+ " "+address.geometry.location.lng())
    // Do some stuff
    }
    public dirs: Array<any> = [{
    origin: { lat: 6.8403134, lng: 80.0021128 },
    destination: { lat: 6.71532762, lng: 80.06215197 },
    renderOptions: { polylineOptions: { strokeColor: '#f00' } },
    }, {
    origin: { lat: 6.4319639, lng: 79.9983415 },
    destination: { lat: 6.73906232, lng: 80.15640132 },
    renderOptions: { polylineOptions: { strokeColor: '#0f0' } },
    }];

    
sortBy(value:any)
{
  debugger
if(value=='from' && this.fromLat!=0 &&this.fromLng!=0)
{
  this.packagesFound.sort((a, b) => {
    console.log("a",google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a.fromLocationLat, a.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng) ))
    console.log("b", google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(b.fromLocationLng, b.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng)))
    console.log("a-b=" ,google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a.fromLocationLat, a.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng) )-google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(b.fromLocationLat, b.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng)))
    return  google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a.fromLocationLat, a.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng) )-google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(b.fromLocationLat, b.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng))})
}
if(value=='to' && this.toLng!=0 &&this.toLat!=0)
{
  this.packagesFound.sort((a, b) => {
    return  google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a.toLocationLat, a.toLocationLng), new google.maps.LatLng(this.toLat,this.toLng) )-google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(b.toLocationLat, b.toLocationLng), new google.maps.LatLng(this.toLat,this.toLng))})
}
if(value=='time')
  {
    this.packagesFound.sort((a, b) => {
      //  console.log("a.FromDate.getDate()"+new Date( a.FromDate).getTime())
      return a.drivingTime.hours- b.drivingTime.hours;

    });
  }
if(value=='date')
  {
  debugger
      this.packagesFound.sort((a, b) => {
        //  console.log("a.FromDate.getDate()"+new Date( a.FromDate).getTime())
        return new Date(a.travelDate).getDate().valueOf() - new Date(b.travelDate).getDate().valueOf();
  
      });
    
  }

}

      
}
