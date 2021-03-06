import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation,Geoposition} from '@ionic-native/geolocation';
import {ParadaListService} from './../../services/parada-list/parada-list.service';
import {BusListService} from './../../services/bus-list/bus-list.service';
import {Parada} from '../../models/parada/parada.model';
import {Bus} from '../../models/bus/bus.model';
import { Observable } from 'rxjs/Observable';
import { ModalController } from 'ionic-angular';

/**Obtener la hgora */
////
declare var google: any;

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
	today = new Date(Date.now());

	parada :Parada={
	    nombre:'',
	    latitud: null,
	    longitud: null,
	    direccion: ''
	  };
	  bus : Bus={
	  	nro_bus: '',
	  	latitud: '',
	  	longitud: '',
	  };
	  array_name = [];
  paradatList$: Observable<Parada[]>;
  busList$: Observable<Bus[]>;
  arrData;
  users:any;
  markers = [];



	//map: GoogleMap;

	@ViewChild('map') mapRef: ElementRef;
  constructor(public navCtrl: NavController, 
  				public geolocation: Geolocation,
  				private paradaService: ParadaListService,
  				private busService: BusListService,
  				public modalCtrl: ModalController) {
		
  	this.arrData = this.paradaService.getParadaList();

  	 this.paradatList$ = this.paradaService
      .getParadaList().snapshotChanges().map(changes =>{
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
        	 this.busList$ = this.busService
      .getBusList().snapshotChanges().map(changes =>{
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

  ionViewDidLoad() {
	this.getPosition();
  }


    getPosition():any{
	    this.geolocation.getCurrentPosition()
	    .then(response => {
	      this.showMap(response);
	    })
	    .catch(error =>{
	      console.log(error);
	    })
  }
  btnLocalizar(){
		this.getPosition();
  }
  showMap(position: Geoposition){
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
  	const location=  new google.maps.LatLng(latitude,longitude);
		let options = {};
		if(this.today.getHours()>=18 || this.today.getHours()<=6 ){
			options ={
				center: location,
				zoom: 16,
				streetViewControl: false,
				mapTypeId: 'roadmap',
				zoomControl: false,
				disableDefaultUI: true,
				styles: [
					{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
					{elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
					{elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
					{
						featureType: 'administrative.locality',
						elementType: 'labels.text.fill',
						stylers: [{color: '#d59563'}]
					},
					{
						featureType: 'poi',
						elementType: 'labels.text.fill',
						stylers: [{color: '#d59563'}]
					},
					{
						featureType: 'poi.park',
						elementType: 'geometry',
						stylers: [{color: '#263c3f'}]
					},
					{
						featureType: 'poi.park',
						elementType: 'labels.text.fill',
						stylers: [{color: '#6b9a76'}]
					},
					{
						featureType: 'road',
						elementType: 'geometry',
						stylers: [{color: '#38414e'}]
					},
					{
						featureType: 'road',
						elementType: 'geometry.stroke',
						stylers: [{color: '#212a37'}]
					},
					{
						featureType: 'road',
						elementType: 'labels.text.fill',
						stylers: [{color: '#9ca5b3'}]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry',
						stylers: [{color: '#746855'}]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.stroke',
						stylers: [{color: '#1f2835'}]
					},
					{
						featureType: 'road.highway',
						elementType: 'labels.text.fill',
						stylers: [{color: '#f3d19c'}]
					},
					{
						featureType: 'transit',
						elementType: 'geometry',
						stylers: [{color: '#2f3948'}]
					},
					{
						featureType: 'transit.station',
						elementType: 'labels.text.fill',
						stylers: [{color: '#d59563'}]
					},
					{
						featureType: 'water',
						elementType: 'geometry',
						stylers: [{color: '#17263c'}]
					},
					{
						featureType: 'water',
						elementType: 'labels.text.fill',
						stylers: [{color: '#515c6d'}]
					},
					{
						featureType: 'water',
						elementType: 'labels.text.stroke',
						stylers: [{color: '#17263c'}]
					}
				]
			}
		}else if(this.today.getHours()>=7 || this.today.getHours()<=17){	
			options ={
				center: location,
				zoom: 16,
				streetViewControl: false,
				mapTypeId: 'roadmap',
				zoomControl: false,
				//disableDefaultUI: true
			}
		}
  	

  	const map =  new google.maps.Map(this.mapRef.nativeElement,options);
		const trafficLayer = new google.maps.TrafficLayer();
		trafficLayer.setMap(map);
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
  	this.busList$.subscribe(res=>{
      	res.forEach(data=>{
      			let latitude = data.latitud;
				let longitude = data.longitud;
	      		this.deleteMarkers();

			  	const location=  new google.maps.LatLng(latitude,longitude);
			  	this.addMarker(location,map);
     /*const marker = new google.maps.Marker({
			  		position: location,
			  		map: map,
						icon: 'assets/imgs/bus.png',
						draggable: true,
						animation: google.maps.Animation.DROP
						

			  	});*/

			      	});
      });

   this.paradatList$.subscribe(res=>{
      	res.forEach(data=>{
      			let latitude = data.latitud;
				let longitude = data.longitud;
			  	const location=  new google.maps.LatLng(latitude,longitude);
			  	  	var icon = {
	    url: "https://cdn4.iconfinder.com/data/icons/maps-and-navigation-solid-icons-vol-1/72/13-512.png", // url
	    scaledSize: new google.maps.Size(50, 50), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(0, 0) // anchor
				};
      		const marker = new google.maps.Marker({
			  		position: location,
			  		map: map,
						icon: icon,
						draggable: false,
						animation: google.maps.Animation.DROP
						

			  	});
      		  	const infoWindow = new google.maps.InfoWindow({
			  		content: '<h6>'+data.nombre+'</h6>'
			  	});

  	marker.addListener('click', function(){
  		infoWindow.open(map, marker);
  	});
      	});
      });
  	const infoWindow = new google.maps.InfoWindow({
			content: '<div><p style="color:blue; font-weight:bold">Tu estas aqui!</p></div>',
  	});

  	marker.addListener('click', function(){
			marker.setAnimation(google.maps.Animation.BOUNCE);
			infoWindow.open(map, marker);
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
			} else {
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}

		});
	}

	  addMarker(location, map) {
	    let marker = new google.maps.Marker({
			  		position: location,
			  		map: map,
						icon: 'assets/imgs/bus.png',
						draggable: true,
						animation: google.maps.Animation.DROP
						

			  	});
          		  	const infoWindow = new google.maps.InfoWindow({
			  		content: '<h6>BUS</h6> <a href="google.com">horario</a>'
			  	});
      		  	//falta desplegar la info del bus cuando se selecciona el bus
			  	marker.addListener('click', function(){
			  		infoWindow.open(map, marker);
			  	});
			    this.markers.push(marker);
  }
  
	setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }
	
	
  btnUbicacion(){
  	return new google.maps.Marker({
  		visible: false
  	});
}

}
