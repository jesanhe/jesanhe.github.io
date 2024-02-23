import { Component, OnInit } from '@angular/core';
import { CellCountRepository } from '../../state/cell-count.repository';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample-selector.component.html',
  styleUrl: './sample-selector.component.scss',
})
export class SampleSelectorComponent implements OnInit {
  currentSample$!: Observable<number>;

  constructor(private cellCounRepo: CellCountRepository) {}

  ngOnInit(): void {
    this.currentSample$ = this.cellCounRepo.activeSimple$.pipe(
      map((sample) => sample + 1)
    );
  }

  nextSample() {
    this.cellCounRepo.nextSample();
  }

  previousSample() {
    this.cellCounRepo.previousSample();
  }
}
