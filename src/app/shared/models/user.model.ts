export interface User {
  id?: number;
  email: string;
  name: string;
  password: string;
  isLogin: boolean;
  tasks?: string;
  time?: {
    hours: number;
    minutes: number;
  };
  taskTime?: {
    hours: number;
    minutes: number;
  };
}
