import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiYW10cmU5MyIsImEiOiJjbTNmYXEzeGQwbTFvMmpvbmp2dzM5Ymg2In0.t_hvAGi6RtZPhFiJVf_hfg';

if ( !navigator.geolocation ) {
  alert("Geolocation is not supported by this browser.");
  throw new Error("Geolocation is not supported by this browser.");
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
