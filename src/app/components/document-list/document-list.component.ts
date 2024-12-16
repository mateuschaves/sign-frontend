import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DocumentService } from '../../services/document.service';
import { ListDocumentsResponse } from '../../interfaces/documents';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateDocumentFormComponent } from '../update-document-form/update-document-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-document-list',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  documents: ListDocumentsResponse[] = [];

  constructor(
    private _documentService: DocumentService,
    private _matDialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
     private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.fetchDocuments();
  }

  areYouSure(documentId: number | undefined) {
    if (!documentId) return;

    const bottomSheetRef = this._bottomSheet.open(ConfirmDialogComponent, {
      data: {
        title: 'Tem certeza que deseja excluir este documento?'
      }
    })

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        this._documentService.deleteDocument(documentId)
          .subscribe({
            next: () => {
              this.fetchDocuments();
              this._snackBar.open('Documento excluído com sucesso 🎉', 'Ok!', {
                duration: 4000,
              });
            },
            error: (err) => {
              this._snackBar.open('Erro ao excluir documento 🥲', '', {
                duration: 4000,
              });
            }
          });
      }
    });
  }

  openDialog(documentId: number | undefined) {
    if (!documentId) return;
    
    const dialogRef = this._matDialog.open(UpdateDocumentFormComponent, {
      minWidth: '800px',
      minHeight: '350px',
      data: {
        documentId,
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchDocuments();
    });
  }

  fetchDocuments(): void {
    this._documentService.getDocuments()
      .subscribe((documents) => {
        this.documents = documents;
      });
  }
}
