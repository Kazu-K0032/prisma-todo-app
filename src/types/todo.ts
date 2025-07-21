// 'Todo'の型
export interface Todo {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  due_date: Date;
  created_at: Date;
  updated_at: Date;
};
