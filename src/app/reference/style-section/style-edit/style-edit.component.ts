import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { StyleFormService } from '../style-form.service';

import { Style } from '../style.model';
import { StyleService } from '../style.service';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';
import { styleEditBreadcrumb } from './style-edit.breadcrumb';
import { baseStyleBreadcrumb } from '../base-style.breadcrumb';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';

@Component({
  selector: 'style-edit',
  templateUrl: './style-edit.component.html'
})
export class StyleEditComponent implements OnInit, OnDestroy {
  style: Style;
  styleForm: FormGroup;
  styleSaving: boolean;
  styleLoading: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private styleFormService: StyleFormService,
    private styleService: StyleService,
    private sms: SnackbarMessagingService,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseStyleBreadcrumb, styleEditBreadcrumb]);
    this.route.params.pipe(takeUntil(this.destroyed)).subscribe(params => {
      this.getStyle(params.id);
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private getStyle(id: number): void {
    this.styleLoading = true;
    this.styleService
      .getStyleById(id)
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.styleLoading = false))
      )
      .subscribe(
        (style: Style) => {
          this.style = style;
          this.styleForm = this.styleFormService.buildForm(this.style);
        },
        error => this.sms.displayError(error)
      );
  }

  onSave(): void {
    if (this.styleForm.valid) {
      const updatedStyle = this.styleFormService.mergeForm(this.styleForm, this.style);
      this.styleSaving = true;
      this.styleService
        .saveStyle(updatedStyle.id, updatedStyle)
        .pipe(
          takeUntil(this.destroyed),
          finalize(() => (this.styleSaving = false))
        )
        .subscribe(
          () => {
            this.sms.displaySuccess('Style saved.');
            this.router.navigateByUrl('reference/styles/list');
          },
          error => this.sms.displayError(error)
        );
    } else {
      this.sms.displayErrorMessage('Unable to save style since the form is invalid/incomplete.');
    }
  }
}
