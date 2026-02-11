import { Injectable, signal } from '@angular/core'
import { ApplicationFrom } from '../models/application-form.model'

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private applicationList = signal<ApplicationFrom[]>([
    {
      appId: 1,
      appType: 'Member',
      fromUser: 'GodOfNoOne',
      forUser: 'NewMember',
      adminVotes: ['admin1', 'admin2'],
    },
    {
      appId: 2,
      appType: 'Admin',
      fromUser: 'GodOfNoOne',
      forUser: 'NewMember',
      adminVotes: ['admin3', 'admin1', 'admin7'],
    },
    {
      appId: 3,
      appType: 'Member',
      fromUser: 'MyFriend',
      forUser: 'NewMember',
      adminVotes: [],
    },
  ])
  // private applicationList = signal<ApplicationFrom[]>([])

  getApplications = this.applicationList.asReadonly()
}
