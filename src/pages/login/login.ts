import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {Usuario} from '../../models/usuario';
import { MapaPage } from '../mapa/mapa';
import {ToastService} from './../../services/toast/toast.service';





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    console.log('ionViewDidLoad LoginPage');
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
      console.log(e);
  	}
  }
 
}
