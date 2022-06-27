import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() pokemon$: Observable<Pokemon[]>;
  @Output() pokemonEmitter = new EventEmitter<Pokemon>();

  constructor() {}

  ngOnInit(): void {}

  selectPokemon(pokemon: Pokemon) {
    this.pokemonEmitter.emit(pokemon);
  }
}
