import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryExportDrComponent } from './history-export-dr.component';

describe('HistoryExportDrComponent', () => {
  let component: HistoryExportDrComponent;
  let fixture: ComponentFixture<HistoryExportDrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryExportDrComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryExportDrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
