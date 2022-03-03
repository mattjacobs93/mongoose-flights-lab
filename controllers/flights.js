import { Flight } from "../models/flight.js";
import {Meal} from '../models/meal.js'
import * as ticketCtrl from './tickets.js'

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
  flight.save(function (error) {
   if (error) console.log(error)
    res.redirect('/flights')
  })
 
}

function show (req, res) {
  
  Flight.findById(req.params.id)
  .populate('meals')
  .exec(function(error,flight) {
    Meal.find({_id: {$nin: flight.meals}}, function (error,meals) {
      res.render('flights/show',{
        title:'Flight Info',
        flight,
        meals
      })

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

}

function associateMeal (req,res) {
  

  Flight.findById(req.body.id, function (error,flight) {
    Meal.find({name: req.body.name}, function (error2,meal) {
      
      if (meal[0]._id) flight.meals.push(meal[0]._id)
  
      flight.save(function (error) {
        res.redirect(`/flights/${req.body.id}`)
      })
    })
  })
}

 
function newTicket (req,res) {
  ticketCtrl.newTicket(req,res)
}

export {
  index,
  newFlight as new,
  create,
  show,
  addToTickets,
  associateMeal,
  newTicket
}