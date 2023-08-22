import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeadingService } from './shared/services/heading.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { LoaderService } from './shared/services/loader.service';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'project_management';
  loginStatus!: boolean
  heading: string = 'Project Dashboard'
  isLoading!: boolean
  nav: boolean = false
  constructor(
    private _headingService: HeadingService,
    private _location: Location,
    private _router: Router,
    private _authService: AuthService,
    private _loaderService: LoaderService,
  ) { }

  currentDate = new Date()
  mytDate = new Date(2012, 5, 8)

  ngOnInit(): void {
    this._headingService.heading$
      .subscribe(res => {
        this.heading = res
      })


    this._authService.loginStatus$
      .subscribe(res => {
        this.loginStatus = res
      })

    this._loaderService.loaderStatus$
      .subscribe(res => {
        this.isLoading = res
      })
  }

  onBackNav() {
    this._location.back()
  }

  onLogOut() {
    this._authService.SignOutToApp()
  }


}
