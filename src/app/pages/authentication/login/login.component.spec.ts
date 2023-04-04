import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { LoginService, NotificationService } from '@services';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { Subject, of } from 'rxjs';
import { LoginComponent } from './login.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => {
  const i = antDesignIcons[key];
  return i;
});

class RouterStub {
  navigate(params) { }
}

class ActivatedRouteStub implements Partial<ActivatedRoute> {
  private subject = new Subject();

  // params: Observable<any> = EMPTY;
  get params() {
    return this.subject.asObservable();
  }

  push(value) {
    this.subject.next(value);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let template: any;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        NzButtonModule,
        NzCardModule,
        NzNotificationModule,
        NzInputModule,
        NzIconModule,
        NzFormModule,
        BrowserAnimationsModule
      ],
      providers: [
        LoginService,
        NotificationService,
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: NZ_ICONS, useValue: icons },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // UI Testing
  it('should display user icon in Username field', (done) => {
    fixture.whenRenderingDone().then(() => {
      let usernameIcon = template.querySelector('[data-icon=user]');
      expect(usernameIcon).toBeTruthy();
      done();
    })
  })

  it('should display lock icon in Password field', (done) => {
    fixture.whenRenderingDone().then(() => {
      let lockIcon = template.querySelector('[data-icon=lock]');
      expect(lockIcon).toBeTruthy();
      done();
    })
  })

  it('should display login button in orange color', () => {
    let button = template.querySelector('.login-form-button');
    let bgColor = window.getComputedStyle(button).getPropertyValue('background-color');
    const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`
    expect(rgba2hex(bgColor)).toEqual('#ff9842');
  })

  // Form Submit Test
  it('should set username', () => {
    let email = component.validateForm.controls['email'];
    email.setValue('sample@example.com');
    expect(email.valid).toBeTruthy();
    expect(email.value).toBe('sample@example.com');
    expect(email.errors).toBeNull();
  })

  it('should set password', () => {
    let password = component.validateForm.controls['email'];
    password.setValue('sample@123');
    expect(password.valid).toBeTruthy();
    expect(password.value).toBe('sample@123');
    expect(password.errors).toBeNull();
  })

  it('should raise error message in username when field is empty', () => {
    let email = component.validateForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.errors['required']).toBeTruthy();
  })

  it('should raise error message in password when field is empty', () => {
    let email = component.validateForm.controls['password'];
    expect(email.valid).toBeFalsy();
    expect(email.errors['required']).toBeTruthy();
  })

  it('should submit form successfully', () => {
    let email = component.validateForm.controls['email'];
    let password = component.validateForm.controls['password'];

    email.setValue('sample@example.com');
    password.setValue('sample@123');
    let loginSpy = spyOn(component, 'fnLogin').and.stub();
    component.submitForm();

    expect(component.validateForm.valid).toBeTruthy();
    expect(loginSpy).toHaveBeenCalled();
  })

  it('should make form dirty & invalid', () => {
    let loginSpy = spyOn(component, 'fnLogin').and.stub();
    component.submitForm();

    expect(component.validateForm.valid).toBeFalsy();
    expect(loginSpy).not.toHaveBeenCalled();
    expect(component.validateForm.dirty).toBeTruthy();
  })

  // Login Function Test Case
  it('should open loader when submit', () => {
    const sampleData = { email: 'sample@example.com', password: 'sample@123' }
    const loginService: any = fixture.debugElement.injector.get(LoginService);
    spyOn(loginService, 'LogIn').withArgs(sampleData).and.returnValue(of({ result: true }).toPromise());
    component.fnLogin(sampleData);

    expect(component.btn_loader).toBeTrue();
  })

  it('should hide loader when submit successfully & navigate to ', (done) => {
    const sampleData = { email: 'sample@example.com', password: 'sample@123' }
    const loginService: any = fixture.debugElement.injector.get(LoginService);
    const router: any = fixture.debugElement.injector.get(Router);
    const loginResponse = {
      success: true,
      data: {
        id: 1,
        username: 'testuser',
        email: 'testuser@example.com',
        role: 'Admin',
        status: 'Active',
        access_token: 'testtoken',
        packageid: 1,
        packageid_dr: 1,
        isUserLogin: true
      }
    };
    let mockLogin = spyOn(loginService, 'LogIn').and.returnValue(Promise.resolve(loginResponse));
    let mockNavigate = spyOn(router, 'navigate');
    component.fnLogin(sampleData);

    expect(mockLogin).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(mockNavigate).toHaveBeenCalledWith(['/history-export']);
      expect(component.btn_loader).toBeFalse();
      done();
    })
  })

});
