import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/Classes/package';
import { PackageService } from 'src/app/Services/package.service';

@Component({
  selector: 'app-package-list-for-delivery',
  templateUrl: './package-list-for-delivery.component.html',
  styleUrls: ['./package-list-for-delivery.component.scss']
})
export class PackageListForDeliveryComponent implements OnInit {

  allPackages:Array<Package>;

  constructor(private packageSer:PackageService) { }

  ngOnInit(): void {
    this.getAllPackages();
  }

  getAllPackages()
  {
  this.packageSer.getPackages().subscribe(
      myData => {this.allPackages=myData
      console.log(this.allPackages)},
      myErr => {console.log("from subscribe"); 
      console.log(myErr.message);});
  }
}
