import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {Usuario} from '../../models/usuario';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
usuario = {} as Usuario;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async agregarUsuario(usuario: Usuario) {
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.clave);
    console.log(result);
    }catch(e){
    	console.log(e);
    }
    
}

}
