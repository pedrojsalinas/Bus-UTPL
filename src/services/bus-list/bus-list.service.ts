import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

import {Bus} from './../../models/bus/bus.model';
@Injectable()

export class BusListService {
	
	private busListRef = this.db.list<Bus>('buses');

	constructor(private db: AngularFireDatabase) {}

	getBusList(){
		return this.busListRef;
	}

}

