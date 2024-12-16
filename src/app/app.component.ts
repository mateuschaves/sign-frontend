import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewDocumentFormComponent } from "./components/new-document-form/new-document-form.component";
import { DocumentListComponent } from "./components/document-list/document-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NewDocumentFormComponent, DocumentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sign-frontend';

  @ViewChild(DocumentListComponent)
  documentList!: DocumentListComponent;

  onDocumentCreated() {
    this.documentList?.fetchDocuments();
  }
}