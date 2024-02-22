import { createStore, filterNil, select } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import {
  addEntities,
  getActiveId,
  hasEntity,
  selectActiveId,
  selectEntity,
  setActiveId,
  updateEntities,
  withActiveId,
  withEntities,
} from '@ngneat/elf-entities';
import { switchMap } from 'rxjs';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

export interface CellCountProps {
  id: number;
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
    persistState(this.store, {
      key: 'cellCount',
      storage: localStorageStrategy,
    });
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'cellCount' },
      withEntities<CellCountProps>({
        initialValue: [this.createBlankSample()],
      }),
      withActiveId(0)
    );

    return store;
  }

  get activeSimple$() {
    return this.store.pipe(selectActiveId());
  }

  get store$() {
    return this.store.pipe(select((state) => state));
  }

  get total$() {
    return this.store.pipe(
      selectActiveId(),
      switchMap((activeId) =>
        this.store.pipe(selectEntity(activeId, { pluck: 'total' }), filterNil())
      )
    );
  }

  nextSample() {
    const currentSampleId = this.store.query(getActiveId);
    const newSampleId = currentSampleId + 1;

    if (!this.store.query(hasEntity(newSampleId))) {
      this.store.update(addEntities(this.createBlankSample(newSampleId)));
    }

    this.store.update(setActiveId(newSampleId));
  }

  previousSample() {
    const currentSampleId = this.store.query(getActiveId);
    const newSampleId = Math.max(currentSampleId - 1, 0);

    this.store.update(setActiveId(newSampleId));
  }

  selectCellValues$(cellName: keyof CellCountProps) {
    return this.store.pipe(
      selectActiveId(),
      switchMap((activeId) =>
        this.store.pipe(
          selectEntity(activeId, { pluck: cellName }),
          filterNil()
        )
      )
    );
  }

  increaseCellCount(cellName: keyof CellCountProps) {
    this.store.update(
      updateEntities(this.store.query(getActiveId), (sample) => {
        sample[cellName] = sample[cellName] + 1;
        sample.total = sample.total + 1;
        return sample;
      })
    );
  }

  decreaseCellCount(cellName: keyof CellCountProps) {
    this.store.update(
      updateEntities(this.store.query(getActiveId), (sample) => {
        sample[cellName] = Math.max(sample[cellName] - 1, 0);
        sample.total = this.summSampleCells(sample);
        return sample;
      })
    );
  }

  summSampleCells(sample: CellCountProps) {
    return Object.keys(sample).reduce((acc, cell) => {
      if (
        cell !== 'id' &&
        cell !== 'total' &&
        typeof sample[cell as keyof CellCountProps] === 'number'
      ) {
        return acc + sample[cell as keyof CellCountProps];
      }
      return acc;
    }, 0);
  }

  resetStore() {
    this.store.update(
      updateEntities(this.store.query(getActiveId), (sample) =>
        this.createBlankSample(sample.id)
      )
    );
  }

  createBlankSample(id: number = 0) {
    return {
      id,
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
    };
  }
}
