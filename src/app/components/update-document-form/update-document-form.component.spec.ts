import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocumentFormComponent } from './update-document-form.component';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('UpdateDocumentFormComponent', () => {
  let component: UpdateDocumentFormComponent;
  let fixture: ComponentFixture<UpdateDocumentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDocumentFormComponent, HttpClientModule],
      providers: [
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: { title: 'Test Title' } },
        { provide: MatBottomSheetRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
