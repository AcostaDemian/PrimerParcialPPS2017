import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController } from 'ionic-angular';


@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  mensaje: string = this.navParams.get('mensaje');

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {}

   closeModal() {
    this.viewCtrl.dismiss();
  }

}
