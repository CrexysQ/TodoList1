import { TaskModule } from '.';
import { Time } from './time';

export interface User {
  id?: number;
  email: string;
  name: string;
  password: string;
  tasks?: TaskModule[];
  theme?: string;
  time?: Time;
}
