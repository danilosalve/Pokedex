import { debounceTime } from 'rxjs/operators';
import { PokedexService } from './../pokedex.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  values = 'Digite algo para começar...';
  debounce: Subject<string> = new Subject<string>();

  constructor(private pokeService: PokedexService) {}

  ngOnInit(): void {
    this.debounce.pipe(debounceTime(500)).subscribe( value => {
      if (value.length > 1) {
        this.values = 'buscando...';
        this.pokeService.getPokemon(value.toLowerCase()).subscribe(
          pokemon => {
            this.values = 'Habilidade(s): ';
            pokemon.abilities.map(ability => {
              this.values += ability.ability.name + ' | ';
            });
          },
          err => {
            this.values = `Pokemon ${value} não encontrado :(`;
            console.log(err);
          }
        );
      } else {
        this.values = 'Digite algo para começar...';
      }
    });
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  onKeyUp(value: string): void {
    this.debounce.next(value);
  }

  buscar(): void {

  }
}
