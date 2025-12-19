import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTranslate'
})
export class StatusTranslatePipe implements PipeTransform {

  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'active':
        return 'نشط';
      case 'pending':
        return 'قيد الانتظار';
      case 'expired':
        return 'منتهي';
      default:
        return value;
    }
  }

}
