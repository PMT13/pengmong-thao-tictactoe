import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ITeam} from "./interfaces/ITeam";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  board: string[] = [];
  teamOne: ITeam = {
    name: "",
    red: true,
    team: 'X'
  };
  teamTwo: ITeam = {
    name: "",
    red: false,
    team: 'O'
  };
  $teamOne: Subject<string> = new Subject<string>();
  $teamTwo: Subject<string> = new Subject<string>();
  constructor() { }

  setTeams(teamOne: string, teamTwo: string){
    this.teamOne.name = teamOne;
    this.teamTwo.name = teamTwo;
    this.$teamOne.next(this.teamOne.name);
    this.$teamTwo.next(this.teamTwo.name);
  }
}
