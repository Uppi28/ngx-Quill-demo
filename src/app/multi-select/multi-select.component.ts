import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() data: string[];
  hideMenu: boolean = false
  constructor() { }

  ngOnInit() {

  }

}
