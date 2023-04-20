import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotBasicComponent } from './quot-basic.component';

describe('QuotBasicComponent', () => {
  let component: QuotBasicComponent;
  let fixture: ComponentFixture<QuotBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
