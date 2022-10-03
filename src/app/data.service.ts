import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ITeam} from "./interfaces/ITeam";
import {IBox} from "./interfaces/IBox";
import {v4 as uuidv4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rowOne: IBox[] = [];
  private rowTwo: IBox[] = [];
  private rowThree: IBox[] = [];
  private turn: number = 1;             // helps determine what and whose turn it is (odd = teamOne and even = teamTwo)
  private currentTeam!: ITeam;          // the actual ITeam object of whoever's turn it is
  private setupDone: boolean = false;   // checks to see if team names hav been decided upon (if yes then show board component if not then show team-selection component)
  private teamOne: ITeam = {            // initialize the two different teams
    name: "",           // name of the team
    red: true,          // team color (red or blue) *Note: not implemented yet
    team: 'X',          // 'X' or 'O' team
    points: 0           // the team's current amount of points/wins they have
  };
  private teamTwo: ITeam = {
    name: "",
    red: false,
    team: 'O',
    points: 0
  };
  $teamOne: Subject<string> = new Subject<string>();
  $teamTwo: Subject<string> = new Subject<string>();
  $rowOne: Subject<IBox[]> = new Subject<IBox[]>();
  $rowTwo: Subject<IBox[]> = new Subject<IBox[]>();
  $rowThree: Subject<IBox[]> = new Subject<IBox[]>();
  $setupDone: Subject<boolean> = new Subject<boolean>();
  $currentTeam: Subject<ITeam> = new Subject<ITeam>();
  constructor() {
    this.reset();
    this.currentTeam = this.teamOne;      // start the game out with teamOne going first
  }

  reset(){                        // use this function to reset/clear the board when someone wins
    this.rowOne = [];
    this.rowTwo = [];
    this.rowThree = [];
    for(let i = 0; i < 3; i++){
      this.rowOne.push(           // push 3 IBox objects into rowOne array
        {
          id: uuidv4(),
          empty: true,
          team : "",
          row: 0,         // row, column fields here work like coordinates
          index: i        // index represents each column on the board (Starts at 0 goes to 2)
        }
      );
      this.rowTwo.push(         // push 3 IBox objects into rowTwo array
        {
          id: uuidv4(),
          empty: true,
          team : "",
          row: 1,
          index: i
        }
      );
      this.rowThree.push(       // push 3 IBox objects into rowThree array
        {
          id: uuidv4(),
          empty: true,
          team : "",
          row: 2,
          index: i
        }
      );
    }
    this.$rowOne.next(this.rowOne);       // since we're updating the row arrays, have to update them in our subscriptions as well
    this.$rowTwo.next(this.rowTwo);
    this.$rowThree.next(this.rowThree);
  }

  setTeams(teamOne: string, teamTwo: string){     // set the team names when we get them and update subscriptions about changes
    this.teamOne.name = teamOne;
    this.teamTwo.name = teamTwo;
    this.setupDone = true;
    this.$teamOne.next(this.teamOne.name);
    this.$teamTwo.next(this.teamTwo.name);
    this.$setupDone.next(this.setupDone);
  }

  // getter methods (need these since our variables are private and can only be accessed within this class)
  checkSetup(){
    return this.setupDone;
  }
  getTeamOne(){
    return this.teamOne;
  }
  getTeamTwo(){
    return this.teamTwo;
  }
  getCurrentTeam(){
    return this.currentTeam;
  }
  getRow(rowNumber: number){
    if(rowNumber === 0){
      return this.rowOne;
    }
    if(rowNumber === 1){
      return this.rowTwo;
    }
    if(rowNumber === 2){
      return this.rowThree;
    }
    return [];
  }
  getTurn(){
    return this.turn;
  }
  // end of getter methods

  increaseTurn(){
    this.turn += 1;
  }
  updateCurrentPlayer(){
    if(this.turn % 2 === 1){            // use '% 2' to help determine whose turn it is (odd or even)
      this.currentTeam = this.teamOne;
    }else{
      this.currentTeam = this.teamTwo;
    }
    this.$currentTeam.next(this.currentTeam);
  }
  updateBox(newBox: IBox){
    if(newBox.row === 0){                   // when a box is clicked on, update that box in the correct row array
      this.rowOne[newBox.index] = newBox;
      this.$rowOne.next(this.rowOne);
    }
    if(newBox.row === 1){
      this.rowTwo[newBox.index] = newBox;
      this.$rowTwo.next(this.rowTwo);
    }
    if(newBox.row === 2){
      this.rowThree[newBox.index] = newBox;
      this.$rowThree.next(this.rowThree);
    }
    this.checkColumns();           // these next 3 lines help check to see if a player has gotten 3 in a row or not
    this.checkRows();
    this.checkDiagonals();
  }
  checkColumns(){
    if(this.rowOne[0].team === this.rowTwo[0].team &&
      this.rowTwo[0].team === this.rowThree[0].team &&
      this.rowTwo[0].team !== ""){
      this.currentTeam.points++;
        this.reset();
        alert(this.currentTeam.name + " team wins!");
    }
    if(this.rowOne[1].team === this.rowTwo[1].team &&
      this.rowTwo[1].team === this.rowThree[1].team &&
      this.rowTwo[1].team !== ""){
        this.currentTeam.points++;
        this.reset();
        alert(this.currentTeam.name + " team wins!");
    }
    if(this.rowOne[2].team === this.rowTwo[2].team &&
      this.rowTwo[2].team === this.rowThree[2].team &&
      this.rowTwo[2].team !== ""){
        this.currentTeam.points++;
        this.reset();
        alert(this.currentTeam.name + " team wins!");
    }
  }
  checkRows(){
    if(this.rowOne[0].team === this.rowOne[1].team &&
      this.rowOne[1].team === this.rowOne[2].team &&
      this.rowOne[1].team !== ""){
        this.currentTeam.points++;
        this.reset();
        alert(this.currentTeam.name + " team wins!");
    }
    if(this.rowTwo[0].team === this.rowTwo[1].team &&
      this.rowTwo[1].team === this.rowTwo[2].team &&
      this.rowTwo[1].team !== ""){
        this.currentTeam.points++;
        this.reset();
        alert(this.currentTeam.name + " team wins!");
    }
    if(this.rowThree[0].team === this.rowThree[1].team &&
      this.rowThree[1].team === this.rowThree[2].team &&
      this.rowThree[1].team !== ""){
        this.currentTeam.points++;
        this.reset();
        alert(this.currentTeam.name + " team wins!");
    }
  }
  checkDiagonals(){
    if(this.rowOne[0].team === this.rowTwo[1].team &&
      this.rowTwo[1].team === this.rowThree[2].team &&
      this.rowTwo[1].team !== ""){
        this.currentTeam.points++;
        this.reset();
        alert(this.currentTeam.name + " team wins!");
    }
    if(this.rowOne[2].team === this.rowTwo[1].team &&
      this.rowTwo[1].team === this.rowThree[0].team &&
      this.rowTwo[1].team !== ""){
        this.currentTeam.points++;
        this.reset();
        alert(this.currentTeam.name + " team wins!");
    }
  }
}
