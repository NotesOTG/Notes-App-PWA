import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/core/services/online/authentication.service';
import { ServerUserService } from 'src/app/core/services/online/server-user.service';
import { BasicResponse } from 'src/app/shared/exchanges/responses/basic-reponse';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss']
})
export class EmailSettingsComponent implements OnInit, AfterViewInit {

  public emailForm: FormGroup;

  private editingEmail: boolean = false;

  public emailConfirmed: boolean = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private serverUser: ServerUserService,
    private snack: MatSnackBar
    ) {
    this.emailForm = fb.group({
      "email": new FormControl(auth.UserHandler.getUser().email, [
        Validators.required
      ])
    })
    this.emailControl.disable();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.checkEmailVerified();
  }

  onSubmit(): void {

  }

  public changeEdit() {
    return;
    this.emailControl.disabled ?
    this.emailControl.enable() :
    this.emailControl.disable();
  }

  public checkEmailVerified() : void {
    this.serverUser.verifiedEmail().subscribe((response: BasicResponse) => {
      this.emailConfirmed = response.success;
    });
  }

  public issueEmailVerification(): void {
    this.serverUser.resendVerificationEmail().subscribe((response: BasicResponse) => {
      if (response.success) {
        this.snack.open('Please check your email', 'close', {duration: 1000 * 5});
      } else {
        this.snack.open(response.error, 'close', {duration: 1000 * 5});
      }
    });
  }

  get emailControl() {
    return this.emailForm.get('email');
  }

}
