import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private http: HttpClient,
  ) {
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

  getPlacesByQuery(query: string = "") {
    // TODO: evaluar string vacio
    this.isLoadingPlaces = true;
    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=5&language=es&access_token=pk.eyJ1IjoiY3Jpc3RpYW4wMTIiLCJhIjoiY2xyb2NubWE2MWpsMDJqa2k3M3NzMGhsbyJ9.LO9_4zw5Rv7nP3f_IA6t2A`)
      .subscribe(resp => {
        console.log(resp.features);
        this.places = resp.features;
        this.isLoadingPlaces = false;
      });
  }

}
