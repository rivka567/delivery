import { Time } from '@angular/common';

export class Drive {
        constructor(
           
            public driverCode:string="",
            public customerCode:string="",
            public drivingTime:Time,
            public travelDate:Date,
            // public fromLocatioId:number=0,
            public fromLocatioFormat:string="",
            public fromLocatioLat:number=0,
            public fromLocatioLng:number=0,
            // public toLocatioId:number=0,
            public toLocatioFormat:string="",
            public toLocatioLat:number=0,
            public toLocationLng:number=0,
            public packageSizeCode:number=0,
            public howLongBeforeReminder:Time,
            public transportation:string="",
            public describeDrive:string="",
            public confirmationCustomer:boolean=false

        ) { }
}
