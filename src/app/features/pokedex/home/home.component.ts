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

  id: number;
  name = '';
  photo = '';
  items = [];
  types = [];

  constructor(private pokeService: PokedexService) {}

  ngOnInit(): void {
    this.debounce.pipe(debounceTime(500)).subscribe( value => {
      if (value.length > 1) {
        this.values = 'buscando...';
        this.name = '';
        this.items = [];
        this.types = [];
        this.photo = 'https://po-ui.io/assets/graphics/logo-po.png';
        this.pokeService.getPokemon(value.toLowerCase()).subscribe(
          pokemon => {
            this.id = pokemon.id;
            this.name = pokemon.name;
            this.values = 'Habilidade(s): ';
            this.photo = pokemon.sprites.front_default;

            pokemon.abilities.map(ability => {
              this.values += ability.ability.name + ' | ';
              this.items.push(ability.ability.name);
            });

            pokemon.types.map(type => {
              this.types.push(type.type.name);
            });

            console.log(pokemon.types);
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
