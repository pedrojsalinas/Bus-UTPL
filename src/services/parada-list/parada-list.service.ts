import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

import {Parada} from './../../models/parada/parada.model';
@Injectable()

export class ParadaListService {
	
	private paradaListRef = this.db.list<Parada>('paradas');

	constructor(private db: AngularFireDatabase) {}

	getTestList(){
		return this.paradaListRef;
	}
	addParada(parada:Parada){
		return this.paradaListRef.push(parada);
	}
	removeParada(parada:Parada){
		return this.paradaListRef.remove(parada.key);
	}
}

