import React from 'react'

const Cancel = ({ setShowModal }) => {
  return (
    <button
      className="bg-Tangaroa rounded-md text-white py-3 px-10"
      onClick={() => setShowModal(false)}
    >
      Cancel
    </button>
  )
}

export default Cancel