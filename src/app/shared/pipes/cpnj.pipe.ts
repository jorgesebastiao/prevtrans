import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpnj'
})
export class CpnjPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if(value != null){
      return value.substr(0,2) + '.' + value.substr(2,3) + '.' + value.substr(5,3) + '/' + value.substr(8,4) + '-' + value.substr(12,2);
    }
  }
}
