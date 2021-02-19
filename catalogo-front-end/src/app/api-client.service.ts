import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getAllGenres() {

  }
}
