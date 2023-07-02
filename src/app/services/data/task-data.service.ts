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
        situation: false,
        conclusionData:'2023-06-15',
        file: '',
      },
      {
        id: 2,
        title: 'teste2',
        deadline: '2023-06-16',
        description: 'bbbb',
        responsible: 'Luiza',
        priority: 'Alta',
        situation: false,
        conclusionData:'2023-06-15',
        file: '',
      },
      {
        id: 3,
        title: 'teste3',
        deadline: '2023-06-16',
        description: 'cccc',
        responsible: 'Julia',
        priority: 'Baixa',
        situation: true,
        conclusionData:'',
        file: '',
      },
      {
        id: 4,
        title: 'teste4',
        deadline: '2023-06-16',
        description: 'dddd',
        responsible: 'Raí',
        priority: 'Média',
        situation: true,
        conclusionData:'',
        file: '',
      },
      {
        id: 5,
        title: 'teste5',
        deadline: '2023-06-16',
        description: 'eeee',
        responsible: 'Alisson',
        priority: 'Alta',
        situation: true,
        conclusionData:'',
        file: '',
      },
      {
        id: 6,
        title: 'teste6',
        deadline: '2023-06-16',
        description: 'ffff',
        responsible: 'Laura',
        priority: 'Baixa',
        situation: true,
        conclusionData:'',
        file: '',
      },
      {
        id: 7,
        title: 'teste7',
        deadline: '2023-06-16',
        description: 'gggg',
        responsible: 'Gabriel',
        priority: 'Média',
        situation: true,
        conclusionData:'',
        file: '',
      }
    ];

    const Users = [{
      email:'luiz@gmail.com',
      senha:'1234',
      nome:'Luiz',
      idade:21,
    }]
    return { Tasks, Users };
  }
}
