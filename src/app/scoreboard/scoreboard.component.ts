import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {ITeam} from "../interfaces/ITeam";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit, OnDestroy {

  sub: Subscription;
  teamOne: ITeam = this.data.getTeamOne();
  teamTwo: ITeam = this.data.getTeamTwo();
  currentTeam: ITeam = this.data.getCurrentTeam();
  constructor(private data: DataService) {
    this.sub = this.data.$currentTeam.subscribe((team) => {
      this.currentTeam = team;
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
