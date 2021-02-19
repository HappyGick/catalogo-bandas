import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { CatalogDisplayComponent } from './catalog-display/catalog-display.component';
import { NewBandComponent } from './new-band/new-band.component';

const routes: Routes = [
  {path: "main-page", component: CatalogDisplayComponent},
  {path: "band-detail/:bandid", component: BandDetailComponent},
  {path: "new-band", component: NewBandComponent},
  {path: "", redirectTo: "/main-page", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
