import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuotBasicComponent } from '../quot-basic/quot-basic.component';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-quot-main',
  templateUrl: './quot-main.component.html',
  styleUrls: ['./quot-main.component.scss']
})
export class QuotMainComponent implements OnInit {

  createform!: FormGroup;
  currentStep: number | undefined;
  constructor() { }

  ngOnInit(): void {
    this.createform = new FormGroup({
      'quotbasic': new FormGroup({
        'QuoteRef': new FormControl(null, Validators.required),
        'POL': new FormControl(null, Validators.required),
        'POD': new FormControl(null, Validators.required),
        'Party': new FormControl(null, Validators.required),
        'ValidFrom': new FormControl(null, Validators.required),
        'ValidTill': new FormControl(null, Validators.required),
        'Currency': new FormControl(null, Validators.required),
        'TransitPOL': new FormControl(null, Validators.required),
        'TransitPOD': new FormControl(null, Validators.required),
        'CargoType': new FormControl(null, Validators.required),
        'Stuffing': new FormControl(null, Validators.required),
        'DeStuffing': new FormControl(null, Validators.required),
        'Line': new FormControl(null, Validators.required),
        // 'portType': new FormControl(null, Validators.required),
        'CargoSubType': new FormControl(null, Validators.required),
        'TransitPOLID': new FormControl(null, Validators.required),
        'TransitPODID': new FormControl(null, Validators.required),
        'QuotID': new FormControl(null, Validators.required)
      }),
      'quot-equipmnt': new FormGroup({
        'CtrType': new FormControl(null, Validators.required),
        'NBox': new FormControl(null, Validators.required),
        'WBox': new FormControl(null, Validators.required),
        'Unit': new FormControl(null, Validators.required),
        'Freq': new FormControl(null, Validators.required),
        'QuoteRate': new FormControl(null, Validators.required),
        'te': new FormControl(null, Validators.required)
      })

    });
    // this.currentStep = 2;
  }

}
