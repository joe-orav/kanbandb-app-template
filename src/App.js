import React, { useState, useEffect } from "react"
import "./App.css"
import AddCardControl from "./components/addCardControl"
import KanbanDB from "kanbandb"
import Status from "./components/status"
import EditCardForm from "./components/editCardForm"

const Board = ({ children }) => <div className="board">{children}</div>

const Alert = ({ alert, display, update }) => {
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        update("")
      }, 2000)
    }
  }, [alert, update])
  return <div className={`alert ${display && "show"}`}>{alert}</div>
}

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
  const [alertMessage, setAlertMessage] = useState("")

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
        setAlertMessage("No cards found")
      }
    }

    initialize()
  }, [])

  // Function takes data submitted from the add card control component and creates and displays a new card
  async function handleNewCard(name, description, status) {
    try {
      const cardId = await dbInstance.addCard({
        name,
        description,
        status,
      })

      let newCard = await dbInstance.getCardById(cardId)
      modifyCardData([...cards, newCard])
      window.scrollTo(0, 0)
    } catch {
      setAlertMessage("Unable to add new card")
    }
  }

  // Function displays a placeholder for a dragged card for quick rendering when the card is dropped
  function handleCardRelocation(id, status) {
    modifyCardData(
      cards.map((card) => (card.id !== id ? card : { ...card, status: status }))
    )
  }

  // Function handles any modiciations made to a card either through the form or through drag and drop
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
      setAlertMessage("Unable to update card data")
    }
  }

  // Function handles the deletion of a card through the form
  async function handleCardDeletion(id) {
    try {
      const isDeleted = await dbInstance.deleteCardById(id)

      if (isDeleted) {
        modifyCardData(cards.filter((card) => card.id !== id))
      }
    } catch {
      setAlertMessage("Unable to delete card")
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
      <Alert
        display={alertMessage.length > 0}
        alert={alertMessage}
        update={setAlertMessage}
      />
    </div>
  )
}

export default App
