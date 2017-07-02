import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Results, ResultsDisplay } from '../models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges, OnInit {
  @Input() results: Results;
  displayResults: any;

  constructor() { }

  ngOnChanges() {
    if (!this.results) {
      this.results = null;
    }
  }
  
  // Format the displayed results values
  ngOnInit() {
  	if (this.results) {
  	  this.displayResults = new ResultsDisplay(this.results);
  	} else {
  	  this.displayResults = new ResultsDisplay(undefined);
  	}
  }
}
