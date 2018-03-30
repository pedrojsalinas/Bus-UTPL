import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

import {Item} from './../../models/item/item.model';
@Injectable()

export class TestListService {
	
	private testListRef = this.db.list<Item>('items');

	constructor(private db: AngularFireDatabase) {}

	getTestList(){
		return this.testListRef;
	}
	addItem(item:Item){
		return this.testListRef.push(item);
	}
	removeItem(item:Item){
		return this.testListRef.remove(item.key);
	}
}

