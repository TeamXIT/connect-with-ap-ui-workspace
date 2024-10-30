import { Component, OnInit, inject } from '@angular/core'
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms'
import { GetPipe, IncludesPipe } from '@x-angular/utils'
import { forEach, set } from 'lodash-es'
import { takeUntil, tap, debounceTime, distinctUntilChanged } from 'rxjs'
import { DataTableBaseComponent } from '../../data-table-base.component'
import {
  FilterManagerService,
  DataTableDataManagerService,
} from '../../services'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'tr[x-table-filter]',
  standalone: true,
  imports: [ReactiveFormsModule, GetPipe, JsonPipe, IncludesPipe],
  templateUrl: './filter.component.html',
})
export class FilterComponent extends DataTableBaseComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder)
  private _filterManager = inject(FilterManagerService)
  private _dataManager = inject(DataTableDataManagerService)

  formGroup = new FormGroup<any>({})

  async ngOnInit(): Promise<void> {
    await this._buildFormGroup()
    this._trackFormGroupChanges()
  }

  private async _buildFormGroup(): Promise<void> {
    const formGroup = {}
    forEach(this.configuration().columns, col => {
      set(formGroup, col, '')
    })
    this.formGroup = this._formBuilder.group(formGroup)
  }

  private _trackFormGroupChanges() {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.subscriptions$))
      .pipe(tap(value => this._filterManager.updateFilters(value)))
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this._dataManager.update())
  }
}
