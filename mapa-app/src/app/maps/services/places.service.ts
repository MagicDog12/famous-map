import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';

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
    private placesApi: PlacesApiClient,
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
    if(!this.userLocation) throw Error('No hay userLocation');
    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation?.join(','),
      }
    })
      .subscribe(resp => {
        console.log(resp.features);
        this.places = resp.features;
        this.isLoadingPlaces = false;
      });
  }

}
