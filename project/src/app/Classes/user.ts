export class User {
    constructor(
       public userCode:string="",
       public userName:string="",
       public userPhone:string="",
       public userMail:string="",
       public userAge:number=0,
       public messages:boolean=false
    )
    {}
}
