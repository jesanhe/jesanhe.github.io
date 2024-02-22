import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CellButtonComponent } from './components/cell-button/cell-button.component';
import { CellCountRepository } from './state/cell-count.repository';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CellButtonComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'cell-count';
  total$!: Observable<number>;
  currentSample$!: Observable<number>;
  invertCounter = false;

  constructor(private cellCounRepo: CellCountRepository) {}

  ngOnInit() {
    this.total$ = this.cellCounRepo.total$;
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

  resetStore() {
    this.cellCounRepo.resetStore();
  }

  log(cosa: any) {
    console.log({ cosa });
  }
}
