import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { ParadaPage } from '../parada/parada';

//import {AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


import {TestListService} from './../../services/test-list/test-list.service';
import {ToastService} from './../../services/toast/toast.service';
import {Item} from '../../models/item/item.model';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	//arrData =[];
	//myInput;
	//authState: any = null;
  //itemsRef: AngularFireList<any>;
  //items: Observable<any[]>;
  item :Item={
    nombre:'',
  };
  testList$: Observable<Item[]>;

  constructor(public navCtrl: NavController,private test: TestListService, private toast: ToastService) {
    

    //const listRef = fdb.list('myItems');
    //this.items = fdb.list('myItems').valueChanges();
    this.testList$ = this.test
      .getTestList()
      .snapshotChanges()
      .map(changes =>{
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });

 

  /* fdb.list<Item>('items').valueChanges().subscribe(console.log);

  	this.fdb.list("/myItems").valueChanges().subscribe(_data =>{
  		this.arrData = _data;
  	});*/

  }
  btnAgregar(item:Item){
  	//this.fdb.list("/myItems/").push(this.myInput);
    this.test.addItem(item).then(ref =>{
       this.toast.show(`${item.nombre} agregado!`);
      });
    }

  
  eliminar(i){
    //const itemsRef = this.fdb.list('myItems');
  	//itemsRef.remove(items);
// to get a key, check the Example app below
//itemsRef.remove();
    //this.test.removeItem(i).then(() =>{
       //this.toast.show(`${item.nombre} agregado!`);
   //   });

  
  }
  goToUserPage(){
  	this.navCtrl.push(RegisterPage);
  }
  goToLoginPage(){
    this.navCtrl.push(LoginPage);
  }
  goToParadaPage(){
    this.navCtrl.push(ParadaPage);
  }
}
