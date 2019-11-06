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
  optionsMap: object[] = [];
  selectedValues: string[] = [];
  constructor() { }

  ngOnInit() {
    // Copying input data so that it doesnt get mutated while searching
    this.filteredData = [...this.data];
    // Creating the mapped object to store aliasName and checked value to true or false
    this.filteredData.map((datum) => {
      let tempObj = {};
      tempObj['aliasName'] = datum;
      tempObj['checked'] = false;
      this.optionsMap[datum] = tempObj;
    })
  }

  //The displayed values in chips format: Updating that array 
  updateSelectedValues() {
    this.selectedValues.length = 0;
    this.data.map((datum) => {
      if(this.optionsMap[datum]['checked']) {
        this.selectedValues.push(datum);
      }
    })
  }

  // Updating select all checkbox based on multiple conditions
  updateSelectAll() {
    let checkSelectAll = this.filteredData.map((datum) => this.optionsMap[datum]['checked']);
    console.log(checkSelectAll,checkSelectAll.indexOf(false));
    
    if(checkSelectAll.indexOf(false) === -1){
      $("#selectAllCb")[0].checked = true;
    } else {
      $("#selectAllCb")[0].checked = false;
    }
    this.updateSelectedValues()
  }

  // updating options display array while searching
  updateOptions(searchValue) {
    this.filteredData = [...this.data];
    this.filteredData = [...this.filteredData.filter((el) => {
      return el.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    })];
    this.updateSelectAll()
  }

  // function to trigger while seacrh value is being entered: for each keyup event
  startSearch() {
    let searchValue = $('#searchField')[0].innerHTML
    if (searchValue !== "") {
      this.updateOptions(searchValue);
    } else {
      this.filteredData = [...this.data];
      this.updateSelectAll()
    }
  }

  // Toggle between selectAll and unselectAll state
  selectAllToggle() {
    this.filteredData.map((datum) => {
      this.optionsMap[datum]['checked'] = $("#selectAllCb")[0].checked;
    })
    this.updateSelectedValues()
  }

  // function to trigger on toggle of each option
  toggleEach(option) {
    this.optionsMap[option]['checked'] = !this.optionsMap[option]['checked'];
    this.updateSelectAll()
  }

}
