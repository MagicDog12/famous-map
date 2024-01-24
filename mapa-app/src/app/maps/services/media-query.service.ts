import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaQueryService {

  public sizeDisplay: string = 'phone' || 'web';

  constructor(
    public breakpointObserver: BreakpointObserver
  ) {
    this.mediaQuery();
  }

  public mediaQuery() {

    this.breakpointObserver
      .observe(Breakpoints.Small)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log(state);
          //AQUI SERA TRUE SOLO SI ESTA EN RESOLUCION DE CELULAR
          this.sizeDisplay = 'phone';
        }
      });

    this.breakpointObserver
      .observe(Breakpoints.Web)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          //AQUI SERA TRUE SOLO SI ES RESOLUCION PARA WEB
          this.sizeDisplay = 'web';
        }
      });
  }

}
