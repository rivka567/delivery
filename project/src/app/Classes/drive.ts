import { Time } from '@angular/common';

export class Drive {
        constructor(
            public driveCode:string="",
            public userCode:string="",
            public drivingTime:Time,
            public travelDate:Date,
            public fromLocation:string="",
            public toLocation:string="",
            public readinessForChanges:string="",
            public packageSizeCode:number=0,
            public howLongBeforeReminder:Time,
            public transportation:string="",
            public wasPerformed:false
        ) { }
}
