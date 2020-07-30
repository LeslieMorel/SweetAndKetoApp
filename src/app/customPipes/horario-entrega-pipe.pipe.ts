import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horarioEntregaPipe'
})
export class HorarioEntregaPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
