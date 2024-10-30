import { Pipe, PipeTransform } from '@angular/core'
import { ValueObject } from '../types/value-object'
import { pick } from 'lodash-es'

@Pipe({
  name: 'pick',
  standalone: true,
})
export class PickPipe implements PipeTransform {
  transform(input: ValueObject<any>, path: string | string[]): unknown {
    return pick(input, path)
  }
}
