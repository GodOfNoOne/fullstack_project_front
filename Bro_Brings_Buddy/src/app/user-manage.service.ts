import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'
import { User } from './models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserManageService {
  private httpClient = inject(HttpClient)
  private router = inject(Router)

  private baseUrl = 'http://localhost:3000/users'

  private _currentUser = signal<User | undefined>(undefined)

  currentUser = computed(() => this._currentUser())
  username = computed(() => this._currentUser()?.name ?? undefined)
  role = computed(() => this._currentUser()?.role ?? undefined)

  login(name: string, password: string) {
    return this.httpClient.post<User>(`${this.baseUrl}/login`, {
      name,
      password,
    })
  }

  createUser(name: string, password: string) {
    return this.httpClient.post<User>(`${this.baseUrl}`, { name, password })
  }

  setUser(user: User) {
    console.log(user)
    this._currentUser.set(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  logout() {
    this._currentUser.set(undefined)
    localStorage.removeItem('user')
    this.router.navigate([''])
  }

  restoreUser() {
    const stored = localStorage.getItem('user')
    if (stored) {
      this._currentUser.set(JSON.parse(stored))
    }
  }
}
