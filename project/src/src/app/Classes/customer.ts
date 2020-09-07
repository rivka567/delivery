import { Delivery } from './delivery';
import { Time } from '@angular/common';

export class Customer {

    constructor(
        public customerCode:string="",
        public customerName: string = "",
        public travelDate: Date= null,
        public drivingTime: Time=null,
        public fromLocation: string = "",
        public toLocation: string = "",
        public redinesForChangess:string="",
        public sizeCode: number = 0,
        public customerMail: string = "",
        public customerPhone:string="",
        public deliveryCode:string="",
        public confirmationDelivery:boolean,
        public waitingTimeForConfirmation:Time= null,
         public howLongBeforeReminder: string = "",
         public happinessLevel:number=0,
         public describeHappiness:string=""
         
    ) { }

}
