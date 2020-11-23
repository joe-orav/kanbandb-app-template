import React from "react"
import "./status.css"
import Card from "./card"
import { useDrop } from "react-dnd"

const Status = ({
  statusData,
  cards,
  onCardDrop,
  displayModal,
  relocation,
  setEditCardValues,
}) => {
  const [, dropRef] = useDrop({
    accept: "card",
    drop: (i, monitor) => onCardDrop(monitor.getItem().id, statusData.code),
    hover: (i, monitor) => relocation(monitor.getItem().id, statusData.code)
  })

  return (
    <div className="status" ref={dropRef}>
      <p className="status-name">{statusData.label}</p>
      {cards.sort((c1, c2) => c2.lastUpdated - c1.lastUpdated).map((card) => (
        <Card
          key={card.id}
          cardData={card}
          displayModal={displayModal}
          setEditCardValues={setEditCardValues}
        />
      ))}
    </div>
  )
}
export default Status
