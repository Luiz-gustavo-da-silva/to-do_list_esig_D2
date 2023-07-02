
export interface Task {
    id: number;
    title: string;
    responsible: string;
    description: string;
    priority: string;
    deadline: string;
    situation: boolean;
    conclusionData : string;
    file: any;
  }
  
export interface FilterCriteria {
    priority?: string;
    situation?: boolean;
    titleOrDescription?: string;
    responsible?: string;
    range: number;
  }
  
  