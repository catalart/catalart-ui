import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarMessagingService } from '../common/services/snackbar-messaging.service';
import { BreadcrumbService } from '../common/services/breadcrumb.service';
import { baseBreadcrumb } from '../common/models/base.breadcrumb';

@Component({
  selector: 'complex-search',
  templateUrl: './complex-search.component.html',
  styleUrls: ['./complex-search.component.scss']
})
export class ComplexSearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sms: SnackbarMessagingService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ''
    });
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([]);
  }

  search() {
    this.sms.displayMessage('Search has not been implemented yet');
  }
}
