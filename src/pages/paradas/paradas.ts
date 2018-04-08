import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {ParadaListService} from './../../services/parada-list/parada-list.service';
import {Parada} from '../../models/parada/parada.model';

/**
 * Generated class for the ParadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paradas',
  templateUrl: 'paradas.html',
})
export class ParadasPage {

	parada :Parada={
	    nombre:'',
	    latitud: null,
	    longitud: null,
	    direccion: ''
	  };
	paradatList$: Observable<Parada[]>;
  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,
  			private paradaService: ParadaListService) {
  	
  	 this.paradatList$ = this.paradaService
      .getParadaList().snapshotChanges().map(changes =>{
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

  ionViewDidLoad() {
  }

}
