import React from "react"
import "./status.css"
import Card from "./card"

const Status = ({ statusData, cards, cardRef, onCardDrop, displayModal,setEditCardValues }) => {
  function handleDragOver(e) {
    e.preventDefault()
  }

  function handleDrop(e) {
    onCardDrop(e.cardId, statusData.code)
  }

  return (
    <div className="status" onDragOver={handleDragOver} onDrop={handleDrop}>
      <p className="status-name">{statusData.label}</p>
      {cards.map((card) => (
        <Card key={card.id} cardData={card} cardRef={cardRef} displayModal={displayModal} setEditCardValues={setEditCardValues} />
      ))}
    </div>
  )
}
export default Status
