import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public dataChange = new Subject<any>();

  setData(data: any) {
    this.dataChange.next(data);
  }
}



