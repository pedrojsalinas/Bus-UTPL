  import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {Usuario} from '../../models/usuario';
import { MapaPage } from '../mapa/mapa';
import { TabsPage } from '../tabs/tabs';
import {ToastService} from './../../services/toast/toast.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	usuario = {} as Usuario;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,public navParams: NavParams,private toast: ToastService) {
  }

  ionViewDidLoad() {
  }
  async loginCorreo(usuario: Usuario){
  	try{
      const result = this.afAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.clave);
      console.log(result);
    if (result) {
      this.navCtrl.setRoot(MapaPage);
                }  
    }catch(e){
      this.toast.show(`${e}`);
  	}
  }
  entrar(){
    this.navCtrl.setRoot(TabsPage);
  }
 
}
