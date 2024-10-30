import { Injectable } from '@angular/core'
import { ValueObject } from '@x-angular/utils'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FilterManagerService {
  private _filters$: BehaviorSubject<ValueObject<any>> = new BehaviorSubject({})

  get filters$(): Observable<ValueObject<any>> {
    return this._filters$.asObservable()
  }

  updateFilters(object: ValueObject<string>): void {
    this._filters$.next(object)
  }
}
