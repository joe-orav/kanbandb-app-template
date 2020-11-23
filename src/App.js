import React, { useState, useEffect } from "react"
import "./App.css"
import AddCardControl from "./addCardControl"
import KanbanDB from "kanbandb"
import Status from "./status"
import EditCardForm from "./editCardForm"

const Board = ({ children }) => <div className="board">{children}</div>

function App() {
  const [dbInstance, setDbInstance] = useState(null)
  const [statuses] = useState([
    { label: "To-do", code: "TODO" },
    { label: "In Progress", code: "IN_PROGRESS" },
    { label: "Done", code: "DONE" },
  ])
  const [cards, modifyCardData] = useState([])
  const [displayEditModal, setDisplayEditModal] = useState(false)
  const [editCardId, setEditCardId] = useState(null)
  const [editCardName, setEditCardName] = useState("")
  const [editCardDesc, setEditCardDesc] = useState("")
  const [editCardStatus, setEditCardStatus] = useState("TODO")

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
    } catch {
      console.log("Unable to add new card")
    }
  }

  function handleCardRelocation(id, status) {
    modifyCardData(
      cards.map((card) => (card.id !== id ? card : { ...card, status: status }))
    )
  }

  async function handleCardUpdate(id, status, name, description) {
    try {
      const card = await dbInstance.getCardById(id)
      const cardUpdated = await dbInstance.updateCardById(id, {
        name: name || card.name,
        description: description || card.description,
        status: status,
      })

      if (cardUpdated) {
        const updatedCarData = await dbInstance.getCards()
        modifyCardData(updatedCarData)
      }
    } catch {
      console.log("Unable to update card data")
    }
  }

  async function handleCardDeletion(id) {
    try {
      const isDeleted = await dbInstance.deleteCardById(id)

      if (isDeleted) {
        modifyCardData(cards.filter((card) => card.id !== id))
      }
    } catch {
      console.log("Unable to delete card")
    }
  }

  return (
    <div className="container">
      <Board>
        {statuses.map((status) => (
          <Status
            key={status.code}
            statusData={status}
            cards={cards.filter((card) => card.status === status.code)}
            onCardDrop={handleCardUpdate}
            relocation={handleCardRelocation}
            displayModal={(val) => setDisplayEditModal(val)}
            setEditCardValues={{
              id: setEditCardId,
              name: setEditCardName,
              desc: setEditCardDesc,
              status: setEditCardStatus,
            }}
          />
        ))}
      </Board>
      <AddCardControl statuses={statuses} onClick={handleNewCard} />
      <EditCardForm
        displayForm={displayEditModal}
        displayModal={(val) => setDisplayEditModal(val)}
        statuses={statuses}
        updateCardData={handleCardUpdate}
        deleteCard={handleCardDeletion}
        editCardValues={{
          id: editCardId,
          name: editCardName,
          desc: editCardDesc,
          status: editCardStatus,
        }}
        setEditCardValues={{
          name: setEditCardName,
          desc: setEditCardDesc,
          status: setEditCardStatus,
        }}
      />
    </div>
  )
}

export default App
