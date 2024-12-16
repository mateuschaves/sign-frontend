import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../../services/document.service';
import { UpdateDocumentRequest } from '../../interfaces/documents';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Company } from '../../interfaces/entities';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-document-form',
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
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './update-document-form.component.html',
  styleUrl: './update-document-form.component.css'
})
export class UpdateDocumentFormComponent {
  documentInfoGroup!: FormGroup;
  signerInfoGroup!: FormGroup;
  companies: Company[] = [];
  documentId?: number;
  disabledInput = true;

  loading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _documentService: DocumentService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<UpdateDocumentFormComponent>
  ) {
    this.documentId = data.documentId;
  }

  createSigner(): FormGroup {
    return this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }


  public getDocument(id: number) {
    this._documentService.getDocument(id)
      .subscribe((document) => {
      this.documentInfoGroup.patchValue({
        title: document.name,
      });
      this.signerInfoGroup.setControl('signers', this._formBuilder.array(document.signers.map((signer) => this._formBuilder.group(signer))));
    });
  }

  public get signers() {
    return this.signerInfoGroup.get('signers') as FormArray;
  }
  addSigner(): void {
    this.signers.push(this.createSigner());
  }

  deleteSigner(signer: any): void {
    const signerId = signer?.value?.id;
    if (!signerId) return;

    this._documentService.deleteSigner(signerId)
      .subscribe({
        next: () => {
          this.signers.removeAt(this.signers.controls.indexOf(signer));
          this._snackBar.open('Assinante deletado com sucesso 🎉', 'Ok!', {
            duration: 4000,
          });
        },
        error: () => {
          this._snackBar.open('Erro ao deltar assinante 🥲', '', {
            duration: 4000,
          });
        },
        complete: () => {
          this._dialogRef.close();
        }
      });
  }

  updateDocument() {
    if (!this.documentId) return;

    this.loading = true;
    const documentData: UpdateDocumentRequest = {
      name: this.documentInfoGroup.value.title,
      id: this.documentId 
    };
    this._documentService.updateDocument(documentData)
    .subscribe({
      next: () => {
        this._snackBar.open('Documento atualizado com sucesso 🎉', 'Ok!', {
          duration: 4000,
        });
      },
      error: () => {
        this._snackBar.open('Erro ao criar documento 🥲', '', {
          duration: 4000,
        });
      },
      complete: () => {
        this.loading = false;
        this.signerInfoGroup.reset();
        this.documentInfoGroup.reset();
        this.signers.reset({ signers: [this.createSigner()] });
        this._dialogRef.close();
      }
    });
  }

  ngOnInit(): void {
    this.documentInfoGroup = this._formBuilder.group({
      title: ['', Validators.required],
    });
    this.signerInfoGroup = this._formBuilder.group({
      signers: this._formBuilder.array([]),
    });
    this._documentService.getCompanies()
      .subscribe((companies) => {
        this.companies = companies;
    });

    this.documentId && this.getDocument(this.documentId);
  }
}
