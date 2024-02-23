import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSelectorComponent } from './sample-selector.component';

describe('SampleSelectorComponent', () => {
  let component: SampleSelectorComponent;
  let fixture: ComponentFixture<SampleSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SampleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
