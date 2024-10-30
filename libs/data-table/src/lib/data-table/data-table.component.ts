import { Component, input, inject } from '@angular/core'
import { BodyComponent } from './components/body/body.component'
import { HeaderComponent } from './components/header/header.component'
import { PaginationComponent } from './components/pagination/pagination.component'
import { DataTableBaseComponent } from './data-table-base.component'
import {
  DataTableDataManagerService,
  FilterManagerService,
  PaginationManagerService,
  SortManagerService,
} from './services'

@Component({
  selector: 'x-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  imports: [HeaderComponent, BodyComponent, PaginationComponent],
  providers: [
    DataTableDataManagerService,
    FilterManagerService,
    PaginationManagerService,
    SortManagerService,
  ],
})
export class DataTableComponent extends DataTableBaseComponent {
  data = input<any[]>([])
  private readonly _dataManagerService = inject(DataTableDataManagerService)

  ngOnInit(): void {
    this._setData()
  }

  private _setData(): void {
    this._dataManagerService.setData(
      this.data().map(row => {
        return { ...row, rowId: crypto.randomUUID() }
      }),
    )
  }
}
