import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  hide: boolean = true
  hide1: boolean = true
  hide2: boolean = true

  alreadyHaveAccount!: boolean
  constructor(
    private _router: Router,
    private _snackbarService: SnackbarService,
    private _authService: AuthService,
    private _firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this._router.navigate(['dashboard'])
    } else {
      this._router.navigate([''])

    }

    this._authService.alreadyhaveAccount$
      .subscribe(res => {
        this.alreadyHaveAccount = res
      })
  }

  onLogin(logInForm: NgForm) {
    if (logInForm.valid) {

      // console.log(logInForm.value);
      let { signInEmail, signInPassword } = logInForm.value
      this._authService.SignInToApp(signInEmail, signInPassword)
        .then(res => {
          // console.log(res.user.uid);
          localStorage.setItem('userId', res.user.uid)
          this._snackbarService.openSnackbar(`Hello and welcome! Your arrival brings a smile to our faces`)
          this._router.navigate(['dashboard'])
          this.alreadyHaveAccount = !this.alreadyHaveAccount
          logInForm.reset()
        })
        .catch(err => {
          // console.log(err);
          this._snackbarService.openSnackbar(err)
        })
    }

    // this._authService.SignInToApp()
    // this._router.navigate(['dashboard'])
  }

  onSignUp(SignUpform: NgForm) {
    if (SignUpform.valid) {
      if (SignUpform.controls['signUpPassword'].value === SignUpform.controls['cpassword'].value) {

        let { signUpPassword, signUpemail } = SignUpform.value
        // console.log(signUpPassword, signUpemail);
        this._authService.SignUpToApp(signUpemail, signUpPassword)
          .then(res => {
            // console.log(res.user.uid);

            this._firestore.collection('userSignUp').doc(res.user.uid).set({
              email: signUpemail,
              pass: signUpPassword
            })

            this._snackbarService.openSnackbar('Account Created Successfully....!!!')
            setTimeout(() => {
              this._snackbarService.openSnackbar('You can Login Now....!!!')

            }, 2000);
            this._authService.alreadyhaveAccount$.next(false)
            SignUpform.reset()
          })
          .catch(err => {
            // console.log(err);
            this._snackbarService.openSnackbar(err)

          })
      } else {
        this._snackbarService.openSnackbar('password should be match.....!!!!')
      }

    }


  }
}
