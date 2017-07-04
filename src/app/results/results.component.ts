import { Component, OnChanges, Input } from '@angular/core';
import { Results } from '../models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
  @Input() results: Results;
  private selectedYear: number;
  private propertyValue: number;
  private years: string[];
  
  constructor() {
    this.createYears();
  }

  ngOnChanges() {
    if (!this.results) {
      this.results = null;
    }
  }
  
  createYears() {
    let yearList = [];
    for (let i = 0; i <=30; i ++) {
      yearList.push('Year ' + i);
    }
    
    this.years = yearList;
  }
  
  private calcTotalEquity() {
    this.calcPropertyValue();
    return this.propertyValue - this.results.amortSchedule[this.selectedYear];
  }
  
  private calcPropertyValue() {
    this.propertyValue = this.results.arv || this.results.purchasePrice;
    for (let year = 1; year <= this.selectedYear; year++) {
      this.propertyValue = this.propertyValue * (1 + this.results.appreciationRate);
    }
  }
}
