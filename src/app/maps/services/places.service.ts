import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces = false;
  public places: Feature[] = [];

  public get isUserLocationReady() : boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ( {coords} ) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve( this.userLocation );
        },
        ( err ) => {
          alert( 'Error getting user location' )
          console.error( 'Error getting user location:', err );
          reject();
        }
      );
    });

  }

  getPlacesByQuery( query: string = '' ) {

    if ( query.length === 0 ) {
      this.places = [];
      this.isLoadingPlaces = false;
      return
    }

    if ( !this.isUserLocationReady ) throw Error( 'No user location' );

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${ query }.json`, {
      params:{
        proximity: this.userLocation!.join(',')
      }
    })
    .subscribe( resp => {
      this.isLoadingPlaces = false;
      this.places = resp.features;
      this.mapService.createMarkersFromPlaces( this.places, this.userLocation! );
    } );
  }

  deletePalces() {
    this.places = [];
  }

}
