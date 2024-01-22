import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc3RpYW4wMTIiLCJhIjoiY2xyb2NubWE2MWpsMDJqa2k3M3NzMGhsbyJ9.LO9_4zw5Rv7nP3f_IA6t2A';


if (!navigator.geolocation) {
  alert('Navegador no soporta la geolocation');
  throw new Error('Navegador no soporta la geolocation');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
