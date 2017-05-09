import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PropertyInfo, State } from '../models';

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
      'reportName': [undefined, Validators.required],
      'street': undefined,
      'city': undefined,
      'state': undefined,
      'zip': undefined,
      'description': undefined,
      'mls': undefined,
      'notes': undefined,
      'imageName': undefined
    });
    // Subscribe to form changes to determine validity
    this.propertyInfoForm.valueChanges.subscribe(() => {
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
}
