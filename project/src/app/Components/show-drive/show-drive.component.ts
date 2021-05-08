import { Component, OnInit } from '@angular/core';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { SendMessageService } from 'src/app/Services/send-message.service';
import  swal from 'sweetalert';
import { SendMessageComponent } from '../send-message/send-message.component';

@Component({
  selector: 'app-show-drive',
  templateUrl: './show-drive.component.html',
  styleUrls: ['./show-drive.component.scss']
})
export class ShowDriveComponent implements OnInit {
  drive:Drive;
  p:Package;
  constructor(private sendSer:SendMessageService) { }

  ngOnInit(): void {
  }

  sendMessageFromCustomer(body:string)
  {
    if(this.p&&this.drive)
    this.sendSer.sendMessageFromCustomer(this.p,this.drive,body).subscribe(
      myData=>{swal({title:"ההודעה נשלחה בהצלחה",icon:"success"})},
      myErr=>{alert("errorr");}
    );
    else
    this.sendSer.sendMessageFromDelivery(this.drive,this.p,body).subscribe(
      myData=>{alert(myData)},
      myErr=>{alert("errorr");}
    );
  }
}
