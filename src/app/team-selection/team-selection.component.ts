import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.css']
})
export class TeamSelectionComponent implements OnInit {

  sub: Subscription;
  teamOne: string = "";
  teamTwo: string = "";
  games: number = 1;
  constructor(private data: DataService) {
    this.sub = this.data.$teamOne.subscribe((name) => {
      this.teamOne = name;
    });
    this.sub = this.data.$teamTwo.subscribe((name) => {
      this.teamTwo = name;
    });
  }

  ngOnInit(): void {
  }

  setTeams(){
    this.data.setTeams(this.teamOne,this.teamTwo);
  }
}
