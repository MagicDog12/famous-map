import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-world-location',
  templateUrl: './btn-world-location.component.html',
  styleUrl: './btn-world-location.component.css'
})
export class BtnWorldLocationComponent {
  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ) {

  }

  goToWorld() {
    if (!this.placesService.isUserLocationReady) throw Error('No hay ubicación de usuario');
    if (!this.mapService.isMapReady) throw Error('No se ha inicializado el mapa');
    this.mapService.flyTo(this.placesService.userLocation!, 2);
  }
}
