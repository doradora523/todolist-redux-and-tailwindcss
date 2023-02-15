import { configureStore } from "@reduxjs/toolkit";

import TodoReducer from "../reducers/ToDoSlice";

const store = configureStore({
  reducer: { todo: TodoReducer },
});

export default store;
