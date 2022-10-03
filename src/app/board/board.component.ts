import { Component, OnInit } from '@angular/core';
import {IBox} from "../interfaces/IBox";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  rowOne: IBox[] = this.data.getRow(0);      // board layout, split up into three rows
  rowTwo: IBox[] = this.data.getRow(1);
  rowThree: IBox[] = this.data.getRow(2);
  subOne: Subscription;
  subTwo: Subscription;
  subThree: Subscription;
  constructor(private data: DataService) {
    this.subOne = this.data.$rowOne.subscribe((row) => {
      this.rowOne = row;
    });
    this.subTwo = this.data.$rowTwo.subscribe((row) => {
      this.rowTwo = row;
    });
    this.subThree = this.data.$rowThree.subscribe((row) => {
      this.rowThree = row;
    });
  }

  ngOnInit(): void {}
}
