import { Component, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

@Component({ selector: '', template: '' })
export class Destroyer implements OnDestroy {
  protected subscriptions$ = new Subject()

  ngOnDestroy(): void {
    this.subscriptions$.next(null)
    this.subscriptions$.complete()
  }
}
