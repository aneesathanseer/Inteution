import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuotBasicComponent } from '../quot-basic/quot-basic.component';
import { QuoteService } from '../quote.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import { Component } from '@angular/core';
import { MatChipEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-quot-equipmnt',
  templateUrl: './quot-equipmnt.component.html',
  styleUrls: ['./quot-equipmnt.component.scss']
})
export class QuotEquipmntComponent implements OnInit {

  @Input() form!: FormGroup
  results: any;
  resultsunit: any;
  resultallele: any;

  public emailList: string[] = [];
  removable = true;
  public separatorKeysCodes = [ENTER, COMMA];
  resultbof: any;
  resultportchrg: any;
  resultpodchrg: any;
  otherpolchrg: any;
  otherpodchrg: any;
  response: any;

  constructor(public quoteservice: QuoteService) { }

  ngOnInit(): void {
    this.GetCType();
    this.GetUnit();
    let vals = this.form.value["quotbasic"];

  }
  GetCType() {
    this.quoteservice.GetCType().subscribe((response) => {
      this.results = response.results;
    });
  }
  GetUnit() {
    this.quoteservice.GetUnit().subscribe((response) => {
      this.resultsunit = response.results;
    });
  }
  GetAllInElements() {
    this.quoteservice.GetAllInElements(this.form.value["quotbasic"]["Line"], this.form.value["quotbasic"]["TransitPOLID"], this.form.value["quotbasic"]["TransitPODID"], this.form.value["quotbasic"]["CargoType"], this.form.value["quotbasic"]["Stuffing"], this.form.value["quotbasic"]["DeStuffing"], this.form.get('quot-equipmnt')!.get('CtrType')?.value).subscribe((response) => {
      this.resultallele = response["allInElements"];
      console.log(response);
      console.log(this.form.value);
    });
  }

  // fruits: string[] = ['Lemon'];
  // remove(fruit: string): void {
  //   const index = this.fruits.indexOf(fruit);

  //   if (index >= 0) {
  //     this.fruits.splice(index, 1);
  //   }
  // }
  // removeEmail(data: any): void {
  //   console.log('Removing ' + data)
  //   if (this.emailList.indexOf(data) >= 0) {
  //     this.emailList.splice(this.emailList.indexOf(data), 1);
  //   }
  // }
  // add(event: any): void {
  //   console.log(event.value)
  //   if (event.value) {
  //     this.emailList.push(event.value);
  //   }
  //   if (event.input) {
  //     event.input.value = '';
  //   }
  // }
  toppingsControl = new FormControl([]);
  onToppingRemoved(topping: string) {
    const toppings = this.toppingsControl.value as string[];
    this.removeFirst(toppings, topping);
    this.toppingsControl.setValue(toppings); // To trigger change detection
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  GetFreight() {
    this.quoteservice.GetFreight(this.form.value["quotbasic"]["QuotID"], this.form.get('quot-equipmnt')!.get('CtrType')?.value).subscribe((response) => {
      this.resultbof = response["basicOceanFreightAndSurcharges"];
      this.resultportchrg = response["portCharges"]["polCharges"];
      this.resultpodchrg = response["portCharges"]["podCharges"];
      this.otherpolchrg = response["otherCharges"]["pol"];
      this.otherpodchrg = response["otherCharges"]["pod"];
      console.log(response);
      console.log(this.form.value);
    });
  }
  // getValues(event: { isUserInput: any; source: { value: any; selected: any }; }) {
  //   if (event.isUserInput) {
  //     if (event.source.selected === true) {
  //       console.log(event.source.value)
  //     } else {
  //       console.log(event.source.value)
  //     }
  //   }
  // }
  step2Submitted() {
    // this.form.get('quot-equipmnt')!.get('q')!.markAsUntouched();
    // this.form.get('quot-equipmnt')!.get('q')!.updateValueAndValidity();
    // this.form.get('quot-equipmnt')!.get('c')!.markAsUntouched();
    // this.form.get('quot-equipmnt')!.get('c')!.updateValueAndValidity();
    let allrate = 0;
    for (let line of this.resultbof) {
      allrate = allrate + line.qtrate;
    }
    var mainall = {} as all_in_elements;

    mainall.all_in_elements = this.resultallele?.map((item: { rate: any; currency: any; currencyCode: any; element: any; elementCode: any; id: any; }) => {
      var all = {} as allInElements;
      all.currency = item.currency;
      all.currencyCode = item.currencyCode;
      all.element = item.element;
      all.elementCode = item.elementCode;
      all.element_tariff = item.rate;
      all.is_additional = false;
      return all;
    });
    const obj = new QuotSave();
    obj.all_in_elements = mainall;
    obj.competitor = [];
    obj.equipment_type = this.form.get('quot-equipmnt')!.get('CtrType')?.value;
    obj.frequency_per_week = this.form.get('quot-equipmnt')!.get('Freq')?.value;
    obj.no_of_boxes = this.form.get('quot-equipmnt')!.get('NBox')?.value;
    obj.weight_per_box = this.form.get('quot-equipmnt')!.get('WBox')?.value;
    obj.quotation = this.form.value["quotbasic"]["QuotID"];
    obj.weight_unit = this.form.get('quot-equipmnt')!.get('Unit')?.value;
    obj.all_in_rate = allrate;

    this.quoteservice.QuotSecondSave(obj).subscribe((response) => {
      this.response = response;

    }, (error) => {                              //error() callback
      console.error(error)
      // this.errorMessage = error;
      // this.loading = false;
    });

  }

}
class allInElements {
  "element": Number;
  "elementCode": string;
  "currencyCode": string;
  "element_tariff": Number;
  "is_additional": boolean;
  "rate": Number;
  "currency": Number;
}
class all_in_elements {
  all_in_elements: allInElements[] = [];
}
class QuotSave {
  "quotation": Number;
  "equipment_type": Number;
  "no_of_boxes": Number;
  "frequency_per_week": Number;
  "weight_per_box": Number;
  "weight_unit": Number;
  "all_in_rate": Number;
  "competitor": [];
  "terms_and_conditions": "Terms and conditions for 20 DV";
  "all_in_elements": all_in_elements;
}