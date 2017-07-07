import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RentalInfo } from '../models';
import { numberValidator } from '../validators';

@Component({
  selector: 'app-rental-info',
  templateUrl: './rental-info.component.html',
  styleUrls: ['./rental-info.component.css']
})
export class RentalInfoComponent implements OnChanges {
  @Input() rentalInfo: RentalInfo;
  @Output() isValid = new EventEmitter();
  private unitOptions = [1, 2, 3, 4];
  private unitNames = ['unit1', 'unit2', 'unit3', 'unit4'];
  private rentalInfoForm: FormGroup;
  private nonPercentValidator = [Validators.required,
    Validators.min(0),
    Validators.max(Number.MAX_SAFE_INTEGER),
    numberValidator];
  private percentValidator = [Validators.required,
    Validators.min(0),
    Validators.max(100),
    numberValidator];

  constructor(private formBuilder: FormBuilder) {
    // Build form with validators
    this.rentalInfoForm = this.formBuilder.group({
      'numUnits': [undefined, Validators.required],
      'unit1': [undefined, this.nonPercentValidator],
      'unit2': undefined,
      'unit3': undefined,
      'unit4': undefined,
      'otherIncome': [undefined, this.nonPercentValidator],
      'vacancyRate': [undefined, this.percentValidator],
      'electric': [undefined, this.nonPercentValidator],
      'gas': [undefined, this.nonPercentValidator],
      'water': [undefined, this.nonPercentValidator],
      'sewer': [undefined, this.nonPercentValidator],
      'trash': [undefined, this.nonPercentValidator],
      'other': [undefined, this.nonPercentValidator],
      'repairs': [undefined, this.percentValidator],
      'propMgmt': [undefined, this.percentValidator],
      'propTax': [undefined, this.nonPercentValidator],
      'insurance': [undefined, this.nonPercentValidator],
      'revenue': [undefined, this.percentValidator],
      'expenses': [undefined, this.percentValidator],
      'appreciation': [undefined, this.percentValidator]
    });
    // Subscribe to form changes to determine validity
    this.rentalInfoForm.valueChanges.subscribe(() => {
      for (let idx = this.rentalInfo.numUnits; 
        idx < this.rentalInfo.rents.length; idx++) {
      	this.rentalInfo.rents[idx] = 0;
      }
      
      if (this.rentalInfoForm.valid) {
        this.isValid.emit(true);
      } else {
        this.isValid.emit(false);
      }
    });
  }

  ngOnChanges() {
    if (!this.rentalInfo) {
      this.rentalInfo = {
        numUnits: 1,
        rents: [0, 0, 0, 0],
        otherIncome: 0,
        vacancyRate: 0,
        expenses: {
          electric: 0,
          gas: 0,
          water: 0,
          sewer: 0,
          trash: 0,
          other: 0,
          repairs: 0,
          propMgmt: 0,
          propTax: 0,
          insurance: 0
        },
        growth: {
          revenue: 0,
          expenses: 0,
          appreciation: 0
        }
      };
    }
  }
  
  private totalRent() {
  	const unitRents = this.rentalInfo.rents.slice(0, this.rentalInfo.numUnits);
  	const rent = unitRents.reduce((total, unitRent) => 
  	  total + (unitRent || 0), 0);
  	const strRent = rent.toFixed(0);
  	return '$' + Number(strRent).toLocaleString();
  }
}
