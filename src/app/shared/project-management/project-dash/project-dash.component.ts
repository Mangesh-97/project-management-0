import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeadingService } from '../../services/heading.service';
import { Observable } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { IprojectStatus } from '../../model/project';
import { IntercepterService } from '../../services/intercepter.service';

@Component({
  selector: 'app-project-dash',
  templateUrl: './project-dash.component.html',
  styleUrls: ['./project-dash.component.scss']
})
export class ProjectDashComponent implements OnInit, OnDestroy {

  constructor(
    private _route: ActivatedRoute,
    private _headingService: HeadingService,
    private _projectService: ProjectService,
    private _intercepterService: IntercepterService

  ) {
    this._route.data
      .subscribe(res => {
        // console.log(res);

        this._headingService.heading$.next(res['title'])
      })
  }

  registredProject$!: Observable<number>
  runningProject$!: Observable<number>
  closedProject$!: Observable<number>
  canceledProject$!: Observable<number>
  dealyProject$!: Observable<number>
  ngOnInit(): void {
    this.registredProject$ = this._projectService.getAllProjectNumber()
    this.runningProject$ = this._projectService.getFilterProjectNumber(IprojectStatus.running)
    this.closedProject$ = this._projectService.getFilterProjectNumber(IprojectStatus.closed)
    this.canceledProject$ = this._projectService.getFilterProjectNumber(IprojectStatus.cancelled)
    this.dealyProject$ = this._projectService.getDealyProjectNumber()

    // this._projectService.getAllProject()
    //   .subscribe(res => {
    //     console.log(res);
    //     let dealyProject = []
    //     res.forEach(e => {
    //       // cl(projectArray)
    //       const utcDate = new Date(e.endDate);
    //       const localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));

    //       // console.log(localDate, '//// converted js date');

    //       // cl(e.endDate, '/////  databse date')

    //       if (localDate < new Date() && e.status === 'Running') {
    //         console.log(e);
    //         dealyProject.push(e)
    //       }
    //     })

    //     console.log(dealyProject.length);

    //   })




    // this.runningProject$ = this._http.get<any>(environment.firebaseDB + 'project.json')
    //   .pipe(
    //     map(res => {
    //       // console.log(res);
    //       let arr = []
    //       for (let key in res) {
    //         // console.log(res[key]);
    //         arr.push(res[key])
    //       }

    //       return arr.filter(e => e.status === 'Running').length
    //     }),
    //   )

  }

  ngOnDestroy(): void {
    this._intercepterService.unSubscribeAll()
  }

}
