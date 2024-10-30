import { Component, OnDestroy, input } from '@angular/core'
import { DataTableOptions } from './options'
import { Subject } from 'rxjs'

@Component({
  selector: '',
  template: '',
})
export abstract class DataTableBaseComponent implements OnDestroy {
  configuration = input.required<DataTableOptions>()

  protected subscriptions$ = new Subject()

  ngOnDestroy(): void {
    this.subscriptions$.next(null)
    this.subscriptions$.complete()
  }
}
