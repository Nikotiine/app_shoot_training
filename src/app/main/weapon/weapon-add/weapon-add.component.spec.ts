import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponAddComponent } from './weapon-add.component';

describe('WeaponAddComponent', () => {
  let component: WeaponAddComponent;
  let fixture: ComponentFixture<WeaponAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeaponAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
