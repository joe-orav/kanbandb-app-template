import React, { useState, useEffect } from "react"
import "./App.css"
import AddCardControl from "./components/addCardControl"
import Status from "./components/status"
import EditCardForm from "./components/editCardForm"
import * as db from "./db"

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
  const [previousStatus, setPreviousStatus] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    ;(async () => {
      const connection = await db.initializeDB()
      if (connection.status === "success") {
        let getPayload = await db.getCards()

        if (getPayload.status === "success") {
          modifyCardData(getPayload.payload)
        } else if (getPayload.status === "failure") {
          setAlertMessage(getPayload.payload)
        }
      } else if (connection.status === "failure") {
        setAlertMessage(connection.payload)
      }
    })()
  }, [])

  // Function takes data submitted from the add card control component and creates and displays a new card
  async function handleCardAddition(name, description, status) {
    let addPayload = await db.addCard(name, description, status)

    if (addPayload.status === "success") {
      modifyCardData([...cards, addPayload.payload])
    } else if (addPayload.status === "failure") {
      setAlertMessage(addPayload.payload)
    }
  }

  // Function displays a placeholder for a dragged card for quick rendering when the card is dropped
  function handleCardRelocation(id, status) {
    let draggedCard = cards.filter((card) => card.id === id)[0]
    
    if (!previousStatus) {
      setPreviousStatus(draggedCard.status)
    }

    modifyCardData(
      cards.map((card) => (card.id !== id ? card : { ...card, status: status }))
    )
  }

  // Function handles any modifications made to a card either through the form or through drag and drop
  async function handleCardUpdate(id, status, name, description) {
    let updatePayload = await db.updateCard(id, status, name, description)

    if (updatePayload.status === "success") {
      modifyCardData(updatePayload.payload)
      setPreviousStatus("")
    } else if (updatePayload.status === "failure") {
      setAlertMessage(updatePayload.payload)
      modifyCardData(
        cards.map((card) => {
          if (card.id === id && card.status !== previousStatus) {
            return { ...card, status: previousStatus }
          } else {
            return card
          }
        })
      )
      setPreviousStatus("")
    }
  }

  // Function handles the deletion of a card through the form
  async function handleCardDeletion(id) {
    let deletePayload = await db.deleteCard(id)

    if (deletePayload.status === "success") {
      modifyCardData(cards.filter((card) => card.id !== id))
    } else if (deletePayload.status === "failure") {
      setAlertMessage(deletePayload.payload)
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
      <AddCardControl statuses={statuses} onClick={handleCardAddition} />
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
