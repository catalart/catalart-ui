import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog, PageEvent } from '@angular/material';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { StyleService } from '../style.service';
import { CatalartConfirmationDialogComponent } from 'src/app/common/components/catalart-confirmation-dialog/catalart-confirmation-dialog.component';
import { takeUntil, finalize } from 'rxjs/operators';
import { Query } from 'src/app/common/models/query.model';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';
import { baseStyleBreadcrumb } from '../base-style.breadcrumb';
import { Style } from '../style.model';

@Component({
  selector: 'style-list',
  templateUrl: './style-list.component.html',
  styleUrls: ['./style-list.component.scss']
})
export class StyleListComponent implements OnInit, OnDestroy {
  styles: Style[] = [];
  loading = false;
  totalResults = 100;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  query: Query;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private styleService: StyleService,
    private sms: SnackbarMessagingService,
    private dialog: MatDialog,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseStyleBreadcrumb]);
    this.setQueryOptions();
    this.getAllStyles();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onEditClicked(styleId: number) {
    this.router.navigateByUrl(`reference/styles/edit/${styleId}`);
  }

  addClicked() {
    this.router.navigateByUrl('reference/styles/add');
  }

  onDeleteClicked(styleId: number) {
    this.dialog
      .open(CatalartConfirmationDialogComponent, {
        width: '300px'
      })
      .afterClosed()
      .pipe(takeUntil(this.destroyed))
      .subscribe(wasConfirmed => {
        if (wasConfirmed) {
          this.deleteStyle(styleId);
        }
      });
  }

  private getAllStyles() {
    this.loading = true;
    this.styleService
      .getAllStyles()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        res => {
          this.styles = res.results;
          this.totalResults = res.totalNumberOfResults;
        },
        error => this.sms.displayError(error)
      );
  }

  private deleteStyle(StyleId: number) {
    this.styleService
      .deleteStyle(StyleId)
      .pipe(takeUntil(this.destroyed))
      .subscribe(
        () => {
          this.sms.displaySuccess('Style successfully deleted');
          this.getAllStyles();
        },
        error => this.sms.displayError(error)
      );
  }

  private setQueryOptions() {
    this.query = Query.fromPaginationParameters('', 1, 10);
  }
}
