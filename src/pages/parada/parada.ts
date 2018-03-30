import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

import {ParadaListService} from './../../services/parada-list/parada-list.service';
import {Parada} from '../../models/parada/parada.model';
import {ToastService} from './../../services/toast/toast.service';

/**
 * Generated class for the ParadaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parada',
  templateUrl: 'parada.html',
})
export class ParadaPage {

  parada: Parada={
    nombre:'',
    latitud: null,
    longitud: null,
    direccion: ''
  };

  constructor(
  	public navCtrl: NavController,
  	public geolocation: Geolocation,
  	public paradaService: ParadaListService,
  	public toast: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParadaPage');
    this.getPosition();
  }
  getPosition():any{
    this.geolocation.getCurrentPosition()
    .then(response => {
    	this.parada.latitud=response.coords.latitude;
    	this.parada.longitud=response.coords.longitude;
      //this.showMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }
	btnAgregar(parada:Parada){
  	//this.fdb.list("/myItems/").push(this.myInput);
    this.paradaService.addParada(parada).then(response =>{
    	this.toast.show(`Parada agregada!`);
      });
    }


}
