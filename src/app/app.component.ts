import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CellButtonComponent } from './components/cell-button/cell-button.component';
import { CellCountRepository } from './state/cell-count.repository';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CellButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'cell-count';
  total$!: Observable<number>;

  constructor(private cellCounRepo: CellCountRepository) {}

  ngOnInit() {
    this.total$ = this.cellCounRepo.total$;
  }

  resetStore() {
    this.cellCounRepo.resetStore()
  }
}
