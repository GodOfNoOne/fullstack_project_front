import { HttpClient, HttpHeaders } from '@angular/common/http'
import { computed, inject, Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'
import { User } from './models/user.model'
import { Payload } from './models/payload.model'
import { environment } from '../environments/environments'

@Injectable({
  providedIn: 'root',
})
export class UserManageService {
  private httpClient = inject(HttpClient)
  private router = inject(Router)

  private baseUrl = environment.baseUrl

  private _currentUser = signal<User | undefined>(undefined)

  username = computed(() => this._currentUser()?.username ?? undefined)
  role = computed(() => this._currentUser()?.role ?? undefined)

  login(username: string, password: string) {
    return this.httpClient.post<Payload>(`${this.baseUrl}/auth/login`, { username, password })
  }

  createUser(username: string, password: string) {
    return this.httpClient.post<Payload>(`${this.baseUrl}/auth/register`, {
      username,
      password,
    })
  }

  setUser(payload: Payload) {
    console.log(payload)
    const user = {
      username: payload.username,
      role: payload.role,
    }
    this._currentUser.set(user)
    localStorage.setItem('jwt', payload.access_token)
  }

  logout() {
    this._currentUser.set(undefined)
    localStorage.removeItem('jwt')
    this.router.navigate([''])
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt')
    return new HttpHeaders({ Authorization: `Bearer ${token}` })
  }

  restoreUser(): Promise<void> {
    const access_token = localStorage.getItem('jwt')

    if (!access_token) return Promise.resolve()

    return new Promise((resolve) => {
      this.httpClient
        .get<User>(`${this.baseUrl}/users/me`, {
          headers: this.getAuthHeaders(),
        })
        .subscribe({
          next: (user) => {
            this._currentUser.set(user)
            resolve()
          },
          error: (err) => {
            alert(err.error.message)
            this.logout()
            resolve()
          },
        })
    })
  }
}
