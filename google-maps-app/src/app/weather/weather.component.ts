import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  header = new HttpHeaders({'Content-Type': 'application/json'});
  API_KEY = '15b0f55ea5c54b159449393e829e0fa5';

  constructor(private geolocation: GeolocationService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.geolocation.pipe(take(1))
    .subscribe(position => {
      this.getWeather(position.coords.latitude, position.coords.longitude)
      .subscribe(res => {
        console.log(res);
      });
    });
  }

  getWeather(lat: number, lng: number) {
    return this.http.get(`
    https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${this.API_KEY}`);
  }

}
