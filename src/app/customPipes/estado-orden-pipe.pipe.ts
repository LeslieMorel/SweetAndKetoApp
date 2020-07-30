import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoOrdenPipe'
})
export class EstadoOrdenPipePipe implements PipeTransform {

  // Estados = [
  //   { value: 066, text: 'Cola' },
  //   { value: 'B', text: 'Proceso' },
  //   { value: 'C', text: 'Listo' },
  //   { value: 'D', text: 'Entregado' },
  //   { value: 'E', text: 'Detenido' },
  //   { value: 'F', text: 'Anulada' },

  // ];
  Estados: {value: number, text: string}[] = [
    { value: 65, text: 'Pendiente' },
    { value: 66, text: 'Proceso' },
    { value: 67, text: 'Listo' },
    { value: 68, text: 'Entregado' },
    { value: 69, text: 'Descartada' },

  ];

  transform(value: number): string {
    if (!value) {
      return '';
    }
    const valor: {value: number, text: string}[] =  this.Estados.filter( estado => {
      return  estado.value === value;
    });
    if (valor === undefined) {
      return '';
    }
    return valor[0].text;
  }

}



