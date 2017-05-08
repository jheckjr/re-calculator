import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RentalInfo } from '../models';

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

  constructor(private formBuilder: FormBuilder) {
    // Build form with validators
    this.rentalInfoForm = this.formBuilder.group({
      'numUnits': [undefined, Validators.required],
      'unit1': [undefined, Validators.required],
      'unit2': [undefined, Validators.required],
      'unit3': [undefined, Validators.required],
      'unit4': [undefined, Validators.required],
      'otherIncome': [undefined, Validators.required],
      'vacancyRate': [undefined, Validators.required],
      'electric': [undefined, Validators.required],
      'gas': [undefined, Validators.required],
      'water': [undefined, Validators.required],
      'sewer': [undefined, Validators.required],
      'trash': [undefined, Validators.required],
      'other': [undefined, Validators.required],
      'repairs': [undefined, Validators.required],
      'propMgmt': [undefined, Validators.required],
      'propTax': [undefined, Validators.required],
      'insurance': [undefined, Validators.required],
      'revenue': [undefined, Validators.required],
      'expenses': [undefined, Validators.required],
      'appreciation': [undefined, Validators.required]
    });
    // Subscribe to form changes to determine validity
    this.rentalInfoForm.valueChanges.subscribe(() => {
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
}
