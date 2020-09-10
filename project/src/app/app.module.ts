import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainComponent } from './Components/main/main.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { AboutComponent } from './Components/about/about.component';
import { UserComponent } from './Components/user/user.component';
import { ExistUserComponent } from './Components/exist-user/exist-user.component';
import { PackageComponent } from './Components/package/package.component';
import { AgmCoreModule} from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GMapModule } from 'primeng/gmap';
import { TempComponent } from './Components/temp/temp.component';
import { DriveComponent } from './Components/drive/drive.component';
import { TravelListForDeliveryComponent } from './Components/travel-list-for-delivery/travel-list-for-delivery.component';

const appRoutes: Routes =
[

  {path: "", component: HomeComponent},
  {path: "main", component: MainComponent},
  {path:"about",component:AboutComponent},
  {path: "header", component: HeaderComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AboutComponent,
    UserComponent,
    ExistUserComponent,
    PackageComponent,
    TempComponent,
    DriveComponent,
    TravelListForDeliveryComponent

  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatChipsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTreeModule,
    MatRadioModule,
    GooglePlaceModule,
    GMapModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAj13gY0dRy3LKgxfbOkCPaqq_twe8eR3k',
      libraries:['places','geometry','drawing']
      }),
  ],

  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
 
})
export class AppModule { }
