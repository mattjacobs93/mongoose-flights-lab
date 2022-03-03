import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

/* GET users listing. */
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:id', flightsCtrl.show)
router.get('/:id/tickets/new',flightsCtrl.newTicket)


router.post('/', flightsCtrl.create)
router.post('/:id/tickets',flightsCtrl.addToTickets)
router.post('/:id/meals', flightsCtrl.associateMeal)

export {
  router
}
