import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MapaPage } from '../pages/mapa/mapa';
import { ParadaPage } from '../pages/parada/parada';
import { TabsPage } from "../pages/tabs/tabs";
//instalar modulo firebase
//npm install angularfire2@4.0.0-rc0 firebase --save
//firebase module
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TestListService } from '../services/test-list/test-list.service';
import { ParadaListService } from '../services/parada-list/parada-list.service';
import { ToastService } from '../services/toast/toast.service';

import {Geolocation} from '@ionic-native/geolocation';
//import {GoogleMaps} from '@ionic-native/google-maps';
  var config = {
    apiKey: "AIzaSyCb3v2C9UtnDnADiJSEByOCKDZtLI7Ehng",
    authDomain: "busutpl-168de.firebaseapp.com",
    databaseURL: "https://busutpl-168de.firebaseio.com",
    projectId: "busutpl-168de",
    storageBucket: "",
    messagingSenderId: "512422881522"
  };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MapaPage,
    ParadaPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MapaPage,
    ParadaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TestListService,
    ParadaListService,
    ToastService,
    Geolocation,
    //GoogleMaps
  ]
})
export class AppModule {}
