import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/online/authentication.service';
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

  public checkingEmail: boolean = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService
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
    this.checkingEmail = true;
    this.auth.verifiedEmail().subscribe((response: BasicResponse) => {
      this.emailConfirmed = response.success;
      this.checkingEmail = false;
    });
  }

  get emailControl() {
    return this.emailForm.get('email');
  }

}
