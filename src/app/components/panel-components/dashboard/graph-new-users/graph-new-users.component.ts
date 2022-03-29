import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graph-new-users',
  templateUrl: './graph-new-users.component.html',
  styleUrls: ['./graph-new-users.component.scss'],
})
export class GraphNewUsersComponent implements OnInit {
  @Input() type: ChartType = 'bar';
  @Input() title = 'titulo';
  // @Input() type = 'bar';
  myChart!: Chart;
  @ViewChild('graphic', {
    static: true,
  })
  graphic!: ElementRef;
  constructor() {}
  ngOnInit(): void {
    this.initGraph();
  }

  initGraph(): void {
    const ctx = this.graphic.nativeElement.getContext('2d');
    this.myChart = new Chart(ctx, {
      type: this.type,
      data: {
        labels: [
          'Noviembre',
          'Diciembre',
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
        ],
        datasets: [
          {
            label: this.title,
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
