import { Component ,ViewChild} from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent  {
  title = 'project';
     
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
    
        public handleAddressChange(address: Address) {
          debugger
          
          console.log(address.formatted_address +" "+address.geometry.location.lat()+ " "+address.geometry.location.lng())
        // Do some stuff
    }
    public dirs: Array<any> = [{
      origin: { lat: 6.8403134, lng: 80.0021128 },
      destination: { lat: 6.71532762, lng: 80.06215197 },
      renderOptions: { polylineOptions: { strokeColor: '#f00' } },
    }, {
      origin: { lat: 6.4319639, lng: 79.9983415 },
      destination: { lat: 6.73906232, lng: 80.15640132 },
      renderOptions: { polylineOptions: { strokeColor: '#0f0' } },
    }];
}
