import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CellButtonComponent } from './components/cell-button/cell-button.component';
import { CellCountRepository } from './state/cell-count.repository';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SampleSelectorComponent } from './components/sample-selector/sample-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    CellButtonComponent,
    FormsModule,
    SampleSelectorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'cell-count';
  total$!: Observable<number>;
  invertCounter = false;

  constructor(private cellCountRepo: CellCountRepository) {}

  ngOnInit() {
    this.total$ = this.cellCountRepo.total$;
  }

  resetStore() {
    this.cellCountRepo.resetStore();
  }

  log(cosa: any) {
    console.log({ cosa });
  }
}
