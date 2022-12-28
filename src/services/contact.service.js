import { storageService } from './storage.service.js'
import { makeId } from './util.service.js'

import contacts from '../data/contacts.json'


export const contactService = {
  getContacts,
  getContactById,
  getNextContactById,
  removeContact,
  saveContact,
  getEmptyContact,
}

const KEY = 'contactsDB'
var gContacts = contacts


function getContacts(filterBy = null) {
  if (storageService.load(KEY)) gContacts = storageService.load(KEY)
  else storageService.store(KEY, gContacts)
  return new Promise((resolve, reject) => {
    var contactsToReturn = gContacts
    if (filterBy && filterBy.fullname) {
      contactsToReturn = filter(filterBy.fullname)
    }
    resolve(contactsToReturn.sort((a, b) => a.fullname - b.fullname))
  })
}

function getContactById(id) {
  return new Promise((resolve, reject) => {
    const contact = gContacts.find((contact) => contact._id === id)
    contact ? resolve(contact) : reject(`Contact id ${id} not found!`)
  })
}

function getNextContactById(id, direction) {
  const step = direction === 'next' ? 1 : -1
  return new Promise((resolve, reject) => {
    const contactIdx = gContacts.findIndex((contact) => contact._id === id)
    if (contactIdx !== -1) {
      if (contactIdx === 0 && step === -1) resolve(gContacts[gContacts.length - 1]._id)
      else if (contactIdx === gContacts.length - 1 && step === 1) resolve(gContacts[0]._id)
      else resolve(gContacts[contactIdx + step]._id)
    }
    else reject(`Contact id ${id} not found!`)
  })
}

function removeContact(id) {
  return new Promise((resolve, reject) => {
    const index = gContacts.findIndex((contact) => contact._id === id)
    if (index !== -1) {
      gContacts.splice(index, 1)
      storageService.store(KEY, gContacts)
    }

    resolve(gContacts)
  })
}

function saveContact(contact) {
  return contact._id ? _updateContact(contact, 'UPDATE_CONTACT') : _addContact(contact, 'ADD_CONTACT')
}

function _updateContact(contact, type) {
  return new Promise((resolve, reject) => {
    const index = gContacts.findIndex((c) => contact._id === c._id)
    if (index !== -1) {
      gContacts[index] = contact
      storageService.store(KEY, gContacts)

    }
    resolve({ contact, type })
  })
}

function _addContact(contact, type) {
  return new Promise((resolve, reject) => {
    contact._id = makeId()
    gContacts.push(contact)
    storageService.store(KEY, gContacts)
    resolve({ contact, type })
  })
}


function getEmptyContact() {
  return {
    fullname: '',
    email: '',
    isAdmin: false,
    imgUrl: 'https://www.svgrepo.com/show/111216/user.svg',
    phone: '',
    balance: 500,
    moves: []


  }
}

function filter(term) {
  term = term.toLocaleLowerCase()
  return gContacts.filter((contact) => {
    return (
      contact.fullname.toLocaleLowerCase().includes(term) ||
      contact.phone.toLocaleLowerCase().includes(term) ||
      contact.email.toLocaleLowerCase().includes(term)
    )
  })
}

