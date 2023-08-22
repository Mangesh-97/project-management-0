import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { IprojectStatus } from 'src/app/shared/model/project';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project-chart',
  templateUrl: './project-chart.component.html',
  styleUrls: ['./project-chart.component.scss']
})
export class ProjectChartComponent implements OnInit {

  StrategyDepReg!: number
  StrategyDepClose!: number

  financeDepReg!: number
  financeDepClose!: number

  qualityDepReg!: number
  qualityDepClose!: number

  maintenanceDepReg!: number
  maintenanceDepClose!: number

  StoresDepReg!: number
  StoresDepClose!: number

  public barChartLegend = true;
  public barChartPlugins = [];
  barChartData!: ChartConfiguration<'bar'>['data']
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  constructor(
    private _projectService: ProjectService
  ) {
    this._projectService.getAllProject()
      .subscribe(res => {
        // console.log(res);

        this.StrategyDepReg = res.filter(e => e.department === 'Strategy').length
        this.StrategyDepClose = res.filter(e => e.department === 'Strategy' && e.status === IprojectStatus.closed).length

        this.financeDepReg = res.filter(e => e.department === 'Finance').length
        this.financeDepClose = res.filter(e => e.department === 'Finance' && e.status === IprojectStatus.closed).length


        this.qualityDepReg = res.filter(e => e.department === 'Quality').length
        this.qualityDepClose = res.filter(e => e.department === 'Quality' && e.status === IprojectStatus.closed).length


        this.maintenanceDepReg = res.filter(e => e.department === 'Maintenance').length
        this.maintenanceDepClose = res.filter(e => e.department === 'Maintenance' && e.status === IprojectStatus.closed).length

        this.StoresDepReg = res.filter(e => e.department === 'Stores').length
        this.StoresDepClose = res.filter(e => e.department === 'Stores' && e.status === IprojectStatus.closed).length

        // console.log(this.StrategyDepReg);
        // console.log(this.financeDepReg);
        // console.log(this.qualityDepReg);
        // console.log(this.maintenanceDepReg);
        // console.log(this.StoresDepReg);

        this.barChartData = {
          labels: ['STR', 'FIN', 'QLT', 'MAN', 'STO'],
          datasets: [
            {
              data: [this.StrategyDepReg, this.financeDepReg, this.qualityDepReg, this.maintenanceDepReg, this.StoresDepReg], label: 'Target', backgroundColor: '#075ea5', barPercentage: 0.5,

            },
            {
              data: [this.StrategyDepClose, this.financeDepClose, this.qualityDepClose, this.maintenanceDepClose, this.StoresDepClose], label: 'Actual', backgroundColor: '#5bab4c', barPercentage: 0.5
            }
          ],


        };
      })

  }

  ngOnInit(): void {


  }







}
