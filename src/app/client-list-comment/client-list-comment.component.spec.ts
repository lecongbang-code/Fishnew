import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListCommentComponent } from './client-list-comment.component';

describe('ClientListCommentComponent', () => {
  let component: ClientListCommentComponent;
  let fixture: ComponentFixture<ClientListCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
