import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocumentFormComponent } from './update-document-form.component';

describe('UpdateDocumentFormComponent', () => {
  let component: UpdateDocumentFormComponent;
  let fixture: ComponentFixture<UpdateDocumentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDocumentFormComponent]
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
