/// <reference types="googlemaps" />

import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  constructor(private geolocation: GeolocationService) {

  }

  ngOnInit() {
    // get user location and display it in google map
    this.geolocation.pipe(take(1))
    .subscribe(position => this.initMap(position.coords.latitude, position.coords.longitude));
  }

  /*getUserLocation(latitude, longitude) {
    this.latLng = {lat: latitude, lng: longitude};
    console.log(this.latLng);
  }*/

  initMap(latitude, longitude) {
    // create map
    let map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 15,
        center: {lat: latitude, lng: longitude}
      }
    );

    console.log('Map initialized');
    console.log({lat: latitude, lng: longitude});

    // create marker on map
    let marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map,
      title: 'My Location'
    });
  }

}
