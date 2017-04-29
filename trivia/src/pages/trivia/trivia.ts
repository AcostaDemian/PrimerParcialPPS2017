import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public af:AngularFire, public alertCtrl:AlertController, public toastCtrl: ToastController) {  
    af.auth.subscribe(auth => this.usuarioLogeado =  auth);  
    this.preguntas = af.database.list('/preguntas');  
    this.respuestas = af.database.list('/respuestas');  
    this.preguntas.subscribe(result => {
      this.cantidadDePreguntas = result.length
      this.generarRandom();
    });
  }

  //Genera un nro random que va a corresponder a una pregunta
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

  //Verifica la respuesta dada por el usuario con los datos de Firebase
  respuesta(respuestaDada ,respuestaCorrecta,stringRespuestaDada,stringPregunta){
    let toast;
    (<HTMLInputElement> document.getElementById("botoncito1")).disabled = true;
    (<HTMLInputElement> document.getElementById("botoncito2")).disabled = true;
    (<HTMLInputElement> document.getElementById("botoncito3")).disabled = true;

    if(this.cantidadDePreguntas>this.preguntasRespondidas.length){
      this.preguntasRespondidas.push(this.preguntaActual);
      //Lo que voy a guardar en firebase
      this.preguntasRespondidasString.push(stringPregunta);
      this.respuestasDadas.push(stringRespuestaDada);
      if(respuestaDada == respuestaCorrecta){
        this.resultado.push('true');
        //TOAST
        toast = this.toastCtrl.create({
          message: 'ACERTASTE',
          duration: 2000,
          position: 'middle',
          cssClass: 'clase-toast-acierto'
        });   
        this.cantidadDePreguntasCorrectas++;
      }else{
        this.resultado.push('false');
        //TOAST
        toast = this.toastCtrl.create({
          message: 'FALLASTE',
          duration: 2000,
          position: 'middle',
          cssClass: 'clase-toast-fallo'
        });   
      }

      toast.present();

      toast.onDidDismiss(() => {
        this.generarRandom(); 
        (<HTMLInputElement> document.getElementById("botoncito1")).disabled = false;
        (<HTMLInputElement> document.getElementById("botoncito2")).disabled = false;
        (<HTMLInputElement> document.getElementById("botoncito3")).disabled = false;
        console.log('Dismissed toast');
      }); 
    }
  }

  //Guardo la informacion(preguntas respondidas con sus respuestas)
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

    //Alert de Ionic
    let alert = this.alertCtrl.create({
      title: 'Gracias por jugar',
      subTitle: '' ,
      buttons: ['OK']
    });
    alert.present();

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
