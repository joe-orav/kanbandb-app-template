import React, { useState } from "react"
import "./addCardControl.css"

const AddCardControl = ({ statuses, onClick }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("TODO")

  return (
    <div className="add-control">
      <input
        type="text"
        className="add-control-text add-control-field"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="add-control-text add-control-field"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="add-control-field add-control-status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {statuses.map((status) => (
          <option key={status.code} value={status.code}>
            {status.label}
          </option>
        ))}
      </select>
      <button
        className="add-control-btn"
        onClick={() => onClick(name, description, status)}
      >
        Add New
      </button>
    </div>
  )
}

export default AddCardControl
