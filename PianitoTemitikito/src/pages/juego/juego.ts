import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { HomePage } from '../home/home';

import { NativeAudio } from '@ionic-native/native-audio';

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
  pianito:Array<any>=[];
  numeroRandom:number;
  fecha:string;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public af:AngularFire, 
  public alertCtrl:AlertController, 
  public toastCtrl: ToastController,
  public native:NativeAudio) {
    af.auth.subscribe(auth => this.usuarioLogeado =  auth);  
    //console.log(this.numeroRandom);    
    //console.log(this.fecha);
    this.cargarSonidos();
  }

  cargarSonidos(){
    this.native.preloadSimple('haunter', 'assets/sonidos/haunter.wav');
    this.native.preloadSimple('charizard', 'assets/sonidos/charizard.wav');
    this.native.preloadSimple('mrmine', 'assets/sonidos/mrmine.wav');
    this.native.preloadSimple('ninetales', 'assets/sonidos/ninetales.wav');
    this.native.preloadSimple('pikachu', 'assets/sonidos/pikachu.wav');
    this.native.preloadSimple('rapidash', 'assets/sonidos/rapidash.wav');
  }

  //Genera un nro random que va a corresponder a una pregunta
  generarRandom(){
    this.numeroRandom= Math.floor(Math.random() * 3) + 1;
  }

  sonido(sonido){
    switch(sonido){
      case 'haunter':
        this.native.play('haunter');
        break;      
      case 'charizard':
        this.native.play('charizard');
        break;
      case 'mrmine':
        this.native.play('mrmine');
        break;
      case 'ninetales':
        this.native.play('ninetales');
        break;
      case 'pikachu':
        this.native.play('pikachu');
        break;
      case 'rapidash':
        this.native.play('rapidash');
        break;
    }        
    this.pianito.push(sonido);
    console.log(this.pianito);   
  }

  //Guardo la informacion(preguntas respondidas con sus respuestas)
  guardarInformacion(){
    var today = new Date();
    this.fecha= today.getDate()+'/'+(today.getUTCMonth()+1)+'/'+today.getFullYear()+' '
                +today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
    //var updateNombre= this.af.database.list('/respuestasJuego/');
    //updateNombre.update(this.usuarioLogeado.auth.uid,{nombre:this.usuarioLogeado.auth.displayName});

    var respuestas = this.af.database.list('/pianito/');    
    respuestas.update(this.usuarioLogeado.auth.uid,{
      'nombre':this.usuarioLogeado.auth.displayName,
      'piano': JSON.stringify(this.pianito),
      //'fecha':this.fecha,
    });
    this.pianito=[];
  }
  
  reiniciarListado(){
    this.pianito=[];

  }

}