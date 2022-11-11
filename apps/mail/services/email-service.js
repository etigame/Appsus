import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import gEmails from '../data/emails.json' assert {type: 'json'}

const EMAIL_KEY = 'emailDB'

const loggedinUser = {
  email: 'etironi100@appsus.com',
  fullname: 'Eti Gal-Or Roni Siles',
}

_createEmails()

export const emailService = {
  query,
  get,
  remove,
  save,
  getEmptyEmail,
  getNextEmailId,
}

function query() {
  return storageService.query(EMAIL_KEY)
}

function get(emailId) {
  return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
  return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
  if (email.id) {
    return storageService.put(EMAIL_KEY, email)
  } else {
    return storageService.post(EMAIL_KEY, email)
  }
}

function getEmptyEmail() {
  return {
  tab: 'sent',
  subject: '',
  body: '',
  isRead: true,
  sentAt: Date.now(),
  from: 'etironi100@appsus.com',
  to: ''
}
}

function getNextEmailId(emailId) {
  return storageService.query(EMAIL_KEY).then((emails) => {
    var idx = emails.findIndex((email) => email.id === emailId)
    if (idx === emails.length - 1) idx = -1
    return emails[idx + 1].id
  })
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY)
  if (!emails || !emails.length) {
    emails = gEmails
    utilService.saveToStorage(EMAIL_KEY, emails)
  }
  return emails
}

// function _createCar(vendor, maxSpeed = 250) {
//     const car = getEmptyCar(vendor, maxSpeed)
//     car.id = utilService.makeId()
//     return car
// }
