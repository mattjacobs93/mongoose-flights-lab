import { Flight } from "../models/flight.js";

function index (req, res) {
  Flight.find({}, function (error,flights) {
    res.render('flights/index', {
      error,
      flights,
      title: 'All Flights',
    })
  })
}


function newFlight (req, res) {
  res.render('flights/new',{
    title:'New Flight'
  })
}

function create (req,res) {
  

  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key]
  }

  const flight = new Flight(req.body)
  console.log(flight)
  flight.save(function (error) {
   if (error) console.log(error)
    // if (error) return res.redirect('/flights/new')
    res.redirect('/flights')
  })
 
}

function show (req, res) {
  Flight.findById(req.params.id)
  .populate('tickets')
  .exec(function (error, flight) {
    res.render('flights/show', {
      flight
    })
  })
}

function addToTickets (req,res) {
  const id = req.body.id
  const seat = req.body.row + req.body.seat
  delete req.body.id
  delete req.body.row
  delete req.body.seat
  req.body.seat = seat
  Flight.findById(id,function(error,flight) {
    flight.tickets.push(req.body)
    flight.save(function(error) {
      if (error) res.redirect(`/tickets/${id}/new`)
      else res.redirect(`/flights/${id}`)
    })
  })
  // const newTicket = {}
  // newTicket.price = req.body.price
  // console.log(newTicket)
  console.log(id, req.body)
}

export {
  index,
  newFlight as new,
  create,
  show,
  addToTickets
}