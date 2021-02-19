import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {

  @Input() bandId: number = 1;
  @Input() bandName: string = "";
  @Input() bandImageLink: string = "";

  constructor(public router: Router) { }

  goToDetails() {
    this.router.navigateByUrl('/band-detail/' + this.bandId);
  }

  ngOnInit(): void {
  }

}
