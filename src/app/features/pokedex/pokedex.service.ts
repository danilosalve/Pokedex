import { BaseService } from './../../core/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private baseHttp: BaseService) { }

  getPokemon(name: string) {
    return this.baseHttp.get(`pokemon/${name}/`);
  }

  getPokemonByidWithForm(id: number) {
    return this.baseHttp.get(`pokemon-form/${id.toString()}/`);
  }
}
