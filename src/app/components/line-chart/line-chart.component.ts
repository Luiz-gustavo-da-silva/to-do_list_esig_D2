import { Component, OnInit } from '@angular/core';
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
  
  /**
   * Cria o gráfico usando a biblioteca Chart.js.
   */
  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: [], 
        datasets: [
          {
            label: "Tarefas Concluídas",
            data: [], 
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
              stepSize: 1,
              precision: 0 
            }
          }
        }
      }
    });
  }

  /**
   * Configura os observadores de alteração do formulário.
   */
  setupFormChangeListeners() {
    this.formChart.valueChanges.subscribe(() => {
      this.buscaDadosGrafico(this.formChart.value);
    });
  }

 /**
   * Busca os dados do gráfico da API.
   * @param range O intervalo de tempo dos dados a ser buscado.
   */
  buscaDadosGrafico(range?: any) {
    this.api.getGraphicData(range).subscribe({
      next: (res) => {

        const labels = res.map(data => data.dia);
        const dataPoints = res.map(data => data.quantidade);

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = dataPoints;

        this.chart.update();
      },
      error: () => {
        alert('Erro ao buscar os contadores da dashboard');
      },
    });
  }

}
