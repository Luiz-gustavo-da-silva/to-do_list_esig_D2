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

  /**
   * Obtém os contadores das tarefas em diferentes situações.
   * @returns Um Observable que emite uma resposta contendo os contadores.
   */
  getAccountants(): Observable<any> {
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

  /**
   * Obtém os dados para um gráfico com base no intervalo de tempo fornecido.
   * @param range O intervalo de tempo para o gráfico.
   * @returns Um Observable que emite uma resposta contendo os dados do gráfico.
   */
  getGraphicData(
    range?: any
  ): Observable<{ dia: string; quantidade: number }[]> {
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
          if (dataConclusao <= today && dataConclusao >= endDate) {
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
   * e seta a data atual para a data de conclusão
   * @param data Os dados da tarefa a ser concluída.
   * @param id O ID da tarefa a ser concluída.
   * @returns Um Observable que emite uma resposta contendo a tarefa concluída.
   */
  concludeTask(data: Task, id: number): Observable<Task> {
    data.situation = false;
    data.conclusionData = new Date().toISOString().slice(0, 10);
    return this.http.put<Task>(`api/Tasks/${id}`, data);
  }

  /**
   * Filtra as tarefas com base nas informações fornecidas.
   * @param data Os critérios de filtro.
   * @returns Um Observable que emite uma resposta contendo as tarefas filtradas.
   */
  filterTask(data: FilterCriteria): Observable<Task[]> {
    const {priority , situation, titleOrDescription, range } = data;
    console.log(range);

    const today = new Date(); // Data atual
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - data.range
    );

    let queryString = `api/Tasks?`;

    if (priority) {
      queryString += `priority=${priority}&`;
    }

    if (situation) {
      queryString += `situation=${situation}&`;
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

    return this.http.get<Task[]>(queryString).pipe(
      map((tasks: Task[]) => {
        if (range != 0) {
          return tasks.filter((task) => {
            const conclusionDate = new Date(task.deadline);
            return conclusionDate >= endDate && conclusionDate <= today;
          });
        }

        return tasks;
      })
    );
  }

  /**
   * Realiza o login do usuário.
   * @param data Os dados de login do usuário.
   * @returns Um Observable que emite uma resposta contendo os detalhes do usuário logado.
   */
  loginUser(data: any): Observable<any> {
    const { login, senha } = data;
    return this.http.get<any>(`api/Users?login=${login}&senha=${senha}`);
  }

  
  /**
   * Recupera os dados do usuário.
   * @returns Um Observable que emite uma resposta contendo os dados do usuário logado.
   */
  getDataPerfil(): Observable<any>{
    return this.http.get<any>(`api/Users`);
  }
}
