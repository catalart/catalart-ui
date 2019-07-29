import { Component, Input } from '@angular/core';

@Component({
  selector: 'catalart-confirmation-dialog',
  templateUrl: 'catalart-confirmation-dialog.component.html'
})
export class CatalartConfirmationDialogComponent {
  @Input() cancelText = 'No';
  @Input() confirmationText = 'Yes';
  @Input() message: string;
}
