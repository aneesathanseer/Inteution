import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotEquipmntComponent } from './quot-equipmnt.component';

describe('QuotEquipmntComponent', () => {
  let component: QuotEquipmntComponent;
  let fixture: ComponentFixture<QuotEquipmntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotEquipmntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotEquipmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
