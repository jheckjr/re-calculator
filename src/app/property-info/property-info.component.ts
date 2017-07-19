import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PropertyInfo, State } from '../models';
import { zipCodeValidator } from '../validators';

@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.css']
})
export class PropertyInfoComponent implements OnChanges {
  @Input() propertyInfo: PropertyInfo;
  @Output() isValid = new EventEmitter();
  private propertyInfoForm: FormGroup;
  private states = State;

  constructor(private formBuilder: FormBuilder) {
    // Build form with validators
    this.propertyInfoForm = this.formBuilder.group({
      'reportName': [undefined, [Validators.required, Validators.maxLength(255)]],
      'street': [undefined, Validators.maxLength(255)],
      'city': [undefined, Validators.maxLength(255)],
      'state': undefined,
      'zip': [undefined, zipCodeValidator],
      'description': [undefined, Validators.maxLength(3000)],
      'mls': [undefined, Validators.maxLength(32)],
      'notes': [undefined, Validators.maxLength(3000)],
      'imageName': undefined
    });
    // Subscribe to form changes to determine validity
    this.propertyInfoForm.statusChanges.subscribe(() => {
      if (this.propertyInfoForm.valid) {
        this.isValid.emit(true);
      } else {
        this.isValid.emit(false);
      }
    });
  }

  ngOnChanges() {
    if (!this.propertyInfo) {
      this.propertyInfo = {
        reportName: '',
        address: {
          street: '',
          city: '',
          state: null,
          zip: ''
        },
        salesDescription: '',
        mlsNumber: '',
        userNotes: '',
        imageName: null
      };
    }
  }
  
  private hasError(controlName: string) {
    return this.propertyInfoForm.controls[controlName].invalid && 
      this.propertyInfoForm.controls[controlName].touched;
  }
}
