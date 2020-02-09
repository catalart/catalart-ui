import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ReferenceItem } from '../../models/reference-item.interface';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'catalart-reference-table',
  templateUrl: './catalart-reference-table.component.html'
})
export class CatalartReferenceTableComponent implements OnInit {
  @Input() referenceItems: ReferenceItem[] = [];
  @Input() displayedColumns: string[] = ['id', 'name', 'label'];
  dataSource: MatTableDataSource<ReferenceItem>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.referenceItems);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
