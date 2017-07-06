import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Results } from '../models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges, OnInit {
  @Input() results: Results;
  private MAX_YEARS = 31;
  private selectedYear: number;
  private propertyValue: number;
  private years = new Array(this.MAX_YEARS);
  private propertyValues = new Array(this.MAX_YEARS);
  private equityValues = new Array(this.MAX_YEARS);
  
  constructor() {
    this.createYears();
  }

  ngOnChanges() {
    if (!this.results) {
      this.results = null;
    }
  }
  
  ngOnInit() {
    this.calcTableValues();
  }
  
  private createYears() {
    for (let i = 0; i < this.MAX_YEARS; i ++) {
      this.years[i] = 'Year ' + i;
    }
  }
  
  private calcTableValues() {
    let tempValue = this.results.arv || this.results.purchasePrice;
    this.propertyValues[0] = tempValue;
    this.equityValues[0] = tempValue - (this.results.amortSchedule[0] || 0);
    
    for (let year = 1; year < this.MAX_YEARS; year++) {
      tempValue = tempValue * (1 + this.results.appreciationRate);
      this.propertyValues[year] = tempValue;
      this.equityValues[year] = tempValue - (this.results.amortSchedule[year] || 0);
    }
  }
}
