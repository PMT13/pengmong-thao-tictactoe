import {Component, Input, OnInit} from '@angular/core';
import {IBox} from "../interfaces/IBox";
import {DataService} from "../data.service";

@Component({
  selector: 'app-box-component',
  templateUrl: './box-component.component.html',
  styleUrls: ['./box-component.component.css']
})
export class BoxComponentComponent implements OnInit {

  @Input() box!: IBox;
  value:string = "";
  constructor(private data: DataService) {
  }

  ngOnInit(): void {
  }

  clicked() {
    if (this.box.empty === true) {          // checks to see if an EMPTY spot was chosen (can't click on a spot with a 'X' or 'O' already
      let teamOneMark = this.data.getTeamOne().team;
      let teamTwoMark = this.data.getTeamTwo().team;
      if (this.data.getTurn() % 2 === 1) {  // check whose turn it is here, could also check by checking currentPlayer instead of what turn it is in data service
        this.box.team = teamOneMark;        // change box's team to the team that clicked on it
        this.box.empty = false;             // box is no longer empty
        this.value = teamOneMark;           // use this value to display onto the html page
      }
      if (this.data.getTurn() % 2 === 0) {
        this.box.team = teamTwoMark;
        this.box.empty = false;
        this.value = teamTwoMark;
      }
      this.data.updateBox(this.box);
      this.data.increaseTurn();             // increase turn count
      this.data.updateCurrentPlayer();      // update who the next move belongs to (next player)
    }else {
      alert("Pick a different spot!");      // if user clicked on a spot that is not empty
    }
  }
}
