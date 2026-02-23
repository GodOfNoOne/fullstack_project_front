import { Component, inject } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserManageService } from '../user-manage.service'
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component'

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, NavButtonsComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  private router = inject(Router)
  private userService = inject(UserManageService)
  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  })

  get usernameIsInvalid() {
    const username = this.form.controls.username
    return username.touched && username.dirty && username.invalid
  }

  get passwordIsInvalid() {
    const password = this.form.controls.password
    return password.touched && password.invalid
  }

  onSubmit() {
    if (this.form.invalid) return

    const username = this.form.value.username!
    const password = this.form.value.password!

    this.userService.login(username, password).subscribe({
      next: (payload) => {
        this.userService.setUser(payload)
        this.router.navigate(['/home'])
      },
      error: () => {
        alert('Invalid username or password')
      },
    })
  }

  goToWelcome() {
    this.router.navigate([''])
  }

  goToRegister() {
    this.router.navigate(['/sign-in'])
  }
}
