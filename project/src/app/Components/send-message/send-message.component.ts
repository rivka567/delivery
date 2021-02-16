import { Component, OnInit } from '@angular/core';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { SendMessageService } from 'src/app/Services/send-message.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  package:Package;
  waitingD:Drive;
  drive:Drive;
  waitingP:Package;

  constructor(private sendSer:SendMessageService) { }

  ngOnInit(): void {

  }

  sendMessage(body:string)
  {
    debugger
    if(this.package&&this.waitingD)
    this.sendSer.sendMessageFromCustomer(this.package,this.waitingD,body).subscribe(
      myData=>{alert(myData)},
      myErr=>{alert("errorr");}
    );
    else
    this.sendSer.sendMessageFromDelivery(this.drive,this.waitingP,body).subscribe(
      myData=>{alert(myData)},
      myErr=>{alert("errorr");}
    );

  }

}
