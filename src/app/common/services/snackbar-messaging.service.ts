import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarMessagingService {
  constructor(private snackBar: MatSnackBar) {}

  displayError(error: any, duration: number = 10000, action?: string): void {
    this.snackBar.open(error.error || error, action, {
      announcementMessage: error.error,
      duration,
      panelClass: 'error-snackbar'
    });
  }

  displayErrorMessage(error: string, duration: number = 10000, action?: string): void {
    this.snackBar.open(error, action, {
      announcementMessage: error,
      duration,
      panelClass: 'error-snackbar'
    });
  }

  displayWarningMessage(error: string, duration: number = 4000, action?: string): void {
    this.snackBar.open(error, action, {
      announcementMessage: error,
      duration,
      panelClass: 'warning-snackbar'
    });
  }

  displaySuccess(message: string, duration: number = 4000, action?: string): void {
    this.snackBar.open(message, action, {
      announcementMessage: message,
      duration,
      panelClass: 'success-snackbar'
    });
  }

  displayMessage(message: string, duration: number = 4000, action?: string): void {
    this.snackBar.open(message, action, {
      announcementMessage: message,
      duration
    });
  }
}
