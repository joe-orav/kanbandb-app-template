import React from "react"
import "./card.css"

export const EditCardForm = ({
  displayForm,
  displayModal,
  statuses,
  editCardValues,
  setEditCardValues,
  updateCardData,
  deleteCard
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
        <input
          type="text"
          className="form-field edit-card-field"
          value={editCardValues.name}
          onChange={(e) => handleValueChange(e, setEditCardValues.name)}
        />
        <label className="edit-card-form-label">Description</label>
        <input
          type="text"
          className="form-field edit-card-field"
          value={editCardValues.desc}
          onChange={(e) => handleValueChange(e, setEditCardValues.desc)}
        />
        <label className="edit-card-form-label">Status</label>
        <select
          className="form-field edit-card-field"
          value={editCardValues.status}
          onChange={(e) => handleValueChange(e, setEditCardValues.status)}
        >
          {statuses.map((status) => (
            <option key={status.code} value={status.code}>
              {status.label}
            </option>
          ))}
        </select>
        <div className="edit-form-btn-group">
          <button
            className="edit-card-form-btn form-btn"
            onClick={handleCardUpdate}
          >
            Save
          </button>
          <button
            className="edit-card-form-btn form-btn cancel"
            onClick={handleFormCancel}
          >
            Cancel
          </button>
          <button className="edit-card-form-btn form-btn delete" onClick={handleCardDeletion}>Delete</button>
        </div>
      </form>
    </div>
  )
}

const Card = ({ cardData, cardRef, displayModal, setEditCardValues }) => {
  function hanldeDragStart(e) {
    e.cardId = cardData.id
  }

  function handleCardEdit() {
    setEditCardValues.id(cardData.id)
    setEditCardValues.name(cardData.name)
    setEditCardValues.desc(cardData.description)
    setEditCardValues.status(cardData.status)
    displayModal(true)
  }

  return (
    <div
      className="card"
      ref={cardRef}
      draggable
      onDragStart={hanldeDragStart}
      onClick={handleCardEdit}
    >
      <p className="card-text">{`${cardData.name}: ${cardData.description}`}</p>
    </div>
  )
}

export default Card
