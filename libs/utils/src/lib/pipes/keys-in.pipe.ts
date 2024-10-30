import { Pipe, PipeTransform } from '@angular/core'
import { keysIn } from 'lodash-es'
import { ValueObject } from '../types/value-object'

@Pipe({
  name: 'keysIn',
  standalone: true,
})
export class KeysInPipe implements PipeTransform {
  transform(object: ValueObject<unknown>): string[] {
    return keysIn(object)
  }
}
