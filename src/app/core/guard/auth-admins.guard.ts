import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authAdminsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const isLoggedIn = !! localStorage.getItem('admin')
  if(isLoggedIn){
    return true;
  }else{
    router.navigateByUrl('/admin/admin-login')
    return false
  }
};
