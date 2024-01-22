import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';



@NgModule({
  declarations: [
    MapPageComponent,
    MapViewComponent,
    LoadingComponent,
    BtnMyLocationComponent,
    AngularLogoComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MapPageComponent,
  ]
})
export class MapsModule { }
