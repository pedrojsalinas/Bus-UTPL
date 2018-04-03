import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { MapaPage } from '../../pages/mapa/mapa';
import { ParadaPage } from '../../pages/parada/parada';
//import { TabsPage } from "../../pages/tabs/tabs";
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:any;
  tab2:any;
  tab3:any;

  constructor() {
    this.tab2 = MapaPage;
    this.tab3 = ParadaPage;
  }



}
