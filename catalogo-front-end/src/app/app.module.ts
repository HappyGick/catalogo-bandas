import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CatalogDisplayComponent } from './catalog-display/catalog-display.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { NewBandComponent } from './new-band/new-band.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CatalogDisplayComponent,
    CatalogItemComponent,
    BandDetailComponent,
    NewBandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
