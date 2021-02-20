import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit, OnDestroy {

  @Input() bandId: number = 1;
  @Input() bandName: string = "";
  @Input() bandImageLink: string = "";

  deleteObservable: Subscription | undefined;

  constructor(public router: Router, private apiclient: ApiClientService) { }

  goToDetails() {
    this.router.navigateByUrl('/band-detail/' + this.bandId);
  }

  removeItem(id: number) {
    if(this.deleteObservable) this.deleteObservable.unsubscribe();
    this.deleteObservable = this.apiclient.removeBand(id).subscribe((data) => {
      if(!data.ok) {
        window.alert("Error al borrar. Revise los logs.");
        return;
      }
      window.location.reload();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.deleteObservable) this.deleteObservable.unsubscribe();
  }

}
