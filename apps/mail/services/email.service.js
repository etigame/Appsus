import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'emailDB'
_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getNextEmailId
}

function query() {
    return storageService.query(EMAIL_KEY)
}

function get(emailId){
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if(email.id){
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getEmptyEmail() {
    // return { id: '', vendor, maxSpeed}
}

function getNextEmailId(emailId) {
    return storageService.query(EMAIL_KEY)
        .then(emails =>{
            var idx  = emails.findIndex(email => email.id === emailId)
            if (idx === emails.length-1) idx = -1
            return emails[idx+1].id
        })
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        // emails.push(_createEmail('Audu Mea', 300))
        // cars.push(_createCar('Fiak Ibasa', 120))
        // cars.push(_createCar('Subali Pesha', 100))
        // cars.push(_createCar('Mitsu Bashi', 150))
        
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
    return emails
}

// function _createCar(vendor, maxSpeed = 250) {
//     const car = getEmptyCar(vendor, maxSpeed)
//     car.id = utilService.makeId() 
//     return car
// }
