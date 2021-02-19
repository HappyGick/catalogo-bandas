import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApiClientService } from '../api-client.service';
import { BandItem } from '../interfaces';

@Component({
  selector: 'app-catalog-display',
  templateUrl: './catalog-display.component.html',
  styleUrls: ['./catalog-display.component.css']
})
export class CatalogDisplayComponent implements OnInit, OnDestroy {

  bandList: BandItem[] = [];
  bandListObservable: Subscription = new Subscription;

  constructor(public router: Router, private apiclient: ApiClientService) { }

  ngOnInit(): void {
    this.bandListObservable = this.apiclient.getBandList().subscribe((data) => {
      if(data.body) {
        for(let i in data.body.band_list) {
          this.bandList.push({
            id: data.body.band_list[i].id,
            name: data.body.band_list[i].name,
            imglink: 'http://localhost:5000/catalog/get-image/' + data.body.band_list[i].imgid
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.bandListObservable.unsubscribe();
  }

  navigateToAddBand() {
    this.router.navigateByUrl('/new-band');
  }

}
