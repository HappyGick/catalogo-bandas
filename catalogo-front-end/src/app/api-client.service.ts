import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBandRequestTemplate } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private http: HttpClient) { }

  public getBandDetail(id: number) {
    return this.http.get<any>('http://localhost:5000/catalog/get-detail/' + id, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public getBandList() {
    return this.http.get<any>('http://localhost:5000/catalog/get-list', {
      observe: 'response',
      responseType: 'json'
    });
  }

  public getAllGenres() {
    return this.http.get<any>('http://localhost:5000/catalog/get-genre-list', {
      observe: 'response',
      responseType: 'json'
    });
  }

  public removeBand(id: number) {
    return this.http.get<any>('http://localhost:5000/catalog/remove-band/' + id, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public addBand(band: AddBandRequestTemplate) {
    return this.http.post<any>('http://localhost:5000/catalog/add-band', { bandInfo: band }, {
      observe: 'response',
      headers: {
        'Content-Type': "application/json"
      }
    });
  }
}
