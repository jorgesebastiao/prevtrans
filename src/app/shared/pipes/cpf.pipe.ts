import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value != null){
      return value.substr(0, 3) + '.' + value.substr(3,3) + '.' + value.substr(6,3) + '-' + value.substr(9, 2) ;
    }
  }

}
