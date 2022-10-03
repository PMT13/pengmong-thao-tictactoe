import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamSelectionComponent } from './team-selection/team-selection.component';
import {FormsModule} from "@angular/forms";
import { BoxComponentComponent } from './box-component/box-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TeamSelectionComponent,
    BoxComponentComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
