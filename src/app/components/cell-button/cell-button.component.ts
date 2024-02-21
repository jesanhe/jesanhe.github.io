import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  CellCountRepository,
  cellCountProps,
} from '../../state/cell-count.repository';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cell-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell-button.component.html',
  styleUrl: './cell-button.component.scss',
})
export class CellButtonComponent implements OnInit {
  @Input() cellName?: keyof cellCountProps;

  @HostListener('click')
  handleClick() {
    if (this.cellName) {
      this.cellCounRepo.increaseCellCount(this.cellName);
    }
  }

  cellCount$!: Observable<number>;

  constructor(private cellCounRepo: CellCountRepository) {}

  ngOnInit() {
    if (this.cellName) {
      this.cellCount$ = this.cellCounRepo.selectCellValues$(this.cellName);
    }
  }
}
