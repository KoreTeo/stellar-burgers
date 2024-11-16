import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: (state, action: PayloadAction<TIngredient>) => {
      const ingredient: TConstructorIngredient = {
        ...action.payload,
        id: nanoid()
      };

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeConstructorItem: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveConstructorItem: (
      state,
      action: PayloadAction<{ index: number; move: 'up' | 'down' }>
    ) => {
      const { index, move } = action.payload;

      if (move === 'up') {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      } else if (move === 'down') {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorState: (state) => state
  }
});

export const constructorReducer = constructorSlice.reducer;
export const { getConstructorState } = constructorSlice.selectors;
export const {
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItem,
  clearConstructor
} = constructorSlice.actions;
