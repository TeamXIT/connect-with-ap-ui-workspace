import { Component, OnInit, inject } from '@angular/core'
import { takeUntil } from 'rxjs'
import { DataTableBaseComponent } from '../../data-table-base.component'
import {
  DataTableDataManagerService,
  PaginationManagerService,
  DataSizeOptions,
  FilterManagerService,
} from '../../services'
import { GetPipe, IsNumberPipe, ValueObject } from '@x-angular/utils'
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap'
import { DecimalPipe, JsonPipe } from '@angular/common'

@Component({
  selector: 'tbody[x-table-body]',
  standalone: true,
  imports: [GetPipe, IsNumberPipe, NgbHighlight, DecimalPipe, JsonPipe],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent extends DataTableBaseComponent implements OnInit {
  private readonly _dataManagerService = inject(DataTableDataManagerService)
  private readonly _paginationService = inject(PaginationManagerService)
  private readonly _filterManagerService = inject(FilterManagerService)

  data: any[] = []
  columns: string[] = []

  dataSize: DataSizeOptions = {
    fromIndex: 0,
    toIndex: 0,
  }

  filters: ValueObject<any> = {}
  async ngOnInit(): Promise<void> {
    this._getColumns()
    this._getData()
    this._getDataSize()
    this._getFilters()
  }

  private _getData(): void {
    this._dataManagerService.data$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(data => (this.data = data))
  }

  private _getDataSize(): void {
    this._paginationService.dataSizeOptions$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(data => {
        this.dataSize = data
      })
  }

  private _getColumns(): void {
    this.columns = this.configuration().columns || []
  }

  private _getFilters(): void {
    this._filterManagerService.filters$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(filtersData => {
        this.filters = filtersData
      })
  }
  onDelete(row: ValueObject<any>): void {
    this._dataManagerService.deleteRow(row['rowId'])
  }
}
