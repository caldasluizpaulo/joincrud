import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const homeAuthGuard: CanActivateFn = (route, state) => {
  console.log('cheguei aqui!');
  if (sessionStorage.getItem('userJoin')) {
    console.log('userJoin true');

    return true;
  } else {
    console.log('userJoin falser');
    const router = inject(Router);
    return router.navigate(['login']);
  }
};
