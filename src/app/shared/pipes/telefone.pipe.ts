import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: any, args: any): any {
    if ( value != null) {
      return '(' + value.substr(0, 2) +  ') ' + value.substr(2, 4) + '-' + value.substr(6, 4);
    } else {
      return value;
    }
  }

}
