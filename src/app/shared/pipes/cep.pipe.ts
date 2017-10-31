import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.substr(0, 5) + '-' + value.substr(5, 3);
  }

}
