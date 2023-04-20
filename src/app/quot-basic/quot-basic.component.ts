import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuoteService } from '../quote.service';
import { Observable } from 'rxjs/internal/Observable';
import { OperatorFunction, iif, map, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap, filter, finalize } from 'rxjs/operators';
import { ModalDismissReasons, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataSource } from '@angular/cdk/collections';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-quot-basic',
  templateUrl: './quot-basic.component.html',
  styleUrls: ['./quot-basic.component.scss']
})
export class QuotBasicComponent implements OnInit {
  //modalService: any;
  closeResult: string | undefined;
  Student: any;
  searchTransitPOD: any;
  searchTransitPOL: any;
  response: any;




  constructor(public quoteservice: QuoteService, public modalService: NgbModal) {

  }

  @Input() form!: FormGroup;



  Currency = new FormControl();

  ngOnInit(): void {
    this.getQuoteRef();
    this.GetCargoType();
    this.GetStuff("ST");
    this.GetStuff("DT");

    this.searchTagCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredTags = [];
          this.isLoading = true;
        }),
        switchMap(value => this.quoteservice.getLine(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data['results'].length == 0) {
          this.errorMsg = data['error'];
          this.filteredTags = [];
        } else {
          this.errorMsg = "";
          this.filteredTags = data['results'];
        }
        console.log(this.filteredTags);
      });

    // Add our not found item to the noResults array
    this.noResults[0] = this.noResult;
    // set the inital value of searchResults to our empty array
    this.searchResults = this.defaultResults;
    this.searchResultport = this.defaultResults;
    // Setup a debounce time constant of 1/2 a second.
    const DEBOUNCE_TIME = 500;


    // get values from the service

    this.searchBox.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME),
      switchMap(changedValue => this.quoteservice.getPOL(changedValue)
      )
    ).subscribe(data => {
      if (data.length === 0) {
        if (this.clearedBox) {
          this.searchResults = data.results;
        } else {
          this.searchResults = this.noResults;
        }
      } else {
        this.searchResults = data.results;
      }
    }
    );

    this.searchPort.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME),
      switchMap(changedValue => this.quoteservice.getPort(changedValue)
      )
    ).subscribe(data => {
      if (data.length === 0) {
        if (this.clearedBox) {
          this.searchResultport = data.results;
        } else {
          this.searchResultport = this.noResults;
        }
      } else {
        this.searchResultport = data.results;
      }
    }
    );

    this.searchParty.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME),
      switchMap(changedValue => this.quoteservice.getParty(changedValue)
      )
    ).subscribe(data => {
      if (data.length === 0) {
        if (this.clearedBox) {
          this.searchResultport = data.results;
        } else {
          this.searchResultport = this.noResults;
        }
      } else {
        this.searchResultport = data.results;
      }
    }
    );

    this.Currency.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME),
      switchMap(changedValue => this.quoteservice.getCurrency(changedValue)
      ), tap(() => { this.searchResultport = [] })
    ).subscribe(data => {
      if (data.length === 0) {
        if (this.clearedBox) {
          this.searchResultport = data.results;
        } else {
          this.searchResultport = this.noResults;
        }
      } else {
        this.searchResultport = data.results;
      }
    }
    );



  }

  cargo: any;
  GetCargoType() {
    this.quoteservice.getCargoType().subscribe((response) => {
      this.cargo = response.results;
    });
  }

  step1Submitted() {
    this.form.get('quotbasic')!.get('QuoteRef')!.markAsUntouched();
    this.form.get('quotbasic')!.get('QuoteRef')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('Line')!.markAsUntouched();
    this.form.get('quotbasic')!.get('Line')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('POL')!.markAsUntouched();
    this.form.get('quotbasic')!.get('POL')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('POD')!.markAsUntouched();
    this.form.get('quotbasic')!.get('POD')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('Party')!.markAsUntouched();
    this.form.get('quotbasic')!.get('Party')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('ValidFrom')!.markAsUntouched();
    this.form.get('quotbasic')!.get('ValidFrom')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('ValidTill')!.markAsUntouched();
    this.form.get('quotbasic')!.get('ValidTill')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('Currency')!.markAsUntouched();
    this.form.get('quotbasic')!.get('Currency')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('TransitPOL')!.markAsUntouched();
    this.form.get('quotbasic')!.get('TransitPOL')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('TransitPOD')!.markAsUntouched();
    this.form.get('quotbasic')!.get('TransitPOD')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('CargoType')!.markAsUntouched();
    this.form.get('quotbasic')!.get('CargoType')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('Stuffing')!.markAsUntouched();
    this.form.get('quotbasic')!.get('Stuffing')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('DeStuffing')!.markAsUntouched();
    this.form.get('quotbasic')!.get('DeStuffing')!.updateValueAndValidity();
    // this.form.get('quotbasic')!.get('portType')!.markAsUntouched();
    // this.form.get('quotbasic')!.get('portType')!.updateValueAndValidity();
    this.form.get('quotbasic')!.get('CargoSubType')!.markAsUntouched();
    this.form.get('quotbasic')!.get('CargoSubType')!.updateValueAndValidity();
    // this.form.get('quotbasic')!.get('TransitPOLID')!.markAsUntouched();
    // this.form.get('quotbasic')!.get('TransitPOLID')!.updateValueAndValidity();
    console.log(this.form.value);
    this.quoteservice.QuotValidator(this.form.get('quotbasic')!.get('POL')?.value, this.podoffice, this.form.get('quotbasic')!.get('Party')?.value, this.form.get('quotbasic')!.get('CargoType')?.value, iif(() => this.form.get('quotbasic')!.get('CargoSubType')?.value == null, '', this.form.get('quotbasic')!.get('CargoSubType')?.value), this.form.get('quotbasic')!.get('Stuffing')?.value, this.form.get('quotbasic')!.get('DeStuffing')?.value, this.form.get('quotbasic')!.get('Line')?.value, this.ValidFrom, this.ValidTill).subscribe((response) => {
      console.log(response);
      const obj = new Quot();
      obj.cargo_sub_type = this.form.get('quotbasic')!.get('CargoSubType')?.value;
      obj.cargo_type = this.form.get('quotbasic')!.get('CargoType')?.value;
      obj.currency = this.form.get('quotbasic')!.get('Currency')!.value;
      obj.de_stuffing = this.form.get('quotbasic')!.get('DeStuffing')?.value;
      obj.line = this.form.get('quotbasic')!.get('Line')?.value;
      obj.party = this.form.get('quotbasic')!.get('Party')?.value;
      obj.pod = this.transitpod;
      obj.pod_office = this.podoffice;
      obj.pol = this.transitpol;
      obj.pol_office = this.form.get('quotbasic')!.get('POL')?.value;
      obj.ref_number = this.form.get('quotbasic')!.get('QuoteRef')!.value;
      obj.stuffing = this.form.get('quotbasic')!.get('Stuffing')?.value;
      obj.valid_from = this.ValidFrom;
      obj.valid_to = this.ValidTill;
      console.log(obj);

      this.quoteservice.QuotSave(obj).subscribe((response) => {
        this.response = response;
        this.form.get('quotbasic')!.get('QuotID')!.setValue(response.id);
      }, (error) => {                              //error() callback
        console.error(error)
        // this.errorMessage = error;
        // this.loading = false;
      });

    });

  }

  getQuoteRef() {
    var text = this.quoteservice.getQuoteRef().subscribe((response) => {
      this.form.get('quotbasic')!.get('QuoteRef')?.setValue(response.referenceNumber);
    });
  }
  minLengthTerm = 2;
  filteredTags: any;
  isLoading = false;
  selectedTag: any = "";
  errorMsg!: string;
  searchTagCtrl = new FormControl();
  searchBox = new FormControl();
  searchPort = new FormControl();
  searchParty = new FormControl();
  model: any;
  clearTags() {
    this.selectedTag = "";
    this.filteredTags = [];
  }
  displayWith(value: any) {
    return value?.code;
  }
  onSelected() {
    this.selectedTag = this.selectedTag;
    this.form.get('quotbasic')!.get('Line')!.setValue(this.selectedTag.id);
  }
  public ValidFrom = ""; ValidTill = "";
  onSelect(evt: any, FromTill: any) {
    // this.ValidFrom = evt.year + "-" + evt.month + "-" + evt.day;
    if (FromTill == "ValidFrom") {
      this.ValidFrom = evt.year + "-" + ('0' + evt.month).slice(-2)
        + "-" + ('0' + evt.day).slice(-2);
    }
    if (FromTill == "ValidTill") {
      this.ValidTill = evt.year + "-" + ('0' + evt.month).slice(-2)
        + "-" + ('0' + evt.day).slice(-2);
    }
    console.log(evt.year + "-" + ('0' + evt.month).slice(-2)
      + "-" + ('0' + evt.day).slice(-2));
    // console.log(this.ValidFrom);
  }

  public searchResults: any[] = [];
  public searchResultport: any[] = [];
  public defaultResults: any[] = [];
  public noResult: any = {
    id: 0,
    value: 'No names match criteria',
    disabled: true

  };
  public noResults: any[] = [];
  public clearedBox = true;
  public searchTerm = '';
  public port = '';
  public podoffice = ""; transitpod = ""; transitpol = "";
  itemSelected(event: any, type: string): void {
    //this._router.navigate(['/DetailPage'], { state: { selectedId: event.option.value } });
    if (type.toLowerCase() == 'port') {
      this.port = event.option.id
      //this.form.get('quotbasic')!.get('POD')!.setValue(event.option.id);
    }
    if (type.toLowerCase() == 'cur')
      this.form.get('quotbasic')!.get('Currency')!.setValue(event.option.id);
    if (type.toLowerCase() == 'pol')
      this.form.get('quotbasic')!.get('POL')!.setValue(event.option.id);
    if (type.toLowerCase() == 'party')
      this.form.get('quotbasic')!.get('Party')!.setValue(event.option.id);
    if (type.toLowerCase() == 'transitpod') {
      this.transitpod = event.option.id;
      this.form.get('quotbasic')!.get('TransitPODID')!.setValue(event.option.id);
    }
    if (type.toLowerCase() == 'transitpol') {
      this.transitpol = event.option.id;
      this.form.get('quotbasic')!.get('TransitPOLID')!.setValue(event.option.id);
    }
    var d = event.option.value;


  }

  open(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason: any) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }



  /**
  
   * Write code on Method
  
   *
  
   * @return response()
  
   */

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  roles: { officeId: string, officeCode: string, officeName: string }[] = [

  ];

  get printroles() { return JSON.stringify(this.Student) };
  columnsArr: any[] = [];
  public getPODAgent() {
    this.quoteservice.getPODAgent(this.port).subscribe((response: any[0]) => {
      // this.roles.push(response[0].officeId, response[0].officeCode, response[0].officeName);
      this.Student = response;
      // for (var key in response[0]) {
      //   if (response[0].hasOwnProperty(key)) {
      //     this.columnsArr.push(key);
      //   }
      // }
    });
  }

  getdetail(user: any) {
    var pod = user;
    this.podoffice = pod.officeId;
    this.form.get('quotbasic')!.get('POD')?.setValue(pod.officeName);
  }
  test(_CountryName: any, type: any) {
    this.quoteservice.getPort(_CountryName.target.value).subscribe(data => {
      if (data.length === 0) {
        if (this.clearedBox) {
          if (type == "POD")
            this.searchTransitPOD = data.results;
          else if (type == "POL")
            this.searchTransitPOL = data.results;
        } else {
          if (type == "POD")
            this.searchTransitPOD = this.noResults;
          else if (type == "POL")
            this.searchTransitPOL = this.noResults;
        }
      } else {
        if (type == "POD")
          this.searchTransitPOD = data.results;
        else if (type == "POL")
          this.searchTransitPOL = data.results;
      }
    }
    );


  }
  cargosub: any;
  getSubType(_Cargo: any) {
    if (_Cargo.value == "2") {
      this.quoteservice.getCargoSubType().subscribe(result => {
        this.cargosub = result.results;
      });
    }
    else
      this.cargosub = [];

  }

  stuffs: any;
  destuffs: any;
  GetStuff(arg0: string) {
    this.quoteservice.getStuff(arg0).subscribe(result => {
      if (arg0 == "ST")
        this.stuffs = result.results;
      if (arg0 == "DT")
        this.destuffs = result.results;
    });
  }


}
class Quot {
  ref_number!: string;
  valid_from!: string;
  valid_to!: string;
  line!: string;
  pol_office!: string;
  pod_office!: string;
  party!: string;
  currency!: string;
  licd!: string;
  licd_pol_trans_mode!: string;
  pol!: string;
  pod!: string;
  dicd_pod_trans_mode!: string;
  dicd!: string;
  cargo_type!: string;
  cargo_sub_type!: string;
  un_no!: string;
  stuffing!: string;
  de_stuffing!: string;
}
