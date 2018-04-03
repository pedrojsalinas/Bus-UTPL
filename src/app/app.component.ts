import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { MapaPage } from '../pages/mapa/mapa';
import { ParadaPage } from '../pages/parada/parada';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  /**Se inicializa las paginas para que sean abiertas por el menu */
  mapa = MapaPage;
  parada = ParadaPage;
  rootPage:any = LoginPage;
  /** */
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl:MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(pagina:any){

    this.rootPage = pagina;
    this.menuCtrl.close();
  }
}

