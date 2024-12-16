import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DocumentService } from '../../services/document.service';
import { ListDocumentsResponse } from '../../interfaces/documents';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewDocumentFormComponent } from '../new-document-form/new-document-form.component';
import { UpdateDocumentFormComponent } from '../update-document-form/update-document-form.component';

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
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchDocuments();
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
