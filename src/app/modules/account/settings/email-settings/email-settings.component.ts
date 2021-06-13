import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/online/authentication.service';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss']
})
export class EmailSettingsComponent implements OnInit {

  public emailForm: FormGroup;

  private editingEmail: boolean = false;

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

  onSubmit(): void {

  }

  public changeEdit() {
    this.emailControl.disabled ?
    this.emailControl.enable() :
    this.emailControl.disable();
    // if (this.emailControl.disabled) {
    //   this.emailControl.enable();
    // } else {
    //   this.emailControl.disable();
    // }
  }

  get emailControl() {
    return this.emailForm.get('email');
  }

}
