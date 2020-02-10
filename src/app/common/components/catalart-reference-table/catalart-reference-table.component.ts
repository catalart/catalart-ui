import {
  Component,
  Input,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { ReferenceItem } from '../../models/reference-item.interface';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'catalart-reference-table',
  templateUrl: './catalart-reference-table.component.html',
  styleUrls: ['./catalart-reference-table.component.scss']
})
export class CatalartReferenceTableComponent implements OnInit, OnChanges {
  @Input() referenceItems: ReferenceItem[] = [];
  @Input() displayedColumns: string[] = ['name', 'label', 'action'];

  @Output() onAddClicked: EventEmitter<void> = new EventEmitter();
  @Output() onEditClicked: EventEmitter<number> = new EventEmitter();
  @Output() onDeleteClicked: EventEmitter<number> = new EventEmitter();

  dataSource: MatTableDataSource<ReferenceItem>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private cdf: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource(this.referenceItems);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.referenceItems) {
      this.dataSource = new MatTableDataSource(this.referenceItems);
      this.cdf.detectChanges();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
