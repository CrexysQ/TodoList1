export interface TaskModule {
    status: boolean;
    text: string;
    taskStatus: number;
    taskTime: {
      hours: number;
      minutes: number;
    };
}
