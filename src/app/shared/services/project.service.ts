import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproject, IprojectStatus } from '../model/project';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private _http: HttpClient,
    private _snackbarService: SnackbarService
  ) { }

  createProject(obj: Iproject): Observable<Iproject> {
    return this._http.post<Iproject>(environment.firebaseDB + 'project.json', obj)
      .pipe(
        catchError(err => {
          // this._snackbarService.openSnackbar(err)
          console.log(err);

          return of(err)
        })
      )
  }

  getAllProject(): Observable<Iproject[]> {
    return this._http.get<Iproject[]>(environment.firebaseDB + 'project.json')
      .pipe(
        map(res => {
          let arr = []

          for (let key in res) {
            // console.log(key);
            let obj: Iproject = {
              projectTheme: res[key].projectTheme,
              reason: res[key].reason,
              type: res[key].type,
              division: res[key].division,
              category: res[key].category,
              priority: res[key].priority,
              department: res[key].department,
              startDate: res[key].startDate,
              endDate: res[key].endDate,
              location: res[key].location,
              status: res[key].status,
              id: key
            }
            // console.log(obj);
            arr.unshift(obj)
          }
          return arr
        })
      )
  }

  updateProjectStatus(id: string, status: any) {
    return this._http.patch<IprojectStatus>(environment.firebaseDB + 'project/' + id + '/.json', status)
  }

  getFilterProjectNumber(status: IprojectStatus): Observable<number> {
    return this._http.get<any>(environment.firebaseDB + 'project.json')
      .pipe(
        map(res => {
          // console.log(res);
          let arr = []
          for (let key in res) {
            // console.log(res[key]);
            arr.push(res[key])
          }

          return arr.filter(e => e.status === status).length
        }),
      )

  }

  getDealyProjectNumber(): Observable<number> {
    return this._http.get<any>(environment.firebaseDB + 'project.json')
      .pipe(
        map(res => {
          // console.log(res);
          let arr = []
          for (let key in res) {
            // console.log(res[key]);
            arr.push(res[key])
          }

          return arr.filter(e => {
            const utcDate = new Date(e.endDate);
            const localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));

            return localDate < new Date() && e.status === 'Running'
          }).length
        }),
      )
  }

  getAllProjectNumber(): Observable<number> {
    return this._http.get<any>(environment.firebaseDB + 'project.json')
      .pipe(
        map(res => {
          let arr = []
          for (let key in res) {
            arr.push(res[key])
          }
          return arr.length
        }),
      )

  }
}
