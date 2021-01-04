import { Time } from '@angular/common'

export class Package {
    constructor(
      
       public userCustomerCode:string="",
       public userDeliveryCode:string="",
       public fromLocationFormat:string,
        public fromLocationLat:number=0,
        public fromLocationLng:number=0,
        // public toLocatioId:number=0,
        public toLocationFormat:string,
        public toLocationLat:number=0,
        public toLocationLng:number=0,
       public travelDate:Date=null,
       public drivingTime:Time=null,
       public confirmationCustomer:boolean=false,
       public confirmationDelivery:boolean=false,
       public packageType:number=0,
       public describePackage:string="",
       public packageSize:number=0
    )
 
    {}
}
