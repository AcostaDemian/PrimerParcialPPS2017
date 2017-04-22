import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { HomePage } from '../home/home';
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
  respuestas: FirebaseListObservable<any>;
  cantidadDePreguntas:number;
  cantidadDePreguntasCorrectas:number=0;
  preguntaActual:number;
  preguntasRespondidas:Array<any>=[];
  preguntasRespondidasString:Array<any>=[];
  respuestasDadas:Array<any>=[];
  usuarioLogeado;
  resultado:Array<any>=[];
  preguntasYrespuestas:Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AngularFire) {  
    af.auth.subscribe(auth => this.usuarioLogeado =  auth);  
    this.preguntas = af.database.list('/preguntas');  
    this.respuestas = af.database.list('/respuestas');  
    this.preguntas.subscribe(result => {
      this.cantidadDePreguntas = result.length
      this.generarRandom();
    });
  }

  generarRandom(){
    do{
      if(this.preguntasRespondidas.length >= 3){
        console.log('Respondiste todas la preguntas');
        //console.log(this.respuestasDadas);
        //console.log(this.preguntasRespondidas);
        //console.log(this.cantidadDePreguntasCorrectas);
        this.guardarInformacion();
        break;
      }
      this.preguntaActual= Math.floor((Math.random() * this.cantidadDePreguntas) + 1);  
    }while(this.preguntasRespondidas.indexOf(this.preguntaActual) != -1);
  }

  respuesta(respuestaDada ,respuestaCorrecta,stringRespuestaDada,stringPregunta){
    if(this.cantidadDePreguntas>this.preguntasRespondidas.length){
      this.preguntasRespondidas.push(this.preguntaActual);
      //Lo que voy a guardar en firebase
      this.preguntasRespondidasString.push(stringPregunta);
      this.respuestasDadas.push(stringRespuestaDada);
      if(respuestaDada == respuestaCorrecta){
        this.resultado.push('true');
        alert('ACERTASTE'); 
        this.cantidadDePreguntasCorrectas++;
      }else{
        this.resultado.push('false');
        alert('ERRASTE');
      }
      this.generarRandom();  
    }
  }

  guardarInformacion(){
    for(var i=(3-1);i>=0;i--){
      //console.log(this.preguntasRespondidasString[i]);
      //console.log(this.respuestasDadas[i]);
      this.preguntasYrespuestas.push({
        'pregunta':this.preguntasRespondidasString[i],
        'respuesta':this.respuestasDadas[i],
        'valor':this.resultado[i]})
    }
      //console.log(this.preguntasYrespuestas);

    this.respuestas.update(this.usuarioLogeado.auth.uid,{
            "cantidadCorrectas" : this.cantidadDePreguntasCorrectas,
            "preguntasYrespuestas":this.preguntasYrespuestas,
            //"preguntas" : this.preguntasRespondidasString,
            //"respuestas" : this.respuestasDadas,
            "username" : this.usuarioLogeado.auth.displayName
          });
    this.navCtrl.setRoot(HomePage);
  }

}
