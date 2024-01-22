import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent implements OnInit {
  constructor(
    private placesService: PlacesService
  ) {

  }
  ngOnInit(): void {
    this.placesService.getUserLocation();
  }

}
