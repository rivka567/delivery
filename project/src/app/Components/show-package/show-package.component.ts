import { Component, OnInit } from '@angular/core';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { SendMessageService } from 'src/app/Services/send-message.service';
import  swal from 'sweetalert';

@Component({
  selector: 'app-show-package',
  templateUrl: './show-package.component.html',
  styleUrls: ['./show-package.component.scss']
})
export class ShowPackageComponent implements OnInit {

  package:Package;
  drive:Drive;

  constructor(private sendSer:SendMessageService) { }

  ngOnInit(): void {

  }

  sendMessageFromDelivery(body:string)
  {
    if(this.package&&this.drive)
    this.sendSer.sendMessageFromDelivery(this.drive,this.package,body).subscribe(
      myData=>{swal({title:"ההודעה נשלחה בהצלחה",icon:"success"})},
      myErr=>{alert("errorr");}
    );
    else
    this.sendSer.sendMessageFromDelivery(this.drive,this.package,body).subscribe(
      myData=>{alert(myData)},
      myErr=>{alert("errorr");}
    );
  }

}
