import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  
  preguntas: FirebaseListObservable<any>;
  respuestas: FirebaseListObservable<any>;
  Ganadosdesordenadas:Array<any>=[];
  Empatadosdesordenadas:Array<any>=[];
  Perdidosdesordenadas:Array<any>=[];
  respuestasPPT:Array<any>=[];
  usuarioLogeado;
  Piano:string;
  Empatados:Array<any>=[];
  Perdidos:Array<any>=[];
  seleccion='Ganados';

  SecuenciaPiano;

  constructor(public navCtrl: NavController, 
  public af: AngularFire, 
  public native:NativeAudio) {
    af.auth.subscribe(auth => this.usuarioLogeado =  auth);
    //console.log(this.usuarioLogeado.auth);
    this.respuestas = af.database.list('/pianito/'//+this.usuarioLogeado.auth.uid+'/'
    ); 

    this.respuestas.subscribe(respuestas => {
        // items is an array
        respuestas.forEach(respuesta => {
            if(respuesta.$key==this.usuarioLogeado.auth.uid){
              this.Piano =respuesta.piano;
              this.SecuenciaPiano = JSON.parse(this.Piano);
            }
        });
    });
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

  public sonido(sonido){
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
  }

  reproducir(){
    var that = this;
    this.SecuenciaPiano.forEach(function(obj,index,collection) {
        setTimeout(() => {
          that.sonido(obj);          
        } , index * 2000);
    });
  }
}
