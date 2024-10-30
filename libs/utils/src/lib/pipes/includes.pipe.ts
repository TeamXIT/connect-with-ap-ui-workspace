import { Pipe, PipeTransform } from '@angular/core'
import { includes, isString } from 'lodash-es'

@Pipe({
  name: 'includes',
  standalone: true,
})
export class IncludesPipe implements PipeTransform {
  transform(value: string | string[], path: string): boolean {
    if (isString(value)) {
      return includes(value, path)
    }
    return value.some(item => includes(item, path))
  }
}
