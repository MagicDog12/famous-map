import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  goToMyLocation() {
    console.log("Ir a mi ubicación inicial");
  }
}
