import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'lengthTrimPipe'})
export class LengthTrimePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) {
        return value;
    }
    else if (value.length>100){
        return value.substr(0, 100) + "...";
    }

    else{
        return value;
    }
  }
}