import { Component } from '@angular/core';
import { CellCountRepository } from '../../state/cell-count.repository';

@Component({
  selector: 'app-summary-table',
  standalone: true,
  imports: [],
  templateUrl: './summary-table.component.html',
  styleUrl: './summary-table.component.scss'
})
export class SummaryTableComponent {

  constructor(private cellCountRepo: CellCountRepository) {}

}
