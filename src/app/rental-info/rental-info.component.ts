import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RentalInfo } from '../models';
import { numberValidator, 
  nonPercentValidator, 
  percentValidator 
} from '../validators';

@Component({
  selector: 'app-rental-info',
  templateUrl: './rental-info.component.html',
  styleUrls: ['./rental-info.component.css']
})
export class RentalInfoComponent {
  @Input() rentalInfo: RentalInfo;
  @Output() isValid = new EventEmitter();
  private unitOptions = [1, 2, 3, 4];
  private unitNames = ['unit1', 'unit2', 'unit3', 'unit4'];
  private summaryInfo: any;
  private rentalInfoForm: FormGroup;
  
  private percentErrorMsg = 'Must be 0-100';

  constructor(private formBuilder: FormBuilder) {
    // Build form with validators
    this.rentalInfoForm = this.formBuilder.group({
      'numUnits': [undefined, Validators.required],
      'unit1': [undefined, nonPercentValidator],
      'unit2': undefined,
      'unit3': undefined,
      'unit4': undefined,
      'otherIncome': [undefined, nonPercentValidator],
      'vacancyRate': [undefined, percentValidator],
      'electric': [undefined, nonPercentValidator],
      'gas': [undefined, nonPercentValidator],
      'water': [undefined, nonPercentValidator],
      'sewer': [undefined, nonPercentValidator],
      'trash': [undefined, nonPercentValidator],
      'other': [undefined, nonPercentValidator],
      'repairs': [undefined, percentValidator],
      'propMgmt': [undefined, percentValidator],
      'propTax': [undefined, nonPercentValidator],
      'insurance': [undefined, nonPercentValidator],
      'revenue': [undefined, percentValidator],
      'expenses': [undefined, percentValidator],
      'appreciation': [undefined, percentValidator]
    });
    // Subscribe to form changes to determine validity
    this.rentalInfoForm.statusChanges.subscribe(() => {
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
    this.summaryInfo = {
      totalRent: '',
      totalUtilities: ''
    };
  }

  private update(keys) {
    // Set item to zero if input is empty by moving through layers of purchaseInfo
    // by key name
    keys.reduce((obj, key, idx, array) => {
      if (idx === array.length - 1) {
        if (!obj[key]) {
          obj[key] = 0;
        }
      } else {
        return obj[key];
      }
    }, this.rentalInfo);
    
    this.updateTotalRent();
    this.updateTotalUtilities();
  }
  
  private updateTotalRent() {
  	const unitRents = this.rentalInfo.rents.slice(0, this.rentalInfo.numUnits);
  	const rent = unitRents.reduce((total, unitRent) => 
  	  total + (unitRent || 0), 0);
  	const strRent = rent.toFixed(0);
  	this.summaryInfo.totalRent = '$' + Number(strRent).toLocaleString();
  }
  
  private updateTotalUtilities() {
    const totalUtilities = (this.rentalInfo.expenses.electric || 0) +
      (this.rentalInfo.expenses.gas || 0) +
      (this.rentalInfo.expenses.water || 0) +
      (this.rentalInfo.expenses.sewer || 0) +
      (this.rentalInfo.expenses.trash || 0) +
      (this.rentalInfo.expenses.other || 0);
    const strUtilities = totalUtilities.toFixed(0);
    this.summaryInfo.totalUtilities = '$' + Number(strUtilities).toLocaleString();
  }
  
  private hasError(controlName: string) {
    return this.rentalInfoForm.controls[controlName].invalid && 
      this.rentalInfoForm.controls[controlName].touched;
  }
}
