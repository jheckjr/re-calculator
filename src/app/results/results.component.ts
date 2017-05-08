import { Component, OnChanges, Input } from '@angular/core';
import { Results } from '../models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
  @Input() results: Results;

  constructor() { }

  ngOnChanges() {
    if (!this.results) {
      this.results = null;
    }
  }
}
