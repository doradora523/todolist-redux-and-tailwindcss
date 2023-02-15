import React from 'react'
import empty from "../assets/empty.jpg";

const NoToDoMessage = () => {
  return (
    <div className="mb-8">
      <div className="sm:w-[500px] sm:h-[500px] min-w-[250px]">
        <img src={empty} alt="" />
      </div>
      <p className="text-center text-Gray">
        You have no todo's, please add one.
      </p>
    </div>
  )
}

export default NoToDoMessage