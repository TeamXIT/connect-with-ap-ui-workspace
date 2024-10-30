import { Pipe, PipeTransform } from '@angular/core'
import { isNumber } from 'lodash-es'

@Pipe({
  name: 'isNumber',
  standalone: true,
})
export class IsNumberPipe implements PipeTransform {
  transform(value: any): boolean {
    return isNumber(value)
  }
}
