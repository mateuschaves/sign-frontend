import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../../services/document.service';
import { CreateDocumentRequest } from '../../interfaces/documents';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-new-document-form',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './new-document-form.component.html',
  styleUrls: ['./new-document-form.component.css']
})
export class NewDocumentFormComponent implements OnInit {
  documentInfoGroup!: FormGroup;
  signerInfoGroup!: FormGroup;

  loading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _documentService: DocumentService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.documentInfoGroup = this._formBuilder.group({
      title: ['', Validators.required],
      documentUrl: ['', Validators.required],
    });
    this.signerInfoGroup = this._formBuilder.group({
      signers: this._formBuilder.array([this.createSigner()]),
    });
  }

  createSigner(): FormGroup {
    return this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public get signers() {
    return this.signerInfoGroup.get('signers') as FormArray;
  }

  addSigner(): void {
    this.signers.push(this.createSigner());
  }

  deleteSigner(index: number): void {
    this.signers.removeAt(index);
  }

  onSubmit() {
    this.loading = true;
    const documentData: CreateDocumentRequest = {
      document: {
        name: this.documentInfoGroup.value.title,
        url: this.documentInfoGroup.value.documentUrl,
        company: 1
      },
      signers: this.signerInfoGroup.value.signers
    };
    this._documentService.createDocument(documentData)
      .subscribe((response) => {
      this._snackBar.open('Documento criado com sucesso 🎉', 'Ok!', {
        duration: 4000,
      });
    }, (error) => {
      this._snackBar.open('Erro ao criar documento 🥲', '');
    }).add(() => {
      this.loading = false;
    });
  }
}