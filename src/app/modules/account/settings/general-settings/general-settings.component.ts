import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  public generalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.generalForm = fb.group({});
  }

  ngOnInit(): void {

  }

  onSubmit(): void {

  }

}
