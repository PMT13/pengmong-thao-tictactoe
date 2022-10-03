import {Component, Input, OnInit} from '@angular/core';
import {IBox} from "../interfaces/IBox";

@Component({
  selector: 'app-box-component',
  templateUrl: './box-component.component.html',
  styleUrls: ['./box-component.component.css']
})
export class BoxComponentComponent implements OnInit {

  @Input() box!: IBox;
  constructor() { }

  ngOnInit(): void {
  }

  clicked(position: string){
    alert(position);
  }

}
