import { storageService } from './storage.service'

const USER_STORAGE_KEY = 'user'

export const userService = {
  getLoggedInUser,
  signup,
  remove,
  addMove,
  loadCoins,
  getMoves,
}



function getLoggedInUser() {
  return storageService.load(USER_STORAGE_KEY) || null
}

function signup(user) {
  storageService.store(USER_STORAGE_KEY, user)
  return Promise.resolve(user)
}

function remove() {
  storageService.store(USER_STORAGE_KEY, null)
}

function addMove(contact, amount) {
  if (amount < 1) return null
  const loggedinUser = getLoggedInUser()
  const balance = loggedinUser.balance

  if (amount > balance) return null

  const move = {
    to: { _id: contact._id, fullname: contact.fullname },
    at: Date.now(),
    amount,
  }

  loggedinUser.balance -= amount
  loggedinUser.moves.push(move)

  storageService.store(USER_STORAGE_KEY, loggedinUser)

  return loggedinUser

  //should remove the amount from the user's coins.
}

function loadCoins() {
  const loggedinUser = getLoggedInUser()
  loggedinUser.balance = 100
  storageService.store(USER_STORAGE_KEY, loggedinUser)
  return loggedinUser
}

function getMoves() {
  const user = getLoggedInUser()
  return user.moves
}
