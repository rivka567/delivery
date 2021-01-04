import { Time } from '@angular/common';

export class Drive {
        constructor(
           
            public driverCode:string="",
            public customerCode:string="",
            public drivingTime:Time,
            public travelDate:Date,
            // public fromLocatioId:number=0,
            public fromLocationFormat:string="",
            public fromLocationLat:number=0,
            public fromLocationLng:number=0,
            // public toLocatioId:number=0,
            public toLocationFormat:string="",
            public toLocationLat:number=0,
            public toLocationLng:number=0,
            public packageSizeCode:number=0,
            public describeDrive:string="",
            public confirmationCustomer:boolean=false,
            public confirmationDelivery:boolean=false,
            public transportation:number,
            public timeInDate?:Date
        ) { }
}
