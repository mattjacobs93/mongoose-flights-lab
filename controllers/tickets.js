
import { Ticket } from "../models/ticket.js";


function newTicket (req,res) {
  res.render('tickets/new', {
    title: 'New Ticket',
    id: req.params.id
  })
}


export {
  newTicket
}



