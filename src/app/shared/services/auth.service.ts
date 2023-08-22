import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  alreadyhaveAccount$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private _snackbar: SnackbarService
  ) { }

  SignInToApp(email: string, pass: string): Promise<any> {
    return this._afAuth.signInWithEmailAndPassword(email, pass)
  }

  SignUpToApp(email: string, pass: string): Promise<any> {
    return this._afAuth.createUserWithEmailAndPassword(email, pass)
  }
  SignOutToApp() {
    this._afAuth.signOut()
      .then(res => {
        console.log(res);
        localStorage.removeItem('userId')
        this._snackbar.openSnackbar('Logged out successfully. Until next time! Take care and stay connected.')
        this._router.navigate([''])
        this.loginStatus$.next(false)
      })
  }

}
