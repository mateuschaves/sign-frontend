import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerItemComponent } from './signer-item.component';

describe('SignerItemComponent', () => {
  let component: SignerItemComponent;
  let fixture: ComponentFixture<SignerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignerItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
