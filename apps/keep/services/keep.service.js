import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const KEEP_KEY = 'keepDB'
_createKeeps()

export const keepService = {
  query,
  get,
  remove,
  save,
  getEmptyKeep,
  getNextKeepId,
}

function query() {
  return storageService.query(KEEP_KEY)
}

function get(keepId) {
  return storageService.get(keep_KEY, keepId)
}

function remove(keepId) {
  return storageService.remove(KEEP_KEY, keepId)
}

function save(keep) {
  if (keep.id) {
    return storageService.put(KEEP_KEY, keep)
  } else {
    return storageService.post(KEEP_KEY, keep)
  }
}

function getEmptyKeep() {
  // return { id: '', vendor, maxSpeed}
}

function getNextKeepId(keepId) {
  return storageService.query(KEEP_KEY).then((keeps) => {
    var idx = keeps.findIndex((keep) => keep.id === keepId)
    if (idx === keeps.length - 1) idx = -1
    return keeps[idx + 1].id
  })
}

function _createKeeps() {
  let keeps = utilService.loadFromStorage(KEEP_KEY)
  if (!keeps || !keeps.length) {
    keeps = []
    // keeps.push(_createkeep('Audu Mea', 300))
    // cars.push(_createCar('Fiak Ibasa', 120))
    // cars.push(_createCar('Subali Pesha', 100))
    // cars.push(_createCar('Mitsu Bashi', 150))

    utilService.saveToStorage(KEEP_KEY, keeps)
  }
  return keeps
}

// function _createCar(vendor, maxSpeed = 250) {
//     const car = getEmptyCar(vendor, maxSpeed)
//     car.id = utilService.makeId()
//     return car
// }
