import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Iproject, IprojectStatus, PeriodicElement } from '../../model/project';
import { ProjectService } from '../../services/project.service';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HeadingService } from '../../services/heading.service';
import { IntercepterService } from '../../services/intercepter.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit, AfterViewInit, OnDestroy {

  projectArray: Iproject[] = []

  displayedColumns: string[] = ['projectname', 'reason', 'type', 'division', 'category', 'priority', 'dept', 'location', 'status', 'action1', 'action2', 'action3'];
  dataSource!: MatTableDataSource<Iproject>

  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _headingService: HeadingService,
    private _snackbar: SnackbarService,
    private _intercepterService: IntercepterService
  ) {
  }

  ngOnInit(): void {
    this._projectService.getAllProject()
      .subscribe(res => {
        // console.log(res);
        this.projectArray = res
        this.dataSource = new MatTableDataSource<Iproject>(this.projectArray);
        // console.log(this.dataSource, 'datasource');
        this.dataSource.paginator = this.paginator;

      })
    this._route.data
      .subscribe(res => {
        // console.log(res);
        this._headingService.heading$.next(res['title'])
      })


  }



  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  projectStatusHandler(id: string, status: string) {

    let obj = {
      status: status as IprojectStatus
    }
    this._projectService.updateProjectStatus(id, obj)
      .subscribe(res => {
        // console.log(res);
        this._snackbar.openSnackbar(`Status Changed to ${obj.status}`)
        this
        this._projectService.getAllProject()
          .subscribe(res => {
            // console.log(res);
            this.projectArray = res
            this.dataSource = new MatTableDataSource<Iproject>(this.projectArray);
            this.dataSource.paginator = this.paginator;

          })
      })
  }


  ngOnDestroy(): void {
    this._intercepterService.unSubscribeAll()
  }
}





