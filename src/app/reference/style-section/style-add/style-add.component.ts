import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { StyleFormService } from '../style-form.service';
import { StyleService } from '../style.service';

import { Style } from '../style.model';
import { baseStyleBreadcrumb } from '../base-style.breadcrumb';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';
import { styleAddBreadcrumb } from './style-add.breadcrumb';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';

@Component({
  selector: 'style-add',
  templateUrl: './style-add.component.html'
})
export class StyleAddComponent implements OnInit {
  style: Style;
  styleForm: FormGroup;
  saving: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private styleFormService: StyleFormService,
    private sms: SnackbarMessagingService,
    private router: Router,
    private styleService: StyleService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.styleForm = this.styleFormService.buildForm(new Style());
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseStyleBreadcrumb, styleAddBreadcrumb]);
  }

  onSave() {
    if (this.styleForm.valid) {
      const createdStyle = this.styleFormService.mergeForm(this.styleForm, new Style());
      this.saving = true;
      this.styleService
        .createStyle(createdStyle)
        .pipe(
          takeUntil(this.destroyed),
          finalize(() => (this.saving = false))
        )
        .subscribe(
          () => {
            this.sms.displaySuccess('Style created.');
            this.router.navigateByUrl('reference/styles/list');
          },
          error => this.sms.displayError(error)
        );
    } else {
      this.sms.displayErrorMessage('Unable to add styles since the form is invalid/incomplete.');
    }
  }
}
