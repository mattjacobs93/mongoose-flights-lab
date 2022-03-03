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

export {
  index,
  newFlight as new,
  create,
}