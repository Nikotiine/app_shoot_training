import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWeaponSetupViewComponent } from './user-weapon-setup-view.component';

describe('UserWeaponSetupViewComponent', () => {
  let component: UserWeaponSetupViewComponent;
  let fixture: ComponentFixture<UserWeaponSetupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWeaponSetupViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserWeaponSetupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
