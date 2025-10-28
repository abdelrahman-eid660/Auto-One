import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs';

export const interceptorApi: HttpInterceptorFn = (req, next) => {
  const SpinnerServ = inject(SpinnerService)
  SpinnerServ.show()
  return next(req).pipe(finalize(()=>{SpinnerServ.hide()}))
};
