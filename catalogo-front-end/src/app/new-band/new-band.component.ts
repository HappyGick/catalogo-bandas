import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiClientService } from '../api-client.service';
import { AddBandRequestTemplate } from '../interfaces';

@Component({
  selector: 'app-new-band',
  templateUrl: './new-band.component.html',
  styleUrls: ['./new-band.component.css']
})
export class NewBandComponent implements OnInit, OnDestroy {

  genresObservable: Subscription = new Subscription;
  sendObservable: Subscription | undefined;

  genres_input_ids = 1;
  members_input_ids = 1;
  demos_input_ids = 1;
  ex_input_ids = 1;

  genres_inputs: string[] = ["input_genres_1"];
  members_inputs: string[] = ["input_members_1"];
  demos_inputs: string[] = ["input_demos_1"];
  ex_inputs: string[] = ["input_ex_1"];

  genres_list: string[] = []

  loaded_image: boolean = false;

  bandRequest: AddBandRequestTemplate = {
    name: "",
    genres: [""],
    members: [""],
    active: "",
    samplevids: [""],
    exmembers: [""],
    imagedata: ""
  };

  constructor(public router: Router, private apiclient: ApiClientService) { }

  ngOnInit(): void {
    this.genresObservable = this.apiclient.getAllGenres().subscribe((data) => {
      if(data.body) {
        for(let i in data.body.genre_list) {
          this.genres_list.push(data.body.genre_list[i]);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.genresObservable.unsubscribe();
    if(this.sendObservable) this.sendObservable.unsubscribe();
  }

  goBack() {
    this.router.navigateByUrl('/main-page');
  }

  arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  openImageFile() {
    document.querySelector('input')?.click();
  }

  handle_image(e: any) {
    let filereader = new FileReader();
    filereader.onload = (e) => {
      this.bandRequest.imagedata = this.arrayBufferToBase64(filereader.result as ArrayBuffer);
      this.loaded_image = true;
    };
    filereader.readAsArrayBuffer(e.target.files[0]);
  }

  add_input_text(type: string) {
    switch(type) {
      case 'genres':
        this.genres_input_ids++;
        this.bandRequest.genres.push("");
        this.genres_inputs.push("input_genres_" + this.genres_input_ids);
        break;
      case 'members':
        this.members_input_ids++;
        this.bandRequest.members.push("");
        this.members_inputs.push("input_members_" + this.members_input_ids);
        break;
      case 'demos':
        this.demos_input_ids++;
        this.bandRequest.samplevids.push("");
        this.demos_inputs.push("input_demos_" + this.demos_input_ids);
        break;
      case 'ex':
        this.ex_input_ids++;
        this.bandRequest.exmembers.push("");
        this.ex_inputs.push("input_ex_" + this.ex_input_ids);
        break;
    }
  }

  remove_input_text(type: string, id: number) {
    switch(type) {
      case 'genres':
        this.bandRequest.genres.splice(id, 1);
        this.genres_inputs.splice(id,1);
        break;
      case 'members':
        this.bandRequest.members.splice(id,1);
        this.members_inputs.splice(id,1);
        break;
      case 'demos':
        this.bandRequest.samplevids.splice(id,1);
        this.demos_inputs.splice(id,1);
        break;
      case 'ex':
        this.bandRequest.exmembers.splice(id,1);
        this.ex_inputs.splice(id,1);
        break;
    }
  }

  makeAndSendJson() {
    if(this.sendObservable) this.sendObservable.unsubscribe;
    console.log(this.bandRequest);

    if(this.bandRequest.name === "") {
      alert("'Nombre' no puede estar vacío.");
      return;
    }

    if(this.bandRequest.active === "") {
      alert("'Años activa' no puede estar vacío");
    }

    for (let i of this.bandRequest.genres) {
      if(i === "") {
        alert("La sección de géneros debe estar llena");
      }
    }

    for (let i of this.bandRequest.exmembers) {
      if(i === "") {
        alert("La sección de exmiembros debe estar llena");
      }
    }

    for (let i of this.bandRequest.members) {
      if(i === "") {
        alert("La sección de miembros debe estar llena");
      }
    }

    for (let i of this.bandRequest.samplevids) {
      if(i === "") {
        alert("La sección de videos de demostración debe estar llena");
      }
    }

    this.sendObservable = this.apiclient.addBand(this.bandRequest).subscribe((data) => {
      if(!data.ok) {
        alert("Error al enviar los datos. Revise los logs.");
        return;
      }
      this.router.navigateByUrl('/main-page');
    });
  }

}
