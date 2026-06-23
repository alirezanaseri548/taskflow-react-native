import type { Task } from "../types/task";
import type { Habit } from "../types/habit";
import { todayKey } from "./date";

export function taskCompletionRate(tasks: Task[]) {
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter((task) => task.status === "completed").length / tasks.length) * 100);
}

export function completedHabitsToday(habits: Habit[]) {
  const today = todayKey();
  return habits.filter((habit) => habit.completedDates.includes(today)).length;
}

export function habitStreak(habit: Habit) {
  let streak = 0;
  const dates = new Set(habit.completedDates);
  const cursor = new Date();

  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
