import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
/*import { GoogleMaps,
		 GoogleMap,
		 GoogleMapsEvent,
		 GoogleMapOptions,
		 CameraPosition,
		 MarkerOptions,
		 Marker} from '@ionic-native/google-maps';

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
	//map: GoogleMap;

	@ViewChild('map') mapRef: ElementRef;
  constructor(public navCtrl: NavController, 
  	public geolocation: Geolocation) {
  }



  ionViewDidLoad() {
	this.getPosition();
	//this.geolocationNative();
  }


 /*
  geolocationNative(){
  	this.geolocation.getCurrentPosition().then((geoposition: Geoposition) =>{
  		//console.log(geoposition.coords.latitude);
  		const lon=geoposition.coords.latitude;
  		return geoposition.coords.longitude;
  
  		//this.loadMap();
  	})
  }

 loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }*/
    getPosition():any{
	    this.geolocation.getCurrentPosition()
	    .then(response => {
	      this.showMap(response);
	    })
	    .catch(error =>{
	      console.log(error);
	    })
  }
  showMap(position: Geoposition){
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
  	const location=  new google.maps.LatLng(latitude,longitude);


  	const options = {
  		center: location,
  		zoom: 18,
  		streetViewControl: false,
  		mapTypeId: 'roadmap',
  		zoomControl: false,

  	}

  	const map =  new google.maps.Map(this.mapRef.nativeElement,options);

  	this.addMarker(location,map);
  }

  addMarker(position, map){
  	return new google.maps.Marker({
  		position,
  		map,
  		title: "Tu estas aqui!",
  	});
  }



}
