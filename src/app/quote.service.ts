import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})


export class QuoteService {


  constructor(private http: HttpClient) { }
  url = 'http://134.209.158.76:9010/';
  user: string = 'admin';
  pass: string = 'int123';
  headere = {
    headers: new HttpHeaders()
      .set('Authorization', "Basic " + btoa(this.user + ":" + this.pass))
    //  .set('No-Auth', 'True') 
  }
  public getQuoteRef(): Observable<any> {
    return this.http.get<any>(this.url + "exim/quotations/v1/get-reference-number/", this.headere);
  }
  public getLine(text: any): Observable<any> {
    return this.http.get<any>(this.url + "core/base/v1/lines/?code=" + text, this.headere);
  }
  public getPOL(text: any): Observable<any> {
    return this.http.get<any>(this.url + "core/base/v1/offices/?code=&isIcd=false&statusSet=APPR,KYCP&code=" + text, this.headere);
  }
  public getPort(text: any): Observable<any> {
    return this.http.get<any>(this.url + "core/base/v1/ports/?code=" + text, this.headere);
  }
  public getPODAgent(text: any): Observable<any> {
    return this.http.get<any>(this.url + "/exim/quotations/v1/office-port-currency-mappings/?portId=" + text + "&statusSet=APPR,KYCP,PENA", this.headere);
  }
  public getParty(text: any): Observable<any> {
    return this.http.get<any>(this.url + "core/base/v1/party-office-mappings/?office=1&partyStatusSet=APPR,KYCP,PENA", this.headere);
  }
  public getCurrency(text: any): Observable<any> {
    return this.http.get<any>(this.url + "core/base/v1/currencies/?code=" + text, this.headere);
  }
  public getCargoType(): Observable<any> {
    return this.http.get<any>(this.url + "core/base/v1/cargo-types/", this.headere);
  }
  public getCargoSubType(): Observable<any> {
    return this.http.get<any>(this.url + "core/base/v1/cargo-subtypes/", this.headere);
  }
  public getStuff(text: any): Observable<any> {
    return this.http.get<any>(this.url + "core/base/v1/stuffing-types/?methodType=" + text, this.headere);
  }
  public QuotValidator(pol: any, pod: any, party: any, cargo: BigInteger, cargoSubType: any, stuffing: any, deStuffing: any, line: any, validFrom: any, validTo: any,): Observable<any> {
    return this.http.get<any>(this.url + "exim/quotations/v1/quotation-validator/?pol=" + pol + "&pod=" + pod + "&party=" + party + "&cargo=" + cargo + "&cargoSubType=&stuffing=" + stuffing + "&deStuffing=" + deStuffing + "&icd=&toIcd=&line=" + line + "&validFrom=" + validFrom + "&validTo=" + validTo + "&licdPolTransMode=&podDicdTransMode=", this.headere);
  }
  public QuotSave(obj: any): Observable<any> {
    return this.http.post<any>(this.url + "exim/quotations/v1/quotations/", obj, this.headere);
  }
  public GetCType(): Observable<any> {
    return this.http.get<any>(this.url + "core/base/v1/iso-equipment/", this.headere);
  }
  public GetUnit(): Observable<any> {
    return this.http.get<any>(this.url + "core/base/v1/category-unit-mapping/?category=Mass", this.headere);
  }
  public GetAllInElements(line: string, port: string, toport: string, cargotype: string, stuf: string, destuff: string, ctype: string): Observable<any> {
    let today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    // let today = new Date();
    // today = new Date(today.getFullYear() + "-" + ('0' + today.getMonth()).slice(-2)
    //   + "-" + ('0' + today.getDay()).slice(-2));
    return this.http.get<any>(this.url + "exim/quotations/v1/get-quotation-all-in-elements/?activeDate=" + today + "&line=" + line + "&port=" + port + "&icd=&icdPortTransmode=&toPort=" + toport + "&toIcd=&toIcdToPortTransmode=&cargoType= " + cargotype + "&cargoSubType=&stuffingType=" + stuf + "&destuffingType=" + destuff + " &containerType=" + ctype + "", this.headere);
  }
  public GetFreight(QuotID: any, Equip: any): Observable<any> {
    let today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    return this.http.get<any>(this.url + "/exim/quotations/v1/get-quotation-charges/?quotation=" + QuotID + "&equipment=" + Equip + "&activeDate=" + today, this.headere);
  }
  public QuotSecondSave(obj: any): Observable<any> {
    return this.http.post<any>(this.url + "exim/quotations/v1/quotation-equipment-mapping/", obj, this.headere);
  }
  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<[any, string[]]>(this.url + "core/base/v1/lines/?code=" + term, this.headere)
      .pipe(map((response) => response[1]));
  }

}

