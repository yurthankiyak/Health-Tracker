import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BloodSugarRecord {
  id: string;
  meal: string;
  status: string;
  date: string;
  time: string;
  glucoseValue: number;
  insulinDose: string;
}

export interface FoodRecord {
  id: string;
  name: string;
  calories: number;
  amount: string;
  unit: string;
}

export interface NutritionRecord {
  id: string;
  week: string;
  meal: string;
  foods: FoodRecord[];
  totalCalories: number;
  date: string;
}

interface AppState {
  bloodSugarRecords: BloodSugarRecord[];
  nutritionRecords: NutritionRecord[];
  
  // Blood Sugar Actions
  addBloodSugar: (record: Omit<BloodSugarRecord, 'id' | 'date' | 'time'>) => void;
  removeBloodSugar: (id: string) => void;
  
  // Nutrition Actions
  addFoodToMeal: (week: string, meal: string, food: Omit<FoodRecord, 'id'>) => void;
  removeFoodFromMeal: (mealId: string, foodId: string) => void;
  clearMeal: (mealId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      bloodSugarRecords: [],
      nutritionRecords: [],

      addBloodSugar: (record) => set((state) => {
        const now = new Date();
        const newRecord: BloodSugarRecord = {
          ...record,
          id: Math.random().toString(36).substring(7),
          date: now.toLocaleDateString('tr-TR').replace(/\./g, '-'),
          time: now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        };
        return { bloodSugarRecords: [...state.bloodSugarRecords, newRecord] };
      }),

      removeBloodSugar: (id) => set((state) => ({
        bloodSugarRecords: state.bloodSugarRecords.filter(r => r.id !== id)
      })),

      addFoodToMeal: (week, meal, food) => set((state) => {
        const date = new Date().toLocaleDateString('tr-TR').replace(/\./g, '-');
        // Find existing record for this week/meal/date
        const recordIndex = state.nutritionRecords.findIndex(
          r => r.week === week && r.meal === meal && r.date === date
        );

        const newFood: FoodRecord = {
          ...food,
          id: Math.random().toString(36).substring(7)
        };

        if (recordIndex > -1) {
          const updatedRecords = [...state.nutritionRecords];
          const record = updatedRecords[recordIndex];
          record.foods = [...record.foods, newFood];
          record.totalCalories = record.foods.reduce((sum, f) => sum + f.calories, 0);
          return { nutritionRecords: updatedRecords };
        } else {
          const newRecord: NutritionRecord = {
            id: Math.random().toString(36).substring(7),
            week,
            meal,
            date,
            foods: [newFood],
            totalCalories: food.calories
          };
          return { nutritionRecords: [...state.nutritionRecords, newRecord] };
        }
      }),

      removeFoodFromMeal: (mealId, foodId) => set((state) => ({
        nutritionRecords: state.nutritionRecords.map(r => {
          if (r.id === mealId) {
            const updatedFoods = r.foods.filter(f => f.id !== foodId);
            return {
              ...r,
              foods: updatedFoods,
              totalCalories: updatedFoods.reduce((sum, f) => sum + f.calories, 0)
            };
          }
          return r;
        })
      })),

      clearMeal: (mealId) => set((state) => ({
        nutritionRecords: state.nutritionRecords.filter(r => r.id !== mealId)
      }))
    }),
    {
      name: 'pregnancy-tracker-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
