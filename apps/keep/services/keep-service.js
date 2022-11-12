import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import gKeeps from '../data/keeps.json' assert { type: 'json' }

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
  return storageService.get(KEEP_KEY, keepId)
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
  return {
    id: utilService.makeId(),
    type: 'keep-txt',
    isPinned: false,
    info: {
      title: null,
      txt: null,
    },
  }
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
    keeps = gKeeps

    utilService.saveToStorage(KEEP_KEY, keeps)
  }
  return keeps
}

// function _createCar(vendor, maxSpeed = 250) {
//     const car = getEmptyCar(vendor, maxSpeed)
//     car.id = utilService.makeId()
//     return car
// }
