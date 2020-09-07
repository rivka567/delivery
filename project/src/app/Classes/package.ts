import { Time } from '@angular/common'

export class Package {
    constructor(
       public packageCode:number=0,
       public userCustomerCode:string="",
       public userDeliveryCode:string="",
       public fromLocation:string="",
       public toLocation:string="",
       public travelDate:Date=null,
       public drivingTime:Time=null,
       public redinessForChanges:string="",
       public confirmationDelivery:boolean=false,
       public watingTimeForConfirmation:Time=null,
       public happinesslevel:number=0,
       public describeHappiness:string="",
       public packageType:number=0,
       public describePackage:string="",
       public packageSize:number=0
    )
    {}
}
