export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "completed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};
