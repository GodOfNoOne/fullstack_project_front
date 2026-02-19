import { inject, Injectable, signal } from '@angular/core'
import { ApplicationFrom } from '../models/application-form.model'
import { Role } from '../models/role.model'
import { Page } from '../models/page.model'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { AppType } from '../models/app-type.model'

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:3000/applications'

  getApplicationsForUser(
    username: string,
    role: Role,
    pageType: Page,
  ): Observable<ApplicationFrom[]> {
    const params = new HttpParams()
      .set('username', username)
      .set('role', role)
      .set('pageType', pageType)

    return this.http.get<ApplicationFrom[]>(this.baseUrl, { params })
  }

  getAvailableUsers(appType: AppType) {
    return this.http.get<string[]>(`${this.baseUrl}/available/${appType}`)
  }

  createNewApplication(
    fromUser: string,
    forUser: string,
    appType: AppType,
  ): Observable<ApplicationFrom> {
    return this.http.post<ApplicationFrom>(this.baseUrl, {
      fromUser: fromUser,
      forUser: forUser,
      appType: appType,
    })
  }

  updateAdminVotes(appId: number, voteType: 'Vote' | 'Unvote', username: string) {
    return this.http.patch<void>(`${this.baseUrl}/${appId}`, {
      voteType: voteType,
      username: username,
    })
  }

  deleteApplication(appId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${appId}`)
  }
}
