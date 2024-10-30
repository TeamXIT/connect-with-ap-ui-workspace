import { Pipe, PipeTransform } from "@angular/core";
import { pick } from "lodash-es";
import { ValueObject } from "../types/value-object";

@Pipe({
  name: 'omit',
  standalone: true,
})                                             
export class OmitPipe implements PipeTransform {
  transform(object: ValueObject<any>, path: string | string[]): unknown {
    return pick(object, path)
  }
}
