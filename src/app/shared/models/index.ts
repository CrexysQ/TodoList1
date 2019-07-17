export interface Task {
    status: boolean;
    name: string;
    description: string;
    taskStatus: number;
    taskDate: Date;
    taskTime: {
      hours: number;
      minutes: number;
    };
}
