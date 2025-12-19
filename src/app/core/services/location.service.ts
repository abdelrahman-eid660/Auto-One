import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private countriesUrl = 'https://restcountries.com/v3.1/all';
  private citiesUrl = 'https://countriesnow.space/api/v0.1/countries/cities';
  constructor(private http : HttpClient) { }
  getCountries():Observable<any>{
    return this.http.get(this.countriesUrl)
  }
    getCities(country: string): Observable<any> {
    return this.http.post(this.citiesUrl, { country });
  }

}
