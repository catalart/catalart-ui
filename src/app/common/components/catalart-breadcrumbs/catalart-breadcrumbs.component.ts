import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Breadcrumb } from '../../models/breadcrumb.model';

@Component({
  selector: 'catalart-breadcrumbs',
  templateUrl: 'catalart-breadcrumbs.component.html',
  styleUrls: ['./catalart-breadcrumbs.component.scss']
})
export class CatalartBreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbs.subscribe(breadcrumbs => (this.breadcrumbs = breadcrumbs));
  }

  get breadcrumbSet(): Breadcrumb[] {
    if (this.breadcrumbs.length > 1) {
      return this.breadcrumbs.slice(0, this.breadcrumbs.length - 1);
    }
    return [];
  }

  get lastBreadcrumb(): Breadcrumb {
    return this.breadcrumbs.length > 0 ? this.breadcrumbs[this.breadcrumbs.length - 1] : null;
  }
}
