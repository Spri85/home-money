
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sprFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((i) => {
      // if (!isNaN(i[field])) {
      //   i[field] += '';
      // }

      const t = Object.assign({}, i);

      if (field === 'type') {
        t[field] = t[field] === 'income' ? 'доход' : 'расход';
      }

      if (field === 'category') {
        t[field] = t['catName'];
      }

      return t[field].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
