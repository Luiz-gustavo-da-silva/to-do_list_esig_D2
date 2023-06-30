import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TaskDataService implements InMemoryDbService {
  createDb() {
    const Tasks = [
      {
        id: 1,
        title: 'teste1',
        deadline: '2023-06-16',
        description: 'aaaa',
        responsible: 'Luiz',
        priority: 'Média',
        situation: true,
      },
      {
        id: 2,
        title: 'teste2',
        deadline: '2023-06-16',
        description: 'bbbb',
        responsible: 'Luiza',
        priority: 'Grave',
        situation: true,
      },
      {
        id: 3,
        title: 'teste3',
        deadline: '2023-06-16',
        description: 'cccc',
        responsible: 'Julia',
        priority: 'Fácil',
        situation: true,
      },
      {
        id: 4,
        title: 'teste4',
        deadline: '2023-06-16',
        description: 'dddd',
        responsible: 'Raí',
        priority: 'Média',
        situation: true,
      },
      {
        id: 5,
        title: 'teste5',
        deadline: '2023-06-16',
        description: 'eeee',
        responsible: 'Alisson',
        priority: 'Grave',
        situation: true,
      },
      {
        id: 6,
        title: 'teste6',
        deadline: '2023-06-16',
        description: 'ffff',
        responsible: 'Laura',
        priority: 'Fácil',
        situation: true,
      },
      {
        id: 7,
        title: 'teste7',
        deadline: '2023-06-16',
        description: 'gggg',
        responsible: 'Gabriel',
        priority: 'Média',
        situation: true,
      }
    ];

    const Users = [{
      email:'luiz@gmail.com',
      senha:'1234',
    }]
    return { Tasks, Users };
  }
}
