import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { ArtworkFormService } from '../artwork-form.service';

import { Artwork } from '../artwork.model';

@Component({
  selector: 'artwork-add',
  templateUrl: './artwork-add.component.html'
})
export class ArtworkAddComponent implements OnInit, OnDestroy {
  artworkForm: FormGroup;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private artworkFormService: ArtworkFormService,
    private sms: SnackbarMessagingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.artworkForm = this.artworkFormService.buildForm(new Artwork());
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onSave() {
    this.sms.displayMessage('Save is not implemented yet');
    this.router.navigateByUrl('artwork/list');
  }
}
