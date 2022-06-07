import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListQuestionComponent } from './client-list-question.component';

describe('ClientListQuestionComponent', () => {
  let component: ClientListQuestionComponent;
  let fixture: ComponentFixture<ClientListQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
