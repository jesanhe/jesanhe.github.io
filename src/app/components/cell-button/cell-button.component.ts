import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  CellCountRepository,
  CellCountProps,
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
  @Input() cellName?: keyof CellCountProps;
  @Input() invertCounter: boolean = false;

  @HostBinding('class.invert-counter') get invertCounterClass() {
    return this.invertCounter;
  }

  @HostListener('click')
  handleClick() {
    if (this.cellName) {
      if (!this.invertCounter) {
        this.cellCounRepo.increaseCellCount(this.cellName);
      } else {
        this.cellCounRepo.decreaseCellCount(this.cellName);
      }
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
