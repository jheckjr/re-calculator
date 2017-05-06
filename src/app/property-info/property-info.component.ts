import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormBuilder,
  FormControl,
  Validators } from '@angular/forms';
import { PropertyInfo } from '../models';

@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.css']
})
export class PropertyInfoComponent implements OnInit {
  private propertyInfoForm: FormGroup;
  private propertyInfo: PropertyInfo;

  constructor(private formBuilder: FormBuilder) {
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

    // TODO: Remove Temporary Stub
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

  ngOnInit() {
  }

}
