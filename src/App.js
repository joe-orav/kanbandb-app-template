import React, { useState, useEffect, useRef } from "react"
import "./App.css"
import AddCardControl from "./addCardControl"
import KanbanDB from "kanbandb"

const Card = ({ name, description, cardRef }) => {
  return (
    <div className="card" ref={cardRef}>
      <p className="card-text">{`${name}: ${description}`}</p>
      <div className="card-controls">
        <button className="card-btn card-delete-btn" title="Delete">
          ✖
        </button>
        <button className="card-btn card-edit-btn" title="Edit">
          ✎
        </button>
      </div>
    </div>
  )
}

const Status = ({ name, cards, cardRef }) => {

  function test(e) {
    e.preventDefault()
    console.log("tester")
  }

  return (
    <div className="status" onDragOver={test}>
      <p className="status-name">{name}</p>
      {cards.map((card) => (
        <Card
          key={card.id}
          name={card.name}
          description={card.description}
          cardRef={cardRef}
        />
      ))}
    </div>
  )
}

const Board = ({ statuses, cards, cardRef }) => (
  <div className="board">
    {statuses.map((status) => (
      <Status
        key={status.code}
        name={status.label}
        cards={cards.filter((card) => card.status === status.code)}
        cardRef={cardRef}
      />
    ))}
  </div>
)

function App() {
  const [dbInstance, setDbInstance] = useState(null)
  const [statuses] = useState([
    { label: "To-do", code: "TODO" },
    { label: "In Progress", code: "IN_PROGRESS" },
    { label: "Done", code: "DONE" },
  ])
  const [cards, modifyCardData] = useState([])
  const cardRef = useRef(null)

  useEffect(() => {
    async function initialize() {
      let instance = await KanbanDB.connect()

      instance.addCard({
        name: "Start",
        description: "Create my first card",
        status: "TODO",
      })

      try {
        let cards = await instance.getCards()
        modifyCardData(cards)
        setDbInstance(instance)
      } catch (err) {
        console.log("No cards found")
      }
    }

    initialize()
  }, [])

  async function handleNewCard(name, description, status) {
    try {
      const cardId = await dbInstance.addCard({
        name,
        description,
        status,
      })

      let newCard = await dbInstance.getCardById(cardId)
      modifyCardData([...cards, newCard])

      cardRef.current.scrollIntoView()
    } catch {
      console.log("Unable to add new card")
    }
  }

  return (
    <div className="container">
      <Board statuses={statuses} cards={cards} cardRef={cardRef} />
      <AddCardControl statuses={statuses} onClick={handleNewCard} />
    </div>
  )
}

export default App
