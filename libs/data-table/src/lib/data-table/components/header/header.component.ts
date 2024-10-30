import { Component, inject } from '@angular/core'
import { DataTableBaseComponent } from '../../data-table-base.component'
import { SortManagerService } from '../../services'
import { SortingComponent } from '../sorting/sorting.component'
import { GetPipe } from '@x-angular/utils'
import { FilterComponent } from '../filter/filter.component'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'thead[x-table-header]',
  standalone: true,
  imports: [SortingComponent, FilterComponent, GetPipe, JsonPipe],
  templateUrl: './header.component.html',
  styleUrl:'./header.component.scss'
})
export class HeaderComponent extends DataTableBaseComponent {
  sortManager = inject(SortManagerService)
}
