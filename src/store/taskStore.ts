import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Task, TaskPriority } from "../types/task";
import { createId, todayKey } from "../utils/date";

type TaskState = {
  tasks: Task[];
  addTask: (payload: { title: string; description?: string; category: string; priority: TaskPriority; dueDate?: string }) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearTasks: () => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: "task_seed_1",
          title: "Build TaskFlow dashboard",
          description: "Create a clean resume-ready mobile dashboard.",
          category: "Study",
          priority: "high",
          dueDate: todayKey(),
          status: "todo",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "task_seed_2",
          title: "Practice React Native forms",
          category: "Study",
          priority: "medium",
          dueDate: todayKey(),
          status: "completed",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      addTask: (payload) =>
        set((state) => ({
          tasks: [
            {
              id: createId("task"),
              title: payload.title,
              description: payload.description,
              category: payload.category,
              priority: payload.priority,
              dueDate: payload.dueDate || todayKey(),
              status: "todo",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            ...state.tasks
          ]
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, status: task.status === "completed" ? "todo" : "completed", updatedAt: new Date().toISOString() }
              : task
          )
        })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      clearTasks: () => set({ tasks: [] })
    }),
    {
      name: "taskflow-tasks",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
