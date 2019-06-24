import { TaskModule } from '.';

export interface User {
  id?: number;
  email: string;
  name: string;
  password: string;
  tasks?: TaskModule[];
  theme?: string;
  time?: {
    hours: number;
    minutes: number;
  };
  taskTime?: {
    hours: number;
    minutes: number;
  };
}
