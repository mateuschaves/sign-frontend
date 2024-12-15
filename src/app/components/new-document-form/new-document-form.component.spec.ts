import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDocumentFormComponent } from './new-document-form.component';

describe('NewDocumentFormComponent', () => {
  let component: NewDocumentFormComponent;
  let fixture: ComponentFixture<NewDocumentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDocumentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
