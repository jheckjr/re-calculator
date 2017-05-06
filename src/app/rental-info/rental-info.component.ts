import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental-info',
  templateUrl: './rental-info.component.html',
  styleUrls: ['./rental-info.component.css']
})
export class RentalInfoComponent implements OnInit {
  private unitOptions = [1, 2, 3, 4];
  constructor() { }

  ngOnInit() {
  }

}
