import { Component, Input, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiClientService } from '../api-client.service';
import { BandDetail, BandDetailResponse } from '../interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html',
  styleUrls: ['./band-detail.component.css']
})
export class BandDetailComponent implements OnInit, OnDestroy {

  detailsObservable: Subscription = new Subscription;

  bandData: BandDetail = {
    id: 0,
    name: "",
    genres: "",
    active: "",
    members: "",
    imglink: "",
    exmembers: ""
  };

  chosenSample: string = "";

  constructor(
    public router: Router, 
    private route: ActivatedRoute, 
    private apiclient: ApiClientService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.detailsObservable = this.apiclient.getBandDetail(data.bandid).subscribe((data) => {
        if(data.body) {
          let bandDetail: BandDetailResponse = data.body.bandDetail;
          this.bandData = {
            id : bandDetail.id,
            name : bandDetail.name,
            genres : bandDetail.genres.join(", "),
            active : bandDetail.active,
            members : bandDetail.members.join(", "),
            imglink : "http://localhost:5000/catalog/get-image/" + bandDetail.imgid,
            exmembers : bandDetail.exmembers.join(", ")
          }
          this.chosenSample = bandDetail.samplevids[this.getRandomInt(0, bandDetail.samplevids.length)];
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.detailsObservable.unsubscribe();
  }

  goBack() {
    this.router.navigateByUrl('/main-page');
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  getVideoLink() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.chosenSample);
  }

}
