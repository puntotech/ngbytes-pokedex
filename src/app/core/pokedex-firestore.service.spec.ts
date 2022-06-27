import { TestBed } from '@angular/core/testing';

import { PokedexFirestoreService } from './pokedex-firestore.service';

describe('PokedexFirestoreService', () => {
  let service: PokedexFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
