import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  standalone: false,

  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  ngAfterViewInit(): void {

    if ( !this.placesService.userLocation ) throw Error('No user location available')

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom,
    });

    // Forzar el redimensionamiento
    map.on('load', () => {
      map.resize();
    });

    const popup = new Popup()
      .setHTML(`
            <h6>Estadio Ricardo Saprissa</h6>
            <img width="100%" src="https://buzonderodrigo.com/wp-content/uploads/2022/08/50-an%CC%83os-20.jpg"/>
        `);

    new Marker({ color: 'purple' })
    .setLngLat(this.placesService.userLocation)
    .setPopup(popup)
    .addTo(map);

    this.mapService.setMap( map );

  }

}


/* pk.eyJ1IjoiYW10cmU5MyIsImEiOiJjbTNmYXpocTIwbnN2Mm9wczFycDNlNHV1In0.PeBlE8ulQB3xZv9XL0Q0rQ */
