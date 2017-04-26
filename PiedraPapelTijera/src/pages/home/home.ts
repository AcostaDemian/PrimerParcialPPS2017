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
  Ganadosdesordenadas:Array<any>=[];
  Empatadosdesordenadas:Array<any>=[];
  Perdidosdesordenadas:Array<any>=[];
  respuestasPPT:Array<any>=[];
  usuarioLogeado;
  Ganados:Array<any>=[];
  Empatados:Array<any>=[];
  Perdidos:Array<any>=[];

  constructor(public navCtrl: NavController, public af: AngularFire) {
    af.auth.subscribe(auth => this.usuarioLogeado =  auth);
    //console.log(this.usuarioLogeado.auth);
    this.respuestas = af.database.list('/respuestasJuego/'//+this.usuarioLogeado.auth.uid+'/'
    ); 

    this.respuestas.subscribe(respuestas => {
        // items is an array
        respuestas.forEach(respuesta => {
          //console.log(respuesta.resultado);
          if(respuesta.resultado == 'GANASTE'){
            this.Ganadosdesordenadas.push(respuesta);}
          if(respuesta.resultado == 'EMPATASTE'){
            this.Empatadosdesordenadas.push(respuesta);}
          if(respuesta.resultado == 'PERDISTE'){
            this.Perdidosdesordenadas.push(respuesta);}        
        });        
        //console.log(this.respuestasPPT)
      this.Ganados = this.Ganadosdesordenadas.slice().reverse();
      this.Empatados = this.Empatadosdesordenadas.slice().reverse();
      this.Perdidos = this.Perdidosdesordenadas.slice().reverse();
    });
    //console.log(this.respuestasPPT);
  }
}
