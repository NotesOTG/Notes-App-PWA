import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { SiteConfigurations } from 'src/app/core/configs/site-configurations';
import { PopupService } from 'src/app/core/services/offline/popup.service';
import { AuthenticationService } from 'src/app/core/services/online/authentication.service';
import { SocialLoginService } from 'src/app/core/services/online/social-login.service';
import { RegisterRequest } from 'src/app/shared/exchanges/requests/register-request';
import { BasicResponse } from 'src/app/shared/exchanges/responses/basic-reponse';
import { LoginResponse } from 'src/app/shared/exchanges/responses/impl/login-response';
import { RegisterResponse } from 'src/app/shared/exchanges/responses/impl/register-response';
import { SocialTypes } from 'src/app/shared/models/social-types';
import { Validation } from '../validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  /**
   * The form group for the notes form
   */
  public registerForm: FormGroup;

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
  private registerSub$: Subscription;
  private socialSub$: Subscription;

  constructor(
    fb: FormBuilder, 
    private auth: AuthenticationService, 
    private snack: MatSnackBar, 
    private router: Router,
    private socialLoginService: SocialLoginService,
    private pop: PopupService
    ) {
    this.registerForm = fb.group({
      "email": new FormControl('', {
        validators: [
          Validators.email,
          Validators.required
        ],
        asyncValidators: [
          this.isEmailTaken.bind(this)
        ]
      }
      ),
      "password": new FormControl('', [
        Validators.required,
        Validators.minLength(SiteConfigurations.PASSWORD_MIN_LENGTH),
        Validators.maxLength(SiteConfigurations.PASSWORD_MAX_LENGTH),
        Validation.specialCharacterValidator(),
        Validation.uppercaseValidator(),
        Validation.lowercaseValidator(),
        Validation.numberValidator()
      ]),
    });
  }

  /**
   * Destroy all subscriptions with optional chaining
   */
  ngOnDestroy(): void {
    this.socialSub$?.unsubscribe();
    this.registerSub$?.unsubscribe();
  }

  ngOnInit(): void { }

  /**
   * The form submission method
   */
  public onSubmit() {
    let email = this.email.value;
    let password = this.password.value;

    this.registerSub$ = this.auth.register(new RegisterRequest(email, password)).subscribe((response: RegisterResponse) => {
      if (response.success) {
        this.snack.open('Account was successfully created. Please login.', 'Dismiss');
        this.router.navigateByUrl('/login');
        return;
      }

      if (!response.success  && response.error) {
        this.appendErrors(response.error);
      }
    });
  }

  /**
   * The social type login method
   * @param socialTypes The social type we are using
   */
  //TDOD: Prompt to set password later
  public startSocialLogin(socialTypes: SocialTypes) {
    this.socialSub$ = this.socialLoginService.startLogin(socialTypes).subscribe((response: LoginResponse) => {      
      if (response.success) {
        this.snack.open('You have successfully signed in', 'Dismiss');
        this.router.navigateByUrl('/notes');
        return;
      }

      if (!response.success  && response.error) {
        this.registerForm.setErrors({loginError: 'Something went wrong, please try again'});
      }
    });
  }

  /**
   * This method is used to append errors to the form group
   * @param errorString The string containing all the errors
   */
    private appendErrors(errorString: string) : void {
    var errors: string[] = errorString.split(":");
    errors.forEach(element => {
      if (element.startsWith("Email") && element.endsWith("taken.")) {
        this.email.setErrors({taken: true});
      }
    });
  }

  /**
   * Toggles the password to be visible or not
   */
  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Let's the form check if the email is taken
   * @param control - auto passed on binding
   */
  public isEmailTaken(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return timer(500).pipe(
      distinctUntilChanged(),
      switchMap(_ => { 
        return this.auth.checkEmail(control.value).pipe(
          map((response: BasicResponse) => {
            return response.success ? null : {taken: true} ;
          })
        );
      })
    )
  }

  /**
   * Gets the password form group
   */
   get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  /**
   * Gets the email form group
  */
    get email(): AbstractControl {
    return this.registerForm.get('email');
  }

}
