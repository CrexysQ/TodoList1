export interface Task {
    status: boolean;
    name: string;
    description: string;
    taskStatus: number;
    taskTime: {
      hours: number;
      minutes: number;
    };
}
