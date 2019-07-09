import { Task } from '.';
import { Time } from './time';

export interface User {
  id?: number;
  email: string;
  name: string;
  password: string;
  tasks?: Task[];
  theme?: string;
  time?: Time;
}
