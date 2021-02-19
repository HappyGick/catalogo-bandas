import { Component, OnInit } from '@angular/core';
import { AddBandRequestTemplate } from '../interfaces';

@Component({
  selector: 'app-new-band',
  templateUrl: './new-band.component.html',
  styleUrls: ['./new-band.component.css']
})
export class NewBandComponent implements OnInit {

  genres_input_ids = 1;
  members_input_ids = 1;
  demos_input_ids = 1;
  ex_input_ids = 1;

  genres_inputs: string[] = ["input_genres_1"];
  members_inputs: string[] = ["input_members_1"];
  demos_inputs: string[] = ["input_demos_1"];
  ex_inputs: string[] = ["input_ex_1"];

  genres_list: string[] = [
    "a",
    "b",
    "c"
  ]

  bandRequest: AddBandRequestTemplate = {
    name: "",
    genres: [""],
    members: [""],
    active: "",
    samplevids: [""],
    exmembers: [""],
    imagedata: ""
  };

  constructor() { }

  ngOnInit(): void {
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

  makeAndSendJson() {
    console.log(this.bandRequest);
  }

}
