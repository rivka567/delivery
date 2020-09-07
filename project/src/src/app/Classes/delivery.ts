export class Delivery {
    constructor(
        public deliveryCode: number = 0,
        public deliveryName: string = "",
        public travelDate: Date=null,
        public drivingTime: string = "",
        public fromLocation: string = "",
        public toLocation: string = "",
        public sizeCode: number =0,
        public deliveryMail: string = "",
        public howLongBeforeReminder: string = "",
        public deliverySms: string = ""
    ) { }

}
