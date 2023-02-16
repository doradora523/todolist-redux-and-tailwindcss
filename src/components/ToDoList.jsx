import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
} from "../reducers/ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import NoToDoMessage from "./NoToDoMessage";
import SortCriteria from "./SortCriteria";

const ToDoList = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentToDo, setCurrentToDo] = useState(null);
  const [newTask, setNewTask] = useState("");

  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
    // 투두리스트의 갯수가 1개 이상일 때 로컬스토리지에 "todoList" 로 투두리스트를 담아둔다.
  }, [todoList]);
  // todoList의 값이 변하는 지 감시

  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    // 변수 localTodoList 에 로컬스토리지에 있는 todoList의 값을 담는다.
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
    // 변수 localTodoList 의 값이 true 이면, 즉 todoList의 값이 담겨있으면 reducer의 action 중 setTodoList의 state 값을 localTodoList의 값으로 변경한다.
  }, []);

  const handleAddTodo = (task) => {
    if (task.trim().length === 0) {
      // task의 공백을 제거한 문자열이 0 일 경우
      alert("Please enter a task");
    } else {
      // 0 이 아닌 경우
      dispatch(addTodo({ task: task, id: Date.now() })); // addTodo action을 불러와서 state값의 task와 id를 payload와 같이 바꿔준다.
      setShowModal(true); // modal 창을 띄운다.
      setNewTask(""); // input 창의 value값을 삭제한다.
    }
  };

  const handleUpdateToDo = (id, task) => {
    //함수를 호출할 때 인자로 id와 task를 받는다.
    if (task.trim().length === 0) {
      // task의 공백을 제외한 문자열이 0 일 경우,
      alert("Please enter a task");
    } else {
      // 0이 아닌 경우,
      dispatch(updateTodo({ task: task, id: id })); // updateTodo action을 불러와서 state값의 task와 id를 payload와 같이 바꿔준다.
      setShowModal(false); // modal 창을 끈다.
    }
  };

  const handleDeleteToDo = (id) => {
    // 함수 호출 시 인자로 id를 받아온다.
    const updatedToDoList = todoList.filter((todo) => todo.id !== id); // 변수 updatedToDoList에 state: todoList 에서 todo의 state중 id 가 받아온 인자값 id(지우고싶은 doto.id)와 같지 않은 todoList만 변수에 담아준다.
    dispatch(setTodoList(updatedToDoList)); // action setTodoList를 불러와 변수에 담긴 새로운 todoList로 state를 변경한다.
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList)); // 로컬스토리지에 있는 "todoList"도 updatedToDoList로 바꿔준다.
  };

  const sortToDoList = todoList.filter((todo) => {
    // 변수 sortToDoList에 todoList를 필터링하여 선택된 todoList를 담아준다.
    if (sortCriteria === "All") return true; // sort가 "All" 인 경우 true를 리턴한다.
    if (sortCriteria === "Completed" && todo.completed) return true; // sort가 "Completed" 이며 todo의 state 중 completed가 true 인 경우 true를 리턴한다.
    if (sortCriteria === "Not Completed" && !todo.completed) return true; // sort가 "Not Completed" 이며 todo의 state 중 completed가 false 인 경우 true를 리턴한다.
    return false; // 조건문에 해당하지 않는 경우 false를 리턴한다.
  });

  const handleToggleCompleted = (id) => {
    // 함수 호출시 받아온 인자값 id
    dispatch(toggleCompleted({ id })); // action toggleCompleted 를 호출하여 state값에 받아온 id를 넣어주어 함수를 실행시킨다.
  };

  return (
    <div>
      {/* showModal 이 true 일때 보여줄 Modal UI */}
      {showModal && (
        <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
          <div className="bg-white p-8 rounded-md w-[350px]">
            <input
              type="text"
              className="border p-2 rounded-md outline-none mb-8 w-full"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={
                currentToDo ? "Update your task here" : "Enter your task here"
              }
            />
            <div className="flex justify-between">
              {currentToDo ? (
                // currentToDo 의 값이 있을 때 보여줄 button (Save/Cancel)
                <>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleUpdateToDo(currentToDo.id, newTask);
                    }}
                    className="bg-sunsetOrange rounded-md text-white py-3 px-10"
                  >
                    Save
                  </button>

                  <button
                    className="bg-Tangaroa rounded-md text-white py-3 px-10"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                // currentToDo 의 값이 없을 때 보여줄 button (Cancel/Add)
                <>
                  <button
                    className="bg-Tangaroa rounded-md text-white py-3 px-10"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-sunsetOrange text-white py-3 px-10 rounded-md"
                    onClick={() => {
                      handleAddTodo(newTask);
                      setShowModal(false);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* todoList 를 보여줄 UI */}
      <div className="flex items-center justify-center flex-col">
        {todoList.length === 0 ? (
          // todoList가 없을 때 보여줄 UI
          <NoToDoMessage />
        ) : (
          // todoList가 있을 때 보여줄 UI
          <div className="container mx-auto mt-6">
            <SortCriteria />

            {sortToDoList.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between mb-6 bg-orange-200 mx-auto w-full md:w-[75%] rounded-md p-4"
              >
                {/* todos */}
                <div
                  className={`${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-sunsetOrange"
                  }`}
                  onClick={() => {
                    handleToggleCompleted(todo.id);
                  }}
                >
                  {todo.task}
                </div>

                {/* buttons (update/delete) */}
                <div>
                  <button
                    className="bg-blue-500 text-white p-1 rounded-md ml-2"
                    onClick={() => {
                      setShowModal(true);
                      setCurrentToDo(todo);
                      setNewTask(todo.task);
                    }}
                  >
                    <TiPencil />
                  </button>
                  <button
                    className="bg-sunsetOrange text-white p-1 rounded-md ml-2"
                    onClick={() => handleDeleteToDo(todo.id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Task 버튼 컴포넌트 */}
        <button
          className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
          onClick={() => setShowModal(true)}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
