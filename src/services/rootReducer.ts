import { combineReducers } from '@reduxjs/toolkit';
import {
  userReducer,
  ingredientsReducer,
  ordersReducer,
  feedsReducer,
  constructorReducer,
  newOrderReducer
} from '@slices';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  feeds: feedsReducer,
  newOrder: newOrderReducer,
  burgerConstructor: constructorReducer
});
