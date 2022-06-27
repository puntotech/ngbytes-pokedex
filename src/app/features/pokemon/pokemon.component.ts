import { Component, OnInit } from '@angular/core';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';

import { FormComponent } from './components/form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { PokedexFirestoreService } from 'src/app/core/pokedex-firestore.service';
import { Pokemon } from './interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  allPokemon$: Observable<Pokemon[]>;
  selectedPokemon?: Pokemon;
  destroyed$ = new Subject<void>();

  constructor(
    private readonly pokedexService: PokedexFirestoreService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.allPokemon$ = this.pokedexService.getAll();
  }

  addPokemon() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {},
      width: '40%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((pokemon) => this.pokedexService.create(pokemon)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  updatePokemon() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: { ...this.selectedPokemon },
      width: '40%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((pokemon) => this.pokedexService.update(pokemon)),
        tap((pokemon) => this.selectPokemon(pokemon)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  selectPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  deletePokemon() {
    this.pokedexService.delete(this.selectedPokemon!.id);
    this.selectedPokemon = undefined;
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
