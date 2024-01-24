import { Component, OnInit } from '@angular/core';
import { MediaQueryService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent implements OnInit {

  public smallSizeDisplay: boolean = false;

  constructor(
    private placesService: PlacesService,
    private mediaQueryService: MediaQueryService,
  ) {

  }

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }

  ngOnInit(): void {
    this.placesService.getUserLocation();
    console.log("Pantalla: ", this.mediaQueryService.sizeDisplay)
    if( this.mediaQueryService.sizeDisplay === 'phone') this.smallSizeDisplay = true;
  }

}
