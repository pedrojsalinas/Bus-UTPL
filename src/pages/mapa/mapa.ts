import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation,Geoposition} from '@ionic-native/geolocation';
import {ParadaListService} from './../../services/parada-list/parada-list.service';
import {Parada} from '../../models/parada/parada.model'
import { Observable } from 'rxjs/Observable';

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
	parada :Parada={
	    nombre:'',
	    latitud: null,
	    longitud: null,
	    direccion: ''
	  };
	  array_name = [];
  paradatList$: Observable<Parada[]>;
  arrData;
  users:any;


	//map: GoogleMap;

	@ViewChild('map') mapRef: ElementRef;
  constructor(public navCtrl: NavController, 
  				public geolocation: Geolocation,
  				private paradaService: ParadaListService) {

  	this.arrData = this.paradaService.getParadaList();

  	 this.paradatList$ = this.paradaService
      .getParadaList().snapshotChanges().map(changes =>{
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });


   



      //console.log(this.arrData);
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
  		zoom: 16,
  		streetViewControl: false,
  		mapTypeId: 'roadmap',
  		zoomControl: false,

  	}

  	const map =  new google.maps.Map(this.mapRef.nativeElement,options);

  	//this.addMarker(location,map);
  	var icon = {
	    url: "http://www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png", // url
	    scaledSize: new google.maps.Size(50, 50), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(0, 0) // anchor
				};

  	const marker = new google.maps.Marker({
  		position: location,
  		map: map,
  		icon: icon

  	});
   this.paradatList$.subscribe(res=>{
      	res.forEach(data=>{
      			let latitude = data.latitud;
      			console.log(data.latitud);
      			console.log(data.longitud);
				let longitude = data.longitud;
			  	const location=  new google.maps.LatLng(latitude,longitude);
			  	  	var icon = {
	    url: "https://cdn4.iconfinder.com/data/icons/maps-and-navigation-solid-icons-vol-1/72/13-512.png", // url
	    scaledSize: new google.maps.Size(50, 50), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(0, 0) // anchor
				};
      		new google.maps.Marker({
			  		position: location,
			  		map: map,
			  		icon: icon

			  	});
      	});
      });
  	const infoWindow = new google.maps.InfoWindow({
  		content: '<h6>tu estas aqui!</h6>'
  	});

  	marker.addListener('click', function(){
  		infoWindow.open(map, marker);
  	});
  }



  btnUbicacion()
{
  	return new google.maps.Marker({
  		visible: false
  	});
}

}
