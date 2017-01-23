/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProblematicComponent } from './problematic.component';

describe('ProblematicComponent', () => {
  let component: ProblematicComponent;
  let fixture: ComponentFixture<ProblematicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblematicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
