import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  @ViewChild('f') myForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (!this.myForm.valid) {
      return;
    }

    const email = this.myForm.value.email;
    const password = this.myForm.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      this.isLoading = true;
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error => {
        console.log(error);
        this.error = 'An error occurred! ' + error.error.error.message;
        this.isLoading = false;
      });
    this.myForm.reset();
  }
}
