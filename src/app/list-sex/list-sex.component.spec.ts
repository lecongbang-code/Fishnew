import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSexComponent } from './list-sex.component';

describe('ListSexComponent', () => {
  let component: ListSexComponent;
  let fixture: ComponentFixture<ListSexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
