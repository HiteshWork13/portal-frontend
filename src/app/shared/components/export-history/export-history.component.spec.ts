import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportHistoryComponent } from './export-history.component';

describe('ExportHistoryComponent', () => {
  let component: ExportHistoryComponent;
  let fixture: ComponentFixture<ExportHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportHistoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
