import { Router } from "express";
import * as ticketsCtrl from "../controllers/tickets.js"

const router = Router()

router.get('/:id/new',ticketsCtrl.newTicket)

export {
  router
}