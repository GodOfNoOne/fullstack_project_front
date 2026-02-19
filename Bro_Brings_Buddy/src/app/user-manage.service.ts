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
  username = computed(() => this._currentUser()?.username ?? undefined)
  role = computed(() => this._currentUser()?.role ?? undefined)

  login(username: string, password: string) {
    return this.httpClient.post<User>(`${this.baseUrl}/login`, {
      username,
      password,
    })
  }

  createUser(username: string, password: string) {
    return this.httpClient.post<User>(`${this.baseUrl}`, {
      username,
      password,
    })
  }

  setUser(user: User) {
    console.log(user)
    this._currentUser.set(user)
    localStorage.setItem('username', user.username)
  }

  logout() {
    this._currentUser.set(undefined)
    localStorage.removeItem('username')
    this.router.navigate([''])
  }

  restoreUser() {
    const username = localStorage.getItem('username')

    if (!username) return

    this.httpClient.get<User>(this.baseUrl, { params: { username } }).subscribe({
      next: (user) => {
        if (user) {
          this._currentUser.set(user)
        }
      },
      error: () => {
        this.logout()
      },
    })
  }
}
