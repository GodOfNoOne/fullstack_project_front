import { Component, signal } from '@angular/core'
import { Page } from '../models/page.model'
import { HeaderComponent } from '../header/header.component'
import { RouterLink } from '@angular/router'

type GameState = 'idle' | 'waiting' | 'ready' | 'clicked' | 'tooSoon'

@Component({
  selector: 'app-minigame-page',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './minigame-page.component.html',
  styleUrl: './minigame-page.component.css',
})
export class MinigamePageComponent {
  pageType = signal<Page>('Minigame')

  state = signal<GameState>('idle')
  reactionTime = signal<number | null>(null)

  private startTime = 0
  private timeoutId: any

  startGame() {
    this.state.set('waiting')
    this.reactionTime.set(null)

    const randomDelay = Math.random() * 3000 + 1000

    this.timeoutId = setTimeout(() => {
      this.startTime = Date.now()
      this.state.set('ready')
    }, randomDelay)
  }

  handleClick() {
    if (this.state() === 'waiting') {
      clearTimeout(this.timeoutId)
      this.state.set('tooSoon')
      return
    }

    if (this.state() === 'ready') {
      const endTime = Date.now()
      const time = endTime - this.startTime

      this.reactionTime.set(time)
      this.state.set('clicked')

      // later: send to backend here
    }
  }

  reset() {
    this.state.set('idle')
    this.reactionTime.set(null)
  }
}
