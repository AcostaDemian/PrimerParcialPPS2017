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
  preguntaYrespuestas:Array<any>=[];
  usuarioLogeado;

  constructor(public navCtrl: NavController, public af: AngularFire) {
    af.auth.subscribe(auth => this.usuarioLogeado =  auth);
    console.log(this.usuarioLogeado.auth);

    this.preguntas = af.database.list('/preguntas');  
    this.respuestas = af.database.list('/respuestas'); 

    this.respuestas.subscribe(respuestas => {
        // items is an array
        respuestas.forEach(respuesta => {
            if(respuesta.$key==this.usuarioLogeado.auth.uid)
              this.preguntaYrespuestas.push(respuesta.preguntasYrespuestas);
        });
    });
  }
}
