import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdInformationComponent } from './ad-information.component';

describe('AdInformationComponent', () => {
  let component: AdInformationComponent;
  let fixture: ComponentFixture<AdInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
