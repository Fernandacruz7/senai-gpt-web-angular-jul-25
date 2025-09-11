import { ComponentFixture, TestBed } from '@angular/core/testing';

import {NewuserScreen} from './new-user-screen';

describe('NewUserScreen', () => {
  let component: NewuserScreen;
  let fixture: ComponentFixture<NewuserScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewuserScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewuserScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
