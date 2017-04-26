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
  selector: 'page-juego',
  templateUrl: 'juego.html',
})
export class Juego {
  respuestas: FirebaseListObservable<any>;
  usuarioLogeado;
  resultado:string;
  preguntasYrespuestas:Array<any>=[];
  numeroRandom:number;
  fecha:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public af:AngularFire, public alertCtrl:AlertController, public toastCtrl: ToastController) {  
    af.auth.subscribe(auth => this.usuarioLogeado =  auth);  
    //console.log(this.numeroRandom);
    var today = new Date();
    this.fecha= today.getDate()+'/'+(today.getUTCMonth()+1)+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes();
    //console.log(this.fecha);
  }

  //Genera un nro random que va a corresponder a una pregunta
  generarRandom(){
    this.numeroRandom= Math.floor(Math.random() * 3) + 1;
  }

  //Verifica la respuesta dada por el usuario
  //Piedra=1 Paper=2 Tijera=3
  respuesta(respuestaDada){
    this.generarRandom();
    if(respuestaDada == this.numeroRandom){
      this.resultado='EMPATASTE';
    }
    else{
      switch(this.numeroRandom){
        //PIEDRA
        case 1: 
          if(respuestaDada==2){
            this.resultado='GANASTE';
          }
          else{
            this.resultado='PERDISTE';
          }
          ;break;
          //PAPEL
          case 2: 
          if(respuestaDada==1){
            this.resultado='PERDISTE';
          }
          else{
            this.resultado='GANASTE';
          }
          ;break;
          //TIJERA
          case 3: 
          if(respuestaDada==1){
            this.resultado='PERDISTE';
          }
          else{
            this.resultado='GANASTE';
          }
          ;break;
      }
    }
    //console.log(this.resultado);
    this.presentToast();
    this.guardarInformacion();    
  }

  presentToast() {
    var toast;

    switch(this.resultado){
      case 'GANASTE':
      toast = this.toastCtrl.create({
          message: 'GANASTE',
          duration: 2000,
          position: 'middle',
          cssClass: 'clase-toast-acierto'
        });break;
      case 'PERDISTE':
      toast = this.toastCtrl.create({
          message: 'PERDISTE',
          duration: 2000,
          position: 'middle',
          cssClass: 'clase-toast-fallo'
        });break;
      case 'EMPATASTE':
      toast = this.toastCtrl.create({
          message: 'EMPATASTE',
          duration: 2000,
          position: 'middle',
          cssClass: 'clase-toast-empate'
        });break;
    }
    toast.present();
  }

  //Guardo la informacion(preguntas respondidas con sus respuestas)
  guardarInformacion(){
    var updateNombre= this.af.database.list('/respuestasJuego/');
    updateNombre.update(this.usuarioLogeado.auth.uid,{nombre:this.usuarioLogeado.auth.displayName});

    var respuestas = this.af.database.list('/respuestasJuego/'+this.usuarioLogeado.auth.uid+'/');
    respuestas.push({
      'resultado':this.resultado,
      'fecha':this.fecha
    });
  }

}