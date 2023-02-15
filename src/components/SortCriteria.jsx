import React from 'react'
import { useDispatch} from "react-redux";
import {
  sortTodo,
} from "../reducers/ToDoSlice";

const SortCriteria = () => {
  const dispatch = useDispatch();

  const handleSort = (sortCriteria) => {
    dispatch(sortTodo(sortCriteria));
  }; // 함수 호출 시 인자로 받은 sortCriteria를 action sortTodo를 dispatch로 불러와 state값 sortCriteria를 받은 인자값으로 바꿔준다.

  return (
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
  )
}

export default SortCriteria