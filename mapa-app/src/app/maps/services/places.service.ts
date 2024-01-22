import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
  }

  public async getUserLocation(): Promise<[number, number]> {
    if (typeof navigator !== 'undefined') {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            this.userLocation = [coords.longitude, coords.latitude];
            resolve(this.userLocation);
          },
          (err) => {
            alert('No se pudo obtener la geolocalización');
            console.log(err);
            reject();
          }
        )
      });
    } else {
      return Promise.reject('Navigator no funciona fuera del navegador.');
    }

  }
}
