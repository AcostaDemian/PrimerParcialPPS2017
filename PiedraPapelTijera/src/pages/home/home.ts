import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  
  preguntas: FirebaseListObservable<any>;
  respuestas: FirebaseListObservable<any>;
  respuestasPPT:Array<any>=[];
  usuarioLogeado;

  constructor(public navCtrl: NavController, public af: AngularFire) {
    af.auth.subscribe(auth => this.usuarioLogeado =  auth);
    //console.log(this.usuarioLogeado.auth);
    this.respuestas = af.database.list('/respuestasJuego/'+this.usuarioLogeado.auth.uid+'/'); 

    this.respuestas.subscribe(respuestas => {
        // items is an array
        respuestas.forEach(respuesta => {
          this.respuestasPPT.push(respuesta);
        });        
        //console.log(this.respuestasPPT)
    });
  }
}
