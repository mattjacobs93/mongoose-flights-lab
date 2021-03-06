import mongoose from "mongoose";
import { Meal } from "./meal.js";
import { ticketSchema } from "./ticket.js";

const Schema =  mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    required: true,
    },
  airport:{
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN',
    required: true,
  },
  flightNo: {
    type:Number,
    required: true,
    min:10,
    max: 9999,
  },
  departs: {
    type: Date,
    required: true,
    default: function() {
     let date = new Date()
      date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000))
      return date
    }
  },
  tickets: [ticketSchema],
  meals:{type: [Schema.Types.ObjectId], ref:"Meal"},
  }, 
  
  {timestamps: true})

  const Flight = mongoose.model('Flight', flightSchema)

  export {
    Flight
  }