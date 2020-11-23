import React, { useState } from "react"
import "../styles/addCardControl.css"
import StatusSelectField from "./statusSelectField"
import Button from "./button"
import InputField from "./inputField"

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
      <InputField
        value={name}
        className="add-control-text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <InputField
        value={description}
        className="add-control-text"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <StatusSelectField
        statuses={statuses}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="add-control-status"
      />
      <Button label="Add New" onClick={handleSubmission} className="" />
    </div>
  )
}

export default AddCardControl
