/// <reference types="googlemaps" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { WeatherComponent } from './weather/weather.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('maps', {static: true}) maps: GoogleMapsComponent;
  @ViewChild('weather', {static: true}) weather: WeatherComponent;

  address: string;
  addressHistory = [];

  constructor() {}

  ngOnInit() {

    this.addressHistory = JSON.parse(localStorage.getItem('addressHistory'));
    // console.log(this.addressHistory);
  }

  getLocationInput(city: HTMLInputElement, country: HTMLInputElement) {
    let cityName = city.value.charAt(0).toUpperCase() + city.value.slice(1);
    let countryName = country.value.charAt(0).toUpperCase() + country.value.slice(1);
    this.address = cityName + ', ' + countryName;

    // store user input
    this.storeSearchHistory(cityName, countryName);

    let lat, lng;

    // turning address string into lat and lng coordinates
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: this.address}, (results, status) => {
      if (status === 'OK') {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();

        // changing map position and getting new weather data
        this.maps.initMap(lat, lng);
        this.weather.getWeather(lat, lng);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  storeSearchHistory(city, country) {
    let addressHistory = [];
    addressHistory = JSON.parse(localStorage.getItem('addressHistory'));

    if (addressHistory !== null) {
      addressHistory.push({city: city, country: country});
      localStorage.setItem('addressHistory', JSON.stringify(addressHistory));
    } else {
      let history = [];
      history.push({city: city, country: country});
      localStorage.setItem('addressHistory', JSON.stringify(history));
    }

    this.addressHistory = JSON.parse(localStorage.getItem('addressHistory'));
    console.log(this.addressHistory);
  }
}
