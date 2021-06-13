import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { SiteConfigurations } from 'src/app/core/configs/site-configurations';
import { AuthenticationService } from 'src/app/core/services/online/authentication.service';
import { Validation } from 'src/app/modules/forms/validation';
import { BasicResponse } from 'src/app/shared/exchanges/responses/basic-reponse';
import { ButtonType } from 'src/app/shared/models/button-types';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.scss']
})
export class PasswordSettingsComponent implements OnInit {

  public passwordForm: FormGroup;

  /**
   * Keeps track if the passwords should be visible
   */
  public passwordVisible: boolean[] = [false, false];

  public hasPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router
    ) {
    this.passwordForm = fb.group({
      "currentPassword": new FormControl('', [
        Validators.required
      ]),
      "newPassword": new FormControl('', {
        validators: [
        Validators.minLength(SiteConfigurations.PASSWORD_MIN_LENGTH),
        Validators.maxLength(SiteConfigurations.PASSWORD_MAX_LENGTH),
        Validation.uppercaseValidator(),
        Validation.lowercaseValidator(),
        Validation.numberValidator(),
        Validators.required,
        Validation.specialCharacterValidator(),
      ], asyncValidators: [
        this.samePasswordValidation.bind(this),
      ]})
    });
    this.hasPassword = this.authService.UserHandler.getUser().hasPassword;
  }

  ngOnInit(): void {
    if (!this.hasPassword) {
      this.currentPassword.clearValidators();
    }
  }

  onSubmit() {
    if (this.passwordForm.invalid && this.passwordForm.pristine) {
      return;
    }
    
    var newPassword = this.newPassword.value;
    var currentPassword = this.currentPassword.value;
    var email = this.authService.UserHandler.getUser().email;
    this.authService.changePassword(email, currentPassword, newPassword).subscribe((response: BasicResponse) =>{

      if (response.success) {
        this.snackbar.open('Password has been changed. Please login again', ButtonType.CLOSE);
        this.authService.logout();
      }

      if (response.error?.includes('Incorrect')) {
        this.currentPassword.setErrors({incorrect: true});
      }

      if (response.error?.includes('same')) {
        this.newPassword.setErrors({same: true});
      }

    })
  }

  private samePasswordValidation(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return timer(500).pipe(
      distinctUntilChanged(),
      map(_ => {
        var currentPassword: string = this.currentPassword.value;
        var newPassword: string = this.newPassword.value;
        return currentPassword != newPassword ? null : {same: true};
      })
    );
  }

  /**
   * Toggles the password to be visible or not
   */
  togglePassword(index: number): void {
   this.passwordVisible[index] = !this.passwordVisible[index];
  }

  public get newPassword(): AbstractControl {
    return this.passwordForm.get('newPassword');
  }

  public get currentPassword(): AbstractControl {
    return this.passwordForm.get('currentPassword');
  }

}
