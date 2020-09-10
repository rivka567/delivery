import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Drive } from 'src/app/Classes/drive';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DriveService } from 'src/app/Services/drive.service';
import { UserService } from 'src/app/Services/user.service';
import { TravelListForDeliveryComponent } from '../travel-list-for-delivery/travel-list-for-delivery.component';
import { ExistUserComponent } from '../exist-user/exist-user.component';


@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  newDrive:Drive;
  listDrive:Array<Drive>=[];
  constructor(private dialog:MatDialog, private activatedRoute:ActivatedRoute,
     private formBuilder: FormBuilder,private driveSer: DriveService, private userSer:UserService) { }
     

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe(
      myParams=>{
        this.driveSer.getDrives().subscribe(
          myData=>{
            this.listDrive=myData;
          },
        )}
    )
  }

  initForm() {
   this.form = this.formBuilder.group({
    
    driveCode: ['',Validators.required],
   userCode:['',Validators.required], 
    driving:[''],
      date:['',Validators.required],
      fromLocation:['',Validators.required],
      toLocation:['',Validators.required],
      readinessForChanges:[''],
      packageSizeCode:['',Validators.required],
      reminder:[''],
      transportation:['',Validators.required],
     // wasPerformed:['',Validators.required]
    })
  }

  addDrive() {
 this.submitted=true;
 this.newDrive=new Drive(this.form.value.driveCode,this.form.value.userCode,this.form.value.driving,this.form.value.date,this.form.value.fromLocation,
  this.form.value.toLocation,this.form.value.readinessForChanges,this.form.value.packageSizeCode,this.form.value.reminder,this.form.value.transportation,this.form.value.wasPerformed)
 this.driveSer.addDrive(this.newDrive).subscribe(
  myData => { console.log("add drive sucssesful");},
  myErr => { console.log(myErr.message); });
  const dialogRef = this.dialog.open(TravelListForDeliveryComponent);
  }

  //לבדוק שהלולאה עוברת על המערך הנכון
  createDriveList()
  {
    for(var i=0;i<this.listDrive.length;i++)
      {
     
      }
  }
  checkValid(){
    debugger
  var x=this.form.errors;
   console.log(x);
   
  }

  openDialog() {
    const dialogRef = this.dialog.open(ExistUserComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

 
    
  }

}
