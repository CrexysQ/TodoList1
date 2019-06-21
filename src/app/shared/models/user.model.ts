import { TaskModule } from '.';

export interface User {
  id?: number;
  email: string;
  name: string;
  password: string;
  tasks?: TaskModule[];
  time?: {
    hours: number;
    minutes: number;
  };
  taskTime?: {
    hours: number;
    minutes: number;
  };
}
