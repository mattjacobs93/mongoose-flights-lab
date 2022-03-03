import { Flight } from "../models/flight.js";
import {Meal} from '../models/meal.js'

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
let flight

Flight.findById(req.params.id,function (error,flightTemp) {
  flight = flightTemp
})

let mealsNotInFlight
Meal.find({_id : {$nin: flight.meals}},function(error,meals){mealsNotInFlight = meals})
let mealsInFlight
Meal.find({_id : {$in: flight.meals}},function(error,meals) {mealsInFlight=meals})

  Flight.findById(req.params.id)
  .populate('tickets')
  .exec(function (error, flight) {
      Meal.find({_id : {$nin: flight.meals}}, function (error, meals){
        res.render('flights/show',{
          title: 'Flight Information',
          mealsNotInFlight,
          mealsInFlight,
          flight,
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
  // const newTicket = {}
  // newTicket.price = req.body.price
  // console.log(newTicket)
  console.log(id, req.body)
}

function associateMeal (req,res) {

  // Flight.findById(req.body.id)
  // .populate('meals')
  // .exec(function (error,flight) {
  //   console.log('flight',flight)
  // })
  
  Flight.findById(req.body.id, function (error,flightLocal) {
    Meal.find({name:req.body.name},function (error2, meal) {
      flightLocal.meals.push(meal[0]._id)
      flightLocal.save(function (error3) {
      })
    })
  })


  let flight
  Flight.findById(req.body.id, function(error,flightTemp){flight=flightTemp})
  console.log(flight)
  let mealsInFlight
  Meal.find({_id : {$in: flight.meals}},function (error,meals) {mealsInFlight=meals})
  console.log(mealsInFlight)
  let mealsNotInFlight
  Meal.find({_id : {$nin: flight.meals}},function (error,meals) {mealsNotInFlight = meals})

  console.log('meals in flight:', mealsInFlight)
  console.log('meals not in flight', mealsNotInFlight)
  res.render('flights/show', {
    title: 'Flight Information',
    mealsNotInFlight,
    mealsInFlight,
    flight,

  })

}

  // Flight.findById(req.body.id)
  // .populate('meals')
  // .exec(function(error,flight) {
  //   Meal.find()
  // })
  //console.log(flight)

  // .populate('meals')
  // .exec(function (error,flight) {
    
  //   Meal.find({name:req.body.name},function(error,meal){
     
  //     let chosenMeal = meal[0]

  //     flight.meals.push(chosenMeal._id)
  //     flight.save(function(error) {
  //       // res.redirect(`/flights/${flight._id}`)
  //       console.log('flight meals:', flight)
  //       flight.populate('meals').exec(function (error,flight) {



          
  //       }   )
  //       Meal.find({_id : {$nin: flight.meals}}, function (error, meals){
  //         console.log(meals)
  //         res.render('flights/show',{/           title: 'Flight Information',
  //           meals,
  //           flight
  //
  //         })
  //       })
  //     })
  //     })    
  // })


export {
  index,
  newFlight as new,
  create,
  show,
  addToTickets,
  associateMeal
}