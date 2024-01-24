import { Component, Input } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;
  @Input()
  smallSizeDisplay!: boolean;

  constructor(
    private placesService: PlacesService,
  ) {

  }

  onQueryChanged(query: string = ""): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query, this.smallSizeDisplay!);
    }, 250);
  }
}
