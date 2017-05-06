import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Juego } from './juego';

@NgModule({
  declarations: [
    Juego,
  ],
  exports: [
    Juego
  ]
})
export class JuegoModule {}
