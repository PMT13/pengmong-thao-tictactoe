import { Component, OnInit } from '@angular/core';
import {IBox} from "../interfaces/IBox";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  rowOne: IBox[] = [];
  rowTwo: IBox[] = [];
  rowThree: IBox[] = [];
  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 3; i++){
      this.rowOne.push(
        {
          id: uuidv4(),
          empty: true,
          team : ""
        }
      );
      this.rowTwo.push(
        {
          id: uuidv4(),
          empty: true,
          team : ""
        }
      );
      this.rowThree.push(
        {
          id: uuidv4(),
          empty: true,
          team : ""
        }
      );
    }
  }
}
