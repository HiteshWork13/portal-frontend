import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryExportComponent } from './history-export.component';

describe('HistoryExportComponent', () => {
  let component: HistoryExportComponent;
  let fixture: ComponentFixture<HistoryExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
