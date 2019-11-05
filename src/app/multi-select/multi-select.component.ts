import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() data: string[];
  filteredData: string[] = [];
  hideMenu: boolean = false
  optionsMap: object = {};
  constructor() { }

  ngOnInit() {
    this.filteredData = [...this.data];
    this.filteredData.map((datum) => {
      this.optionsMap[datum] = false;
    })
  }

  updateSelectAll() {
    let checkSelectAll = this.filteredData.map((datum) => {
      return this.optionsMap[datum];
    })
    if(checkSelectAll.indexOf(false) !== -1){
      $("#selectAllCb")[0].checked = false
    } else {
      $("#selectAllCb")[0].checked = true;
    }
  }

  updateOptions(searchValue) {
    this.filteredData = [...this.data];
    this.filteredData = [...this.filteredData.filter((el) => {
      return el.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    })];
    this.updateSelectAll()
  }

  openDropdown() {
    let searchValue = $('#searchField')[0].innerHTML
    if (searchValue !== "") {
      this.updateOptions(searchValue);
    } else {
      this.filteredData = [...this.data];
      this.updateSelectAll()
    }
  }

  selectAllToggle() {
    this.filteredData.map((datum) => {
      this.optionsMap[datum] = $("#selectAllCb")[0].checked;
    })
  }

  toggleEach(option) {
    this.optionsMap[option] = !this.optionsMap[option];
    this.updateSelectAll()
  }

}
