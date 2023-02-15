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
import empty from "../assets/empty.jpg";

const ToDoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const [showModal, setShowModal] = useState(false);
  const [currentToDo, setCurrentToDo] = useState(null);
  const [newTask, setNewTask] = useState("");
  console.log(newTask);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todolist", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todolist"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const handleAddTodo = (task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(addTodo({ task: task, id: Date.now() }));
      setNewTask("");
      setShowModal(true);
    }
  };

  const handleUpdateToDo = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(updateTodo({ task: task, id: id }));
      setShowModal(false);
    }
  };

  const handleDeleteToDo = (id) => {
    const updatedToDoList = todoList.filter((todo) => todo.id != id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
  };
  const handleSort = (sortCriteria) => {
    dispatch(sortTodo(sortCriteria));
  };

  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };

  return (
    <div>
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
                    onClick={() => setShowModal(false)}
                    className="bg-Tangaroa rounded-md text-white py-3 px-10"
                  >
                    Cancel
                  </button>
                </>
              ) : (
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

      <div className="flex items-center justify-center flex-col">
        {todoList.length === 0 ? (
          <>
            <div className="mb-8">
              <div className="sm:w-[500px] sm:h-[500px] min-w-[250px]">
                <img src={empty} alt="" />
              </div>
              <p className="text-center text-Gray">
                You have no todo's, please add one.
              </p>
            </div>
          </>
        ) : (
          <div className="container mx-auto mt-6">
            <div className="flex justify-center mb-6">
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="p-1 outline-none bg-red-200 rounded-md"
              >
                <option value="All" className="text-sm">
                  All
                </option>
                <option value="Completed" className="text-sm">
                  Completed
                </option>
                <option value="Not Completed" className="text-sm">
                  Not Completed
                </option>
              </select>
            </div>
            {sortToDoList.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between mb-6 bg-orange-200 mx-auto w-full md:w-[75%] rounded-md p-4"
              >
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
