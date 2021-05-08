import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { User } from 'src/app/Classes/user';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { ExistUserComponent } from '../exist-user/exist-user.component';
import { PackageComponent } from '../package/package.component';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  newUser=new User();
  hide=true;
  delivery=false;
  listUser:Array<User>=[];
  checked=false;

  constructor(private dialogRef:  MatDialogRef<UserComponent >,private dialog:MatDialog,private router:Router, private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder,
   private userSer: UserService,) { }

   get f() { return this.form.controls; }

  ngOnInit(): void {
    this.initForm();
    // this.activatedRoute.params.subscribe(
    //   myParams=>{
    //     this.userSer.getUsers().subscribe(
    //       myData=>{
    //         this.listUser=myData;
    //       },
    //     )}
    // )
  }

  initForm() {
   this.form = this.formBuilder.group({
 //work 
    password:['',[Validators.required,Validators.minLength(6),Validators.pattern("[0-9-a-z-A-Z]*")]],
 //work  
      name:['',[Validators.required,Validators.pattern("[א-ת-a-z-A-Z]*")]],
 //work
  //    phone:['',[Validators.required,Validators.pattern("0[0-9]*"),Validators.maxLength(10),Validators.minLength(10)]],
 //work 
 //
      gmail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
 //work
  //    age:['',Validators.required],
   //   mes:[''||false],
    })
  }

  addUser() {
    debugger
 this.submitted=true;
 this.newUser=new User(this.form.value.password,this.form.value.name,this.form.value.gmail)
 this.userSer.addUser(this.newUser).subscribe(
  myData => { 
    console.log("from myData",myData)
    this.dialogRef.close();
    alert("נוסף בהצלחה")
    this.userSer.currentUser=myData;
},
  myErr => { console.log("from myErr",myErr)});
  }
}




// form: FormGroup;
// export class ExistingcostomerComponent implements OnInit {
//   customers: Customer = new Customer();
//   customerList: Array<Customer>;
//   registerForm: FormGroup;
//   registerForm1: FormGroup;

//   submitted = false;
//   hide = true;
//   show=true
//   constructor(
//     private activatedRoute: ActivatedRoute,
//     private customerSer: CustomeresService,
//     private formBuilder: FormBuilder,
//     private router: Router) { }

//   ngOnInit() {
//     // this.router.navigateByUrl(['/viewComp']);
//     this.InitCustomer();
//     this.InitRegisterForm();
//   }

//   InitRegisterForm() {
//     this.registerForm = this.formBuilder.group({
//       password: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }

//   InitCustomer() {
//     this.activatedRoute.params.subscribe(
//       myParam => {
//         this.customerSer.GetCoustomer().subscribe(
//           myData => {
//             this.customerList = myData;
//           },
//           myErr => { console.log(myErr.message); });
//       }
//     )
//   }

//   // check1() {
//   //   var c = new Customer();
//   //   c.Gmail = this.registerForm.value["email"];
//   //   c.Password = this.registerForm.value["password"];
//   //   this.customerSer.CostumerLogin(c).subscribe(
//   //     myData => { 
//   //       console.log("add sucssesful");
     
//   //       this.router.navigate(['/viewComp']);
//   //   },
//   //     myErr => { console.log(myErr.message); 
      
//   //     })
//   //   if (this.customerSer.CostumerLogin(c)!=undefined) {
     
//   //   }
//   //   else
  
//   //   this.customerSer.CurrentCustomer = this.customers;
//   // }
  
//   get f() { return this.registerForm.controls; }

//   onSubmit() {
//     if(this.registerForm.invalid)
//     return;
//     var c = new Customer();

//     if(this.registerForm.value["email"]=="" || this.registerForm.value["password"]==""){
//           alert("חסר שם משתמש או סיסמה.");
//            return;
//     }
//     c.Gmail = this.registerForm.value["email"];
//     c.Password = this.registerForm.value["password"];
//     this.customerSer.CostumerLogin(c).subscribe(
//       myData => { console.log("add sucssesful");this.customers = myData;
//       console.log("lolgin my data", myData)
//       this.customerSer.CurrentCustomer=myData;
//       this.router.navigate(['/homePage']);
//     },
//       myErr => { console.log(myErr.message); 
//         alert("שם משתתמש וסיסמה לא נכונים.");
//       }) 
//     this.customerSer.CurrentCustomer = this.customers;
//   }

//   onReset() {
//     this.submitted = false;
//     this.registerForm.reset();
//     // this.router.navigateByUrl(['/try/']);
//   }

// }