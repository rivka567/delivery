import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { stringify } from 'querystring';
import { Package } from 'src/app/Classes/package';
import { PackageService } from 'src/app/Services/package.service';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  static rand=1;
  newPackage:Package;
  // size:FormControl;
  constructor(private userSer:UserService,private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder,private dialog:MatDialog, private packageSer:PackageService) { }
  
  ngOnInit(): void {
   this.initForm();
   
  }
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }
 
  randFunction()
  {
    return PackageComponent.rand=(PackageComponent.rand*1000)/20;
  }
  

  initForm() {
   this.form = this.formBuilder.group({
    size:['',Validators.required],
    customerCode:[this.userSer.currentUser.userCode||'',Validators.required],
    fromLocation:['',Validators.required],
    toLocation:['',Validators.required],
    drivingTime:['',Validators.required],
    travelDate:[''],
    describeHappiness:[''],
    happinessLevel:[''],
    readiness:[''],
    describePackage:[''],
    type:['',Validators.required],
    waitForConfirmation:['']
    })
  }
  checkSize(){
    alert(this.form.value.size)
  }

  addPackage()
  {
  this.submitted=true;
  this.newPackage=new Package(this.form.value.customerCode,null,this.form.value.fromLocation,
  this.form.value.toLocation,this.form.value.travelDate,this.form.value.drivingTime,this.form.value.readiness, false,
  this.form.value.waitForConfirmation,this.form.value.happinessLevel,this.form.value.describeHappiness,this.form.value.type,
  this.form.value.describePackage,this.form.value.size);
  console.log(this.newPackage);
  
  this.packageSer.addPackage(this.newPackage).subscribe(
    myData => {console.log("from subscribe",this.newPackage);
     console.log("add sucssesful");},
    myErr => {console.log("from subscribe",this.newPackage); 
    console.log(myErr.message);});
  }

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
    
  public handleAddressChange(address: Address) {
    debugger
    
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
