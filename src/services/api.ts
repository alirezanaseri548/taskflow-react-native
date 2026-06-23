import type { Task } from "../types/task";
import type { Habit } from "../types/habit";

const API_BASE_URL = "http://localhost:3000";

export async function syncTasksToBackend(tasks: Task[]) {
  return fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tasks })
  });
}

export async function syncHabitsToBackend(habits: Habit[]) {
  return fetch(`${API_BASE_URL}/habits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ habits })
  });
}
