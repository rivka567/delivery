import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
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
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LoginComponent } from './Components/login/login.component';
import { TravelListComponent } from './Components/travel-list/travel-list.component';
import {MyPackagesComponent} from './Components/my-packages/my-packages.component';
import { PersonalDetailsComponent } from './Components/personal-details/personal-details.component';
import { PersonalAreaComponent } from './Components/personal-area/personal-area.component';
import { PersonalPackagesComponent } from './Components/personal-packages/personal-packages.component';
import { PersonalDrivesComponent } from './Components/personal-drives/personal-drives.component';
import { PackageListComponent } from './Components/package-list/package-list.component';
import { MyDrivesComponent } from './Components/my-drives/my-drives.component';
import { UpdatePersonalDetailsComponent } from './Components/update-personal-details/update-personal-details.component';
import { PersonalMessagesComponent } from './Components/personal-messages/personal-messages.component';
import { UpdatePackageComponent } from './Components/update-package/update-package.component';
import { UpdateDriveComponent } from './Components/update-drive/update-drive.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatToolbarModule,} from '@angular/material/toolbar';
import { MatTooltipModule,} from '@angular/material/tooltip';
import { HappinessComponent } from './Components/happiness/happiness.component';
import { ShowAllHappinessComponent } from './Components/show-all-happiness/show-all-happiness.component';
import { SendMessageComponent } from './Components/send-message/send-message.component';

const appRoutes: Routes =
[

  {path: "", component:LoginComponent},
  {path:"home/:id",component:HomeComponent},
  {path:"user",component:UserComponent},
  {path:"main",component:MainComponent},
  {path:"exist-user",component:ExistUserComponent},
  {path:"drive",component:DriveComponent},
  {path:"package",component:PackageComponent},
  {path:"about",component:AboutComponent},
  {path: "header", component: HeaderComponent},
  {path:"travel-list",component:TravelListComponent},
  {path:"package-list/:id",component:PackageListComponent},
  {path:"package-list",component:PackageListComponent},
  {path:"my-packages",component:MyPackagesComponent},
  {path:"my-drives",component:MyDrivesComponent},
  {path:"personal-area",component:PersonalAreaComponent,children:[
   {path:"personal-details",component:PersonalDetailsComponent},
   {path:"personal-packages",component:PersonalPackagesComponent},
   {path:"personal-drives",component:PersonalDrivesComponent},
  ]},
  {path:"waiting-messages",component:PersonalMessagesComponent},
{path:"hap",component:ShowAllHappinessComponent}

];
const config = {
  apiKey: 'AIzaSyCxE2_heEzD9OmVoUK_MVDNKmHwLjs9ct0&sensor=true',
  databaseURL: 'https://chat-fa021-default-rtdb.europe-west1.firebasedatabase.app/'
};

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
    LoginComponent,
    TravelListComponent,
    MyPackagesComponent,
    PersonalDetailsComponent,
    PersonalAreaComponent,
    PersonalPackagesComponent,
    PersonalDrivesComponent,
    PackageListComponent,
    MyDrivesComponent,
    UpdatePersonalDetailsComponent,
    PersonalMessagesComponent,
    UpdatePackageComponent,
    UpdateDriveComponent,
    HappinessComponent,
    ShowAllHappinessComponent,
    SendMessageComponent,
    
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
    FormsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSnackBarModule,
   MatToolbarModule,
   MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxE2_heEzD9OmVoUK_MVDNKmHwLjs9ct0&sensor=true',
      libraries:['places','geometry','drawing']
      }),
  ],

  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
 
})
export class AppModule{
}
