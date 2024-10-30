import { Pipe, PipeTransform } from '@angular/core'
import { get } from 'lodash-es'
import { ValueObject } from '../types/value-object'

@Pipe({
  name: 'get',
  standalone: true,
})
export class GetPipe implements PipeTransform {
  transform(object: ValueObject<any>, path: string): any {
    return get(object, path)
  }
}
