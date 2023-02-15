import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  sortCriteria: "All",
};

const ToDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload; // state의 todoList를 받아온 payload 값으로 넣어준다.
    },
    addTodo: (state, action) => {
      state.todoList.push({ // state의 todoList에 받아온 payload 값을 추가로 넣어준다.
        id: action.payload.id, // id : payload.id
        task: action.payload.task, // task : payload.task
        completed: false, 
      });
    },
    sortTodo: (state, action) => {
      state.sortCriteria = action.payload; // state의 sortCriteria를 받아온 payload 값으로 넣어준다.
    },
    updateTodo: (state, action) => {
      const { id, task } = action.payload; // 받아온 payload를 각각 id 와 task 변수에 담는다.
      const index = state.todoList.findIndex((todo) => todo.id === id); // todoList에서 todo의 id 가 payload 의 값이 담긴 id 와 일치하는 인덱스 번호를 찾아 변수 index에 담아준다. 
      state.todoList[index].task = task; // todoList의 task에 찾은 인덱스와 일치하는 task로 바꿔준다.
    },
    toggleCompleted: (state, action) => {
      const { id } = action.payload; // 받아온 payload를 id 변수에 담는다.
      const index = state.todoList.findIndex((todo) => todo.id === id); // todoList에서 todo의 id 가 payload 의 값이 담긴 id 와 일치하는 인덱스 번호를 찾아 변수 index에 담아준다. 
      state.todoList[index].completed = !state.todoList[index].completed; // todoList의 completed에 찾은 인덱스와 일치하는 completed로 바꿔준다.
    },
  },
});

// ToDoSlice의 actions 내보내기
export const { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted } =
  ToDoSlice.actions;

export default ToDoSlice.reducer;
