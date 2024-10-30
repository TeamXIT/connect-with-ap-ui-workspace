import { Component, OnInit, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { takeUntil } from 'rxjs'
import { DataTableBaseComponent } from '../../data-table-base.component'
import {
  DataTableDataManagerService,
  PaginationManagerService,
} from '../../services'
import { toNumber } from 'lodash-es'
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap'
import { GetPipe } from '@x-angular/utils'

@Component({
  selector: 'x-table-pagination',
  standalone: true,
  imports: [NgbPagination, GetPipe, ReactiveFormsModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent
  extends DataTableBaseComponent
  implements OnInit
{
  private readonly _dataManagerService = inject(DataTableDataManagerService)
  private readonly _paginationManagerService = inject(PaginationManagerService)

  dataSize: number = 0
  pageSizeFormControl = new FormControl(0)

  async ngOnInit(): Promise<void> {
    this._setInitialPageSize()
    this._getPageSize()
    this._trackPageSizeChanges()
  }

  onPageChange(pageIndex: number) {
    this._paginationManagerService.setPaginationOptions({
      pageIndex,
      pageSize: this.pageSizeFormControl.value || 5,
    })
  }

  private _trackPageSizeChanges(): void {
    this.pageSizeFormControl.valueChanges
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(value => {
        this._updatePageSize(toNumber(value))
      })
  }

  private _updatePageSize(pageSize: number): void {
    this._paginationManagerService.setPaginationOptions({
      pageIndex: 1,
      pageSize: pageSize,
    })
  }

  private _getPageSize(): void {
    this._dataManagerService.dataSize$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(size => {
        this.dataSize = size
      })
  }
  private _setInitialPageSize(): void {
    this.pageSizeFormControl.setValue(
      this.configuration().paginationOptions?.pageSize || 5,
    )
  }
}
