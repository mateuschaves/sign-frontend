import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
    ReactiveFormsModule
  ],
  templateUrl: './new-document-form.component.html',
  styleUrls: ['./new-document-form.component.css']
})
export class NewDocumentFormComponent implements OnInit {
  documentInfoGroup!: FormGroup;
  signerInfoGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

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
    console.log(this.documentInfoGroup.value);
    console.log(this.signerInfoGroup.value);
  }
}