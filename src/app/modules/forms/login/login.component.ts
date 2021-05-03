import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/online/authentication.service';
import { SocialLoginService } from 'src/app/core/services/online/social-login.service';
import { LoginRequest } from 'src/app/shared/exchanges/requests/login-request';
import { LoginResponse } from 'src/app/shared/exchanges/responses/impl/login-response';
import { SocialTypes } from 'src/app/shared/models/social-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

 /**
   * The form group for the notes form
   */
  public loginForm: FormGroup;

  /**
   * Keeps track if the password should be visible
   */
  public passwordVisible: boolean = false;

  /**
   * An Enum used for the html portion
   */
  public socialTypes = SocialTypes;

  /**
   * The subscriptions to keep track of, so we can cancel them
   */
  private socialSub$: Subscription;
  private loginSub$: Subscription;

  constructor(
    public fb: FormBuilder, 
    private auth: AuthenticationService, 
    private snack: MatSnackBar, 
    private router: Router,
    private socialLoginService: SocialLoginService
    ) {
    this.loginForm = fb.group({
      "email": new FormControl('', {
        validators: [
          Validators.required
        ]
      }
      ),
      "password": new FormControl('', [
        Validators.required,
      ]),
    });
  }

  /**
   * Destroy all subscriptions with optional chaining
   */
  ngOnDestroy(): void {
    this.socialSub$?.unsubscribe();
    this.loginSub$?.unsubscribe();
  }

  ngOnInit(): void {}

  /**
   * The form submission method
   */
  public onSubmit(): void {
    let email = this.email.value;
    let password = this.password.value;

    
    this.loginSub$ = this.auth.login(new LoginRequest(email, password)).subscribe((response: LoginResponse) => {
      this.handleLoginResponse(response);
    });
  }

  /**
   * The social type login method
   * @param socialTypes The social type we are using
   */
  public startSocialLogin(socialTypes: SocialTypes) {
    this.socialSub$ = this.socialLoginService.startLogin(socialTypes).subscribe((response: LoginResponse) => {
      this.handleLoginResponse(response);
    });
  }

  /**
   * Handles the login response from the subscriptions
   * @param response The response we are returning
   */
  //TDOD: Prompt to set password later
  private handleLoginResponse(response: LoginResponse): void {
    if (response.success) {
      this.snack.open('You have successfully signed in', 'Dismiss');
      this.router.navigateByUrl('/notes');
      return;
    }

    if (!response.success) {
      if (response.error) {
        return this.loginForm.setErrors({loginError: response.error});
      }

      return this.loginForm.setErrors({loginError: 'Something went wrong, please try again'});
    }
  }

  /**
   * Toggles the password to be visible or not
   */
  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Gets the password form group
   */
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  /**
   * Gets the email form group
  */
  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

}
