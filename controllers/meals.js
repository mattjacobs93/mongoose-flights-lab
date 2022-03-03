import { Meal } from "../models/meal.js";


function newMeal (req,res) {
  Meal.find({},function(error,meals) {

    res.render('meals/new', {
      title: 'New Meal',
      meals
    })
  })

}

function create (req, res) {
  const newMeal = new Meal(req.body)
  newMeal.save(function(error) {
    if (error) res.redirect('/meals/new')
    else res.redirect('/flights')
  })
}

export {
  newMeal,
  create
}
