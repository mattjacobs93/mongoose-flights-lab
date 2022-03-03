import { Router } from "express";
import * as mealsCtrl from "../controllers/meals.js"

const router = Router()

router.get('/new',mealsCtrl.newMeal)

router.post('/',mealsCtrl.create)

export {
  router
}