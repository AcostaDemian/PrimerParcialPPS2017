import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/**
 * Generated class for the Trivia page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia',
  templateUrl: 'trivia.html',
})
export class Trivia {
  preguntas: FirebaseListObservable<any>;
  cantidadDePreguntas:number;
  preguntaActual:number;
  preguntasRespondidas:Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AngularFire) {    
    this.preguntas = af.database.list('/preguntas');  
    this.preguntas.subscribe(result => {
      this.cantidadDePreguntas = result.length
      this.generarRandom();
    });
  }

  generarRandom(){
    do{
      this.preguntaActual= Math.floor((Math.random() * this.cantidadDePreguntas) + 1);  
      if(this.preguntasRespondidas.length >= this.cantidadDePreguntas){
        console.log('Respondiste todas la preguntas');
        break;
      }
    }while(this.preguntasRespondidas.indexOf(this.preguntaActual) != -1);
  }

  respuesta(respuestaDada ,respuestaCorrecta){
    this.preguntasRespondidas.push(this.preguntaActual);
    if(respuestaDada== respuestaCorrecta){
      alert('ACERTASTE');
    }
    else{
      alert('ERRASTE');
    }
    this.generarRandom();    
  }

}
