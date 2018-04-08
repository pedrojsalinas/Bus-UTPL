import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Parada} from '../../models/parada/parada.model';
import {Horario} from '../../models/horario/horario.model';
import {HorarioListService} from './../../services/horario-list/horario-list.service';
import {Observable} from 'rxjs/observable';

@IonicPage()
@Component({
  selector: 'page-horarios',
  templateUrl: 'horarios.html',
})
export class HorariosPage {
	item: Parada;
	horario :Horario={
	    hora: '',
	    direccion: ''
	  };
	  horarioList$: Observable<Horario[]>;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private horarioService: HorarioListService) {
  	this.item = this.navParams.get('item');
  	  	 this.horarioList$ = this.horarioService
      .setKeyHorarioList(this.item.key).snapshotChanges().map(changes =>{
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

  ionViewWillLoad() {
    this.item = this.navParams.get('item');
  }

}
