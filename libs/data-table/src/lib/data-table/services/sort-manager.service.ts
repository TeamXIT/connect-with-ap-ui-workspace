import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SortManagerService {
  private _sortOptions$: BehaviorSubject<SortOptions> =
    new BehaviorSubject<SortOptions>({
      column: '',
      direction: '',
    })

  private _rotate = {
    asc: 'desc',
    desc: '',
    '': 'asc',
  }

  get sortOptions$(): Observable<SortOptions> {
    return this._sortOptions$.asObservable()
  }

  update(column: string) {
    if (column === this._sortOptions$.value.column) {
      const direction = this._rotate[this._sortOptions$.value.direction] as
        | ''
        | 'asc'
        | 'desc'
      this._sortOptions$.next({
        column,
        direction,
      })
      return
    }
    this._sortOptions$.next({
      column,
      direction: 'asc',
    })
  }
}

export type SortOptions = {
  column: string
  direction: 'asc' | 'desc' | ''
}
