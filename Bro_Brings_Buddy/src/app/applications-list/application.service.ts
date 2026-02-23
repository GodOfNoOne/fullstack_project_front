import { inject, Injectable, signal } from '@angular/core'
import { ApplicationFrom } from '../models/application-form.model'
import { Role } from '../models/role.model'
import { Page } from '../models/page.model'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { AppType } from '../models/app-type.model'
import { VoteType } from '../models/voteType.model'
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private http = inject(HttpClient)
  private baseUrl = `${environment.baseUrl}/applications`

  getApplicationsForUser(pageType: Page): Observable<ApplicationFrom[]> {
    const params = new HttpParams().set('pageType', pageType)

    return this.http.get<ApplicationFrom[]>(this.baseUrl, { params })
  }

  getAvailableUsers(appType: AppType) {
    return this.http.get<string[]>(`${this.baseUrl}/available/${appType}`)
  }

  createNewApplication(forUser: string, appType: AppType): Observable<ApplicationFrom> {
    return this.http.post<ApplicationFrom>(this.baseUrl, {
      forUser,
      appType,
    })
  }

  updateAdminVotes(appId: number, voteType: VoteType) {
    return this.http.patch<void>(`${this.baseUrl}/${appId}`, {
      voteType,
    })
  }

  deleteApplication(appId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${appId}`)
  }
}
