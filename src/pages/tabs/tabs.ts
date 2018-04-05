import { Component } from '@angular/core';
import { MapaPage } from '../../pages/mapa/mapa';
import { ParadaPage } from '../../pages/parada/parada';
import { ParadasPage } from '../../pages/paradas/paradas';
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
  tab4:any;

  constructor() {
    this.tab2 = MapaPage;
    this.tab3 = ParadaPage;
    this.tab4 = ParadasPage;
  }



}
