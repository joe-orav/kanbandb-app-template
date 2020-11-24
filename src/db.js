import KanbanDB from "kanbandb"

let instance
const REQUEST_STATUS = { SUCCESS: "success", FAILURE: "failure" }

export async function initializeDB() {
  try {
    instance = await KanbanDB.connect()
    instance.addCard({
      name: "Start",
      description: "Create my first card",
      status: "TODO",
    })
    return {
      status: REQUEST_STATUS.SUCCESS,
    }
  } catch {
    return {
      status: REQUEST_STATUS.FAILURE,
      payload: "Unable to connect to database",
    }
  }
}

export async function getCards() {
  try {
    let cards = await instance.getCards()
    return {
      status: REQUEST_STATUS.SUCCESS,
      payload: cards,
    }
  } catch {
    return {
      status: REQUEST_STATUS.FAILURE,
      payload: "Unable to retrieve cards",
    }
  }
}

export async function addCard(name, description, status) {
  try {
    const cardId = await instance.addCard({
      name,
      description,
      status,
    })

    let newCard = await instance.getCardById(cardId)
    return { status: REQUEST_STATUS.SUCCESS, payload: newCard }
  } catch {
    return {
      status: REQUEST_STATUS.FAILURE,
      payload: "Unable to add new card",
    }
  }
}

export async function updateCard(id, status, name, description) {
  try {
    const card = await instance.getCardById(id)
    const cardUpdated = await instance.updateCardById(id, {
      name: name || card.name,
      description: description || card.description,
      status: status,
    })

    if (cardUpdated) {
      const newCardData = await instance.getCards()
      return {
        status: REQUEST_STATUS.SUCCESS,
        payload: newCardData,
      }
    }
  } catch {
    return {
      status: REQUEST_STATUS.FAILURE,
      payload: "Unable to update card",
    }
  }
}

export async function deleteCard(id) {
  try {
    const isDeleted = await instance.deleteCardById(id)

    if (isDeleted) {
      return {
        status: REQUEST_STATUS.SUCCESS,
        payload: id,
      }
    }
  } catch {
    return {
      status: REQUEST_STATUS.FAILURE,
      payload: "Unable to delete card",
    }
  }
}
