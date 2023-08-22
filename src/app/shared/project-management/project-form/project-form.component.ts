import { Component, OnDestroy, OnInit } from '@angular/core';
import { category, department, division, location, priority, reason, type } from '../../consts/project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadingService } from '../../services/heading.service';
import { IntercepterService } from '../../services/intercepter.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnDestroy {

  reason = reason
  type = type
  division = division
  category = category
  priority = priority
  department = department
  location = location


  projectForm!: FormGroup

  minDate!: Date;

  constructor(
    private _fb: FormBuilder,
    private _projectService: ProjectService,
    private _snackbarService: SnackbarService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _headingService: HeadingService,
    private _intercepterService: IntercepterService

  ) {
  }

  ngOnInit(): void {
    this.minDate = new Date();
    this.createProjectForm()
    // this.endDateDisable()

    this._route.data
      .subscribe(res => {
        // console.log(res);
        this._headingService.heading$.next(res['title'])
      })
  }


  createProjectForm(): FormGroup {
    return this.projectForm = this._fb.group({
      projectTheme: [null, Validators.required],
      reason: [null, Validators.required],
      type: [null, Validators.required],
      division: [null, Validators.required],
      category: [null, Validators.required],
      priority: [null, Validators.required],
      department: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      location: [null, Validators.required],
      status: ['Registred', Validators.required]
    })

  }

  endDateDisable() {
    this.projectForm.get('endDate')?.disable()
    this.projectForm.get('startDate')?.valueChanges
      .subscribe(res => {
        if (res) {
          this.projectForm.get('endDate')?.enable()
        } else {
          this.projectForm.get('endDate')?.disable()

        }
      })
  }
  onProjectFormSubmit() {
    if (this.projectForm.valid) {
      // console.log(this.projectForm.value);
      this._projectService.createProject(this.projectForm.value)
        .subscribe(res => {
          // console.log(res);
          this._snackbarService.openSnackbar(`${this.projectForm.get('projectTheme')?.value}Project Added Successfully`)
          this._router.navigate(['project-table'])
          this.projectForm.reset()
        })
    }

    // else {
    //   // this._snackbarService.openSnackbar(`Please Fill All Information ....!!!`)

    // }
  }

  ngOnDestroy(): void {
    this._intercepterService.unSubscribeAll()
  }
}


