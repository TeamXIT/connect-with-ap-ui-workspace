import { Component, OnInit, signal, inject } from '@angular/core'
import { DataTableComponent } from '@x-angular/data-table'
import { get } from 'lodash-es'
import { map, takeUntil } from 'rxjs'
import { UserDataService } from '../../services/user-data.service'
import { CONFIGURATION } from './users-table.config'
import { Destroyer } from '../../shared/config/components/on-destroy.component'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent extends Destroyer implements OnInit {
  configuration = CONFIGURATION
  data = signal<any>([])

  private _usersDataService = inject(UserDataService)

  async ngOnInit(): Promise<void> {
    this._getData()
  }

  private async _getData(): Promise<void> {
    this._usersDataService
      .getUsers({ pageSize: 10 })
      .pipe(takeUntil(this.subscriptions$))
      .pipe(
        map(response => {
          return get(response, 'data', [])
        }),
      )
      .subscribe({ next: this.data.set, error: console.log })
  }
}
