import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { FilterCriteria, Task } from '../models/TaskModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Obtém as tarefas que possuem situação igual a true (Em andamento).
   * @returns Um Observable que emite uma resposta contendo as tarefas.
   */
  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>('api/Tasks');
  }

  getContadores(): Observable<any> {
    const numTasksEmAndamento = this.http.get<Task[]>(
      'api/Tasks?situation=true'
    );
    const numTasksConcluidas = this.http.get<Task[]>(
      'api/Tasks?situation=false'
    );

    return forkJoin([numTasksEmAndamento, numTasksConcluidas]).pipe(
      map(([tasksEmAndamento, tasksConcluidas]) => {
        const countEmAndamento = tasksEmAndamento.length;
        const countConcluidas = tasksConcluidas.length;

        const dataAtual = new Date();
        const countAtrasadas = tasksEmAndamento.filter(
          (task) => new Date(task.deadline) < dataAtual
        ).length;

        return {
          numTasksEmAndamento: countEmAndamento,
          numTasksConcluidas: countConcluidas,
          numTasksAtrasadas: countAtrasadas,
        };
      })
    );
  }

  getDadosGrafico(
    range?: any
  ): Observable<{ dia: string; quantidade: number }[]> {
    // console.log(range.range);

    const today = new Date(); // Data atual
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - range.range
    );

    return this.http.get<Task[]>('api/Tasks?situation=false').pipe(
      map((tasks: Task[]) => {
        const tarefasPorDia: { [key: string]: number } = {};

        tasks.forEach((task) => {
          const dataConclusao = new Date(task.conclusionData);
          // console.log(dataConclusao);
          if (dataConclusao <= today && dataConclusao >= endDate) {
            // Verifica se a data de conclusão está dentro do range especificado
            const dia = dataConclusao.toLocaleDateString();
            if (tarefasPorDia[dia]) {
              tarefasPorDia[dia]++;
            } else {
              tarefasPorDia[dia] = 1;
            }
          }
        });

        return Object.keys(tarefasPorDia).map((dia) => ({
          dia,
          quantidade: tarefasPorDia[dia],
        }));
      })
    );
  }

  /**
   * Cria uma nova tarefa.
   * @param data Os dados da tarefa a ser criada.
   * @returns Um Observable que emite uma resposta contendo a tarefa criada.
   */
  postTask(data: Task): Observable<Task> {
    return this.http.post<Task>('api/Tasks', data);
  }

  /**
   * Exclui uma tarefa pelo seu ID.
   * @param id O ID da tarefa a ser excluída.
   * @returns Um Observable que emite uma resposta vazia.
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`api/Tasks/${id}`);
  }

  /**
   * Atualiza uma tarefa existente.
   * @param data Os novos dados da tarefa.
   * @param id O ID da tarefa a ser atualizada.
   * @returns Um Observable que emite uma resposta contendo a tarefa atualizada.
   */
  putTask(data: Task, id: number): Observable<Task> {
    return this.http.put<Task>(`api/Tasks/${id}`, data);
  }

  /**
   * Conclui uma tarefa, definindo sua situação como false (concluído).
   * @param data Os dados da tarefa a ser concluída.
   * @param id O ID da tarefa a ser concluída.
   * @returns Um Observable que emite uma resposta contendo a tarefa concluída.
   */
  concludeTask(data: Task, id: number): Observable<Task> {
    data.situation = false;
    data.conclusionData = new Date().toISOString().slice(0, 10);
    return this.http.put<Task>(`api/Tasks/${id}`, data);
  }

  //Essa consulta está ineficiente, pois estou tratando os dados localmente.
  //Imagino que com uma grande quantidade de dados, essa abordagem se torne
  //completamente obsoleta. No entanto, optei por fazê-la dessa forma para
  //permitir consultas em colunas diferentes usando o in-memory-web-api, que
  //não suporta consultas combinadas.
  /**
   * Filtra as tarefas com base nas informações fornecidas.
   * @param data Os critérios de filtro.
   * @returns Um Observable que emite uma resposta contendo as tarefas filtradas.
   */
  filterTask(data: FilterCriteria): Observable<Task[]> {
    const { number, situation, titleOrDescription, responsible } = data;
    let queryString = `api/Tasks?`;

    if (number) {
      queryString += `id=${number}&`;
    }

    if (situation) {
      queryString += `situation=${situation}&`;
    }

    if (responsible) {
      queryString += `responsible=${responsible}&`;
    }

    if (titleOrDescription) {
      const tituloRequest = this.http.get<Task[]>(
        `${queryString}title=${titleOrDescription}`
      );
      const descricaoRequest = this.http.get<Task[]>(
        `${queryString}description=${titleOrDescription}`
      );

      return forkJoin([tituloRequest, descricaoRequest]).pipe(
        map((results) => {
          const [tituloResponse, descricaoResponse] = results;
          return [...tituloResponse, ...descricaoResponse];
        })
      );
    }

    queryString = queryString.slice(0, -1);

    return this.http.get<Task[]>(queryString);
  }

  // Esse método foi crriado só parra simular uma login de um usuário
  /**
   * Realiza o login do usuário.
   * @param data Os dados de login do usuário.
   * @returns Um Observable que emite uma resposta contendo os detalhes do usuário logado.
   */
  loginUser(data: any): Observable<any> {
    const { login, senha } = data;
    return this.http.get<any>(`api/Users?login=${login}&senha=${senha}`);
  }
}
