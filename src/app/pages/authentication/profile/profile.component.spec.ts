import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminService, DataService, NotificationService } from '@services';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        FormsModule,
        NzFormModule,
        ReactiveFormsModule,
        HttpClientModule,
        NzNotificationModule,
        BrowserAnimationsModule
      ],
      providers: [DataService, AdminService, NotificationService, NzNotificationService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verify that data is available', () => {
    expect(component.current_user_details).toBeDefined();
  })

  it('verify that form contain firstname', () => {
    let controls = Object.keys(component.profileForm.controls)
    expect(controls).toContain('firstname');
  })

  it('verify that form contain lastname', () => {
    let controls = Object.keys(component.profileForm.controls)
    expect(controls).toContain('lastname');
  })

  it('verify that form contain company', () => {
    let controls = Object.keys(component.profileForm.controls)
    expect(controls).toContain('company');
  })

  it('verify that form contain street', () => {
    let controls = Object.keys(component.profileForm.controls)
    expect(controls).toContain('street');
  })

  it('verify that form contain state', () => {
    let controls = Object.keys(component.profileForm.controls)
    expect(controls).toContain('state');
  })

  it('verify that form contain postcode', () => {
    let controls = Object.keys(component.profileForm.controls)
    expect(controls).toContain('postcode');
  })

  it('verify that form contain old_password', () => {
    let controls = Object.keys(component.profileForm.controls)
    expect(controls).toContain('old_password');
  })

  it('verify that form contain password', () => {
    let controls = Object.keys(component.profileForm.controls)
    expect(controls).toContain('password');
  })

  it('verify that form contain confirmPassword', () => {
    let controls = Object.keys(component.profileForm.controls)
    expect(controls).toContain('confirmPassword');
  })

  it('verify that form is submitted', () => {
    let adminserviceMock = fixture.debugElement.injector.get(AdminService);
    let updatePasswordResponse = {
      result: true,
      data: {
        firstname: 'John',
        lastname: 'deo',
        company: 'john_week',
        street: 102,
        state: 'gujarat',
        postcode: "123456",
        password: 'sample@123'
      }
    }
    let updateAdminSpy = spyOn(adminserviceMock, 'updateAdmin').and.returnValue(Promise.resolve(updatePasswordResponse));
    component.updateAccountDetails();
    expect(updateAdminSpy).toHaveBeenCalled();
    expect(component.saveChanges).toBeFalse();
  })

  xit('verify that form is not submitted and show error in notification', () => {
    let adminserviceMock = fixture.debugElement.injector.get(AdminService);
    let notificationMock = fixture.debugElement.injector.get(NotificationService);
    let updatePasswordError = { error: { statusCode: 403, message: 'mock error' } };
    spyOn(adminserviceMock, 'updateAdmin').and.returnValue(Promise.reject(updatePasswordError));
    spyOn(notificationMock, 'error');
    component.updateAccountDetails();
    // expect(adminserviceMock.updateAdmin).toHaveBeenCalled();
    expect(notificationMock.error).toHaveBeenCalled();
  })

});
