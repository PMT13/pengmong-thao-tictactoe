import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.css']
})
export class TeamSelectionComponent implements OnInit,OnDestroy {

  subOne: Subscription;
  subTwo: Subscription;
  teamOne: string = "";
  teamTwo: string = "";
  games: number = 1;
  constructor(private data: DataService) {
    this.subOne = this.data.$teamOne.subscribe((name) => {
      this.teamOne = name;
    });
    this.subTwo = this.data.$teamTwo.subscribe((name) => {
      this.teamTwo = name;
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.subOne.unsubscribe();
    this.subTwo.unsubscribe();
  }

  setTeams(){
    this.data.setTeams(this.teamOne,this.teamTwo);
  }
}
