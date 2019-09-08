import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarMessagingService } from '../common/services/snackbar-messaging.service';

@Component({
  selector: 'complex-search',
  templateUrl: './complex-search.component.html',
  styleUrls: ['./complex-search.component.scss']
})
export class ComplexSearchComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private sms: SnackbarMessagingService) {
    this.searchForm = this.fb.group({
      searchTerm: ''
    });
  }

  search() {
    this.sms.displayMessage('Search has not been implemented yet');
  }
}
