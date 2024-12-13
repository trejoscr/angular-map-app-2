import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-result',
  standalone: false,

  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {

  public selectedId: string = '';

  constructor (
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo( place: Feature ) {
    this.selectedId = place.id;

    const [ lng, lat ] = place.center;
    this.mapService.flyTo([ lng, lat ]);
  }

  getDirections( place: Feature ) {

    if ( !this.placesService.userLocation ) throw Error('No user location available');

    this.placesService.deletePalces();

    const start = this.placesService.userLocation;
    const end = place.center as [ number, number ];

    this.mapService.getRouteBetweenPoint(start, end);
  }

}
