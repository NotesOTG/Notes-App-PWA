import { Component, OnInit } from '@angular/core';
import { MobileActionButtonsService } from 'src/app/core/services/offline/mobile-action-buttons.service';
import { ButtonType } from '../../models/button-types';

@Component({
  selector: 'app-mobile-action-buttons',
  templateUrl: './mobile-action-buttons.component.html',
  styleUrls: ['./mobile-action-buttons.component.scss']
})
export class MobileActionButtonsComponent implements OnInit {

  constructor(public maButtons: MobileActionButtonsService) { }

  ngOnInit(): void {
  }

  public sendSignal(success: boolean) {
    this.maButtons.buttonEmitter.next(success);
  }

}
