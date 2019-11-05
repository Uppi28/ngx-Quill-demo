import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() data: string[];
  @Input() styles: {};
  @Input() allowAlias: boolean;
  filteredData: string[] = [];
  hideMenu: boolean = false
  optionsMap: object = {};
  selectAllChecked: boolean = false;
  selectedValues: string[] = [];
  constructor() { }

  ngOnInit() {
    this.filteredData = [...this.data];
    this.filteredData.map((datum) => {
      this.optionsMap[datum] = false;
    })
  }

  updateSelectedValues() {
    this.selectedValues.length = 0;
    this.data.map((datum) => {
      if(this.optionsMap[datum]) {
        this.selectedValues.push(datum);
      }
    })
  }

  updateSelectAll() {
    let checkSelectAll = this.filteredData.map((datum) => this.optionsMap[datum]);
    this.selectAllChecked = $("#selectAllCb")[0].checked
    if(checkSelectAll.indexOf(false) !== -1){
       this.selectAllChecked = false
    } else {
      this.selectAllChecked = true;
    }
    this.updateSelectedValues()
  }

  updateOptions(searchValue) {
    this.filteredData = [...this.data];
    this.filteredData = [...this.filteredData.filter((el) => {
      return el.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    })];
    this.updateSelectAll()
  }

  startSearch() {
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
    this.updateSelectedValues()
  }

  toggleEach(option) {
    this.optionsMap[option] = !this.optionsMap[option];
    this.updateSelectAll()
  }

}
