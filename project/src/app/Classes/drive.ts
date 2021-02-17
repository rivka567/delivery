import { Time } from '@angular/common';
import { Package } from './package';

export class Drive {
        constructor( 
            public driveCode:number,         
            public driverCode:string="",
            public customerCode:string="",
            public drivingTime:Time,
            public travelDate:Date,
            public fromLocationId:number=0,
            public fromLocationFormat:string="",
            public fromLocationLat:number=0,
            public fromLocationLng:number=0,
            public toLocationId:number=0,
            public toLocationFormat:string="",
            public toLocationLat:number=0,
            public toLocationLng:number=0,
            public describeDrive:string="",
            public status:boolean=true,
            public transportation:number=0,
            public price:number,
            public transportationType?:string,
            public timeInDate?:Date,
            public listWaiting?:Package[],
            public driverName?:string
           
        ) { }
}
