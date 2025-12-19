import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs';

export const interceptorApi: HttpInterceptorFn = (req, next) => {
  const spinnerServ = inject(SpinnerService);

  const excludeUrls = ['/user/cart' , '/user/subscription/:id'];

  if (excludeUrls.some(url => req.url.includes(url))) {
    return next(req); 
  }

  spinnerServ.show();

  return next(req).pipe(
    finalize(() => spinnerServ.hide())
  );
};
