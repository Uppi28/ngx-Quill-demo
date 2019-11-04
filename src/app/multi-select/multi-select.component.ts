import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() data: string[];
  hideMenu: boolean = false
  optionsMap: object = {};
  constructor() { }

  ngOnInit() {
    
    this.data.map((datum) => {
      this.optionsMap[datum] = false;
    })
    console.log(this.optionsMap);
    
  }

  selectAllToggle() {
    console.log("Here");
    this.data.map((datum) => {
      this.optionsMap[datum] = !this.optionsMap[datum];;
    })
  }

}
