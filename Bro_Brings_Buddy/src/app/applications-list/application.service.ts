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
      forUser: 'GodOfNoOne',
      adminVotes: ['admin3', 'admin1', 'admin7'],
    },
    {
      appId: 4,
      appType: 'Admin',
      fromUser: 'admin1',
      forUser: 'BetterNewMember',
      adminVotes: ['admin2', 'admin5'],
    },
    {
      appId: 5,
      appType: 'Admin',
      fromUser: 'Alon',
      forUser: 'BetterNewMember',
      adminVotes: ['admin2', 'admin5'],
    },
  ])
  // private applicationList = signal<ApplicationFrom[]>([])

  getApplications = this.applicationList.asReadonly()
}
