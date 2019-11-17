import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../common/services/breadcrumb.service';
import { baseBreadcrumb } from '../common/models/base.breadcrumb';
import { adminBaseBreadcrumb } from './models/admin-base.breadcrumb';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, adminBaseBreadcrumb]);
  }
}
