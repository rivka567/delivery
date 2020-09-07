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
import { CustomerMenuComponent } from './Components/customer-menu/customer-menu.component';
import { ExistDeliveryComponent } from './Components/exist-delivery/exist-delivery.component';
import { Routes, RouterModule } from '@angular/router';
import { NewDeliveryComponent } from './Components/new-delivery/new-delivery.component'
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
import { OrderComponent } from './Components/order/order.component';
import { AboutComponent } from './Components/about/about.component';

const appRoutes: Routes = [

  {
    path: "", component: HomeComponent
  },
  {
    path: "main", component: MainComponent
  },
  {
    path: "order", component:OrderComponent
  },
  
  {
    path: "customermenu", component: CustomerMenuComponent
  },
    { path: "existDel", component: ExistDeliveryComponent },
    { path: "newDel", component: NewDeliveryComponent },
    { path:"about",component:AboutComponent},


  {
    path: "header", component: HeaderComponent
  },


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ExistDeliveryComponent,
    CustomerMenuComponent,
    NewDeliveryComponent,
    OrderComponent,
    AboutComponent,
  
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
 
    
  ],

  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
 
})
export class AppModule { }
