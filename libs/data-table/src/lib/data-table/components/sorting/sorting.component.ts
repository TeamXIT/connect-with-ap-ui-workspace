import { Component, inject, input } from '@angular/core'
import { SortManagerService } from '../../services'
import { AsyncPipe } from '@angular/common'
import { GetPipe } from '@x-angular/utils'

@Component({
  selector: 'th[x-table-sort]',
  standalone: true,
  imports: [AsyncPipe, GetPipe],
  templateUrl: './sorting.component.html',
})
export class SortingComponent {
  column = input.required<string>()
  configuration = input.required<any>()

  sortManager = inject(SortManagerService)

  onClick() {
    this.sortManager.update(this.column())
  }
}
