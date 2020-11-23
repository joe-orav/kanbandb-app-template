import React from "react"
import "../styles/editCardForm.css"
import InputField from "./inputField"
import Button from "./button"
import StatusSelectField from "./statusSelectField"

export const EditCardForm = ({
  displayForm,
  displayModal,
  statuses,
  editCardValues,
  setEditCardValues,
  updateCardData,
  deleteCard,
}) => {
  function handleFormCancel(e) {
    e.preventDefault()
    displayModal(false)
  }

  function handleValueChange(e, setFunction) {
    e.preventDefault()
    setFunction(e.target.value)
  }

  function handleCardUpdate(e) {
    e.preventDefault()
    updateCardData(
      editCardValues.id,
      editCardValues.status,
      editCardValues.name,
      editCardValues.desc
    )
    displayModal(false)
  }

  function handleCardDeletion(e) {
    e.preventDefault()
    deleteCard(editCardValues.id)
    displayModal(false)
  }

  return (
    <div className={`form-overlay ${!displayForm && "hide"}`}>
      <form className="edit-card-form">
        <p className="edit-card-form-header">Edit Card</p>
        <label className="edit-card-form-label">Name</label>
        <InputField
          className="edit-card-field"
          value={editCardValues.name}
          onChange={(e) => handleValueChange(e, setEditCardValues.name)}
          placeholder=""
        />
        <label className="edit-card-form-label">Description</label>
        <InputField
          className="edit-card-field"
          value={editCardValues.desc}
          onChange={(e) => handleValueChange(e, setEditCardValues.desc)}
          placeholder=""
        />
        <label className="edit-card-form-label">Status</label>
        <StatusSelectField
          statuses={statuses}
          value={editCardValues.status}
          onChange={(e) => handleValueChange(e, setEditCardValues.status)}
          className="edit-card-field"
        />
        <div className="edit-form-btn-group">
          <Button
            label="Delete"
            className="edit-card-form-btn delete"
            onClick={handleCardDeletion}
          />
          <Button
            label="Save"
            className="edit-card-form-btn"
            onClick={handleCardUpdate}
          />
          <Button
            label="Cancel"
            className="edit-card-form-btn cancel"
            onClick={handleFormCancel}
          />
        </div>
      </form>
    </div>
  )
}

export default EditCardForm
