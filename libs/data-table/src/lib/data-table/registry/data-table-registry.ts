import { Injectable } from '@angular/core'
import { ValueObject } from '@x-angular/utils'
import { DataTableRegistryBehavior } from '../behaviors/data-table-registry-behavior'
import { get, set } from 'lodash-es'

@Injectable({
  providedIn: 'root',
})
export class DataTableRegistryService
  implements DataTableRegistryBehavior<any>
{
  private _data: ValueObject<any> = {}

  register(component: any): void {
    set(this._data, get(component, 'name'), component)
  }

  get(name: string): any {
    return get(this._data, name)
  }
}
