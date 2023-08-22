import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from './project-form/project-form.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectTableComponent } from './project-table/project-table.component';
import { ProjectDashComponent } from './project-dash/project-dash.component';
import { ProjectChartComponent } from './project-dash/project-chart/project-chart.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    ProjectFormComponent,
    ProjectTableComponent,
    ProjectDashComponent,
    ProjectChartComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgChartsModule,
    FormsModule
  ]
})
export class ProjectManagementModule { }
