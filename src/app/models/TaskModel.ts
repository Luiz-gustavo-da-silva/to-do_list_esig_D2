
export interface Task {
    id: number;
    title: string;
    responsible: string;
    description: string;
    priority: string;
    deadline: string;
    situation: boolean;
  }
  
export interface FilterCriteria {
    number?: number;
    situation?: boolean;
    titleOrDescription?: string;
    responsible?: string;
  }
  
  