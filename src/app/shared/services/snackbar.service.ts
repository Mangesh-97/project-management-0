import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private Snackbar: MatSnackBar
  ) { }


  openSnackbar(msg: string) {
    this.Snackbar.open(msg, 'Close', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
