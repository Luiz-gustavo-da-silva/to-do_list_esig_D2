import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit{

  ngOnInit(): void {
    this.createChart();
  }
  
  public chart: any;

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'line', 
      data: {// values on X-Axis
        labels: ['05/10', '05/11', '05/12','05/13',
								 '05/14', '05/15', '05/16','05/17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: '#4AD894',
            borderColor: '#4AD894', // Define a cor da linha igual à cor dos pontos
            fill: false // Desativa o preenchimento abaixo da linha
          } 
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            display: false // Desativa a exibição da legenda
          }
        },
        scales: {
          x: {
            grid: {
              display: false // Remove as linhas de grade verticais
            }
          },
          y: {
            grid: {
              display: true // Mantém as linhas de grade horizontais
            }
          }
        }
      }
      
    });
  }

  

}
