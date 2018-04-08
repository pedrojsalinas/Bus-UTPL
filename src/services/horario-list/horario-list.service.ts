import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

import {Horario} from './../../models/horario/horario.model';
@Injectable()

export class HorarioListService {
	
	private horarioListRef ;

	constructor(private db: AngularFireDatabase) {}

	setKeyHorarioList(key){
		this.horarioListRef =this.db.list<Horario>('horarios/'+key+'');
		return this.horarioListRef;
	}

}

