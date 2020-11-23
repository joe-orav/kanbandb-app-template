import React, { useState } from "react"
import "./addCardControl.css"

const AddCardControl = ({ statuses, onClick }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("TODO")

  function handleSubmission() {
    let newName = name ? name : "Untitled Task"
    let newDesc = description ? description : "Edit Description"

    onClick(newName, newDesc, status)
    setName("")
    setDescription("")
    setStatus("TODO")
  }

  return (
    <div className="add-control">
      <input
        type="text"
        className="form-field add-control-text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="form-field add-control-text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="form-field add-control-status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {statuses.map((status) => (
          <option key={status.code} value={status.code}>
            {status.label}
          </option>
        ))}
      </select>
      <button className="form-btn" onClick={handleSubmission}>
        Add New
      </button>
    </div>
  )
}

export default AddCardControl
