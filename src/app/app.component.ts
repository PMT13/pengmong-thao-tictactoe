import { Component } from '@angular/core';
import {DataService} from "./data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tic-tac-toe';

  sub: Subscription;
  setupDone: boolean = this.data.checkSetup();
  constructor(private data: DataService) {
    this.sub = this.data.$setupDone.subscribe((done) => {
      this.setupDone = done;
    });
  }
}
