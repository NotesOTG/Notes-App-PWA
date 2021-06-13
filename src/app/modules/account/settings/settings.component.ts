import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public accountSettingsType = AccountSettingsType;
  private currentSettingsType: AccountSettingsType;
  public subTitle: string;

  constructor() { }

  ngOnInit(): void {
    this.subTitle = AccountSettingsType.GENERAL.toString();
    this.currentSettingsType = AccountSettingsType.GENERAL;
  }

  public isCurrentSettings(accountSettingsType: AccountSettingsType): boolean {
    return accountSettingsType === this.currentSettingsType;
  }

  public changeSettings(accountSettingsType: AccountSettingsType): void {
    this.subTitle = accountSettingsType.toString();
    this.currentSettingsType = accountSettingsType;
  }

}

export enum AccountSettingsType {
  PASSWORD = "Password",
  GENERAL = "General",
  EMAIL = "Email"
}
