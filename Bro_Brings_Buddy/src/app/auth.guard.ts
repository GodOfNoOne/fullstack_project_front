import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UserManageService } from './user-manage.service'

export const authGuard: CanActivateFn = (route) => {
  const userService = inject(UserManageService)
  const router = inject(Router)

  const requiresAuth = route.data?.['requiresAuth']
  const allowedRoles: string[] | undefined = route.data?.['roles']

  const role = userService.role()

  if (requiresAuth) {
    if (!role) {
      userService.logout()
      router.navigate([''])
      return false
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      router.navigate(['/home'])
      return false
    }
  }

  return true
}
