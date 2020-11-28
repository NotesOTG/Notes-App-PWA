import { Component, OnInit } from '@angular/core';
import { Catergories } from 'src/app/shared/models/categories';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  public categories = [];

  constructor() {
    this.categories = Object.values(Catergories);
  }

  ngOnInit(): void {
  }

}
