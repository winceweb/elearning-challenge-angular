/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddclientComponent } from './addclient.component';

describe('AddclientComponent', () => {
  let component: AddclientComponent;
  let fixture: ComponentFixture<AddclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
