import { Injectable, inject } from '@angular/core'
import { ValueObject } from '@x-angular/utils'
import { size, keysIn, toString, trim, isEmpty } from 'lodash-es'
import { BehaviorSubject, Observable } from 'rxjs'
import { FilterManagerService } from './filter-manager.service'
import { SortManagerService } from './sort-manager.service'

type DataArray = any[]

@Injectable({
  providedIn: 'root',
})
export class DataTableDataManagerService {
  private _data: DataArray = []
  private _tableData$: BehaviorSubject<DataArray> =
    new BehaviorSubject<DataArray>([])

  private _dataSize$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  private readonly _filterManagerService = inject(FilterManagerService)
  private readonly _sortManagerService = inject(SortManagerService)
  filters: ValueObject<string> = {}
  sortOptions: ValueObject<string> = {}

  constructor() {
    this._filterManagerService.filters$.subscribe(filters => {
      this.filters = filters
      this.update()
    })

    this._sortManagerService.sortOptions$.subscribe(sortOptions => {
      this.sortOptions = sortOptions
      this.update()
    })
  }

  get data$(): Observable<DataArray> {
    return this._tableData$.asObservable()
  }

  get dataSize$(): Observable<number> {
    return this._dataSize$.asObservable()
  }

  setData(data: DataArray) {
    this._data = [...data]
    this._tableData$.next(this._data)
    this._dataSize$.next(size(this._data))
  }

  update(): void {
    const data = this.sort(
      this.filter(),
      this.sortOptions['column'],
      this.sortOptions['direction'],
    )
    this._tableData$.next(data)
    this._dataSize$.next(size(data))
  }

  filter(): ValueObject<any>[] {
    return (this._data || []).filter(row => {
      return keysIn(this.filters).every(key => {
        return trim(toString(row[key]))
          .toLocaleLowerCase()
          .includes(trim(toString(this.filters[key]).toLocaleLowerCase()))
      })
    })
  }

  sort(
    data: ValueObject<any>[],
    column: string,
    direction: string,
  ): ValueObject<any>[] {
    if (isEmpty(column) || isEmpty(direction)) {
      return data
    }
    return [...data].sort((a, b) => {
      const res = this._compare(a[column], b[column])
      return direction === 'asc' ? res : -res
    })
  }

  deleteRow(id: string): void {
    const _index = this._data.findIndex(row => row['rowId'] === id)
    this._data.splice(_index, 1)
    this.update()
  }

  private _compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0
  }
}
