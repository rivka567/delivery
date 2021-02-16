import { Time } from '@angular/common'
import { Drive } from './drive';

export class Package {
    constructor(
       public packageCode:number,
       public userCustomerCode:string="",
       public userDeliveryCode:string="",
       public fromLocationId:number=0,
       public fromLocationFormat:string,
        public fromLocationLat:number=0,
        public fromLocationLng:number=0,
        public toLocationId:number=0,
        public toLocationFormat:string,
        public toLocationLat:number=0,
        public toLocationLng:number=0,
       public travelDate:Date=null,
       public drivingTime:Time=null,
       public status:boolean=true,
       public packageTypeCode:number,
       public describePackage:string="",
       public packageSizeCode:number=0,
       public packageSize?:string,
       public packageType?:string,
       public timeInDate?:Date,
       public listWaiting?:Drive[],
       public customerName?:string
    )
 
    {}
}
  
 
