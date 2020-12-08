/// <reference types="googlemaps" />

import { Component, Input, OnInit } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input() inputAddress;

  API_KEY = '15b0f55ea5c54b159449393e829e0fa5';

  address;

  weatherToday;
  days = [];

  constructor(private geolocation: GeolocationService,
              private http: HttpClient) { }

  ngOnInit(): void {
    let today = new Date();

    for (let i = 0; i < 8; i++) {
      let nexDay = new Date();
      nexDay.setDate(today.getDate() + i);
      this.days.push(nexDay.toString().substring(0, 10));
    }

    console.log(this.days);

    this.geolocation.pipe(take(1))
    .subscribe(position => {
      this.getAddress(position.coords.latitude, position.coords.longitude);
      this.getWeather(position.coords.latitude, position.coords.longitude);
    });
  }

  getWeather(lat: number, lng: number) {
    return this.http.get(`
    https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${this.API_KEY}`)
    .subscribe(res => {
      console.log(res['daily']);
      this.weatherToday = res['daily'];
      for (let i = 0; i < this.weatherToday.length; i++) {
        let weather = this.weatherToday[i];
        weather.date = this.days[i];
      }
    });
  }

  getAddress(lat: number, lng: number) {
    let geocoder = new google.maps.Geocoder();
    let latLng = new google.maps.LatLng(lat, lng);

    // converting lat and lng coordinates into string address
    geocoder.geocode(
      { location: latLng },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === 'OK') {
          this.address = results[0].formatted_address;
          console.log(this.address);
        } else {
          console.log('Geocoding failed');
        }
      }
    );
  }

}
