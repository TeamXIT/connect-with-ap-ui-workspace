import { Injectable, inject } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { PaginationOptions } from '../options'
import { DataTableDataManagerService } from './data-manager.service'

@Injectable({
  providedIn: 'root',
})
export class PaginationManagerService {
  private _dataManagerService = inject(DataTableDataManagerService)

  private _paginationOptions$: BehaviorSubject<
    Omit<PaginationOptions, 'pageSizeOptions'>
  > = new BehaviorSubject<Omit<PaginationOptions, 'pageSizeOptions'>>({
    pageSize: 5,
    pageIndex: 1,
  })

  private _dataSizeOptions$: BehaviorSubject<DataSizeOptions> =
    new BehaviorSubject<DataSizeOptions>({
      fromIndex: 0,
      toIndex: 0,
    })

  private _dataSize: number = 0
  constructor() {
    this._dataManagerService.dataSize$.subscribe(size => {
      this._dataSize = size
      this._generateFromAndToPageIndex()
    })
  }

  get dataSizeOptions$(): Observable<DataSizeOptions> {
    return this._dataSizeOptions$.asObservable()
  }

  private _generateFromAndToPageIndex(): void {
    const fromIndex =
      this._paginationOptions$.value.pageIndex *
        this._paginationOptions$.value.pageSize -
      this._paginationOptions$.value.pageSize
    let toIndex = fromIndex + this._paginationOptions$.value.pageSize - 1

    toIndex = toIndex > this._dataSize ? this._dataSize - 1 : toIndex

    this._dataSizeOptions$.next({ fromIndex, toIndex })
  }

  setPaginationOptions({
    pageIndex = 0,
    pageSize = 0,
  }: Omit<PaginationOptions, 'pageSizeOptions'>) {
    this._paginationOptions$.next({ pageIndex, pageSize })
    this._generateFromAndToPageIndex()
  }
}

export type DataSizeOptions = {
  fromIndex: number
  toIndex: number
}
