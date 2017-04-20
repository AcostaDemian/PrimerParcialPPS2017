import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { About } from './about';

@NgModule({
  declarations: [
    About,
  ],
  exports: [
    About
  ]
})
export class AboutModule {}
