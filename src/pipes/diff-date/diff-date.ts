import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DiffDatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'diffDate',
})
export class DiffDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(date: string): string {
        // console.log('changeDate', postdate, new Date().getTime())
    let dif:number = new Date().getTime() - parseInt(date);
    if (dif > 86400000) {
      return Math.floor(dif / 86400000) + ' jours';
    }
    else if (dif > 3600000) {
      return Math.floor(dif / 3600000) + ' h';

    }
    else if (dif > 60000) {
      return Math.floor(dif / 60000) + ' m';
    }
    else {
      return Math.floor(dif / 1000) + ' s';
    }
  }
}
