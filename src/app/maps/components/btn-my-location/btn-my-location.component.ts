import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  standalone: false,

  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  constructor(
    private mapService: MapService,
    private placesServices: PlacesService
  ) {}

  goToMyLocation(){
    if ( !this.placesServices.isUserLocationReady ) throw new Error('Error getting user location');

    if ( !this.mapService.isMapReady ) throw new Error('Error getting map ready');

    this.mapService.flyTo( this.placesServices.userLocation! );
  }

}
