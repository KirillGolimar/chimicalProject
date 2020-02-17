import api from './../../../../../../services/api'

export default {
  getAllEvents(id) {
    //:TODO поменял адрес
    return api().get(`calendar/getEvents/?id=${id}`)
  }
}
