import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public accountSettingsType = AccountSettingsType;
  private currentSettingsType: AccountSettingsType;

  constructor() { }

  ngOnInit(): void {
    this.currentSettingsType = AccountSettingsType.GENERAL;
  }

  public isCurrentSettings(accountSettingsType: AccountSettingsType): boolean {
    return accountSettingsType === this.currentSettingsType;
  }

  public changeSettings(accountSettingsType: AccountSettingsType): void {
    this.currentSettingsType = accountSettingsType;
  }

}

export enum AccountSettingsType {
  PASSWORD,
  GENERAL
}
