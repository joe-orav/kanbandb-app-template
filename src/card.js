import React from "react"
import "./card.css"
import { useDrag } from "react-dnd"

const Card = ({ cardData, displayModal, setEditCardValues }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      id: cardData.id,
      type: "card",
    },
    isDragging: (monitor) => cardData.id === monitor.getItem().id,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  function handleCardEdit() {
    setEditCardValues.id(cardData.id)
    setEditCardValues.name(cardData.name)
    setEditCardValues.desc(cardData.description)
    setEditCardValues.status(cardData.status)
    displayModal(true)
  }

  return (
    <div
      className={`card ${isDragging && "drag"}`}
      ref={dragRef}
      onClick={handleCardEdit}
    >
      <p className="card-text">{`${cardData.name}: ${cardData.description}`}</p>
    </div>
  )
}

export default Card
