import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Habit } from "../types/habit";
import { createId, todayKey } from "../utils/date";

type HabitState = {
  habits: Habit[];
  addHabit: (payload: { title: string; description?: string; color: string; icon: string; targetCount: number }) => void;
  toggleToday: (id: string) => void;
  deleteHabit: (id: string) => void;
  clearHabits: () => void;
};

export const useHabitStore = create<HabitState>()(
  persist(
    (set) => ({
      habits: [
        {
          id: "habit_seed_1",
          title: "Read 20 minutes",
          description: "Daily learning habit.",
          color: "#2563EB",
          icon: "book",
          frequency: "daily",
          targetCount: 1,
          completedDates: [],
          createdAt: new Date().toISOString()
        },
        {
          id: "habit_seed_2",
          title: "Workout",
          color: "#16A34A",
          icon: "fitness",
          frequency: "daily",
          targetCount: 1,
          completedDates: [todayKey()],
          createdAt: new Date().toISOString()
        }
      ],
      addHabit: (payload) =>
        set((state) => ({
          habits: [
            {
              id: createId("habit"),
              title: payload.title,
              description: payload.description,
              color: payload.color,
              icon: payload.icon,
              frequency: "daily",
              targetCount: payload.targetCount,
              completedDates: [],
              createdAt: new Date().toISOString()
            },
            ...state.habits
          ]
        })),
      toggleToday: (id) =>
        set((state) => {
          const today = todayKey();
          return {
            habits: state.habits.map((habit) => {
              if (habit.id !== id) return habit;
              const exists = habit.completedDates.includes(today);
              return {
                ...habit,
                completedDates: exists
                  ? habit.completedDates.filter((date) => date !== today)
                  : [today, ...habit.completedDates]
              };
            })
          };
        }),
      deleteHabit: (id) => set((state) => ({ habits: state.habits.filter((habit) => habit.id !== id) })),
      clearHabits: () => set({ habits: [] })
    }),
    {
      name: "taskflow-habits",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
