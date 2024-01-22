import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit {

  constructor(
    private placesService: PlacesService
  ) {

  }

  ngOnInit(): void {
    console.log(this.placesService.userLocation);
  }

}
