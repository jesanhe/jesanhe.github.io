import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';

export interface cellCountProps {
  heterofilo: number;
  plaqueta: number;
  leucocitozoon: number;
  linfocito: number;
  bas: number;
  plasmodium: number;
  monocito: number;
  eos: number;
  haemop: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class CellCountRepository {
  private store;

  constructor() {
    this.store = this.createStore();
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'cellCount' },
      withProps<cellCountProps>({
        heterofilo: 0,
        plaqueta: 0,
        leucocitozoon: 0,
        linfocito: 0,
        bas: 0,
        plasmodium: 0,
        monocito: 0,
        eos: 0,
        haemop: 0,
        total: 0,
      })
    );

    return store;
  }

  get store$() {
    return this.store.pipe(select((state) => state));
  }

  get total$() {
    return this.store.pipe(select((state) => state.total));
  }

  selectCellValues$(cellName: keyof cellCountProps) {
    return this.store.pipe(select((state) => state[cellName]));
  }

  increaseCellCount(cellName: keyof cellCountProps) {
    this.store.update(
      setProp(cellName, (count) => count + 1),
      setProp('total', (count) => count + 1)
    );
  }

  resetStore() {
    this.store.reset();
  }
}
