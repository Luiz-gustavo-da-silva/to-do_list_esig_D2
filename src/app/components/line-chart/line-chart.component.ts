import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {


  constructor( private formBuilder: FormBuilder, private api: ApiService) {}

  public chart: any;
  formChart !: FormGroup;


  ngOnInit(): void {
    this.formChart = this.formBuilder.group({
      range: ['5'],
    });
    this.createChart();
    this.buscaDadosGrafico({range: '5'});
    this.setupFormChangeListeners();
  }
  

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: [], // Vamos atualizar esses valores
        datasets: [
          {
            label: "Tarefas Concluídas",
            data: [], // Vamos atualizar esses valores
            backgroundColor: '#4AD894',
            borderColor: '#4AD894',
            fill: false
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
          },
          y: {
            
            grid: {
              display: true
            },
            ticks: {
              stepSize: 1, // Define o tamanho do intervalo entre os valores do eixo y
              precision: 0 // Define a precisão dos valores exibidos (0 para valores inteiros)
            }
          }
        }
      }
    });
  }


 
  setupFormChangeListeners() {
    this.formChart.valueChanges.subscribe(() => {
      this.buscaDadosGrafico(this.formChart.value);
    });
  }

  buscaDadosGrafico(range?: any) {
    this.api.getGraphicData(range).subscribe({
      next: (res) => {

        console.log(res);
        const labels = res.map(data => data.dia);
        const dataPoints = res.map(data => data.quantidade);

        // Atualiza os valores dos labels e dataPoints
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = dataPoints;

        // Atualiza o gráfico
        this.chart.update();
      },
      error: () => {
        alert('Erro ao buscar os contadores da dashboard');
      },
    });
  }

}
