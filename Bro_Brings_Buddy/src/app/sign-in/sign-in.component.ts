import { Component, inject } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { UserManageService } from '../user-manage.service'
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component'

function equalVals(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value
    const val2 = control.get(controlName2)?.value
    if (val1 === val2) {
      return null
    }
    return { valuesNotEqual: true }
  }
}
function validPassword(control: AbstractControl) {
  const specialCharsReg = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  const upperCaseReg = /[A-Z]/
  const lowerCaseReg = /[a-z]/
  const numberReg = /\d/
  const value = control.value

  if (
    specialCharsReg.test(value) &&
    upperCaseReg.test(value) &&
    lowerCaseReg.test(value) &&
    numberReg.test(value)
  ) {
    return null
  }
  return { doesNotContainsSpecialChar: true }
}

@Component({
  selector: 'app-sign-in.component',
  imports: [ReactiveFormsModule, NavButtonsComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private router = inject(Router)
  private userService = inject(UserManageService)
  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6), validPassword],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [equalVals('password', 'confirmPassword')],
      },
    ),
  })

  onSubmit() {
    if (this.form.invalid) return

    const username = this.form.controls.username.value!
    const password = this.form.controls.passwords.controls.password.value!

    this.userService.createUser(username, password).subscribe({
      next: (payload) => {
        this.userService.setUser(payload)
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.error(err)
        alert('Signup failed: ' + (err.error?.message || 'Unknown error'))
      },
    })
  }
  onReset() {
    this.form.reset()
  }

  goToWelcome() {
    this.router.navigate([''])
  }

  goToLogIn() {
    this.router.navigate(['/log-in'])
  }
}
