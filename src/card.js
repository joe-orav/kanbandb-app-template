import React from "react"
import "./card.css"

const Card = ({ cardData, cardRef, displayModal, setEditCardValues }) => {
  function handleDragStart(e) {
    e.dataTransfer.setData("id", cardData.id)
    e.target.classList.add("drag")
  }

  function handleDragEnd(e) {
    if(!e.dataTransfer.getData("id")) {
      e.target.classList.remove("drag")
    }
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
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleCardEdit}
    >
      <p className="card-text">{`${cardData.name}: ${cardData.description}`}</p>
    </div>
  )
}

export default Card
