export type HabitFrequency = "daily" | "weekly";

export type Habit = {
  id: string;
  title: string;
  description?: string;
  color: string;
  icon: string;
  frequency: HabitFrequency;
  targetCount: number;
  completedDates: string[];
  createdAt: string;
};
