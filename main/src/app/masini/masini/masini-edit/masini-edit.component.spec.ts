import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasiniAddEditComponent } from './masini-edit.component';

describe('MasiniAddEditComponent', () => {
  let component: MasiniAddEditComponent;
  let fixture: ComponentFixture<MasiniAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasiniAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasiniAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
