import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  constructor(
    private directionsApi: DirectionsApiClient
  ) {

  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike, zoom: number) {
    if (!this.isMapReady) throw Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom: zoom,
      center: coords
    });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number], smallSizeDisplay: boolean) {
    if (!this.map) throw Error('Mapa no inicializado');

    this.markers.forEach(marker => marker.remove());

    const newMarkers = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(`
        <h6>${place.text_es}</h6>
        <span>${place.place_name}</span>
      `);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(newMarker);
    }
    this.markers = newMarkers;
    if (places.length === 0) return;

    const bounds = new LngLatBounds();
    bounds.extend(userLocation);
    newMarkers.forEach(marker => {
      bounds.extend(marker.getLngLat());
    });
    if (smallSizeDisplay) {
      this.map.fitBounds(bounds, {
        padding: 20
      });
    } else {
      this.map.fitBounds(bounds, {
        padding: 200
      });
    }

  }

  getRouteBetweenPoints(start: [number, number], end: [number, number], smallSizeDisplay: boolean) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => {
        this.drawPolyline(resp.routes[0], smallSizeDisplay);
      })
  }

  private drawPolyline(route: Route, smallSizeDisplay: boolean) {
    if (!this.map) throw Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    })

    if (smallSizeDisplay) {
      this.map.fitBounds(bounds, {
        padding: 20
      });
    } else {
      this.map.fitBounds(bounds, {
        padding: 200
      });
    }

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    };

    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }
    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });

    const popup = new Popup({ closeButton: false, closeOnClick: false })
      .setHTML(`
        <span><strong>Distancia:</strong> ${(route.distance / 1000).toFixed(2)} kms.</span><br />
        <span><strong>Duración:</strong> ${Math.floor(route.duration / 60)} min y ${Math.floor(route.duration % 60)} seg.</span>
      `);

    this.map.on('mouseover', 'RouteString', (event) => {
      this.map!.getCanvas().style.cursor = 'pointer';
      const coordinates = event.lngLat;
      popup.setLngLat(coordinates).addTo(this.map!);
    }
    );

    this.map.on('mouseleave', 'RouteString', () => {
      this.map!.getCanvas().style.cursor = '';
      popup.remove();
    }
    );
  }

  clearPolyline() {
    if (!this.map) throw Error('Mapa no inicializado');

    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }
  }
}
