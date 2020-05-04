import { PokedexService } from './pokedex.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PoFieldModule } from '@po-ui/ng-components';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PoFieldModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent}
    ])
  ],
  providers: [ PokedexService ]
})
export class PokedexModule { }
