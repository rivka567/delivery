import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Package } from 'src/app/Classes/package';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-package',
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.scss']
})
export class UpdatePackageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private userSer:UserService,private packageSer:PackageService) { }
   package:Package;
   newPackage:Package;
   minDate:Date;
   form:FormGroup;
   submitted=false;

   ngOnInit(): void {
     console.log("old package",this.package);
     
    this.minDate = new Date();
     this.initForm();
    }
     
    dateClass = (d: Date): MatCalendarCellCssClasses => {
      const date = d.getDate();
      // Highlight the 1st and 20th day of each month.
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }
    
  
    initForm() {
     this.form = this.formBuilder.group({
      packageCode:[this.package.packageCode],
      size:[this.package.packageSizeCode||'',Validators.required],
    //  customerCode:[this.userSer.currentUser.userCode||'',Validators.required],
      fromLocation:[this.package.fromLocationFormat||'',Validators.required],
      toLocation:[this.package.toLocationFormat||'',Validators.required],
      fromDate:[this.package.fromDate||'',Validators.required],
      toDate:[this.package.toDate||'',Validators.required],
      fromTime:[this.package.fromTime||'',Validators.required],
      toTime:[this.package.toTime||'',Validators.required],
      describePackage:[this.package.describePackage||''],
      type:[this.package.packageTypeCode||'',Validators.required],

      })
    }


updatePackage()
{
  debugger
  //במידה ושינה את 2 הכתובות
  if(this.from&&this.to)
  this.newPackage=new Package(this.form.value.packageCode,this.userSer.currentUser.userCode,null,0,this.from,this.fromLat,this.fromLng,0,this.to,this.toLat,this.toLng,
    this.form.value.fromDate,this.form.value.toDate,this.form.value.fromTime,this.form.value.toTime,true,
    this.form.value.type,this.form.value.describePackage,this.form.value.size,false,0);
    //במידה ושינה רק את המוצא
  else if(this.from&&!this.to)
  this.newPackage=new Package(this.form.value.packageCode,this.userSer.currentUser.userCode,null,0,this.from,this.fromLat,this.fromLng,this.package.toLocationId,this.package.toLocationFormat,this.package.toLocationLat,this.package.toLocationLng,
    this.form.value.fromDate, this.form.value.toDate,this.form.value.fromTime,this.form.value.toTime,true,
    this.form.value.type,this.form.value.describePackage,this.form.value.size,false,0);
    //במידה ושינה רק את היעד
  else if(!this.from&&this.to)
  this.newPackage=new Package(this.form.value.packageCode,this.userSer.currentUser.userCode,null,this.package.fromLocationId,this.package.fromLocationFormat,this.package.fromLocationLat,this.package.fromLocationLng,0,this.to,this.toLat,this.toLng,
    this.form.value.FromDate,this.form.value.toDate,this.form.value.fromTime,this.form.value.toTime,true,
    this.form.value.type,this.form.value.describePackage,this.form.value.size,false,0);
   //במידה ולא שינה כלום
   else if(!this.from&&!this.to)
   this.newPackage=new Package(this.form.value.packageCode,this.userSer.currentUser.userCode,null,this.package.fromLocationId,this.package.fromLocationFormat,this.package.fromLocationLat,this.package.fromLocationLng,this.package.toLocationId,this.package.toLocationFormat,this.package.toLocationLat,this.package.toLocationLng,
     this.form.value.fromDate,this.form.value.toDate,this.form.value.fromTime,this.form.value.toTime,true,
     this.form.value.type,this.form.value.describePackage,this.form.value.size,false,0);
   
   
    debugger
    console.log("new package",this.newPackage);
   this.packageSer.updatePackage(this.newPackage,this.package.listWaiting).subscribe(
    myData => {console.log("from subscribe",this.newPackage);
    alert("add sucssesful");
  
    },
    myErr => {console.log("from subscribe",this.newPackage); 
    console.log(myErr.message);
  });

}

    from="";
    fromLat=0;
    fromLng=0;
    to="";
    toLat=0;
    toLng=0;
  public handleAddressFromChange(address: Address) {
    debugger
    this.from=address.formatted_address;
    this.fromLat=address.geometry.location.lat();
    this.fromLng=address.geometry.location.lng();
    console.log(address.formatted_address +" "+address.geometry.location.lat()+ " "+address.geometry.location.lng())
  // Do some stuff
  }
  public handleAddressToChange(address: Address) {
  debugger
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
  

}
