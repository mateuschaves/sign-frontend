import { Component, inject, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatListModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  public title: string;
  private _bottomSheetRef =
    inject<MatBottomSheetRef<ConfirmDialogComponent>>(MatBottomSheetRef);


  constructor(
  @Inject(MAT_BOTTOM_SHEET_DATA) public data: {title: string}) { 
    this.title = data.title;
  }

  closeDialog() {
    this._bottomSheetRef.dismiss();
  }

  confirm() {
    this._bottomSheetRef.dismiss(true);
  }
}
