import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotMainComponent } from './quot-main.component';

describe('QuotMainComponent', () => {
  let component: QuotMainComponent;
  let fixture: ComponentFixture<QuotMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
